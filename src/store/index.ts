import { create } from 'zustand'
import { User, Workspace, Project, Task, Notification } from '@types/index'
import { UserService } from '@services/user.service'
import { WorkspaceService } from '@services/workspace.service'
import { ProjectService } from '@services/project.service'
import { TaskService } from '@services/task.service'
import { NotificationService } from '@services/notification.service'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  register: (email: string, name: string, password: string) => boolean
  logout: () => void
  setUser: (user: User | null) => void
  updateUserTheme: (theme: 'dark' | 'light') => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: UserService.getCurrentUser(),
  isAuthenticated: !!UserService.getCurrentUser(),

  login: (email: string, password: string) => {
    const user = UserService.verifyCredentials(email, password)
    if (!user) return false

    UserService.setCurrentUser(user)
    set({ user, isAuthenticated: true })
    return true
  },

  register: (email: string, name: string, password: string) => {
    if (UserService.getUserByEmail(email)) return false

    const user = UserService.createUser(email, name, password)
    UserService.setCurrentUser(user)
    set({ user, isAuthenticated: true })
    return true
  },

  logout: () => {
    UserService.logout()
    set({ user: null, isAuthenticated: false })
  },

  setUser: (user: User | null) => {
    if (user) {
      UserService.setCurrentUser(user)
    } else {
      UserService.logout()
    }
    set({ user, isAuthenticated: !!user })
  },

  updateUserTheme: (theme: 'dark' | 'light') => {
    const user = UserService.getCurrentUser()
    if (user) {
      const updated = UserService.updateUser(user.id, { theme })
      set({ user: updated })
    }
  },
}))

interface WorkspaceState {
  workspaces: Workspace[]
  currentWorkspace: Workspace | null
  fetchWorkspaces: (userId: string) => void
  createWorkspace: (name: string, description: string, owner: string) => Workspace | null
  updateWorkspace: (id: string, updates: Partial<Workspace>) => Workspace | null
  deleteWorkspace: (id: string) => boolean
  setCurrentWorkspace: (workspace: Workspace | null) => void
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspaces: [],
  currentWorkspace: null,

  fetchWorkspaces: (userId: string) => {
    const workspaces = WorkspaceService.getUserWorkspaces(userId)
    set({ workspaces })
  },

  createWorkspace: (name: string, description: string, owner: string) => {
    const workspace = WorkspaceService.createWorkspace(name, description, owner)
    if (workspace) {
      const current = get()
      set({ workspaces: [...current.workspaces, workspace] })
    }
    return workspace
  },

  updateWorkspace: (id: string, updates: Partial<Workspace>) => {
    const workspace = WorkspaceService.updateWorkspace(id, updates)
    if (workspace) {
      const current = get()
      set({
        workspaces: current.workspaces.map(w => (w.id === id ? workspace : w)),
        currentWorkspace: current.currentWorkspace?.id === id ? workspace : current.currentWorkspace,
      })
    }
    return workspace
  },

  deleteWorkspace: (id: string) => {
    const deleted = WorkspaceService.deleteWorkspace(id)
    if (deleted) {
      const current = get()
      set({
        workspaces: current.workspaces.filter(w => w.id !== id),
        currentWorkspace: current.currentWorkspace?.id === id ? null : current.currentWorkspace,
      })
    }
    return deleted
  },

  setCurrentWorkspace: (workspace: Workspace | null) => {
    set({ currentWorkspace: workspace })
  },
}))

interface ProjectState {
  projects: Project[]
  fetchProjects: (workspaceId: string) => void
  createProject: (workspaceId: string, name: string, description: string, owner: string) => Project | null
  updateProject: (id: string, updates: Partial<Project>) => Project | null
  deleteProject: (id: string) => boolean
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],

  fetchProjects: (workspaceId: string) => {
    const projects = ProjectService.getWorkspaceProjects(workspaceId)
    set({ projects })
  },

  createProject: (workspaceId: string, name: string, description: string, owner: string) => {
    const project = ProjectService.createProject(workspaceId, name, description, owner)
    if (project) {
      const current = get()
      set({ projects: [...current.projects, project] })
    }
    return project
  },

  updateProject: (id: string, updates: Partial<Project>) => {
    const project = ProjectService.updateProject(id, updates)
    if (project) {
      const current = get()
      set({ projects: current.projects.map(p => (p.id === id ? project : p)) })
    }
    return project
  },

  deleteProject: (id: string) => {
    const deleted = ProjectService.deleteProject(id)
    if (deleted) {
      const current = get()
      set({ projects: current.projects.filter(p => p.id !== id) })
    }
    return deleted
  },
}))

interface TaskState {
  tasks: Task[]
  fetchTasks: (projectId: string) => void
  fetchWorkspaceTasks: (workspaceId: string) => void
  createTask: (
    projectId: string,
    workspaceId: string,
    title: string,
    description?: string,
    priority?: 'low' | 'medium' | 'high' | 'urgent',
    dueDate?: string,
    assignee?: string
  ) => Task | null
  updateTask: (id: string, updates: Partial<Task>) => Task | null
  deleteTask: (id: string) => boolean
  updateTaskStatus: (id: string, status: Task['status']) => Task | null
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],

  fetchTasks: (projectId: string) => {
    const tasks = TaskService.getProjectTasks(projectId)
    set({ tasks })
  },

  fetchWorkspaceTasks: (workspaceId: string) => {
    const tasks = TaskService.getWorkspaceTasks(workspaceId)
    set({ tasks })
  },

  createTask: (projectId, workspaceId, title, description, priority, dueDate, assignee) => {
    const task = TaskService.createTask(projectId, workspaceId, title, description, priority, dueDate, assignee)
    if (task) {
      const current = get()
      set({ tasks: [...current.tasks, task] })
    }
    return task
  },

  updateTask: (id: string, updates: Partial<Task>) => {
    const task = TaskService.updateTask(id, updates)
    if (task) {
      const current = get()
      set({ tasks: current.tasks.map(t => (t.id === id ? task : t)) })
    }
    return task
  },

  deleteTask: (id: string) => {
    const deleted = TaskService.deleteTask(id)
    if (deleted) {
      const current = get()
      set({ tasks: current.tasks.filter(t => t.id !== id) })
    }
    return deleted
  },

  updateTaskStatus: (id: string, status: Task['status']) => {
    return get().updateTask(id, { status })
  },
}))

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  fetchNotifications: (userId: string) => void
  markAsRead: (notificationId: string) => void
  markAllAsRead: (userId: string) => void
  deleteNotification: (notificationId: string) => void
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  fetchNotifications: (userId: string) => {
    const notifications = NotificationService.getUserNotifications(userId)
    const unreadCount = notifications.filter(n => !n.read).length
    set({ notifications, unreadCount })
  },

  markAsRead: (notificationId: string) => {
    NotificationService.markAsRead(notificationId)
    const current = get()
    const notifications = current.notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    )
    const unreadCount = notifications.filter(n => !n.read).length
    set({ notifications, unreadCount })
  },

  markAllAsRead: (userId: string) => {
    NotificationService.markAllAsRead(userId)
    const current = get()
    const notifications = current.notifications.map(n => ({ ...n, read: true }))
    set({ notifications, unreadCount: 0 })
  },

  deleteNotification: (notificationId: string) => {
    NotificationService.deleteNotification(notificationId)
    const current = get()
    const notifications = current.notifications.filter(n => n.id !== notificationId)
    set({ notifications })
  },
}))
