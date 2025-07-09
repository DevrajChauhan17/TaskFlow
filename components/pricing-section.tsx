"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for personal use",
    features: ["Basic calendar views", "Up to 3 calendars", "1GB storage", "Basic templates", "Mobile app access"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Personal",
    price: "$5",
    period: "per month",
    description: "For power users and professionals",
    features: [
      "All calendar views",
      "Unlimited calendars",
      "10GB storage",
      "Advanced templates",
      "File attachments",
      "Notion-style blocks",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Team",
    price: "$10",
    period: "per user/month",
    description: "For teams and collaboration",
    features: [
      "Everything in Personal",
      "Real-time collaboration",
      "Team permissions",
      "Advanced sharing",
      "100GB storage",
      "API access",
      "Admin dashboard",
      "24/7 support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-2xl border ${
                plan.popular
                  ? "border-blue-500 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-neutral-900"
                  : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-neutral-900 dark:text-white">{plan.price}</span>
                  <span className="text-neutral-600 dark:text-neutral-300 ml-1">{plan.period}</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    : ""
                }`}
                variant={plan.popular ? "default" : "outline"}
                onClick={() => {
                  if (plan.name === "Free") {
                    window.location.href = "/auth/signup"
                  } else if (plan.name === "Personal") {
                    window.location.href = "/auth/signup?plan=personal"
                  } else {
                    window.location.href = "/contact"
                  }
                }}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
