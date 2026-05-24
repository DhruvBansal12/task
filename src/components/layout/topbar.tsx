'use client'

import { Button } from '@components/ui'
import { useAuthStore, useNotificationStore } from '@store/index'
import { Bell, Search, Settings } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Topbar() {
  const user = useAuthStore(state => state.user)
  const notifications = useNotificationStore(state => state.notifications)
  const fetchNotifications = useNotificationStore(state => state.fetchNotifications)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (user?.id) {
      fetchNotifications(user.id)
    }
  }, [user?.id, fetchNotifications])

  const unreadCount = mounted ? notifications.filter(n => !n.read).length : 0

  return (
    <div className="h-16 border-b border-dark-700 bg-dark-secondary/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left Section */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-secondary" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-dark-tertiary text-dark-primary rounded-lg border border-dark-700 outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Notifications */}
        <Link href="/notifications">
          <button className="relative text-dark-secondary hover:text-dark-primary transition-colors">
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </Link>

        {/* Settings */}
        <Link href="/settings">
          <button className="text-dark-secondary hover:text-dark-primary transition-colors">
            <Settings size={20} />
          </button>
        </Link>

        {/* User Avatar */}
        {mounted && user && (
          <div className="flex items-center gap-3 pl-4 border-l border-dark-700">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-dark-primary">{user.name}</p>
              <p className="text-xs text-dark-secondary">{user.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
