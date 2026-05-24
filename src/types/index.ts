export type UserRole = 'owner' | 'admin' | 'member' | 'viewer'
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'
export type ProjectStatus = 'active' | 'on-hold' | 'completed' | 'archived'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
  theme: 'dark' | 'light'
}

export interface Workspace {
  id: string
  name: string
  description?: string
  icon?: string
  color?: string
  owner: string
  members: WorkspaceMember[]
  createdAt: string
  updatedAt: string
}

export interface WorkspaceMember {
  userId: string
  role: UserRole
  joinedAt: string
}

export interface Project {
  id: string
  workspaceId: string
  name: string
  description?: string
  status: ProjectStatus
  progress: number
  color?: string
  owner: string
  members: string[]
  createdAt: string
  updatedAt: string
}

export interface Task {
  id: string
  projectId: string
  workspaceId: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  assignee?: string
  dueDate?: string
  createdAt: string
  updatedAt: string
  comments?: Comment[]
  attachments?: Attachment[]
}

export interface Comment {
  id: string
  taskId: string
  userId: string
  content: string
  createdAt: string
  mentions?: string[]
}

export interface Attachment {
  id: string
  taskId: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: string
}

export interface Notification {
  id: string
  userId: string
  type: 'task-assigned' | 'task-commented' | 'due-date' | 'project-activity'
  message: string
  read: boolean
  relatedId?: string
  createdAt: string
}

export interface ActivityLog {
  id: string
  workspaceId: string
  userId: string
  action: string
  entityType: 'task' | 'project' | 'workspace'
  entityId: string
  createdAt: string
}

export interface TeamMember {
  id: string
  workspaceId: string
  userId: string
  role: UserRole
  joinedAt: string
  status: 'active' | 'inactive'
}

export interface DashboardStats {
  totalTasks: number
  completedTasks: number
  inProgressTasks: number
  overdueTasks: number
  totalProjects: number
  teamMembers: number
  completionRate: number
}
