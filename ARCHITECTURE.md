# Architecture & Extension Guide - GoodDay SaaS

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 15 App Router                     │
├─────────────────────────────────────────────────────────────┤
│  Pages (src/app) - Route handlers & UI components           │
├─────────────────────────────────────────────────────────────┤
│  Components (src/components) - Reusable React components    │
├─────────────────────────────────────────────────────────────┤
│  Store (src/store) - Zustand global state management        │
├─────────────────────────────────────────────────────────────┤
│  Services (src/services) - Business logic & data layer      │
├─────────────────────────────────────────────────────────────┤
│  localStorage/IndexedDB - Client-side persistence          │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

```
UI Component
     ↓
Zustand Store (Global State)
     ↓
Service Layer (Business Logic)
     ↓
Storage Service (localStorage/API)
     ↓
Data Persistence
```

## 🛠️ How to Add Features

### Example: Add Team Member Mentions

#### 1. Update Types
```typescript
// src/types/index.ts
export interface Comment {
  id: string
  content: string
  authorId: string
  mentions: string[] // New field
  createdAt: string
}
```

#### 2. Add Service Method
```typescript
// src/services/comment.service.ts
export class CommentService {
  static createComment(
    taskId: string,
    content: string,
    authorId: string,
    mentions: string[] = []
  ) {
    const comment: Comment = {
      id: generateId(),
      content,
      authorId,
      mentions,
      createdAt: new Date().toISOString(),
    }
    // Save to storage
    return comment
  }

  static getMentionedUsers(mentions: string[]) {
    return mentions.map(id => UserService.getById(id)).filter(Boolean)
  }
}
```

#### 3. Add Store (Zustand)
```typescript
// src/store/comment.store.ts
import { create } from 'zustand'
import { CommentService } from '@services/index'

interface CommentStore {
  comments: Comment[]
  createComment: (taskId: string, content: string, mentions: string[]) => void
  deleteComment: (id: string) => void
}

export const useCommentStore = create<CommentStore>(set => ({
  comments: [],
  createComment: (taskId, content, mentions) => {
    const comment = CommentService.createComment(taskId, content, mentions)
    set(state => ({ comments: [...state.comments, comment] }))
  },
  deleteComment: (id) => {
    set(state => ({ comments: state.comments.filter(c => c.id !== id) }))
  }
}))
```

#### 4. Create Component
```typescript
// src/components/comment-mention.tsx
'use client'

import { useState } from 'react'
import { useCommentStore, useUserStore } from '@store/index'
import { Button, Input } from '@components/ui'
import { X } from 'lucide-react'

export function CommentMention() {
  const [content, setContent] = useState('')
  const [mentions, setMentions] = useState<string[]>([])
  const users = useUserStore(state => state.users)
  const createComment = useCommentStore(state => state.createComment)
  const [showMentions, setShowMentions] = useState(false)

  const handleMentionSelect = (userId: string) => {
    setMentions([...mentions, userId])
    setShowMentions(false)
  }

  const handleRemoveMention = (userId: string) => {
    setMentions(mentions.filter(id => id !== userId))
  }

  const handleSubmit = () => {
    createComment('taskId', content, mentions)
    setContent('')
    setMentions([])
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <Input
          placeholder="Type @ to mention someone..."
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
            if (e.target.value.includes('@')) {
              setShowMentions(true)
            }
          }}
        />

        {showMentions && (
          <div className="absolute top-full mt-2 w-full bg-dark-secondary border border-dark-700 rounded-lg shadow-lg">
            {users.map(user => (
              <button
                key={user.id}
                className="w-full text-left px-4 py-2 hover:bg-dark-tertiary transition-colors"
                onClick={() => handleMentionSelect(user.id)}
              >
                @{user.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {mentions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {mentions.map(userId => {
            const user = users.find(u => u.id === userId)
            return (
              <div key={userId} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm flex items-center gap-2">
                @{user?.name}
                <button onClick={() => handleRemoveMention(userId)}>
                  <X size={14} />
                </button>
              </div>
            )
          })}
        </div>
      )}

      <Button onClick={handleSubmit}>Post Comment</Button>
    </div>
  )
}
```

---

## 🗄️ Adding a Backend (MongoDB Example)

### 1. Create API Routes

```typescript
// src/app/api/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@lib/mongodb'
import { Task } from '@models/task'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const tasks = await Task.find({})
    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const data = await request.json()
    const task = await Task.create(data)
    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
```

### 2. Update Service Layer

```typescript
// src/services/task.service.ts - Updated for API
export class TaskService {
  static async createTask(data: CreateTaskInput) {
    // Use API instead of localStorage
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to create task')
    return response.json()
  }

  static async getAllTasks() {
    const response = await fetch('/api/tasks')
    if (!response.ok) throw new Error('Failed to fetch tasks')
    return response.json()
  }

  static async updateTask(id: string, data: UpdateTaskInput) {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to update task')
    return response.json()
  }

  static async deleteTask(id: string) {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete task')
    return response.json()
  }
}
```

### 3. Update Zustand Stores

```typescript
// src/store/task.store.ts - Updated for async
export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isLoading: false,

  fetchTasks: async () => {
    set({ isLoading: true })
    try {
      const tasks = await TaskService.getAllTasks()
      set({ tasks })
    } finally {
      set({ isLoading: false })
    }
  },

  createTask: async (data) => {
    const task = await TaskService.createTask(data)
    set(state => ({ tasks: [...state.tasks, task] }))
    return task
  },

  updateTask: async (id, data) => {
    const updated = await TaskService.updateTask(id, data)
    set(state => ({
      tasks: state.tasks.map(t => (t.id === id ? updated : t)),
    }))
  },

  deleteTask: async (id) => {
    await TaskService.deleteTask(id)
    set(state => ({ tasks: state.tasks.filter(t => t.id !== id) }))
  },
}))
```

---

## 🔐 Adding Authentication (NextAuth)

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Verify credentials against database
        const user = await db.users.findUnique({
          where: { email: credentials?.email },
        })

        if (user && await bcrypt.compare(credentials?.password, user.password)) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      return session
    },
  },
}

export const handler = NextAuth(authOptions)
```

---

## 🚀 Performance Optimization Tips

### 1. Code Splitting
```typescript
import dynamic from 'next/dynamic'

// Load component only when needed
const HeavyComponent = dynamic(() => import('@components/heavy'), {
  loading: () => <div>Loading...</div>,
})
```

### 2. Image Optimization
```typescript
import Image from 'next/image'

<Image
  src="/project.png"
  alt="Project"
  width={400}
  height={300}
  priority // For above-the-fold images
/>
```

### 3. Memoization
```typescript
import { memo } from 'react'

const TaskCard = memo(({ task }) => {
  return <div>{task.title}</div>
})

export default TaskCard
```

---

## 🧪 Testing Structure

```typescript
// src/utils/test-helpers.ts
export function createMockTask(overrides = {}) {
  return {
    id: 'task-1',
    title: 'Test Task',
    description: 'Test description',
    status: 'todo' as TaskStatus,
    ...overrides,
  }
}

// __tests__/services/task.service.test.ts
describe('TaskService', () => {
  it('creates a task', () => {
    const task = TaskService.createTask('Project 1', 'Test Task')
    expect(task.title).toBe('Test Task')
    expect(task.id).toBeDefined()
  })
})
```

---

## 📦 Dependencies to Add

### For Real-time Features
```bash
npm install socket.io-client
npm install @tanstack/react-query
```

### For File Uploads
```bash
npm install next-cloudinary
```

### For Rich Text Editing
```bash
npm install slate slate-react
```

### For PDF Export
```bash
npm install html2pdf.js
```

### For Email
```bash
npm install nodemailer
```

### For Payments (Stripe)
```bash
npm install @stripe/react-js @stripe/js
```

---

## 🎯 Feature Roadmap

### Phase 1 (Current)
- ✅ Authentication
- ✅ Workspaces & Projects
- ✅ Task Management
- ✅ Kanban Board
- ✅ Calendar
- ✅ Analytics

### Phase 2
- [ ] Real-time collaboration
- [ ] File uploads
- [ ] Advanced permissions
- [ ] Integrations (Slack, GitHub, etc.)
- [ ] Email notifications

### Phase 3
- [ ] Mobile app (React Native)
- [ ] AI-powered features
- [ ] Advanced reporting
- [ ] Custom workflows
- [ ] API for third-party apps

---

## 🐛 Debugging Tips

### Enable Debug Logging
```typescript
// src/utils/logger.ts
export const logger = {
  log: (msg: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[GoodDay] ${msg}`, data)
    }
  },
  error: (msg: string, error?: any) => {
    console.error(`[GoodDay ERROR] ${msg}`, error)
  },
}
```

### Use React DevTools
- Install React DevTools browser extension
- Inspect component state
- Trace re-renders

### Use Redux DevTools for Zustand
```typescript
import { subscribeWithSelector, devtools } from 'zustand/middleware'

const useTaskStore = create(
  devtools(
    subscribeWithSelector((set) => ({
      // store implementation
    }))
  )
)
```

---

## 📊 Monitoring & Analytics

```typescript
// src/utils/analytics.ts
export const track = (event: string, data?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    // Send to analytics service
    console.log(`📊 Event: ${event}`, data)
  }
}

// Usage
track('task:created', { projectId: '123', priority: 'high' })
track('user:signed_up', { email: 'user@example.com' })
```

---

**Happy building! Your architecture is flexible and ready for growth! 🚀**
