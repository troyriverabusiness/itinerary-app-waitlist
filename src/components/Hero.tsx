import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { useWaitlist } from '@/hooks/useWaitlist'

const WAITLIST_COUNT = 847

export function Hero() {
  const [email, setEmail] = useState('')
  const [validationError, setValidationError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { loading, success, error: apiError, subscribe } = useWaitlist()

  async function handleJoin() {
    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes('@')) {
      setValidationError(true)
      setTimeout(() => setValidationError(false), 1400)
      return
    }
    await subscribe(trimmed)
  }

  return (
    <div className="dark">
      <AuroraBackground className="!bg-[#090806] items-center overflow-hidden">

        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          className="hero-content"
        >
          <span className="eyebrow">Written by those who were there</span>
          <h1 className="hero-h1">
            Plans made<br />by people<br />who <em>went.</em>
          </h1>
          <p className="subtitle">
            Itineraries written by real travelers — not curated, not generated.
            The kind of detail you only know if you actually went.
          </p>

          <div className="form-wrap">
            <label className="form-label" htmlFor="email">Reserve your place</label>

            {!success ? (
              <>
                <div className={`form-row${validationError ? ' error' : ''}`}>
                  <input
                    ref={inputRef}
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    value={email}
                    disabled={loading}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleJoin()}
                  />
                  <button onClick={handleJoin} disabled={loading}>
                    {loading ? '…' : 'Join →'}
                  </button>
                </div>
                {apiError ? (
                  <p className="form-note error-msg">{apiError}</p>
                ) : (
                  <p className="form-note">
                    <span className="count">{WAITLIST_COUNT}</span> travelers on the waitlist · iOS first · free forever
                  </p>
                )}
              </>
            ) : (
              <p className="success-msg">✓ You're in. We'll write when it's ready.</p>
            )}
          </div>
        </motion.div>

        <div className="scroll-cue">
          <div className="scroll-line" />
          <span className="scroll-text">Scroll</span>
        </div>
      </AuroraBackground>
    </div>
  )
}
