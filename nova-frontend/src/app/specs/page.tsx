import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { SpecTable } from '@/components/specs/SpecTable'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SPEC_SECTIONS } from '@/lib/specs'
import { DownloadSpecSheet } from '@/components/specs/DownloadSpecSheet'

export const metadata = {
  title: 'Specs — Nova',
  description: 'Full technical specifications for Nova.',
}

export default function SpecsPage() {
  return (
    <>
      <Nav />
      <main>
        <section
          aria-label="Full specifications"
          className="pt-32 pb-24 sm:pt-40 sm:pb-32 px-6 sm:px-10 lg:px-16 max-w-[1080px] mx-auto"
        >
          <header className="mb-14 sm:mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="mb-4">
                <SectionLabel>Technical Specifications</SectionLabel>
              </div>
              <h1 className="type-display text-[var(--ink)] tracking-tight max-w-[480px]">
                Every number<br />that matters.
              </h1>
            </div>
            <DownloadSpecSheet />
          </header>

          <SpecTable sections={SPEC_SECTIONS} />
        </section>
      </main>
      <Footer />
    </>
  )
}
