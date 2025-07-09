"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Plus, Settings, Users, CheckSquare } from "lucide-react"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
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

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <header className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold text-black dark:text-white">TaskFlow</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-neutral-600 dark:text-neutral-300">
                Welcome, {user?.user_metadata?.full_name || user?.email}
              </span>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-neutral-600 dark:text-neutral-300">
            Welcome to your TaskFlow workspace. Get started by creating your first calendar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-2">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>My Calendars</CardTitle>
              <CardDescription>View and manage all your calendars</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => router.push("/calendar")}>
                <Plus className="w-4 h-4 mr-2" />
                View Calendar
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-2">
                <CheckSquare className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription>View and manage your personal tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/tasks")}>
                View Tasks
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Team Collaboration</CardTitle>
              <CardDescription>Invite team members and share calendars</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                Invite Members
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-2">
                <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Customize your workspace preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                Configure
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Follow these steps to set up your NotionCal workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <span className="text-neutral-700 dark:text-neutral-300">Create your first calendar</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-neutral-300 text-neutral-600 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <span className="text-neutral-500">Add your first event or task</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-neutral-300 text-neutral-600 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <span className="text-neutral-500">Invite team members to collaborate</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
