"use client"

import { motion } from "framer-motion"
import { Calendar, Database, Users, Clock, FileText, Zap } from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Multiple Calendar Views",
    description: "Day, week, month, year, list, and Kanban board views for maximum flexibility",
  },
  {
    icon: Database,
    title: "Notion-like Databases",
    description: "Link events to structured databases with filtering and sorting capabilities",
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description: "Share calendars, collaborate in real-time, and manage team permissions",
  },
  {
    icon: Clock,
    title: "Smart Scheduling",
    description: "Natural language processing and intelligent time blocking with Pomodoro integration",
  },
  {
    icon: FileText,
    title: "Rich Documentation",
    description: "Embed notes, checklists, and media directly into your calendar events",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "Templates, recurring events, and task dependencies to streamline your process",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
            Everything you need to stay organized
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Powerful features that adapt to your workflow, whether you're managing personal tasks or coordinating with a
            team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">{feature.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
