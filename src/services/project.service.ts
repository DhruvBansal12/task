import { Project, ProjectStatus } from '@types/index'
import { storage } from './storage.service'
import { generateId } from '@utils/helpers'

const PROJECTS_KEY = 'goodday:projects'

export class ProjectService {
  /**
   * Create a new project
   */
  static createProject(
    workspaceId: string,
    name: string,
    description: string,
    owner: string,
    color?: string
  ): Project {
    const project: Project = {
      id: generateId(),
      workspaceId,
      name,
      description,
      status: 'active' as ProjectStatus,
      progress: 0,
      color,
      owner,
      members: [owner],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const projects = this.getAllProjects()
    projects.push(project)
    storage.setItem(PROJECTS_KEY, projects)

    return project
  }

  /**
   * Get all projects
   */
  static getAllProjects(): Project[] {
    return storage.getItem<Project[]>(PROJECTS_KEY, []) || []
  }

  /**
   * Get projects by workspace
   */
  static getWorkspaceProjects(workspaceId: string): Project[] {
    const projects = this.getAllProjects()
    return projects.filter(p => p.workspaceId === workspaceId)
  }

  /**
   * Get project by ID
   */
  static getProjectById(id: string): Project | null {
    const projects = this.getAllProjects()
    return projects.find(p => p.id === id) || null
  }

  /**
   * Update project
   */
  static updateProject(id: string, updates: Partial<Project>): Project | null {
    const projects = this.getAllProjects()
    const index = projects.findIndex(p => p.id === id)

    if (index === -1) return null

    projects[index] = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    storage.setItem(PROJECTS_KEY, projects)

    return projects[index]
  }

  /**
   * Delete project
   */
  static deleteProject(id: string): boolean {
    const projects = this.getAllProjects()
    const filtered = projects.filter(p => p.id !== id)

    if (filtered.length === projects.length) return false

    storage.setItem(PROJECTS_KEY, filtered)
    return true
  }

  /**
   * Add member to project
   */
  static addMember(projectId: string, userId: string): Project | null {
    const project = this.getProjectById(projectId)
    if (!project) return null

    if (!project.members.includes(userId)) {
      project.members.push(userId)
      return this.updateProject(projectId, { members: project.members })
    }

    return project
  }

  /**
   * Remove member from project
   */
  static removeMember(projectId: string, userId: string): Project | null {
    const project = this.getProjectById(projectId)
    if (!project) return null

    project.members = project.members.filter(m => m !== userId)
    return this.updateProject(projectId, { members: project.members })
  }

  /**
   * Update project progress
   */
  static updateProgress(projectId: string, progress: number): Project | null {
    return this.updateProject(projectId, { progress: Math.min(100, Math.max(0, progress)) })
  }
}
