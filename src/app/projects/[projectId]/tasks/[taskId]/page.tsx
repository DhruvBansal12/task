'use client'

import { useParams } from 'next/navigation'
import { useTaskStore, useProjectStore } from '@store/index'
import { Card, CardTitle, Button, Input } from '@components/ui'
import { useEffect, useState } from 'react'
import { ArrowLeft, Edit2, Trash2, MessageSquare, Paperclip } from 'lucide-react'
import Link from 'next/link'
import { TaskStatus, TaskPriority } from '@types/index'
import { TASK_STATUSES, TASK_PRIORITIES, STATUS_COLORS, PRIORITY_COLORS } from '@constants/index'

export default function TaskDetailPage() {
  const params = useParams()
  const taskId = params.taskId as string
  const projectId = params.projectId as string

  const tasks = useTaskStore(state => state.tasks)
  const updateTask = useTaskStore(state => state.updateTask)
  const deleteTask = useTaskStore(state => state.deleteTask)
  const projects = useProjectStore(state => state.projects)

  const task = tasks.find(t => t.id === taskId)
  const project = projects.find(p => p.id === projectId)

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [status, setStatus] = useState<TaskStatus>(task?.status || 'todo')
  const [priority, setPriority] = useState<TaskPriority>(task?.priority || 'medium')
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description || '')
      setStatus(task.status)
      setPriority(task.priority)
    }
  }, [task])

  const handleSave = () => {
    if (task && title) {
      updateTask(task.id, {
        title,
        description,
        status,
        priority,
      })
      setIsEditing(false)
    }
  }

  const handleDelete = () => {
    if (task && confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id)
    }
  }

  const handleAddComment = () => {
    if (task && comment) {
      // Comment functionality would be added here
      setComment('')
    }
  }

  if (!task || !project) {
    return (
      <div className="p-6 md:p-8">
        <Link href="/projects">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft size={18} className="mr-2" />
            Back to Projects
          </Button>
        </Link>
        <Card>
          <p className="text-center text-dark-secondary py-8">Task not found</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      {/* Header */}
      <Link href={`/projects/${projectId}`}>
        <Button variant="ghost" className="mb-8">
          <ArrowLeft size={18} className="mr-2" />
          Back to {project.name}
        </Button>
      </Link>

      {/* Task Card */}
      <Card className="mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-4 text-2xl font-bold"
              />
            ) : (
              <h1 className="text-3xl font-bold text-dark-primary mb-2">{title}</h1>
            )}

            <p className="text-sm text-dark-secondary">
              Project: <span className="text-primary">{project.name}</span>
            </p>
          </div>

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleSave}>
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2"
                >
                  <Edit2 size={16} />
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleDelete}
                  className="flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-dark-700 bg-dark-secondary text-dark-primary outline-none focus:border-primary"
              rows={4}
              placeholder="Add a description..."
            />
          ) : (
            <p className="text-dark-secondary">{description || 'No description'}</p>
          )}
        </div>

        {/* Status and Priority */}
        <div className="grid grid-cols-2 gap-4 mb-6 border-t border-dark-700 pt-6">
          <div>
            <label className="block text-sm text-dark-secondary mb-2">Status</label>
            {isEditing ? (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full px-3 py-2 rounded-lg border border-dark-700 bg-dark-secondary text-dark-primary"
              >
                {TASK_STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            ) : (
              <div
                className="px-3 py-2 rounded-lg w-fit text-sm font-medium capitalize"
                style={{ backgroundColor: `${STATUS_COLORS[status]}20`, color: STATUS_COLORS[status] }}
              >
                {status}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm text-dark-secondary mb-2">Priority</label>
            {isEditing ? (
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 rounded-lg border border-dark-700 bg-dark-secondary text-dark-primary"
              >
                {TASK_PRIORITIES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            ) : (
              <div
                className="px-3 py-2 rounded-lg w-fit text-sm font-medium capitalize"
                style={{ backgroundColor: `${PRIORITY_COLORS[priority]}20`, color: PRIORITY_COLORS[priority] }}
              >
                {priority}
              </div>
            )}
          </div>
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <div className="border-t border-dark-700 pt-6">
            <p className="text-sm text-dark-secondary mb-2">Due Date</p>
            <p className="text-dark-primary font-medium">
              {new Date(task.dueDate).toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        )}
      </Card>

      {/* Comments Section */}
      <Card>
        <CardTitle className="mb-6 flex items-center gap-2">
          <MessageSquare size={20} />
          Comments
        </CardTitle>

        {/* Add Comment */}
        <div className="mb-6 pb-6 border-b border-dark-700">
          <div className="flex gap-3">
            <Input
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              variant="primary"
              onClick={handleAddComment}
              disabled={!comment}
            >
              Post
            </Button>
          </div>
        </div>

        {/* Comments List */}
        {task.comments && task.comments.length > 0 ? (
          <div className="space-y-4">
            {task.comments.map(c => (
              <div key={c.id} className="p-4 rounded-lg bg-dark-tertiary/50 border border-dark-700">
                <p className="font-medium text-dark-primary mb-2">Comment</p>
                <p className="text-dark-secondary">{c.content}</p>
                <p className="text-xs text-dark-tertiary mt-2">
                  {new Date(c.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-dark-secondary py-8">No comments yet</p>
        )}
      </Card>

      {/* Attachments Section */}
      <Card className="mt-6">
        <CardTitle className="mb-6 flex items-center gap-2">
          <Paperclip size={20} />
          Attachments
        </CardTitle>

        {task.attachments && task.attachments.length > 0 ? (
          <div className="space-y-3">
            {task.attachments.map(a => (
              <div
                key={a.id}
                className="p-3 rounded-lg bg-dark-tertiary/50 border border-dark-700 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-dark-primary">{a.name}</p>
                  <p className="text-xs text-dark-secondary">
                    {(a.size / 1024).toFixed(2)} KB • {new Date(a.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="ghost" size="sm">Download</Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Paperclip className="mx-auto mb-2 text-dark-tertiary" size={32} />
            <p className="text-dark-secondary">No attachments</p>
          </div>
        )}
      </Card>
    </div>
  )
}
