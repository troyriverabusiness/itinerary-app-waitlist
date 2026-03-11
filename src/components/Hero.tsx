import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { TextLoop } from '@/components/ui/text-loop'
import { useWaitlist } from '@/hooks/useWaitlist'
import { useWaitlistCount } from '@/hooks/useWaitlistCount'

export function Hero() {
  const [email, setEmail] = useState('')
  const [validationError, setValidationError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { loading, success, error: apiError, subscribe } = useWaitlist()
  const count = useWaitlistCount();

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
          <div className="eyebrow">
            <TextLoop interval={2} transition={{ duration: 0.3 }}>
              {["...", "eat", "travel", "club"].map((text) => (
                <span key={text}>{text}</span>
              ))}
            </TextLoop>
            {" like a local"}
          </div>
          <h1 className="hero-h1">
            Go anywhere<br />like you<br />live there.
          </h1>
          <p className="subtitle">
            Written by people who actually know the place.
            The local tips you'd normally only hear from a friend who's been there.
          </p>

          <div className="form-wrap">
            <label className="form-label" htmlFor="email">Get early access</label>

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
                    <span className="count">{count}</span> travelers on the waitlist · iOS first
                  </p>
                )}
              </>
            ) : (
              <p className="success-msg">✓ You're in. We'll email you when we launch.</p>
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
