import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { ScrollReveal } from '@/components/home/ScrollReveal'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ScrollReveal />
      </main>
      <Footer />
    </>
  )
}
