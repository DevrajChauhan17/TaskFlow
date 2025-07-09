import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export const supabase = createClientComponentClient()

export type Database = {
  public: {
    Tables: {
      calendars: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string | null
          color: string
          user_id: string
          is_shared: boolean
          settings: any
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description?: string | null
          color?: string
          user_id: string
          is_shared?: boolean
          settings?: any
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string | null
          color?: string
          user_id?: string
          is_shared?: boolean
          settings?: any
        }
      }
      events: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string | null
          start_time: string
          end_time: string
          location: string | null
          calendar_id: string
          user_id: string
          recurrence_rule: string | null
          tags: string[]
          status: "confirmed" | "tentative" | "cancelled"
          blocks: any[]
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description?: string | null
          start_time: string
          end_time: string
          location?: string | null
          calendar_id: string
          user_id: string
          recurrence_rule?: string | null
          tags?: string[]
          status?: "confirmed" | "tentative" | "cancelled"
          blocks?: any[]
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string | null
          start_time?: string
          end_time?: string
          location?: string | null
          calendar_id?: string
          user_id?: string
          recurrence_rule?: string | null
          tags?: string[]
          status?: "confirmed" | "tentative" | "cancelled"
          blocks?: any[]
        }
      }
      tasks: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string | null
          due_date: string | null
          priority: "low" | "medium" | "high"
          status: "todo" | "in_progress" | "done"
          calendar_id: string
          user_id: string
          dependencies: string[]
          progress: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description?: string | null
          due_date?: string | null
          priority?: "low" | "medium" | "high"
          status?: "todo" | "in_progress" | "done"
          calendar_id: string
          user_id: string
          dependencies?: string[]
          progress?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string | null
          due_date?: string | null
          priority?: "low" | "medium" | "high"
          status?: "todo" | "in_progress" | "done"
          calendar_id?: string
          user_id?: string
          dependencies?: string[]
          progress?: number
        }
      }
    }
  }
}
