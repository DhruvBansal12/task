'use client'

import { useAuthStore, useWorkspaceStore, useTaskStore } from '@store/index'
import { Card, CardTitle } from '@components/ui'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function CalendarPage() {
  const currentWorkspace = useWorkspaceStore(state => state.currentWorkspace)
  const tasks = useTaskStore(state => state.tasks)
  const fetchWorkspaceTasks = useTaskStore(state => state.fetchWorkspaceTasks)

  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    if (currentWorkspace?.id) {
      fetchWorkspaceTasks(currentWorkspace.id)
    }
  }, [currentWorkspace?.id, fetchWorkspaceTasks])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getTasksForDay = (day: number) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false
      const taskDate = new Date(task.dueDate)
      return (
        taskDate.getFullYear() === currentDate.getFullYear() &&
        taskDate.getMonth() === currentDate.getMonth() &&
        taskDate.getDate() === day
      )
    })
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-dark-primary">Calendar</h1>
      </div>

      {/* Calendar */}
      <Card>
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() =>
              setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
            }
            className="p-2 hover:bg-dark-tertiary rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <h2 className="text-2xl font-bold text-dark-primary">{monthName}</h2>

          <button
            onClick={() =>
              setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
            }
            className="p-2 hover:bg-dark-tertiary rounded-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold text-dark-secondary text-sm py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="aspect-square rounded-lg bg-dark-tertiary/30"
            />
          ))}

          {/* Days of month */}
          {days.map(day => {
            const dayTasks = getTasksForDay(day)
            const isToday =
              day === new Date().getDate() &&
              currentDate.getMonth() === new Date().getMonth() &&
              currentDate.getFullYear() === new Date().getFullYear()

            return (
              <div
                key={day}
                className={`aspect-square rounded-lg p-2 border-2 transition-all cursor-pointer ${
                  isToday
                    ? 'border-primary bg-primary/10'
                    : 'border-dark-700 bg-dark-tertiary/50 hover:border-primary'
                }`}
              >
                <div className="text-sm font-semibold text-dark-primary mb-1">{day}</div>
                <div className="space-y-0.5">
                  {dayTasks.slice(0, 2).map(task => (
                    <div
                      key={task.id}
                      className="text-xs bg-primary/20 text-primary px-1 py-0.5 rounded truncate"
                    >
                      {task.title}
                    </div>
                  ))}
                  {dayTasks.length > 2 && (
                    <div className="text-xs text-dark-secondary px-1">
                      +{dayTasks.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Upcoming tasks */}
      <Card>
        <CardTitle className="mb-4">Upcoming Tasks</CardTitle>
        <div className="space-y-3">
          {tasks
            .filter(
              task =>
                task.dueDate &&
                new Date(task.dueDate) >= new Date() &&
                task.status !== 'completed'
            )
            .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
            .slice(0, 10)
            .map(task => (
              <div
                key={task.id}
                className="p-3 rounded-lg border border-dark-700 bg-dark-tertiary/50 flex items-start justify-between"
              >
                <div className="flex-1">
                  <p className="font-medium text-dark-primary">{task.title}</p>
                  <p className="text-sm text-dark-secondary">
                    {new Date(task.dueDate!).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
                  {task.status}
                </span>
              </div>
            ))}
        </div>
      </Card>
    </div>
  )
}
