import { Workspace, WorkspaceMember, UserRole } from '@types/index'
import { storage } from './storage.service'
import { generateId } from '@utils/helpers'

const WORKSPACES_KEY = 'goodday:workspaces'

export class WorkspaceService {
  /**
   * Create a new workspace
   */
  static createWorkspace(
    name: string,
    description: string,
    owner: string,
    icon?: string,
    color?: string
  ): Workspace {
    const workspace: Workspace = {
      id: generateId(),
      name,
      description,
      icon,
      color,
      owner,
      members: [{ userId: owner, role: 'owner' as UserRole, joinedAt: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const workspaces = this.getAllWorkspaces()
    workspaces.push(workspace)
    storage.setItem(WORKSPACES_KEY, workspaces)

    return workspace
  }

  /**
   * Get all workspaces
   */
  static getAllWorkspaces(): Workspace[] {
    return storage.getItem<Workspace[]>(WORKSPACES_KEY, []) || []
  }

  /**
   * Get workspaces for a user
   */
  static getUserWorkspaces(userId: string): Workspace[] {
    const workspaces = this.getAllWorkspaces()
    return workspaces.filter(
      w => w.owner === userId || w.members.some(m => m.userId === userId)
    )
  }

  /**
   * Get workspace by ID
   */
  static getWorkspaceById(id: string): Workspace | null {
    const workspaces = this.getAllWorkspaces()
    return workspaces.find(w => w.id === id) || null
  }

  /**
   * Update workspace
   */
  static updateWorkspace(id: string, updates: Partial<Workspace>): Workspace | null {
    const workspaces = this.getAllWorkspaces()
    const index = workspaces.findIndex(w => w.id === id)

    if (index === -1) return null

    workspaces[index] = {
      ...workspaces[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    storage.setItem(WORKSPACES_KEY, workspaces)

    return workspaces[index]
  }

  /**
   * Delete workspace
   */
  static deleteWorkspace(id: string): boolean {
    const workspaces = this.getAllWorkspaces()
    const filtered = workspaces.filter(w => w.id !== id)

    if (filtered.length === workspaces.length) return false

    storage.setItem(WORKSPACES_KEY, filtered)
    return true
  }

  /**
   * Add member to workspace
   */
  static addMember(
    workspaceId: string,
    userId: string,
    role: UserRole = 'member'
  ): Workspace | null {
    const workspace = this.getWorkspaceById(workspaceId)
    if (!workspace) return null

    if (workspace.members.some(m => m.userId === userId)) {
      return workspace
    }

    workspace.members.push({
      userId,
      role,
      joinedAt: new Date().toISOString(),
    })

    return this.updateWorkspace(workspaceId, { members: workspace.members })
  }

  /**
   * Remove member from workspace
   */
  static removeMember(workspaceId: string, userId: string): Workspace | null {
    const workspace = this.getWorkspaceById(workspaceId)
    if (!workspace) return null

    workspace.members = workspace.members.filter(m => m.userId !== userId)
    return this.updateWorkspace(workspaceId, { members: workspace.members })
  }

  /**
   * Update member role
   */
  static updateMemberRole(
    workspaceId: string,
    userId: string,
    role: UserRole
  ): Workspace | null {
    const workspace = this.getWorkspaceById(workspaceId)
    if (!workspace) return null

    const member = workspace.members.find(m => m.userId === userId)
    if (!member) return null

    member.role = role
    return this.updateWorkspace(workspaceId, { members: workspace.members })
  }
}
