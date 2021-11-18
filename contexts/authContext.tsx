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
  id: string
  name: string
  login: string
  admin: boolean
  active: boolean
  error?: string
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
    localStorage.setItem('@bigodeAutoCenter:user', JSON.stringify(user))

    api.defaults.headers.common.authorization = `Bearer ${token}`

    setUser(user)
  }

  async function logOut() {
    setUser(null)
    localStorage.removeItem('@bigodeAutoCenter:token')
  }

  useEffect(() => {
    const token = localStorage.getItem('@bigodeAutoCenter:token')
    const user = JSON.parse(localStorage.getItem('@bigodeAutoCenter:user')) as IUser

    if (token && user) {
      api.defaults.headers.common.authorization = `Bearer ${token}`
      api.post<IUser>('/user/profile', { id: user.id }).then(user => {
        setUser(user.data)
      })
    }
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, logOut, loading }}>
      {props.children}
    </AuthContext.Provider>
  )
}