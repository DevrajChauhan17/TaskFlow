"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to transform your productivity?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who have already revolutionized their workflow with TaskFlow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3"
              onClick={() => {
                window.location.href = "/auth/signup"
              }}
            >
              Start Your Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 bg-transparent"
              onClick={() => {
                window.location.href = "/demo"
              }}
            >
              Watch Demo
            </Button>
          </div>
          <p className="text-blue-200 text-sm mt-4">No credit card required • 14-day free trial • Cancel anytime</p>
        </motion.div>
      </div>
    </section>
  )
}
