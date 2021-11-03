import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../pages/api";

interface IAuthContext {
  user: IUser | null
  signIn: ({ login, password }: ICredentials) => Promise<void>
  logOut: () => void
  loading: boolean
}

export interface ICredentials {
  login: string
  password: string
}

export interface IUser {
  id: number
  name: string
  login: string
  admin: boolean
  active: boolean
}

interface AuthProvider {
  children: ReactNode
}

interface AuthResponse {
  token: string
  user: IUser
  error?: string
}

export const AuthContext = createContext({} as IAuthContext)

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)

  async function signIn({ login, password }: ICredentials) {
    const response = await api.post<AuthResponse>('/user/authenticate', {
      login,
      password
    })

    if (response.data.error) {
      alert(response.data.error)
      return
    }

    const { token, user } = response.data

    localStorage.setItem('@bigodeAutoCenter:token', token)

    api.defaults.headers.common.authorization = `Bearer ${token}`

    setUser(user)
  }

  async function logOut() {
    setUser(null)
    localStorage.removeItem('@bigodeAutoCenter:token')
  }

  useEffect(() => {

    try {
      const token = localStorage.getItem('@bigodeAutoCenter:token')

      if (token) {
        api.defaults.headers.common.authorization = `Bearer ${token}`
        api.get<IUser>('/user/profile').then(user => {
          setUser(user.data)
        })
      }
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, logOut, loading }}>
      {props.children}
    </AuthContext.Provider>
  )
}