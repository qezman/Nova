'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { FrameCanvas } from '@/components/home/FrameCanvas'
import { useFramePreloader } from '@/hooks/useFramePreloader'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import {
  FRAME_COUNT,
  FRAME_BASE_PATH,
  FRAME_EXTENSION,
} from '@/lib/constants'

export function ScrollReveal() {
  const containerRef = useRef<HTMLElement>(null)
  const pinTargetRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const [frameIndex, setFrameIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const { frames, isLoaded } = useFramePreloader(
    FRAME_COUNT,
    FRAME_BASE_PATH,
    FRAME_EXTENSION
  )

  useEffect(() => {
    if (prefersReducedMotion) return

    const container = containerRef.current
    const pinTarget = pinTargetRef.current
    const text = textRef.current
    if (!container || !pinTarget) return

    const trigger = ScrollTrigger.create({
      trigger: container,
      pin: pinTarget,
      start: 'top top',
      end: '+=300%',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress
        const index = Math.floor(progress * FRAME_COUNT)
        setFrameIndex(index)

        if (text) {
          if (progress > 0.25 && progress < 0.75) {
            const rel = (progress - 0.25) / 0.5
            const opacity = Math.sin(rel * Math.PI)
            text.style.opacity = String(opacity)
            text.style.transform = `translateY(${(1 - opacity) * 16}px)`
          } else {
            text.style.opacity = '0'
          }
        }
      },
    })

    return () => trigger.kill()
  }, [prefersReducedMotion])

  const firstFrame = `${FRAME_BASE_PATH}001${FRAME_EXTENSION}`

  return (
    <section
      id="reveal"
      ref={containerRef}
      aria-label="Nova 360 degree product reveal"
      className="relative bg-[var(--canvas-deep)]"
    >
      <div
        ref={pinTargetRef}
        className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-6"
      >
        <div className="relative w-full max-w-[960px] aspect-[4/3] flex items-center justify-center">
          <FrameCanvas
            frames={frames}
            frameIndex={frameIndex}
            isLoaded={isLoaded}
            firstFrameSrc={firstFrame}
          />

          <div
            ref={textRef}
            style={{ opacity: 0 }}
            className="absolute bottom-12 inset-x-0 text-center pointer-events-none transition-transform duration-200 ease-out"
          >
            <p className="type-headline text-[var(--ink-on-dark)] max-w-xl mx-auto px-4">
              Every angle. Every detail.{' '}
              <span className="text-[var(--accent-on-dark)]">Considered.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
