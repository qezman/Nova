'use client'

import { useState, type FormEvent, type ChangeEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { submitToWaitlist } from '@/lib/api/waitlist'

interface WaitlistFormProps {
  variant?: 'inline' | 'full'
  className?: string
}

const REGIONS = [
  { value: 'NA', label: 'North America' },
  { value: 'EU', label: 'Europe' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'APAC', label: 'Asia-Pacific' },
  { value: 'OTHER', label: 'Other' },
] as const

export function WaitlistForm({
  variant = 'inline',
  className = '',
}: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [region, setRegion] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const isFull = variant === 'full'

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (status === 'error') {
      setStatus('idle')
      setErrorMessage('')
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = email.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!trimmed || !emailRegex.test(trimmed)) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setStatus('submitting')
    const result = await submitToWaitlist({
      email: trimmed,
      region: region || undefined,
    })

    if (result.ok) {
      setStatus('success')
      setErrorMessage('')
    } else {
      setStatus('error')
      setErrorMessage(result.error ?? 'Could not join waitlist. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className={`text-center py-8 ${className}`}>
        <h3 className="type-title text-[var(--ink)] font-display mb-3">
          You&apos;re on the list.
        </h3>
        <p className="type-body text-sm text-[var(--ink-secondary)] max-w-sm mx-auto">
          We notify in small batches in order of signup. Watch your inbox for
          early production allotment details.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`w-full max-w-md mx-auto ${className}`}>
      <div className={`flex ${isFull ? 'flex-col gap-4' : 'flex-col sm:flex-row gap-3'}`}>
        <div className="flex-1 text-left">
          <label htmlFor={`waitlist-email-${variant}`} className="block type-caption text-[var(--ink-secondary)] mb-1.5">
            Email address
          </label>
          <input
            id={`waitlist-email-${variant}`}
            type="email"
            value={email}
            onChange={handleInputChange}
            placeholder="you@domain.com"
            autoComplete="email"
            disabled={status === 'submitting'}
            aria-invalid={status === 'error'}
            aria-describedby={`waitlist-error-${variant}`}
            className="w-full px-4 py-3.5 bg-[var(--canvas-raised)] rounded-md border border-[var(--border-strong)] text-[var(--ink)] type-body text-sm placeholder:text-[var(--ink-tertiary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-text)] focus-visible:outline-offset-2 transition-colors disabled:opacity-50"
          />
        </div>

        {isFull && (
          <div className="text-left">
            <label htmlFor="waitlist-region" className="block type-caption text-[var(--ink-secondary)] mb-1.5">
              Region (optional)
            </label>
            <select
              id="waitlist-region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-4 py-3.5 bg-[var(--canvas-raised)] rounded-md border border-[var(--border-strong)] text-[var(--ink)] type-body text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-text)]"
            >
              <option value="">Select region...</option>
              {REGIONS.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
        )}

        <div className={isFull ? 'mt-2' : 'sm:self-end'}>
          <Button type="submit" variant="solid" disabled={status === 'submitting'} className="w-full sm:w-auto h-[48px]">
            {status === 'submitting' ? 'Joining...' : 'Join waitlist'}
          </Button>
        </div>
      </div>

      <div id={`waitlist-error-${variant}`} aria-live="polite" className="min-h-[24px] mt-2 text-left">
        {status === 'error' && (
          <p className="type-caption text-[var(--accent-text)] m-0 font-medium">
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  )
}
