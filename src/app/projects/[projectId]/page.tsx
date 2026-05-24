'use client'

import { useParams } from 'next/navigation'
import { useProjectStore, useTaskStore, useAuthStore } from '@store/index'
import { Card, CardTitle, Button, Input } from '@components/ui'
import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Modal } from '@components/ui/modal'
import { TaskStatus } from '@types/index'

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.projectId as string

  const user = useAuthStore(state => state.user)
  const projects = useProjectStore(state => state.projects)
  const updateProject = useProjectStore(state => state.updateProject)
  const deleteProject = useProjectStore(state => state.deleteProject)

  const tasks = useTaskStore(state => state.tasks)
  const createTask = useTaskStore(state => state.createTask)
  const deleteTask = useTaskStore(state => state.deleteTask)
  const fetchWorkspaceTasks = useTaskStore(state => state.fetchWorkspaceTasks)

  const project = projects.find(p => p.id === projectId)
  const projectTasks = tasks.filter(t => t.projectId === projectId)

  const [isEditing, setIsEditing] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [projectName, setProjectName] = useState(project?.name || '')
  const [projectDesc, setProjectDesc] = useState(project?.description || '')
  const [taskTitle, setTaskTitle] = useState('')

  const handleSaveProject = () => {
    if (project && projectName) {
      updateProject(project.id, {
        name: projectName,
        description: projectDesc,
      })
      setIsEditing(false)
    }
  }

  const handleDeleteProject = () => {
    if (project && confirm('Delete this project and all tasks?')) {
      deleteProject(project.id)
    }
  }

  const handleCreateTask = () => {
    if (taskTitle && project && user?.id) {
      createTask(project.id, project.workspaceId, taskTitle)
      setTaskTitle('')
      setIsCreateModalOpen(false)
    }
  }

  if (!project) {
    return (
      <div className="p-6 md:p-8">
        <Link href="/projects">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft size={18} className="mr-2" />
            Back to Projects
          </Button>
        </Link>
        <Card>
          <p className="text-center text-dark-secondary py-8">Project not found</p>
        </Card>
      </div>
    )
  }

  const tasksByStatus = (status: TaskStatus) =>
    projectTasks.filter(t => t.status === status).length

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <Link href="/projects">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft size={18} className="mr-2" />
          Back to Projects
        </Button>
      </Link>

      {/* Project Card */}
      <Card className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            {isEditing ? (
              <>
                <Input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="mb-4 text-2xl font-bold"
                />
              </>
            ) : (
              <h1 className="text-3xl font-bold text-dark-primary mb-2">{projectName}</h1>
            )}

            {isEditing ? (
              <textarea
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-dark-700 bg-dark-secondary text-dark-primary outline-none focus:border-primary mb-4"
                rows={3}
              />
            ) : (
              <p className="text-dark-secondary">{projectDesc}</p>
            )}
          </div>

          <div className="flex gap-2 ml-4">
            {isEditing ? (
              <>
                <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleSaveProject}>
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setProjectName(project.name)
                    setProjectDesc(project.description || '')
                    setIsEditing(true)
                  }}
                  className="flex items-center gap-2"
                >
                  <Edit2 size={16} />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleDeleteProject}
                  className="flex items-center gap-2"
                >
                  <Trash2 size={16} />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 border-t border-dark-700 pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-dark-secondary">Progress</span>
            <span className="text-sm font-semibold text-primary">{project.progress}%</span>
          </div>
          <div className="w-full h-3 bg-dark-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-4 gap-4 border-t border-dark-700 pt-6">
          {['todo', 'in-progress', 'review', 'completed'].map(status => (
            <div key={status} className="text-center">
              <p className="text-2xl font-bold text-primary">
                {tasksByStatus(status as TaskStatus)}
              </p>
              <p className="text-xs text-dark-secondary capitalize">{status.replace('-', ' ')}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Tasks Section */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <CardTitle>Tasks ({projectTasks.length})</CardTitle>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            variant="primary"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Add Task
          </Button>
        </div>

        {projectTasks.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-dark-secondary mb-4">No tasks yet</p>
            <Button onClick={() => setIsCreateModalOpen(true)} variant="primary">
              Create first task
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {projectTasks.map(task => (
              <Link key={task.id} href={`/projects/${projectId}/tasks/${task.id}`}>
                <div className="p-4 rounded-lg border border-dark-700 bg-dark-tertiary/50 hover:border-primary transition-all cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-dark-primary">{task.title}</p>
                      <p className="text-sm text-dark-secondary mt-1">{task.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <span
                        className="px-2 py-1 rounded text-xs font-medium capitalize"
                        style={{
                          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}20`,
                        }}
                      >
                        {task.status}
                      </span>
                      <span
                        className="px-2 py-1 rounded text-xs font-medium capitalize"
                        style={{
                          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}20`,
                        }}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  {task.dueDate && (
                    <p className="text-xs text-dark-secondary mt-2">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>

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
          <Input
            placeholder="Task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            autoFocus
          />

          <div className="flex gap-3 justify-end pt-4">
            <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateTask}
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
