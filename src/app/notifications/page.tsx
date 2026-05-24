'use client'

import { useAuthStore, useNotificationStore } from '@store/index'
import { Card, CardTitle, Button } from '@components/ui'
import { useEffect } from 'react'
import { Trash2, CheckCheck } from 'lucide-react'

export default function NotificationsPage() {
  const user = useAuthStore(state => state.user)
  const notifications = useNotificationStore(state => state.notifications)
  const fetchNotifications = useNotificationStore(state => state.fetchNotifications)
  const markAsRead = useNotificationStore(state => state.markAsRead)
  const markAllAsRead = useNotificationStore(state => state.markAllAsRead)
  const deleteNotification = useNotificationStore(state => state.deleteNotification)

  useEffect(() => {
    if (user?.id) {
      fetchNotifications(user.id)
    }
  }, [user?.id, fetchNotifications])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-primary">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-dark-secondary mt-1">
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {unreadCount > 0 && (
          <Button
            variant="secondary"
            onClick={() => user?.id && markAllAsRead(user.id)}
            className="flex items-center gap-2"
          >
            <CheckCheck size={18} />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <Card>
          <div className="py-12 text-center">
            <p className="text-dark-secondary">No notifications yet</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map(notification => (
            <Card
              key={notification.id}
              className={`${!notification.read ? 'border-primary bg-primary/5' : ''}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className={`font-medium ${!notification.read ? 'text-primary' : 'text-dark-primary'}`}>
                    {notification.message}
                  </p>
                  <p className="text-sm text-dark-secondary mt-1">
                    {new Date(notification.createdAt).toLocaleDateString()} at{' '}
                    {new Date(notification.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-2 text-dark-secondary hover:text-primary transition-colors"
                      title="Mark as read"
                    >
                      <CheckCheck size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 text-dark-secondary hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    notification.type === 'task-assigned'
                      ? 'bg-blue-500/20 text-blue-400'
                      : notification.type === 'task-commented'
                      ? 'bg-purple-500/20 text-purple-400'
                      : notification.type === 'due-date'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}
                >
                  {notification.type.replace('-', ' ')}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
