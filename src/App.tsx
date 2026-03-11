import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Features />
      <Footer />
      <Analytics />
    </>
  )
}
