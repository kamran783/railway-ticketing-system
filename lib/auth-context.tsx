"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  email: string
  name: string
  phone: string
  dateOfBirth?: string
  gender?: "Male" | "Female" | "Transgender"
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (userData: {
    name: string
    email: string
    phone: string
    password: string
    dateOfBirth?: string
    gender?: string
  }) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user database
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: "1",
    email: "demo@example.com",
    password: "demo123",
    name: "Demo User",
    phone: "9876543210",
    dateOfBirth: "1990-01-01",
    gender: "Male",
    createdAt: "2024-01-01T00:00:00Z",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("railway_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem("railway_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (mockUser) {
      const { password: _, ...userWithoutPassword } = mockUser
      setUser(userWithoutPassword)
      localStorage.setItem("railway_user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return { success: true }
    }

    setIsLoading(false)
    return { success: false, error: "Invalid email or password" }
  }

  const signup = async (userData: {
    name: string
    email: string
    phone: string
    password: string
    dateOfBirth?: string
    gender?: string
  }): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = MOCK_USERS.find((u) => u.email === userData.email)
    if (existingUser) {
      setIsLoading(false)
      return { success: false, error: "User with this email already exists" }
    }

    // Create new user
    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      email: userData.email,
      password: userData.password,
      name: userData.name,
      phone: userData.phone,
      dateOfBirth: userData.dateOfBirth,
      gender: userData.gender as "Male" | "Female" | "Transgender",
      createdAt: new Date().toISOString(),
    }

    MOCK_USERS.push(newUser)

    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("railway_user", JSON.stringify(userWithoutPassword))
    setIsLoading(false)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("railway_user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
