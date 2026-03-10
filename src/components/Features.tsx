import { useEffect, useRef } from 'react'

const features = [
  {
    num: '01',
    title: 'Written, not generated',
    body: 'Every itinerary comes from a real traveler. We read each one before it goes live. No filler, ever.',
  },
  {
    num: '02',
    title: "Context you can't Google",
    body: "The place that closed. The hike worth a 5am start. What everyone wishes they'd known before going.",
  },
  {
    num: '03',
    title: 'Yours to reshape',
    body: 'Clone any route, move days around, adjust for your pace. Built to be used, not just saved.',
  },
]

export function Features() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    itemRefs.current.forEach(el => { if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <section className="features">
      {features.map((f, i) => (
        <div
          key={f.num}
          className="feature"
          ref={el => { itemRefs.current[i] = el }}
        >
          <span className="feature-num">{f.num}</span>
          <h3>{f.title}</h3>
          <p>{f.body}</p>
        </div>
      ))}
    </section>
  )
}
