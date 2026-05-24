'use client'

import { useAuthStore } from '@store/index'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Sidebar from '@components/layout/sidebar'
import Topbar from '@components/layout/topbar'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, isMounted, router])

  if (!isMounted) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
