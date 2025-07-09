"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, Filter } from "lucide-react"
import { TaskFormModal } from "@/components/task-form-modal"
import { TaskCard } from "@/components/task-card"

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

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Create project brief",
    description:
      "Develop a comprehensive project brief outlining goals, scope, and deliverables for the website redesign project.",
    dueDate: "2024-07-15",
    priority: "high",
    status: "todo",
    createdAt: "2024-07-01T10:00:00Z",
  },
  {
    id: "2",
    title: "Conduct competitor analysis",
    description:
      "Research and analyze competitor websites to identify best practices and opportunities for differentiation.",
    dueDate: "2024-07-18",
    priority: "medium",
    status: "todo",
    createdAt: "2024-07-01T11:00:00Z",
  },
  {
    id: "3",
    title: "Design homepage mockups",
    description: "Create initial design mockups for the new homepage layout and user interface.",
    dueDate: "2024-07-20",
    priority: "high",
    status: "in_progress",
    assignee: "Emily",
    createdAt: "2024-07-02T09:00:00Z",
  },
  {
    id: "4",
    title: "Develop content strategy",
    description: "Plan and structure the content architecture for the new website.",
    dueDate: "2024-07-22",
    priority: "medium",
    status: "in_progress",
    assignee: "Ethan",
    createdAt: "2024-07-02T14:00:00Z",
  },
  {
    id: "5",
    title: "Define project scope",
    description: "Clearly define the boundaries and requirements of the website redesign project.",
    dueDate: "2024-07-10",
    priority: "high",
    status: "completed",
    createdAt: "2024-06-28T16:00:00Z",
  },
  {
    id: "6",
    title: "Set project timeline",
    description: "Establish key milestones and deadlines for the project phases.",
    dueDate: "2024-07-12",
    priority: "medium",
    status: "completed",
    createdAt: "2024-06-29T10:00:00Z",
  },
]

export default function TasksPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("Board")
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      } else {
        router.push("/auth/signin")
      }
      setLoading(false)
    }

    getUser()
  }, [supabase, router])

  const handleTaskCreate = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [newTask, ...prev])
  }

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  const handleTaskDelete = (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((task) => task.id !== taskId))
    }
  }

  const getFilteredTasks = () => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPriority = filterPriority === "all" || task.priority === filterPriority
      return matchesSearch && matchesPriority
    })
  }

  const getTasksByStatus = (status: string) => {
    return getFilteredTasks().filter((task) => task.status === status)
  }

  const getTaskStats = () => {
    const filteredTasks = getFilteredTasks()
    return {
      total: filteredTasks.length,
      todo: filteredTasks.filter((t) => t.status === "todo").length,
      inProgress: filteredTasks.filter((t) => t.status === "in_progress").length,
      completed: filteredTasks.filter((t) => t.status === "completed").length,
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#141a1f]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const stats = getTaskStats()

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#141a1f]"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#2b3640] px-10 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-white">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">TaskFlow</h2>
            </div>
            <div className="flex items-center gap-9">
              <button
                className="text-white text-sm font-medium leading-normal hover:text-blue-400 transition-colors"
                onClick={() => router.push("/dashboard")}
              >
                Home
              </button>
              <a className="text-blue-400 text-sm font-medium leading-normal" href="#">
                My Tasks
              </a>
              <button
                className="text-white text-sm font-medium leading-normal hover:text-blue-400 transition-colors"
                onClick={() => router.push("/calendar")}
              >
                Calendar
              </button>
              <a className="text-white text-sm font-medium leading-normal" href="#">
                Team
              </a>
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <label className="flex flex-col min-w-40 !h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                <div className="text-[#9dadbe] flex border-none bg-[#2b3640] items-center justify-center pl-4 rounded-l-xl border-r-0">
                  <Search size={24} />
                </div>
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2b3640] focus:border-none h-full placeholder:text-[#9dadbe] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                />
              </div>
            </label>
            <Button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#2b3640] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
              <Bell size={20} />
            </Button>
            <button
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center hover:ring-2 hover:ring-blue-400 transition-all"
              onClick={() => router.push("/settings")}
            >
              <span className="text-white font-bold text-sm">
                {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "U"}
              </span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Project Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-white tracking-light text-[32px] font-bold leading-tight">My Tasks</p>
                <p className="text-[#9dadbe] text-sm font-normal leading-normal">
                  Manage and track your personal tasks and project assignments.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <TaskFormModal onTaskCreate={handleTaskCreate} />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4 px-4 mb-6">
              <div className="bg-[#2b3640] rounded-lg p-4">
                <div className="text-2xl font-bold text-white">{stats.total}</div>
                <div className="text-[#9dadbe] text-sm">Total Tasks</div>
              </div>
              <div className="bg-[#2b3640] rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">{stats.todo}</div>
                <div className="text-[#9dadbe] text-sm">To Do</div>
              </div>
              <div className="bg-[#2b3640] rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">{stats.inProgress}</div>
                <div className="text-[#9dadbe] text-sm">In Progress</div>
              </div>
              <div className="bg-[#2b3640] rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
                <div className="text-[#9dadbe] text-sm">Completed</div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 px-4 mb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#9dadbe]" />
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="bg-[#2b3640] border border-[#3d4d5c] text-white rounded-md px-3 py-1 text-sm"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="pb-3">
              <div className="flex border-b border-[#3d4d5c] px-4 gap-8">
                {["Board", "List", "Calendar"].map((tab) => (
                  <button
                    key={tab}
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                      activeTab === tab
                        ? "border-b-[#3f7fbf] text-white"
                        : "border-b-transparent text-[#9dadbe] hover:text-white"
                    } transition-colors`}
                    onClick={() => setActiveTab(tab)}
                  >
                    <p
                      className={`text-sm font-bold leading-normal tracking-[0.015em] ${
                        activeTab === tab ? "text-white" : "text-[#9dadbe]"
                      }`}
                    >
                      {tab}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Task Sections */}
            {/* To Do Section */}
            <div className="mb-6">
              <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 flex items-center gap-2">
                To Do
                <span className="bg-[#2b3640] text-[#9dadbe] text-xs px-2 py-1 rounded-full">
                  {getTasksByStatus("todo").length}
                </span>
              </h3>
              <div className="space-y-2">
                {getTasksByStatus("todo").map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onTaskDelete={handleTaskDelete}
                  />
                ))}
                {getTasksByStatus("todo").length === 0 && (
                  <div className="text-[#9dadbe] text-center py-8">No tasks in this section</div>
                )}
              </div>
            </div>

            {/* In Progress Section */}
            <div className="mb-6">
              <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 flex items-center gap-2">
                In Progress
                <span className="bg-[#2b3640] text-[#9dadbe] text-xs px-2 py-1 rounded-full">
                  {getTasksByStatus("in_progress").length}
                </span>
              </h3>
              <div className="space-y-2">
                {getTasksByStatus("in_progress").map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onTaskDelete={handleTaskDelete}
                  />
                ))}
                {getTasksByStatus("in_progress").length === 0 && (
                  <div className="text-[#9dadbe] text-center py-8">No tasks in this section</div>
                )}
              </div>
            </div>

            {/* Completed Section */}
            <div className="mb-6">
              <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 flex items-center gap-2">
                Completed
                <span className="bg-[#2b3640] text-[#9dadbe] text-xs px-2 py-1 rounded-full">
                  {getTasksByStatus("completed").length}
                </span>
              </h3>
              <div className="space-y-2">
                {getTasksByStatus("completed").map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onTaskDelete={handleTaskDelete}
                  />
                ))}
                {getTasksByStatus("completed").length === 0 && (
                  <div className="text-[#9dadbe] text-center py-8">No tasks in this section</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
