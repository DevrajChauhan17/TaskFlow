"use client"

import { useState } from "react"
import { Circle, CheckCircle2, Clock, Flag, User, Calendar, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  priority: "low" | "medium" | "high"
  status: "todo" | "in_progress" | "completed"
  assignee?: string
  createdAt: string
}

interface TaskCardProps {
  task: Task
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void
  onTaskDelete: (taskId: string) => void
}

export function TaskCard({ task, onStatusChange, onTaskDelete }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusIcon = () => {
    switch (task.status) {
      case "completed":
        return <CheckCircle2 className="w-6 h-6 text-green-400" />
      case "in_progress":
        return <Clock className="w-6 h-6 text-blue-400" />
      default:
        return <Circle className="w-6 h-6 text-gray-400" />
    }
  }

  const getPriorityColor = () => {
    switch (task.priority) {
      case "high":
        return "text-red-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const isOverdue = () => {
    if (!task.dueDate || task.status === "completed") return false
    return new Date(task.dueDate) < new Date()
  }

  const handleStatusToggle = () => {
    const statusOrder: Task["status"][] = ["todo", "in_progress", "completed"]
    const currentIndex = statusOrder.indexOf(task.status)
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length]
    onStatusChange(task.id, nextStatus)
  }

  return (
    <div className="flex items-start gap-4 bg-[#141a1f] px-4 py-3 hover:bg-[#1a2128] transition-colors border-l-4 border-l-transparent hover:border-l-[#3f7fbf]">
      <button
        onClick={handleStatusToggle}
        className="flex items-center justify-center rounded-lg bg-[#2b3640] shrink-0 size-12 hover:bg-[#3d4d5c] transition-colors"
      >
        {getStatusIcon()}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3
              className={`text-white text-base font-medium leading-normal cursor-pointer hover:text-blue-400 transition-colors ${
                task.status === "completed" ? "line-through opacity-70" : ""
              }`}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {task.title}
            </h3>

            <div className="flex items-center gap-4 mt-1 text-sm text-[#9dadbe]">
              {task.dueDate && (
                <span className={`flex items-center gap-1 ${isOverdue() ? "text-red-400" : ""}`}>
                  <Calendar className="w-3 h-3" />
                  Due: {formatDate(task.dueDate)}
                  {isOverdue() && <span className="text-red-400 font-medium">(Overdue)</span>}
                </span>
              )}

              <span className={`flex items-center gap-1 ${getPriorityColor()}`}>
                <Flag className="w-3 h-3" />
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>

              {task.assignee && (
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {task.assignee}
                </span>
              )}
            </div>

            {isExpanded && task.description && (
              <p className="text-[#9dadbe] text-sm mt-2 leading-relaxed">{task.description}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onTaskDelete(task.id)}
              className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-1 h-auto"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
