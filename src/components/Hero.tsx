import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { TextLoop } from '@/components/ui/text-loop'
import { useWaitlist } from '@/hooks/useWaitlist'
import { useWaitlistCount } from '@/hooks/useWaitlistCount'

export function Hero() {
  const [email, setEmail] = useState('')
  const [validationError, setValidationError] = useState(false)
  const [showConsent, setShowConsent] = useState(false)
  const [consentChecked, setConsentChecked] = useState(false)
  const [pendingEmail, setPendingEmail] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const checkboxRef = useRef<HTMLInputElement>(null)
  const { loading, success, error: apiError, subscribe } = useWaitlist()
  const count = useWaitlistCount()

  useEffect(() => {
    if (showConsent) checkboxRef.current?.focus()
  }, [showConsent])

  useEffect(() => {
    if (!showConsent) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { setShowConsent(false); setConsentChecked(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showConsent])

  function handleJoin() {
    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes('@')) {
      setValidationError(true)
      setTimeout(() => setValidationError(false), 1400)
      return
    }
    setPendingEmail(trimmed)
    setConsentChecked(false)
    setShowConsent(true)
  }

  async function handleConfirm() {
    if (!consentChecked) return
    setShowConsent(false)
    await subscribe(pendingEmail)
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
          <div className="ios-badge">
            <svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11" aria-hidden="true">
              <path d="M17 2H7C5.9 2 5 2.9 5 4v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H7V6h10v10zm-5 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
            </svg>
            iOS App · Coming Soon
          </div>
          <h1 className="hero-h1">
            <span style={{ color: 'var(--rust-warm)' }}>
              <TextLoop interval={2.5} transition={{ duration: 0.6 }}>
                {["Travel", "Eat", "Explore", "Club"].map((text) => (
                  <span key={text}>{text}</span>
                ))}
              </TextLoop>
            </span>
            {" like a local"}
          </h1>
          <p className="subtitle">
            An app where locals share what's actually worth doing.
            No generic travel lists, just tips from people who live there.
          </p>

          <div className="form-wrap">
            <label className="form-label" htmlFor="email">Join the waitlist</label>

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
                    <span className="count">{count}</span> travelers on the waitlist
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

      {showConsent && (
        <div
          className="consent-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="consent-title"
          onClick={e => { if (e.target === e.currentTarget) { setShowConsent(false); setConsentChecked(false) } }}
        >
          <div className="consent-modal">
            <h2 id="consent-title" className="consent-title">One last thing</h2>

            <label className="consent-check-row">
              <input
                ref={checkboxRef}
                type="checkbox"
                className="consent-checkbox"
                checked={consentChecked}
                onChange={e => setConsentChecked(e.target.checked)}
              />
              <span className="consent-check-label">
                I agree to receive emails from Itin. You can unsubscribe at any time.
              </span>
            </label>

            <div className="consent-actions">
              <button
                className="consent-cancel"
                onClick={() => { setShowConsent(false); setConsentChecked(false) }}
              >
                Cancel
              </button>
              <button
                className={`consent-confirm${consentChecked ? '' : ' disabled'}`}
                onClick={handleConfirm}
                disabled={!consentChecked || loading}
                aria-disabled={!consentChecked}
              >
                {loading ? '…' : 'Confirm & Join →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
