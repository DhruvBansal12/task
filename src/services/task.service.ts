import { Task, TaskStatus, TaskPriority } from '@types/index'
import { storage } from './storage.service'
import { generateId } from '@utils/helpers'

const TASKS_KEY = 'goodday:tasks'

export class TaskService {
  /**
   * Create a new task
   */
  static createTask(
    projectId: string,
    workspaceId: string,
    title: string,
    description?: string,
    priority: TaskPriority = 'medium',
    dueDate?: string,
    assignee?: string
  ): Task {
    const task: Task = {
      id: generateId(),
      projectId,
      workspaceId,
      title,
      description,
      status: 'todo' as TaskStatus,
      priority,
      assignee,
      dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
      attachments: [],
    }

    const tasks = this.getAllTasks()
    tasks.push(task)
    storage.setItem(TASKS_KEY, tasks)

    return task
  }

  /**
   * Get all tasks
   */
  static getAllTasks(): Task[] {
    return storage.getItem<Task[]>(TASKS_KEY, []) || []
  }

  /**
   * Get tasks by project
   */
  static getProjectTasks(projectId: string): Task[] {
    const tasks = this.getAllTasks()
    return tasks.filter(t => t.projectId === projectId)
  }

  /**
   * Get tasks by workspace
   */
  static getWorkspaceTasks(workspaceId: string): Task[] {
    const tasks = this.getAllTasks()
    return tasks.filter(t => t.workspaceId === workspaceId)
  }

  /**
   * Get task by ID
   */
  static getTaskById(id: string): Task | null {
    const tasks = this.getAllTasks()
    return tasks.find(t => t.id === id) || null
  }

  /**
   * Get tasks for assignee
   */
  static getAssigneeTasks(userId: string): Task[] {
    const tasks = this.getAllTasks()
    return tasks.filter(t => t.assignee === userId)
  }

  /**
   * Update task
   */
  static updateTask(id: string, updates: Partial<Task>): Task | null {
    const tasks = this.getAllTasks()
    const index = tasks.findIndex(t => t.id === id)

    if (index === -1) return null

    tasks[index] = {
      ...tasks[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    storage.setItem(TASKS_KEY, tasks)

    return tasks[index]
  }

  /**
   * Delete task
   */
  static deleteTask(id: string): boolean {
    const tasks = this.getAllTasks()
    const filtered = tasks.filter(t => t.id !== id)

    if (filtered.length === tasks.length) return false

    storage.setItem(TASKS_KEY, filtered)
    return true
  }

  /**
   * Update task status
   */
  static updateStatus(id: string, status: TaskStatus): Task | null {
    return this.updateTask(id, { status })
  }

  /**
   * Update task priority
   */
  static updatePriority(id: string, priority: TaskPriority): Task | null {
    return this.updateTask(id, { priority })
  }

  /**
   * Assign task to user
   */
  static assignTask(id: string, userId: string): Task | null {
    return this.updateTask(id, { assignee: userId })
  }

  /**
   * Get tasks by status
   */
  static getTasksByStatus(projectId: string, status: TaskStatus): Task[] {
    const tasks = this.getProjectTasks(projectId)
    return tasks.filter(t => t.status === status)
  }

  /**
   * Get overdue tasks
   */
  static getOverdueTasks(workspaceId: string): Task[] {
    const tasks = this.getWorkspaceTasks(workspaceId)
    const now = new Date()
    return tasks.filter(
      t => t.dueDate && new Date(t.dueDate) < now && t.status !== 'completed'
    )
  }

  /**
   * Get due soon tasks
   */
  static getDueSoonTasks(workspaceId: string, days: number = 7): Task[] {
    const tasks = this.getWorkspaceTasks(workspaceId)
    const now = new Date()
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000)

    return tasks.filter(
      t =>
        t.dueDate &&
        new Date(t.dueDate) >= now &&
        new Date(t.dueDate) <= futureDate &&
        t.status !== 'completed'
    )
  }

  /**
   * Add comment to task
   */
  static addComment(
    taskId: string,
    userId: string,
    content: string,
    mentions?: string[]
  ): Task | null {
    const task = this.getTaskById(taskId)
    if (!task) return null

    if (!task.comments) task.comments = []

    task.comments.push({
      id: generateId(),
      taskId,
      userId,
      content,
      createdAt: new Date().toISOString(),
      mentions,
    })

    return this.updateTask(taskId, { comments: task.comments })
  }

  /**
   * Delete comment from task
   */
  static deleteComment(taskId: string, commentId: string): Task | null {
    const task = this.getTaskById(taskId)
    if (!task || !task.comments) return null

    task.comments = task.comments.filter(c => c.id !== commentId)
    return this.updateTask(taskId, { comments: task.comments })
  }
}
