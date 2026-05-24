import { UserService } from './user.service'
import { WorkspaceService } from './workspace.service'
import { ProjectService } from './project.service'
import { TaskService } from './task.service'
import { storage } from './storage.service'

const INIT_KEY = 'goodday:initialized'

export async function initializeDemoData() {
  // Check if already initialized
  const initialized = storage.getItem<boolean>(INIT_KEY)
  if (initialized) return

  // Create demo users
  const john = UserService.createUser('john@example.com', 'John Doe', 'password')
  const jane = UserService.createUser('jane@example.com', 'Jane Smith', 'password')
  const bob = UserService.createUser('bob@example.com', 'Bob Johnson', 'password')

  // Create demo workspaces
  const workspace1 = WorkspaceService.createWorkspace(
    'Product Development',
    'Main product development workspace',
    john.id,
    '🚀',
    '#6C63FF'
  )

  const workspace2 = WorkspaceService.createWorkspace(
    'Marketing',
    'Marketing and growth initiatives',
    jane.id,
    '📱',
    '#00C2FF'
  )

  // Add members to workspace
  WorkspaceService.addMember(workspace1.id, jane.id, 'admin')
  WorkspaceService.addMember(workspace1.id, bob.id, 'member')

  // Create demo projects
  const project1 = ProjectService.createProject(
    workspace1.id,
    'Mobile App Redesign',
    'Complete redesign of the mobile application UI/UX',
    john.id,
    '#6C63FF'
  )
  ProjectService.updateProgress(project1.id, 65)

  const project2 = ProjectService.createProject(
    workspace1.id,
    'API Integration',
    'Integrate third-party APIs for enhanced functionality',
    jane.id,
    '#00C2FF'
  )
  ProjectService.updateProgress(project2.id, 40)

  const project3 = ProjectService.createProject(
    workspace1.id,
    'Performance Optimization',
    'Improve app performance and load times',
    bob.id,
    '#FFD93D'
  )
  ProjectService.updateProgress(project3.id, 25)

  // Create demo tasks
  const dueDate1 = new Date()
  dueDate1.setDate(dueDate1.getDate() + 5)
  const task1 = TaskService.createTask(
    project1.id,
    workspace1.id,
    'Design mobile app mockups',
    'Create high-fidelity mockups for iOS and Android',
    'high',
    dueDate1.toISOString(),
    jane.id
  )
  TaskService.updateStatus(task1.id, 'in-progress')

  const dueDate2 = new Date()
  dueDate2.setDate(dueDate2.getDate() + 3)
  const task2 = TaskService.createTask(
    project1.id,
    workspace1.id,
    'User testing sessions',
    'Conduct user testing to gather feedback',
    'medium',
    dueDate2.toISOString(),
    bob.id
  )
  TaskService.updateStatus(task2.id, 'review')

  const task3 = TaskService.createTask(
    project1.id,
    workspace1.id,
    'Setup design system',
    'Define colors, typography, components',
    'urgent',
    undefined,
    john.id
  )

  const dueDate3 = new Date()
  dueDate3.setDate(dueDate3.getDate() + 2)
  const task4 = TaskService.createTask(
    project2.id,
    workspace1.id,
    'Implement payment gateway',
    'Integrate Stripe payment processing',
    'urgent',
    dueDate3.toISOString(),
    jane.id
  )
  TaskService.updateStatus(task4.id, 'in-progress')

  const task5 = TaskService.createTask(
    project2.id,
    workspace1.id,
    'Set up analytics tracking',
    'Configure Google Analytics and custom events',
    'medium',
    undefined,
    bob.id
  )

  const task6 = TaskService.createTask(
    project3.id,
    workspace1.id,
    'Optimize database queries',
    'Profile and optimize slow database queries',
    'high',
    undefined,
    john.id
  )
  TaskService.updateStatus(task6.id, 'completed')

  const task7 = TaskService.createTask(
    project3.id,
    workspace1.id,
    'Implement caching strategy',
    'Add Redis caching for frequently accessed data',
    'medium',
    undefined,
    jane.id
  )

  // Mark as initialized
  storage.setItem(INIT_KEY, true)

  return { john, jane, bob, workspace1, workspace2, project1, project2, project3 }
}
