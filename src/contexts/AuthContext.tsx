import { createContext, ReactNode, useState, useEffect } from "react";
import Router from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from "../services/apiClient";

type User = {
  email: string;
  roles: string[];
}

type SignInCredentials = {
  email: string;
  password: string;
}

type SignUpCredentials = {
  email: string;
  password: string;
  telephone: string;
}

type AuthContextData = {
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export function signOut() {
  destroyCookie(undefined, 'meethub.token')
  destroyCookie(undefined, 'meethub.refreshToken')


  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break
        default:
          break
      }
    }
  }, [])

  useEffect(() => {
    const { 'meethub.token': token } = parseCookies()

    if (token) {
      api.get('/me')
        .then(response => {
          const { email, roles } = response.data

          setUser({ email, roles })
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email: email,
        password: password,
      })

      const { token, refreshToken, roles } = response.data

      setCookie(undefined, 'meethub.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setCookie(undefined, 'meethub.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setUser({ email, roles })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/app')
    } catch (error) {
      console.log(error)
    }
  }

  async function signUp({ email, password, telephone }: SignUpCredentials) {
    try {
      const response = await api.post('users', {
        email: email,
        password: password,
        telephone: telephone,
      })
      const { token, refreshToken, roles } = response.data

      setCookie(undefined, 'meethub.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setCookie(undefined, 'meethub.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setUser({
        email,
        roles
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/app')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, isAuthenticated, user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}