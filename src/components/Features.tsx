import { useEffect, useRef } from 'react'

const features = [
  {
    num: '01',
    title: 'From people who know the place',
    body: 'Every person who writes for us actually did that trip. We go through each one before it goes up. If it reads like something you could\'ve googled, it doesn\'t make the cut.',
  },
  {
    num: '02',
    title: "The stuff you can't Google",
    body: "The spots that don't show up in any search. Where people who live there actually go. The things you only learn by spending real time somewhere.",
  },
  {
    num: '03',
    title: 'Make it yours',
    body: 'Grab any itinerary and shape it to your trip. Swap days, skip what doesn\'t appeal, add what does. Someone else\'s plan is just your starting point.',
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
