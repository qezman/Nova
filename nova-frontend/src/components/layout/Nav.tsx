'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from '@/lib/gsap'

const NAV_LINKS = [
  { label: 'Specs', href: '/specs' },
  { label: 'Waitlist', href: '/waitlist' },
] as const

export function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 80,
      onEnter: () => navRef.current?.setAttribute('data-scrolled', 'true'),
      onLeaveBack: () => navRef.current?.removeAttribute('data-scrolled'),
    })
    return () => trigger.kill()
  }, [])

  // Close menu on route change / outside click
  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    document.addEventListener('keydown', (e) => e.key === 'Escape' && close())
    return () => document.removeEventListener('keydown', close)
  }, [open])

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="
          fixed top-0 left-0 right-0 z-50
          flex items-center justify-between
          px-6 md:px-12 h-16
          transition-all duration-300
          border-b border-transparent
          data-[scrolled]:border-[rgba(23,22,15,0.08)]
          data-[scrolled]:bg-white/75
          data-[scrolled]:backdrop-blur-xl
          data-[scrolled]:shadow-[0_2px_12px_rgba(0,0,0,0.04)]
        "
      >
        <Link
          href="/"
          aria-label="Nova home"
          className="text-[var(--ink)] hover:text-[var(--accent-text)] transition-colors duration-200"
          onClick={() => setOpen(false)}
        >
          <NovaLogo />
        </Link>

        {/* Desktop nav */}
        <ul role="list" className="hidden md:flex items-center gap-8 m-0 p-0 list-none">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="type-label text-[var(--ink-secondary)] hover:text-[var(--ink)] transition-colors duration-200 focus-visible:text-[var(--accent-text)]"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/waitlist"
              className="inline-flex items-center px-5 py-2 type-label rounded-md border border-[var(--border-strong)] text-[var(--ink)] hover:border-[var(--ink)] transition-colors duration-200"
            >
              Pre-order
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-md text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-text)]"
        >
          <span className={`block h-px w-5 bg-current transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block h-px w-5 bg-current transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-5 bg-current transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        className={`
          md:hidden fixed inset-x-0 top-16 z-40
          bg-[var(--canvas)] border-b border-[var(--border)]
          transition-all duration-200 ease-out overflow-hidden
          ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}
        `}
      >
        <ul role="list" className="flex flex-col m-0 p-0 list-none px-6 py-4 gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="block py-3 type-label text-[var(--ink-secondary)] hover:text-[var(--ink)] transition-colors duration-200 border-b border-[var(--border)]"
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-4 pb-2">
            <Link
              href="/waitlist"
              onClick={() => setOpen(false)}
              className="inline-flex items-center px-5 py-2.5 type-label rounded-md border border-[var(--border-strong)] text-[var(--ink)] hover:border-[var(--ink)] transition-colors duration-200"
            >
              Pre-order
            </Link>
          </li>
        </ul>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          aria-hidden="true"
          className="md:hidden fixed inset-0 z-30 bg-black/10"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}

function NovaLogo() {
  return (
    <svg width="72" height="20" viewBox="0 0 72 20" fill="none" aria-hidden="true">
      <text
        x="0" y="16"
        fontFamily="var(--font-display)"
        fontSize="18"
        fontWeight="500"
        fill="currentColor"
        letterSpacing="-0.03em"
      >
        Nova
      </text>
    </svg>
  )
}
