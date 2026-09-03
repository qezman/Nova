import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  )
}
