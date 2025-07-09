import { TaskFlowHero } from "@/components/ui/task-flow-hero"
import { FeaturesSection } from "@/components/features-section"
import { PricingSection } from "@/components/pricing-section"
import { CTASection } from "@/components/cta-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <TaskFlowHero title="TaskFlow" />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
    </main>
  )
}
