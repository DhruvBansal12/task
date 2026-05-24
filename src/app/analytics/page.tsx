'use client'

import { useAuthStore, useWorkspaceStore, useTaskStore, useProjectStore } from '@store/index'
import { Card, CardTitle } from '@components/ui'
import { useEffect } from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { TASK_STATUSES, PRIORITY_COLORS } from '@constants/index'

export default function AnalyticsPage() {
  const currentWorkspace = useWorkspaceStore(state => state.currentWorkspace)
  const tasks = useTaskStore(state => state.tasks)
  const projects = useProjectStore(state => state.projects)
  const fetchWorkspaceTasks = useTaskStore(state => state.fetchWorkspaceTasks)

  useEffect(() => {
    if (currentWorkspace?.id) {
      fetchWorkspaceTasks(currentWorkspace.id)
    }
  }, [currentWorkspace?.id, fetchWorkspaceTasks])

  // Task status distribution
  const statusData = TASK_STATUSES.map(status => ({
    name: status,
    value: tasks.filter(t => t.status === status).length,
  }))

  // Priority distribution
  const priorityData = ['low', 'medium', 'high', 'urgent'].map(priority => ({
    name: priority,
    value: tasks.filter(t => t.priority === priority).length,
  }))

  // Project progress
  const projectProgressData = projects.map(p => ({
    name: p.name,
    progress: p.progress,
    tasks: tasks.filter(t => t.projectId === p.id).length,
  }))

  // Task completion trend
  const completedTasks = tasks.filter(t => t.status === 'completed').length
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0

  const stats = [
    {
      label: 'Total Tasks',
      value: tasks.length,
      change: '+12%',
    },
    {
      label: 'Completed',
      value: completedTasks,
      change: '+8%',
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      change: '+5%',
    },
    {
      label: 'Active Projects',
      value: projects.filter(p => p.status === 'active').length,
      change: '+2',
    },
  ]

  const COLORS = ['#6C63FF', '#00C2FF', '#FFD93D', '#FF6B6B']

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark-primary">Analytics</h1>
        <p className="text-dark-secondary mt-1">Performance insights and trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} isGlass>
            <p className="text-sm text-dark-secondary mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-dark-primary">{stat.value}</p>
              <p className="text-sm text-green-400">{stat.change}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Status Distribution */}
        <Card>
          <CardTitle className="mb-6">Task Status Distribution</CardTitle>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1e2e',
                    border: '1px solid #252b3b',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {statusData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                  <span className="text-dark-secondary capitalize">{item.name}</span>
                </div>
                <span className="font-semibold text-dark-primary">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Priority Distribution */}
        <Card>
          <CardTitle className="mb-6">Priority Breakdown</CardTitle>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#252b3b" />
                <XAxis dataKey="name" stroke="#7a8194" />
                <YAxis stroke="#7a8194" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1e2e',
                    border: '1px solid #252b3b',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="value" fill="#6C63FF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Project Progress */}
        {projectProgressData.length > 0 && (
          <Card className="lg:col-span-2">
            <CardTitle className="mb-6">Project Progress</CardTitle>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#252b3b" />
                  <XAxis dataKey="name" stroke="#7a8194" />
                  <YAxis stroke="#7a8194" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1e2e',
                      border: '1px solid #252b3b',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="progress" fill="#00C2FF" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="tasks" fill="#FFD93D" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
