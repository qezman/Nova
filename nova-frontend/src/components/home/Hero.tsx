"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.6 })
        .from(
          ".hero-line",
          { opacity: 0, y: 32, duration: 0.8, stagger: 0.12 },
          "-=0.4",
        )
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.5")
        .from(".hero-cta", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
        .from(
          imageRef.current,
          { opacity: 0, x: 60, rotation: 0, duration: 1.1 },
          "-=0.8",
        );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      aria-label="Nova introduction"
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-[var(--canvas)] pt-24 pb-16"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 lg:pl-[4%] z-10">
          <div className="hero-eyebrow mb-6">
            <SectionLabel>Introducing Nova</SectionLabel>
          </div>

          <h1
            ref={headlineRef}
            className="type-hero text-[var(--ink)] tracking-tight mb-8"
          >
            <span className="hero-line block">Presence,</span>
            <span className="hero-line block text-[var(--ink-secondary)]">
              reimagined.
            </span>
          </h1>

          <p className="hero-sub type-body text-[var(--ink-secondary)] max-w-[380px] mb-10">
            A device distilled to pure tactile intelligence. Quiet in posture,
            instant in response. Designed for human attention, not device
            consumption.
          </p>

          <div className="hero-cta flex flex-wrap items-center gap-6">
            <Link href="/waitlist">
              <Button variant="solid">Pre-order</Button>
            </Link>
            <TextLink href="#reveal" className="type-body text-sm font-medium">
              Watch the film
            </TextLink>
          </div>
        </div>

        <div className="lg:col-span-5 relative flex justify-end">
          <div
            ref={imageRef}
            className="relative w-[320px] sm:w-[440px] lg:w-[560px] aspect-[4/3] rotate-[-3deg] lg:translate-x-12 select-none pointer-events-none"
          >
            <Image
              src="/images/hero-device.webp"
              alt="Nova wearable device angled against neutral canvas"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
