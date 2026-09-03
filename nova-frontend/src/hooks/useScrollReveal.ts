"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollRevealOptions {
  textSelector?: string;
  imageSelector?: string;
  start?: string;
}

export function useScrollReveal(
  containerRef: RefObject<HTMLElement>,
  options: ScrollRevealOptions = {},
): void {
  const prefersReducedMotion = useReducedMotion();
  const {
    textSelector = ".feature-text",
    imageSelector = ".feature-image",
    start = "top 75%",
  } = options;

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none reverse",
        },
      });

      // Stagger: text reveals 100ms before image for paced editorial rhythm.
      tl.from(textSelector, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: "power3.out",
      }).from(
        imageSelector,
        {
          opacity: 0,
          y: 36,
          scale: 0.98,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      );
    }, el);

    return () => ctx.revert();
  }, [containerRef, prefersReducedMotion, textSelector, imageSelector, start]);
}
