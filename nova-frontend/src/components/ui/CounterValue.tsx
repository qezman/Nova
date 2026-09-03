"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CounterValueProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function CounterValue({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: CounterValueProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    if (prefersReducedMotion) {
      el.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
      return;
    }

    const obj = { count: 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          count: value,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${prefix}${obj.count.toFixed(decimals)}${suffix}`;
          },
        });
      },
    });

    return () => trigger.kill();
  }, [value, prefix, suffix, decimals, prefersReducedMotion]);

  return (
    <span ref={spanRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
