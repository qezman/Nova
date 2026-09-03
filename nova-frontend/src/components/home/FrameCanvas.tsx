"use client";

import { useEffect, useRef } from "react";

interface FrameCanvasProps {
  frames: HTMLImageElement[];
  frameIndex: number;
  isLoaded: boolean;
  firstFrameSrc: string;
  className?: string;
}

export function FrameCanvas({
  frames,
  frameIndex,
  isLoaded,
  firstFrameSrc,
  className = "",
}: FrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr =
      typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const currentImg = frames[frameIndex];
    if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
      const imgRatio = currentImg.naturalWidth / currentImg.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      } else {
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      }

      ctx.drawImage(currentImg, offsetX, offsetY, drawWidth, drawHeight);
    }

    ctx.restore();
  }, [frames, frameIndex]);

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={firstFrameSrc}
        alt=""
        aria-hidden="true"
        className={`
          absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-700
          ${isLoaded ? "opacity-0" : "opacity-100 filter blur-sm scale-105"}
        `}
      />

      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Nova wearable device rotating 360 degrees"
        className={`w-full h-full block transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
