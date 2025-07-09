"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Calendar, Flag, User } from "lucide-react"

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

interface TaskFormModalProps {
  onTaskCreate: (task: Omit<Task, "id" | "createdAt">) => void
}

export function TaskFormModal({ onTaskCreate }: TaskFormModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium" as "low" | "medium" | "high",
    status: "todo" as "todo" | "in_progress" | "completed",
    assignee: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      alert("Please enter a task title")
      return
    }

    onTaskCreate({
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      priority: formData.priority,
      status: formData.status,
      assignee: formData.assignee || undefined,
    })

    // Reset form
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      status: "todo",
      assignee: "",
    })

    setOpen(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#3f7fbf] hover:bg-[#3f7fbf]/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-[#1f262e] border-[#3d4d5c] text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-bold">Create New Task</DialogTitle>
          <DialogDescription className="text-[#9dadbe]">
            Add a new task to your project. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white font-medium">
              Task Title *
            </Label>
            <Input
              id="title"
              placeholder="Enter task title..."
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="bg-[#2b3640] border-[#3d4d5c] text-white placeholder:text-[#9dadbe] focus:border-[#3f7fbf]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter task description..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="bg-[#2b3640] border-[#3d4d5c] text-white placeholder:text-[#9dadbe] focus:border-[#3f7fbf] min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-white font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                className="bg-[#2b3640] border-[#3d4d5c] text-white focus:border-[#3f7fbf]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white font-medium flex items-center gap-2">
                <Flag className="w-4 h-4" />
                Priority
              </Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger className="bg-[#2b3640] border-[#3d4d5c] text-white focus:border-[#3f7fbf]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2b3640] border-[#3d4d5c]">
                  <SelectItem value="low" className="text-white hover:bg-[#3d4d5c]">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                      Low Priority
                    </span>
                  </SelectItem>
                  <SelectItem value="medium" className="text-white hover:bg-[#3d4d5c]">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                      Medium Priority
                    </span>
                  </SelectItem>
                  <SelectItem value="high" className="text-white hover:bg-[#3d4d5c]">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-400"></span>
                      High Priority
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white font-medium">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger className="bg-[#2b3640] border-[#3d4d5c] text-white focus:border-[#3f7fbf]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2b3640] border-[#3d4d5c]">
                  <SelectItem value="todo" className="text-white hover:bg-[#3d4d5c]">
                    To Do
                  </SelectItem>
                  <SelectItem value="in_progress" className="text-white hover:bg-[#3d4d5c]">
                    In Progress
                  </SelectItem>
                  <SelectItem value="completed" className="text-white hover:bg-[#3d4d5c]">
                    Completed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignee" className="text-white font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Assignee
              </Label>
              <Input
                id="assignee"
                placeholder="Assign to..."
                value={formData.assignee}
                onChange={(e) => handleInputChange("assignee", e.target.value)}
                className="bg-[#2b3640] border-[#3d4d5c] text-white placeholder:text-[#9dadbe] focus:border-[#3f7fbf]"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="bg-transparent border-[#3d4d5c] text-white hover:bg-[#2b3640]"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#3f7fbf] hover:bg-[#3f7fbf]/90 text-white">
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
