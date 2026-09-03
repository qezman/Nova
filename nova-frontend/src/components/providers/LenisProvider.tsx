"use client";

import { useEffect } from "react";
import { initLenis, destroyLenis } from "@/lib/gsap";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  return <>{children}</>;
}
