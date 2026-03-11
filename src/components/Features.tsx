import { useEffect, useRef } from 'react'

const features = [
  {
    num: '01',
    title: 'From people who know the place',
    body: 'Real people sharing where they went and what they\'d do differently. Locals and fellow travelers drop tips in the comments. No algorithms, no bots.',
  },
  {
    num: '02',
    title: "The stuff you can't Google",
    body: "The shortcut a local dropped in the comments. The spot someone flagged because it already closed. The things you'd never find any other way.",
  },
  {
    num: '03',
    title: 'A feed of real trips',
    body: 'Browse itineraries from people who\'ve been where you\'re going. Save the ones that catch your eye. Share your own when you get back from a trip.',
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
