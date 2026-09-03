"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

gsap.ticker.lagSmoothing(0);

let lenisInstance: Lenis | null = null;

export function initLenis(): Lenis {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({ autoRaf: false });

  lenisInstance.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance!.raf(time * 1000);
  });

  return lenisInstance;
}

export function destroyLenis(): void {
  if (!lenisInstance) return;
  lenisInstance.destroy();
  lenisInstance = null;
}

export { gsap, ScrollTrigger };
