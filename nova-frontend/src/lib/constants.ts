export const ANIMATION = {
  ease: "cubic-bezier(0.16, 1, 0.3, 1)",
  durationFast: 0.35,
  durationBase: 0.6,
  durationSlow: 0.9,
  stagger: 0.09,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const FRAME_COUNT = 90;
export const FRAME_BASE_PATH = "/frames/frame_";
export const FRAME_EXTENSION = ".webp";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
