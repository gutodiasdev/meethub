import Router from "next/router";
import { setCookie } from "nookies";
import { createContext, ReactNode, useState } from "react";
import { api } from "../services/apiClient";

type User = {
  email: string;
  roles?: string;
}

type CreateUserCredentials = {
  email: string;
  password: string;
  telephone: string;
  roles?: string;
}

type ApiContextData = {
  createUser: (credentials: CreateUserCredentials) => Promise<void>;
  user: User;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const ApiContext = createContext({} as ApiContextData)

export function ApiProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();

  async function createUser({ email, password, telephone, roles = "user" }: CreateUserCredentials) {
    const userRoles = roles
    try {
      const response = await api.post('users/create', {
        email: email,
        password: password,
        telephone: telephone,
        roles: userRoles,
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
    <ApiContext.Provider value={{ createUser, user }}>
      {children}
    </ApiContext.Provider>
  )
}


