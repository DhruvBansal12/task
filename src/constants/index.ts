export const TASK_STATUSES = ['todo', 'in-progress', 'review', 'completed'] as const

export const TASK_PRIORITIES = ['low', 'medium', 'high', 'urgent'] as const

export const PROJECT_STATUSES = ['active', 'on-hold', 'completed', 'archived'] as const

export const USER_ROLES = ['owner', 'admin', 'member', 'viewer'] as const

export const PRIORITY_COLORS: Record<string, string> = {
  low: '#4ECDC4',
  medium: '#FFD93D',
  high: '#FF6B6B',
  urgent: '#E74C3C',
}

export const STATUS_COLORS: Record<string, string> = {
  'todo': '#A8B2D1',
  'in-progress': '#00C2FF',
  'review': '#FFD93D',
  'completed': '#6BCB77',
}

export const PROJECT_STATUS_COLORS: Record<string, string> = {
  active: '#4ECDC4',
  'on-hold': '#FFD93D',
  completed: '#6BCB77',
  archived: '#868E96',
}

export const SAMPLE_AVATARS = [
  '👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '👨‍🔬', '👩‍🔬', '👨‍🎨', '👩‍🎨',
  '👨‍🚀', '👩‍🚀', '👨‍🏫', '👩‍🏫', '👨‍⚕️', '👩‍⚕️', '👨‍🍳', '👩‍🍳',
]

export const DEMO_USERS = [
  { id: '1', email: 'john@example.com', name: 'John Doe' },
  { id: '2', email: 'jane@example.com', name: 'Jane Smith' },
  { id: '3', email: 'bob@example.com', name: 'Bob Johnson' },
  { id: '4', email: 'alice@example.com', name: 'Alice Williams' },
]

export const PAGINATION_LIMIT = 10

export const ANIMATIONS = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
  },
}

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}
