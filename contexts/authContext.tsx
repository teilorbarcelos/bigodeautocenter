import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../pages/api";

interface IAuthContext {
  user: IUser | null
  signIn: ({ login, password }: ICredentials) => Promise<void>
  logOut: () => void
  loading: boolean
  verifyUser: () => void
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
    try {
      setLoading(true)
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function logOut() {
    setUser(null)
    localStorage.removeItem('@bigodeAutoCenter:token')
    localStorage.removeItem('@bigodeAutoCenter:user')
  }

  const verifyUser = async () => {
    setLoading(true)

    const token = localStorage.getItem('@bigodeAutoCenter:token')

    try {
      if (token) {
        api.defaults.headers.common.authorization = `Bearer ${token}`
        const { data: user } = await api.post<IUser>('/user/profile')

        setUser(user)

        localStorage.setItem('@bigodeAutoCenter:user', JSON.stringify(user))
      } else {
        logOut()
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.error
        alert(errorMessage);
        if (errorMessage === 'Access authorized only for authenticated users!') {
          logOut()
        }
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    verifyUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, logOut, loading, verifyUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}
