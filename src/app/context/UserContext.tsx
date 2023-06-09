"use client";
import { createContext, useEffect, useState } from "react"
import { v4 as uuid } from 'uuid'
import { setCookie } from 'nookies'

interface UserProviderProps {
  children: React.ReactNode
}

export interface ContextUserType {
  user: UserType | null
  saveUser: (user: UserType, saveCokkie: boolean) => void
}

export interface UserType {
  name: string
  email: string
  plan: 'Básico' | 'Premium'
  typePlan: 'Mensal' | 'Anual'
}

export const UserContext = createContext({} as ContextUserType)

export const UserProvider = ({ children }: UserProviderProps) => {

  const [user, setUser] = useState<UserType | null>(null)

  function saveUser(user: UserType, saveCokkie: boolean) {

    if (saveCokkie) {
      setCookie(undefined, 'user', JSON.stringify(user), {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })
    }
    
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  useEffect(() => {

    const user = localStorage.getItem('user')

    if (user) {
      setUser(JSON.parse(user))
    }

  }, [])

  return (
    <UserContext.Provider value={{
      user,
      saveUser
    }}>
      {children}
    </UserContext.Provider>
  )
}
