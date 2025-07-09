"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell } from "lucide-react"
import { useRouter } from "next/navigation"

interface CalendarHeaderProps {
  user: any
  onSignOut: () => void
}

export function CalendarHeader({ user, onSignOut }: CalendarHeaderProps) {
  const router = useRouter()

  return (
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
          <a className="text-white text-sm font-medium leading-normal" href="#">
            My Tasks
          </a>
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
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "U"}
          </span>
        </div>
      </div>
    </header>
  )
}
