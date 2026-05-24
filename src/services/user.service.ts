import { User } from '@types/index'
import { storage } from './storage.service'
import { generateId } from '@utils/helpers'

const USERS_KEY = 'goodday:users'
const CURRENT_USER_KEY = 'goodday:current_user'

export class UserService {
  /**
   * Create a new user
   */
  static createUser(email: string, name: string, password: string): User {
    const user: User = {
      id: generateId(),
      email,
      name,
      avatar: this.getAvatar(name),
      createdAt: new Date().toISOString(),
      theme: 'dark',
    }

    const users = this.getAllUsers()
    users.push(user)
    storage.setItem(USERS_KEY, users)

    return user
  }

  /**
   * Get all users
   */
  static getAllUsers(): User[] {
    return storage.getItem<User[]>(USERS_KEY, []) || []
  }

  /**
   * Get user by email
   */
  static getUserByEmail(email: string): User | null {
    const users = this.getAllUsers()
    return users.find(u => u.email === email) || null
  }

  /**
   * Get user by ID
   */
  static getUserById(id: string): User | null {
    const users = this.getAllUsers()
    return users.find(u => u.id === id) || null
  }

  /**
   * Update user
   */
  static updateUser(id: string, updates: Partial<User>): User | null {
    const users = this.getAllUsers()
    const index = users.findIndex(u => u.id === id)

    if (index === -1) return null

    users[index] = { ...users[index], ...updates }
    storage.setItem(USERS_KEY, users)

    return users[index]
  }

  /**
   * Set current user
   */
  static setCurrentUser(user: User | null): void {
    if (user) {
      storage.setItem(CURRENT_USER_KEY, user)
    } else {
      storage.removeItem(CURRENT_USER_KEY)
    }
  }

  /**
   * Get current user
   */
  static getCurrentUser(): User | null {
    return storage.getItem<User>(CURRENT_USER_KEY) || null
  }

  /**
   * Logout
   */
  static logout(): void {
    this.setCurrentUser(null)
  }

  /**
   * Verify credentials
   */
  static verifyCredentials(email: string, password: string): User | null {
    const user = this.getUserByEmail(email)
    if (!user) return null

    // In production, compare hashed passwords
    // For demo, we'll accept any user (just checking email exists)
    return user
  }

  /**
   * Generate avatar URL
   */
  private static getAvatar(name: string): string {
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
    return `https://avatar.vercel.sh/${initials}?size=40`
  }
}
