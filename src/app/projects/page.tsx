'use client'

import { useAuthStore, useWorkspaceStore, useProjectStore } from '@store/index'
import { Card, CardTitle, Button } from '@components/ui'
import { useEffect, useState } from 'react'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import Link from 'next/link'
import { Modal } from '@components/ui/modal'
import { Input } from '@components/ui'

export default function ProjectsPage() {
  const user = useAuthStore(state => state.user)
  const currentWorkspace = useWorkspaceStore(state => state.currentWorkspace)
  const projects = useProjectStore(state => state.projects)
  const createProject = useProjectStore(state => state.createProject)
  const deleteProject = useProjectStore(state => state.deleteProject)
  const fetchProjects = useProjectStore(state => state.fetchProjects)

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projectDesc, setProjectDesc] = useState('')

  useEffect(() => {
    if (currentWorkspace?.id) {
      fetchProjects(currentWorkspace.id)
    }
  }, [currentWorkspace?.id, fetchProjects])

  const handleCreateProject = () => {
    if (projectName && currentWorkspace && user?.id) {
      createProject(currentWorkspace.id, projectName, projectDesc, user.id)
      setProjectName('')
      setProjectDesc('')
      setIsCreateModalOpen(false)
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-primary">Projects</h1>
          <p className="text-dark-secondary mt-1">Manage your projects and tasks</p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          variant="primary"
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <Card>
          <div className="py-12 text-center">
            <p className="text-dark-secondary mb-4">No projects yet</p>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              variant="primary"
            >
              Create your first project
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card isClickable className="h-full flex flex-col">
                <div className="flex-1">
                  <CardTitle className="mb-2">{project.name}</CardTitle>
                  <p className="text-sm text-dark-secondary mb-4 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-dark-secondary">Progress</span>
                      <span className="text-sm font-semibold text-primary">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Status and Members */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-1 rounded-full bg-primary/20 text-primary">
                      {project.status}
                    </span>
                    <span className="text-dark-secondary">
                      {project.members.length} members
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}

          {/* Add New Project Card */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="rounded-2xl border-2 border-dashed border-dark-700 p-6 text-center transition-all hover:border-primary hover:bg-dark-tertiary/50"
          >
            <Plus className="mx-auto mb-2 h-8 w-8 text-dark-secondary" />
            <p className="font-semibold text-dark-primary">New Project</p>
          </button>
        </div>
      )}

      {/* Create Project Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Project"
      >
        <div className="space-y-4">
          <Input
            placeholder="Project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <Input
            placeholder="Description (optional)"
            value={projectDesc}
            onChange={(e) => setProjectDesc(e.target.value)}
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
              onClick={handleCreateProject}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
