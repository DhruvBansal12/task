'use client'

import { useRouter } from 'next/navigation'
import { Button, Card, CardTitle, Input } from '@components/ui'
import { useAuthStore, useWorkspaceStore } from '@store/index'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'

export default function NewProjectPage() {
  const router = useRouter()
  const user = useAuthStore(state => state.user)
  const currentWorkspace = useWorkspaceStore(state => state.currentWorkspace)
  const createProject = useWorkspaceStore(state => state.createWorkspace)

  const [projectName, setProjectName] = useState('')
  const [projectDesc, setProjectDesc] = useState('')

  const handleCreate = () => {
    if (projectName && currentWorkspace && user?.id) {
      // Note: This should use createProject from useProjectStore
      // For now, redirecting to projects page
      router.push('/projects')
    }
  }

  return (
    <div className="p-6 md:p-8">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-8 flex items-center gap-2"
      >
        <ArrowLeft size={18} />
        Back
      </Button>

      <Card className="max-w-md">
        <CardTitle className="mb-6">Create New Project</CardTitle>

        <div className="space-y-4">
          <Input
            placeholder="Project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            autoFocus
          />

          <Input
            placeholder="Description (optional)"
            value={projectDesc}
            onChange={(e) => setProjectDesc(e.target.value)}
          />

          <div className="flex gap-3 justify-end pt-4">
            <Button variant="ghost" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreate} disabled={!projectName}>
              Create
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
