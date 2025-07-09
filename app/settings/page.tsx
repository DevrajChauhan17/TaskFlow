"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, PaintbrushIcon as PaintBrush, Bell, HelpCircle, Plus, Megaphone } from "lucide-react"

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("Account")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    workspaceName: "",
  })
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        setFormData({
          name: user.user_metadata?.full_name || "",
          email: user.email || "",
          password: "",
          workspaceName: "My Workspace",
        })
      } else {
        router.push("/auth/signin")
      }
      setLoading(false)
    }

    getUser()
  }, [supabase, router])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleUpdateProfile = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: formData.name },
      })
      if (error) throw error
      alert("Profile updated successfully!")
    } catch (error) {
      alert("Error updating profile")
    }
  }

  const handleUpdateWorkspace = () => {
    alert("Workspace updated successfully!")
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deletion requested. Please contact support.")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#141a1f]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const menuItems = [
    { id: "Account", icon: User, label: "Account" },
    { id: "Appearance", icon: PaintBrush, label: "Appearance" },
    { id: "Notifications", icon: Bell, label: "Notifications" },
    { id: "Help", icon: HelpCircle, label: "Help & Support" },
  ]

  const bottomMenuItems = [
    { id: "Invite", icon: Plus, label: "Invite team" },
    { id: "Feedback", icon: Megaphone, label: "Feedback" },
  ]

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#141a1f]"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          {/* Sidebar */}
          <div className="layout-content-container flex flex-col w-80">
            <div className="flex h-full min-h-[700px] flex-col justify-between bg-[#141a1f] p-4">
              <div className="flex flex-col gap-4">
                <h1 className="text-white text-base font-medium leading-normal">Settings</h1>
                <div className="flex flex-col gap-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
                        activeSection === item.id ? "bg-[#2b3640]" : "hover:bg-[#2b3640] hover:bg-opacity-50"
                      }`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <item.icon size={24} className="text-white" />
                      <p className="text-white text-sm font-medium leading-normal">{item.label}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                {bottomMenuItems.map((item) => (
                  <button
                    key={item.id}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-[#2b3640] hover:bg-opacity-50 rounded-xl transition-colors"
                    onClick={() => {
                      if (item.id === "Invite") {
                        alert("Invite team feature coming soon!")
                      } else if (item.id === "Feedback") {
                        alert("Feedback feature coming soon!")
                      }
                    }}
                  >
                    <item.icon size={24} className="text-white" />
                    <p className="text-white text-sm font-medium leading-normal">{item.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">{activeSection}</p>
            </div>

            {activeSection === "Account" && (
              <>
                <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                  Profile
                </h3>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <Label className="flex flex-col min-w-40 flex-1">
                    <p className="text-white text-base font-medium leading-normal pb-2">Name</p>
                    <Input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3d4d5c] bg-[#1f262e] focus:border-[#3d4d5c] h-14 placeholder:text-[#9dadbe] p-[15px] text-base font-normal leading-normal"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </Label>
                </div>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <Label className="flex flex-col min-w-40 flex-1">
                    <p className="text-white text-base font-medium leading-normal pb-2">Email</p>
                    <Input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3d4d5c] bg-[#1f262e] focus:border-[#3d4d5c] h-14 placeholder:text-[#9dadbe] p-[15px] text-base font-normal leading-normal"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled
                    />
                  </Label>
                </div>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <Label className="flex flex-col min-w-40 flex-1">
                    <p className="text-white text-base font-medium leading-normal pb-2">Password</p>
                    <Input
                      type="password"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3d4d5c] bg-[#1f262e] focus:border-[#3d4d5c] h-14 placeholder:text-[#9dadbe] p-[15px] text-base font-normal leading-normal"
                      placeholder="Enter new password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                    />
                  </Label>
                </div>
                <div className="flex px-4 py-3 justify-start">
                  <Button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#3f7fbf] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#3f7fbf]/90"
                    onClick={handleUpdateProfile}
                  >
                    <span className="truncate">Update Profile</span>
                  </Button>
                </div>

                <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                  Workspace
                </h3>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <Label className="flex flex-col min-w-40 flex-1">
                    <p className="text-white text-base font-medium leading-normal pb-2">Workspace Name</p>
                    <Input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3d4d5c] bg-[#1f262e] focus:border-[#3d4d5c] h-14 placeholder:text-[#9dadbe] p-[15px] text-base font-normal leading-normal"
                      value={formData.workspaceName}
                      onChange={(e) => handleInputChange("workspaceName", e.target.value)}
                    />
                  </Label>
                </div>
                <div className="flex px-4 py-3 justify-start">
                  <Button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#3f7fbf] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#3f7fbf]/90"
                    onClick={handleUpdateWorkspace}
                  >
                    <span className="truncate">Update Workspace</span>
                  </Button>
                </div>

                <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                  Danger Zone
                </h3>
                <div className="flex px-4 py-3 justify-start">
                  <Button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#2b3640] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-red-600 transition-colors"
                    onClick={handleDeleteAccount}
                  >
                    <span className="truncate">Delete Account</span>
                  </Button>
                </div>
              </>
            )}

            {activeSection === "Appearance" && (
              <div className="px-4 py-6">
                <p className="text-[#9dadbe] text-base">Appearance settings coming soon...</p>
              </div>
            )}

            {activeSection === "Notifications" && (
              <div className="px-4 py-6">
                <p className="text-[#9dadbe] text-base">Notification settings coming soon...</p>
              </div>
            )}

            {activeSection === "Help" && (
              <div className="px-4 py-6">
                <p className="text-[#9dadbe] text-base">Help & Support coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
