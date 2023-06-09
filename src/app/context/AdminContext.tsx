"use client"
import Admin from "@/models/Admin"
import { createContext, useEffect, useState } from "react"
import { setCookie } from 'nookies'

interface AdminProviderProps {
  children: React.ReactNode
}

interface AdminContext {
  admin: Admin | null
  saveAdmin: (admin: Admin) => void
  removeAdmin: () => void
}

export const AdminContext = createContext({} as AdminContext)

export const AdminProvider = ({ children }: AdminProviderProps) => {

  const [admin, setAdmin] = useState<Admin | null>(null)

  function saveAdmin(admin: Admin) {
    setCookie(undefined, 'admin', JSON.stringify(admin), {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    })
    localStorage.setItem('admin', JSON.stringify(admin))
    setAdmin(admin)
  }

  function removeAdmin() {
    localStorage.removeItem('admin')
    setAdmin(null)
  }

  useEffect(() => {
    const adminStorage = localStorage.getItem('admin')
    if (adminStorage) {
      setAdmin(JSON.parse(adminStorage))
    }
  }, [])

  return (
    <AdminContext.Provider value={{
      admin,
      saveAdmin,
      removeAdmin
    }}>
      {children}
    </AdminContext.Provider>
  )
}
