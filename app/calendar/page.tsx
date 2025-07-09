"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Search, Bell, Users, FileText, Phone } from "lucide-react"

const DAYS = ["S", "M", "T", "W", "T", "F", "S"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

interface Event {
  id: string
  title: string
  time: string
  icon: any
}

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Team Meeting",
    time: "10:00 AM - 11:00 AM",
    icon: Users,
  },
  {
    id: "2",
    title: "Project Review",
    time: "1:00 PM - 2:00 PM",
    icon: FileText,
  },
  {
    id: "3",
    title: "Client Call",
    time: "3:00 PM - 4:00 PM",
    icon: Phone,
  },
]

export default function CalendarPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(5) // Default selected date
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [showYearSelector, setShowYearSelector] = useState(false)

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

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const renderCalendar = (monthOffset = 0) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, 1)
    const daysInMonth = getDaysInMonth(date)
    const firstDay = getFirstDayOfMonth(date)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 w-full"></div>)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = monthOffset === 0 && day === selectedDate
      days.push(
        <button
          key={day}
          className="h-12 w-full text-white text-sm font-medium leading-normal"
          onClick={() => setSelectedDate(day)}
        >
          <div
            className={`flex size-full items-center justify-center rounded-full ${
              isSelected ? "bg-[#3f7fbf]" : "hover:bg-[#2b3640]"
            }`}
          >
            {day}
          </div>
        </button>,
      )
    }

    return days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showYearSelector) {
        setShowYearSelector(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showYearSelector])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#141a1f]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const currentMonth = MONTHS[currentDate.getMonth()]
  const currentYear = currentDate.getFullYear()
  const nextMonth = MONTHS[(currentDate.getMonth() + 1) % 12]
  const nextYear = currentDate.getMonth() === 11 ? currentYear + 1 : currentYear

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
              <button
                className="text-white text-sm font-medium leading-normal hover:text-blue-400 transition-colors"
                onClick={() => router.push("/tasks")}
              >
                My Tasks
              </button>
              <a className="text-blue-400 text-sm font-medium leading-normal" href="#">
                Calendar
              </a>
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
                  placeholder="Search"
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
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Calendar</p>
            </div>

            {/* Calendar Grid */}
            <div className="flex flex-wrap items-center justify-center gap-6 p-4">
              {/* Current Month */}
              <div className="flex min-w-72 max-w-[336px] flex-1 flex-col gap-0.5">
                <div className="flex items-center p-1 justify-between">
                  <button onClick={() => navigateMonth("prev")}>
                    <div className="text-white flex size-10 items-center justify-center hover:bg-[#2b3640] rounded-full transition-colors">
                      <ChevronLeft size={18} />
                    </div>
                  </button>
                  <div className="relative flex-1 text-center pr-10">
                    <button
                      className="text-white text-base font-bold leading-tight hover:text-blue-400 transition-colors"
                      onClick={() => setShowYearSelector(!showYearSelector)}
                    >
                      {currentMonth} {currentYear}
                    </button>
                    {showYearSelector && (
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-[#2b3640] rounded-lg shadow-lg border border-[#3d4d5c] z-10 max-h-48 overflow-y-auto">
                        {Array.from({ length: 21 }, (_, i) => currentYear - 10 + i).map((year) => (
                          <button
                            key={year}
                            className="block w-full px-4 py-2 text-white hover:bg-[#3d4d5c] transition-colors text-sm"
                            onClick={() => {
                              setCurrentDate(new Date(year, currentDate.getMonth(), 1))
                              setShowYearSelector(false)
                            }}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-7">
                  {DAYS.map((day, index) => (
                    <p
                      key={index}
                      className="text-white text-[13px] font-bold leading-normal tracking-[0.015em] flex h-12 w-full items-center justify-center pb-0.5"
                    >
                      {day}
                    </p>
                  ))}
                  {renderCalendar(0)}
                </div>
              </div>

              {/* Next Month */}
              <div className="flex min-w-72 max-w-[336px] flex-1 flex-col gap-0.5">
                <div className="flex items-center p-1 justify-between">
                  <p className="text-white text-base font-bold leading-tight flex-1 text-center pl-10">
                    {nextMonth} {nextYear}
                  </p>
                  <button onClick={() => navigateMonth("next")}>
                    <div className="text-white flex size-10 items-center justify-center hover:bg-[#2b3640] rounded-full transition-colors">
                      <ChevronRight size={18} />
                    </div>
                  </button>
                </div>
                <div className="grid grid-cols-7">
                  {DAYS.map((day, index) => (
                    <p
                      key={index}
                      className="text-white text-[13px] font-bold leading-normal tracking-[0.015em] flex h-12 w-full items-center justify-center pb-0.5"
                    >
                      {day}
                    </p>
                  ))}
                  {renderCalendar(1)}
                </div>
              </div>
            </div>

            {/* Selected Day's Events */}
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Selected Day's Events
            </h3>

            {sampleEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 bg-[#141a1f] px-4 min-h-[72px] py-2 hover:bg-[#1a2128] transition-colors cursor-pointer"
              >
                <div className="text-white flex items-center justify-center rounded-lg bg-[#2b3640] shrink-0 size-12">
                  <event.icon size={24} />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-white text-base font-medium leading-normal line-clamp-1">{event.title}</p>
                  <p className="text-[#9dadbe] text-sm font-normal leading-normal line-clamp-2">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
