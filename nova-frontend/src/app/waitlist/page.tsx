import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { WaitlistForm } from '@/components/waitlist/WaitlistForm'
import { SectionLabel } from '@/components/ui/SectionLabel'

export const metadata = {
  title: 'Join the Waitlist — Nova',
  description: 'Reserve your place for early access to Nova.',
}

export default function WaitlistPage() {
  return (
    <>
      <Nav />
      <main>
        <section
          aria-label="Waitlist registration"
          className="min-h-[calc(100dvh-64px)] flex items-center justify-center px-6 sm:px-10 py-32"
        >
          <div className="w-full max-w-xl mx-auto text-center">
            <div className="mb-5">
              <SectionLabel>Early Access</SectionLabel>
            </div>

            <h1 className="type-display text-[var(--ink)] tracking-tight mb-6">
              Reserve your Nova.
            </h1>

            <p className="type-body text-[var(--ink-secondary)] max-w-md mx-auto mb-12 leading-relaxed">
              Initial production is limited. Signups are processed in order
              of registration — early positions receive a preferential
              allotment window before general availability.
            </p>

            <WaitlistForm variant="full" />

            <p className="mt-8 text-xs text-[var(--ink-tertiary)] max-w-xs mx-auto leading-relaxed">
              No spam. One email when your spot is confirmed. Unsubscribe
              any time.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
