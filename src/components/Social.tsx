import { useWaitlistCount } from "../hooks/useWaitlistCount";

const avatars = [
  { letter: 'M', bg: '#5C3D28' },
  { letter: 'J', bg: '#3D5240' },
  { letter: 'K', bg: '#4A3C5C' },
  { letter: 'S', bg: '#5C4A3A' },
  { letter: 'R', bg: '#3A4E48' },
]

export function Social() {
  const count = useWaitlistCount();
  const label = count !== null ? `${count.toLocaleString()} travelers` : "travelers";

  return (
    <div className="social">
      <div className="avatars">
        {avatars.map(a => (
          <div key={a.letter} className="avatar" style={{ background: a.bg }}>
            {a.letter}
          </div>
        ))}
      </div>
      <span className="social-label">Waitlist</span>
      <div className="social-sep" />
      <span className="social-text">
        <strong>{label}</strong> waiting for early access — growing daily
      </span>
    </div>
  )
}
