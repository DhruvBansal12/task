'use client'

import { useAuthStore, useWorkspaceStore, useProjectStore, useTaskStore } from '@store/index'
import { Card, CardTitle, CardDescription, Button } from '@components/ui'
import { useEffect, useState } from 'react'
import {
  BarChart3,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Plus,
} from 'lucide-react'
import Link from 'next/link'
import { Modal } from '@components/ui/modal'
import { Input } from '@components/ui'

export default function DashboardPage() {
  const user = useAuthStore(state => state.user)
  const workspaces = useWorkspaceStore(state => state.workspaces)
  const createWorkspace = useWorkspaceStore(state => state.createWorkspace)
  const setCurrentWorkspace = useWorkspaceStore(state => state.setCurrentWorkspace)
  const currentWorkspace = useWorkspaceStore(state => state.currentWorkspace)
  
  const fetchWorkspaces = useWorkspaceStore(state => state.fetchWorkspaces)
  const projects = useProjectStore(state => state.projects)
  const fetchProjects = useProjectStore(state => state.fetchProjects)
  const tasks = useTaskStore(state => state.tasks)
  const fetchWorkspaceTasks = useTaskStore(state => state.fetchWorkspaceTasks)

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [workspaceName, setWorkspaceName] = useState('')
  const [workspaceDesc, setWorkspaceDesc] = useState('')

  useEffect(() => {
    if (user?.id) {
      fetchWorkspaces(user.id)
    }
  }, [user?.id, fetchWorkspaces])

  useEffect(() => {
    if (!currentWorkspace && workspaces.length > 0) {
      setCurrentWorkspace(workspaces[0])
    }
  }, [workspaces, currentWorkspace, setCurrentWorkspace])

  useEffect(() => {
    if (currentWorkspace?.id) {
      fetchProjects(currentWorkspace.id)
      fetchWorkspaceTasks(currentWorkspace.id)
    }
  }, [currentWorkspace?.id, fetchProjects, fetchWorkspaceTasks])

  const handleCreateWorkspace = () => {
    if (workspaceName && user?.id) {
      createWorkspace(workspaceName, workspaceDesc, user.id)
      setWorkspaceName('')
      setWorkspaceDesc('')
      setIsCreateModalOpen(false)
    }
  }

  // Calculate statistics
  const completedTasks = tasks.filter(t => t.status === 'completed').length
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length
  const overdueTasks = tasks.filter(
    t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed'
  ).length

  const stats = [
    {
      label: 'Total Tasks',
      value: tasks.length,
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle2,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      label: 'Overdue',
      value: overdueTasks,
      icon: AlertCircle,
      color: 'from-red-500 to-pink-500',
    },
  ]

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-dark-primary mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-dark-secondary">
            {currentWorkspace?.name && `Workspace: ${currentWorkspace.name}`}
          </p>
        </div>
        <div className="flex gap-3">
          {workspaces.length === 0 && (
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              variant="primary"
              className="flex items-center gap-2"
            >
              <Plus size={18} />
              Create Workspace
            </Button>
          )}
          {currentWorkspace && (
            <Link href="/projects/new">
              <Button variant="primary" className="flex items-center gap-2">
                <Plus size={18} />
                New Project
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Workspace Selector */}
      {workspaces.length > 1 && (
        <Card>
          <CardTitle className="mb-4">Workspaces</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {workspaces.map(ws => (
              <button
                key={ws.id}
                onClick={() => setCurrentWorkspace(ws)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  currentWorkspace?.id === ws.id
                    ? 'border-primary bg-primary/10'
                    : 'border-dark-700 bg-dark-tertiary hover:border-primary'
                }`}
              >
                <p className="font-semibold text-dark-primary">{ws.name}</p>
                <p className="text-sm text-dark-secondary">{ws.members.length} members</p>
              </button>
            ))}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="p-4 rounded-xl border-2 border-dashed border-dark-700 text-dark-secondary hover:border-primary hover:text-primary transition-all"
            >
              <Plus size={24} className="mx-auto mb-2" />
              <p className="font-semibold">New Workspace</p>
            </button>
          </div>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <Card key={i} isClickable isGlass>
              <div className="flex items-start justify-between">
                <div>
                  <CardDescription className="mb-2">{stat.label}</CardDescription>
                  <p className="text-3xl font-bold text-dark-primary">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-green-400">
                <TrendingUp size={16} />
                <span>+12% from last month</span>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Projects Section */}
      {currentWorkspace && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <CardTitle>Recent Projects</CardTitle>
            <Link href="/projects">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="py-12 text-center">
              <BarChart3 className="mx-auto mb-4 h-12 w-12 text-dark-tertiary" />
              <p className="text-dark-secondary mb-4">No projects yet</p>
              <Link href="/projects/new">
                <Button variant="primary">Create your first project</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.slice(0, 5).map(project => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <div className="p-4 rounded-xl border border-dark-700 bg-dark-tertiary hover:border-primary transition-all group cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-dark-primary group-hover:text-primary">
                          {project.name}
                        </p>
                        <p className="text-sm text-dark-secondary">{project.description}</p>
                      </div>
                      <div className="ml-4">
                        <div className="w-16 h-2 bg-dark-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-dark-secondary mt-1">{project.progress}%</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Recent Tasks */}
      {tasks.length > 0 && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <CardTitle>Recent Tasks</CardTitle>
            <Link href="/projects/kanban">
              <Button variant="ghost" size="sm">View Kanban</Button>
            </Link>
          </div>

          <div className="space-y-3">
            {tasks.slice(0, 5).map(task => (
              <div
                key={task.id}
                className="p-4 rounded-xl border border-dark-700 bg-dark-tertiary hover:border-primary transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-dark-primary">{task.title}</p>
                    <p className="text-sm text-dark-secondary">{task.description}</p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Create Workspace Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Workspace"
      >
        <div className="space-y-4">
          <Input
            placeholder="Workspace name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
          <Input
            placeholder="Description (optional)"
            value={workspaceDesc}
            onChange={(e) => setWorkspaceDesc(e.target.value)}
          />
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="ghost"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateWorkspace}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
