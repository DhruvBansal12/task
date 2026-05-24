'use client'

import { useAuthStore } from '@store/index'
import { Card, CardTitle, CardDescription, Button, Input } from '@components/ui'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function SettingsPage() {
  const user = useAuthStore(state => state.user)
  const updateUserTheme = useAuthStore(state => state.updateUserTheme)
  const logout = useAuthStore(state => state.logout)
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  const handleThemeToggle = () => {
    if (user) {
      const newTheme = user.theme === 'dark' ? 'light' : 'dark'
      updateUserTheme(newTheme)
    }
  }

  if (!isMounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark-primary">Settings</h1>
        <p className="text-dark-secondary mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardTitle className="mb-2">Profile Settings</CardTitle>
        <CardDescription className="mb-6">
          Manage your account information
        </CardDescription>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-primary mb-2">
              Full Name
            </label>
            <Input
              type="text"
              defaultValue={user?.name}
              disabled
              className="opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-primary mb-2">
              Email Address
            </label>
            <Input
              type="email"
              defaultValue={user?.email}
              disabled
              className="opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-primary mb-2">
              Member Since
            </label>
            <Input
              type="text"
              defaultValue={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}
              disabled
              className="opacity-50"
            />
          </div>
        </div>
      </Card>

      {/* Appearance */}
      <Card>
        <CardTitle className="mb-2">Appearance</CardTitle>
        <CardDescription className="mb-6">
          Customize how GoodDay looks
        </CardDescription>

        <div className="flex items-center justify-between p-4 rounded-lg border border-dark-700 bg-dark-tertiary">
          <div className="flex items-center gap-3">
            {user?.theme === 'dark' ? (
              <Moon className="text-primary" size={20} />
            ) : (
              <Sun className="text-accent" size={20} />
            )}
            <div>
              <p className="font-medium text-dark-primary">
                {user?.theme === 'dark' ? 'Dark' : 'Light'} Mode
              </p>
              <p className="text-sm text-dark-secondary">
                Current theme preference
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            onClick={handleThemeToggle}
          >
            Toggle
          </Button>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <CardTitle className="mb-2">Notifications</CardTitle>
        <CardDescription className="mb-6">
          Manage your notification preferences
        </CardDescription>

        <div className="space-y-4">
          {[
            { label: 'Task Assigned', description: 'When a task is assigned to you' },
            { label: 'Task Comments', description: 'When someone comments on your tasks' },
            { label: 'Due Reminders', description: 'Reminders for upcoming due dates' },
            { label: 'Project Updates', description: 'Important project activity' },
          ].map((item, i) => (
            <label
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg border border-dark-700 bg-dark-tertiary cursor-pointer hover:border-primary transition-colors"
            >
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded accent-primary"
              />
              <div className="flex-1">
                <p className="font-medium text-dark-primary">{item.label}</p>
                <p className="text-sm text-dark-secondary">{item.description}</p>
              </div>
            </label>
          ))}
        </div>
      </Card>

      {/* Workspace Settings */}
      <Card>
        <CardTitle className="mb-2">Workspace</CardTitle>
        <CardDescription className="mb-6">
          Manage workspace settings
        </CardDescription>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-dark-700 bg-dark-tertiary">
            <p className="font-medium text-dark-primary mb-2">Workspace Information</p>
            <p className="text-sm text-dark-secondary">
              You can manage workspace members and settings from the workspace settings page.
            </p>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-500/30">
        <CardTitle className="mb-2 text-red-400">Danger Zone</CardTitle>
        <CardDescription className="mb-6">
          Irreversible actions
        </CardDescription>

        <Button
          variant="danger"
          onClick={handleLogout}
        >
          Sign Out
        </Button>

        <div className="mt-4 p-4 rounded-lg border border-red-500/30 bg-red-500/10">
          <p className="text-sm text-red-400">
            Other destructive actions like account deletion would appear here.
          </p>
        </div>
      </Card>

      {/* Info */}
      <Card isGlass>
        <p className="text-sm text-dark-secondary">
          <strong>Note:</strong> This is a demo application. Changes are stored locally in your
          browser and will be lost when localStorage is cleared.
        </p>
      </Card>
    </div>
  )
}
