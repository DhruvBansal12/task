'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@store/index'
import {
  LayoutDashboard,
  FolderOpen,
  KanbanSquare,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@utils/cn'

const NAVIGATION_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/projects', icon: FolderOpen },
  { label: 'Kanban', href: '/projects/kanban', icon: KanbanSquare },
  { label: 'Calendar', href: '/calendar', icon: Calendar },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const logout = useAuthStore(state => state.logout)
  const user = useAuthStore(state => state.user)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden text-dark-primary hover:text-primary transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed md:relative z-40 w-64 h-full bg-dark-secondary/80 backdrop-blur-md border-r border-dark-700 flex flex-col transition-all duration-300',
          'md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="pt-6 px-6 mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold group-hover:shadow-glow transition-all">
              G
            </div>
            <span className="text-xl font-bold text-gradient">GoodDay</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                  isActive
                    ? 'bg-primary/20 text-primary'
                    : 'text-dark-secondary hover:text-dark-primary hover:bg-dark-tertiary'
                )}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-dark-700 space-y-3">
          <div className="px-4 py-3 rounded-xl bg-dark-tertiary">
            <p className="text-xs text-dark-tertiary uppercase font-medium">Account</p>
            <p className="text-sm font-semibold text-dark-primary truncate">{user?.name}</p>
            <p className="text-xs text-dark-secondary truncate">{user?.email}</p>
          </div>

          <button
            onClick={() => {
              logout()
              setIsOpen(false)
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-dark-secondary hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
