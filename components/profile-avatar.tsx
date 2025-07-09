"use client"

import { useRouter } from "next/navigation"

interface ProfileAvatarProps {
  user: any
  size?: "sm" | "md" | "lg"
}

export function ProfileAvatar({ user, size = "md" }: ProfileAvatarProps) {
  const router = useRouter()

  const sizeClasses = {
    sm: "size-8",
    md: "size-10",
    lg: "size-12",
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <button
      className={`bg-gradient-to-br from-blue-600 to-purple-600 rounded-full ${sizeClasses[size]} flex items-center justify-center hover:ring-2 hover:ring-blue-400 transition-all cursor-pointer`}
      onClick={() => router.push("/settings")}
      title="Open Settings"
    >
      <span className={`text-white font-bold ${textSizeClasses[size]}`}>
        {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "U"}
      </span>
    </button>
  )
}
