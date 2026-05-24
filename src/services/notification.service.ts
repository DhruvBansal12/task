import { Notification } from '@types/index'
import { storage } from './storage.service'
import { generateId } from '@utils/helpers'

const NOTIFICATIONS_KEY = 'goodday:notifications'

export class NotificationService {
  /**
   * Create a notification
   */
  static createNotification(
    userId: string,
    type: Notification['type'],
    message: string,
    relatedId?: string
  ): Notification {
    const notification: Notification = {
      id: generateId(),
      userId,
      type,
      message,
      read: false,
      relatedId,
      createdAt: new Date().toISOString(),
    }

    const notifications = this.getAllNotifications()
    notifications.push(notification)
    storage.setItem(NOTIFICATIONS_KEY, notifications)

    return notification
  }

  /**
   * Get all notifications
   */
  static getAllNotifications(): Notification[] {
    return storage.getItem<Notification[]>(NOTIFICATIONS_KEY, []) || []
  }

  /**
   * Get user notifications
   */
  static getUserNotifications(userId: string): Notification[] {
    const notifications = this.getAllNotifications()
    return notifications.filter(n => n.userId === userId).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  /**
   * Get unread notifications
   */
  static getUnreadNotifications(userId: string): Notification[] {
    return this.getUserNotifications(userId).filter(n => !n.read)
  }

  /**
   * Mark as read
   */
  static markAsRead(notificationId: string): Notification | null {
    const notifications = this.getAllNotifications()
    const index = notifications.findIndex(n => n.id === notificationId)

    if (index === -1) return null

    notifications[index].read = true
    storage.setItem(NOTIFICATIONS_KEY, notifications)

    return notifications[index]
  }

  /**
   * Mark all as read
   */
  static markAllAsRead(userId: string): boolean {
    const notifications = this.getAllNotifications()
    let modified = false

    notifications.forEach(n => {
      if (n.userId === userId && !n.read) {
        n.read = true
        modified = true
      }
    })

    if (modified) {
      storage.setItem(NOTIFICATIONS_KEY, notifications)
    }

    return modified
  }

  /**
   * Delete notification
   */
  static deleteNotification(notificationId: string): boolean {
    const notifications = this.getAllNotifications()
    const filtered = notifications.filter(n => n.id !== notificationId)

    if (filtered.length === notifications.length) return false

    storage.setItem(NOTIFICATIONS_KEY, filtered)
    return true
  }

  /**
   * Delete all notifications for user
   */
  static deleteUserNotifications(userId: string): boolean {
    const notifications = this.getAllNotifications()
    const filtered = notifications.filter(n => n.userId !== userId)

    if (filtered.length === notifications.length) return false

    storage.setItem(NOTIFICATIONS_KEY, filtered)
    return true
  }
}
