'use client'

import { useAuthStore, useWorkspaceStore, useTaskStore, useProjectStore } from '@store/index'
import { Card, CardTitle, Button, Input } from '@components/ui'
import { useEffect, useState } from 'react'
import { Plus, GripHorizontal } from 'lucide-react'
import Link from 'next/link'
import { TaskStatus } from '@types/index'
import { STATUS_COLORS } from '@constants/index'
import { Modal } from '@components/ui/modal'

const STATUSES: TaskStatus[] = ['todo', 'in-progress', 'review', 'completed']

export default function KanbanPage() {
  const user = useAuthStore(state => state.user)
  const currentWorkspace = useWorkspaceStore(state => state.currentWorkspace)
  const projects = useProjectStore(state => state.projects)
  const tasks = useTaskStore(state => state.tasks)
  const createTask = useTaskStore(state => state.createTask)
  const updateTask = useTaskStore(state => state.updateTask)
  const fetchWorkspaceTasks = useTaskStore(state => state.fetchWorkspaceTasks)

  const [selectedProject, setSelectedProject] = useState<string>('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [taskTitle, setTaskTitle] = useState('')
  const [taskStatus, setTaskStatus] = useState<TaskStatus>('todo')

  useEffect(() => {
    if (currentWorkspace?.id) {
      fetchWorkspaceTasks(currentWorkspace.id)
      if (projects.length > 0 && !selectedProject) {
        setSelectedProject(projects[0].id)
      }
    }
  }, [currentWorkspace?.id, fetchWorkspaceTasks, projects])

  const projectTasks = selectedProject
    ? tasks.filter(t => t.projectId === selectedProject)
    : []

  const handleCreateTask = (status: TaskStatus) => {
    if (taskTitle && selectedProject && currentWorkspace && user?.id) {
      createTask(selectedProject, currentWorkspace.id, taskTitle, '', 'medium', undefined, undefined)
      setTaskTitle('')
      setIsCreateModalOpen(false)
      setTaskStatus('todo')
    }
  }

  const getTasksByStatus = (status: TaskStatus) => {
    return projectTasks.filter(t => t.status === status)
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-primary">Kanban Board</h1>
          <p className="text-dark-secondary mt-1">Manage tasks with drag and drop</p>
        </div>

        {/* Project Selector */}
        {projects.length > 0 && (
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-4 py-2 rounded-lg border border-dark-700 bg-dark-secondary text-dark-primary"
          >
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        )}
      </div>

      {/* Kanban Board */}
      {projects.length === 0 ? (
        <Card>
          <div className="py-12 text-center">
            <p className="text-dark-secondary mb-4">No projects yet</p>
            <Link href="/projects/new">
              <Button variant="primary">Create a project first</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-cols-max">
          {STATUSES.map(status => (
            <div
              key={status}
              className="min-w-80 bg-dark-secondary/30 rounded-2xl p-4 border border-dark-700"
            >
              {/* Column Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: STATUS_COLORS[status] }}
                  />
                  <h3 className="font-semibold text-dark-primary capitalize">
                    {status.replace('-', ' ')}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-dark-700 text-dark-secondary">
                    {getTasksByStatus(status).length}
                  </span>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="text-dark-secondary hover:text-primary transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Tasks */}
              <div className="space-y-3 min-h-96">
                {getTasksByStatus(status).map(task => (
                  <Link key={task.id} href={`/projects/${task.projectId}/tasks/${task.id}`}>
                    <div className="p-3 rounded-lg bg-dark-tertiary border border-dark-700 cursor-grab hover:border-primary transition-all group">
                      <div className="flex items-start gap-2">
                        <GripHorizontal
                          size={16}
                          className="text-dark-tertiary group-hover:text-primary mt-0.5 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-dark-primary text-sm line-clamp-2">
                            {task.title}
                          </p>
                          {task.dueDate && (
                            <p className="text-xs text-dark-secondary mt-1">
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      {task.assignee && (
                        <div className="mt-2 text-xs text-dark-secondary">
                          Assigned
                        </div>
                      )}
                    </div>
                  </Link>
                ))}

                {/* Add Task Button */}
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-full py-2 rounded-lg border border-dashed border-dark-700 text-dark-secondary hover:border-primary hover:text-primary transition-all text-sm"
                >
                  <Plus size={16} className="inline mr-1" />
                  Add task
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Task Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false)
          setTaskTitle('')
        }}
        title="Create New Task"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-primary mb-2">
              Task Title
            </label>
            <Input
              placeholder="Enter task title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-primary mb-2">
              Status
            </label>
            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value as TaskStatus)}
              className="w-full px-4 py-2 rounded-lg border border-dark-700 bg-dark-secondary text-dark-primary"
            >
              {STATUSES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => handleCreateTask(taskStatus)}
              disabled={!taskTitle}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
