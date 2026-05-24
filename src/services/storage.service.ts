// localStorage service for data persistence

const STORAGE_KEYS = {
  USERS: 'goodday:users',
  CURRENT_USER: 'goodday:current_user',
  WORKSPACES: 'goodday:workspaces',
  PROJECTS: 'goodday:projects',
  TASKS: 'goodday:tasks',
  COMMENTS: 'goodday:comments',
  NOTIFICATIONS: 'goodday:notifications',
  ACTIVITY_LOGS: 'goodday:activity_logs',
  SETTINGS: 'goodday:settings',
  ATTACHMENTS: 'goodday:attachments',
}

class StorageService {
  /**
   * Get item from localStorage with parsing
   */
  getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      if (typeof window === 'undefined') return defaultValue || null

      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : (defaultValue || null)
    } catch (error) {
      console.error(`Error reading from storage [${key}]:`, error)
      return defaultValue || null
    }
  }

  /**
   * Set item in localStorage with stringification
   */
  setItem<T>(key: string, value: T): boolean {
    try {
      if (typeof window === 'undefined') return false

      window.localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error writing to storage [${key}]:`, error)
      return false
    }
  }

  /**
   * Remove item from localStorage
   */
  removeItem(key: string): boolean {
    try {
      if (typeof window === 'undefined') return false

      window.localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing from storage [${key}]:`, error)
      return false
    }
  }

  /**
   * Clear all storage
   */
  clear(): boolean {
    try {
      if (typeof window === 'undefined') return false

      window.localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing storage:', error)
      return false
    }
  }

  /**
   * Get all items by prefix
   */
  getItemsByPrefix<T>(prefix: string): T[] {
    try {
      if (typeof window === 'undefined') return []

      const items: T[] = []
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i)
        if (key && key.startsWith(prefix)) {
          const item = window.localStorage.getItem(key)
          if (item) {
            items.push(JSON.parse(item) as T)
          }
        }
      }
      return items
    } catch (error) {
      console.error('Error getting items by prefix:', error)
      return []
    }
  }
}

export const storage = new StorageService()
export const STORAGE_KEYS_CONST = STORAGE_KEYS
