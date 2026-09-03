"use client";

import { useEffect, useRef, useState } from "react";

interface PreloaderState {
  frames: HTMLImageElement[];
  isLoaded: boolean;
  progress: number;
}

export function useFramePreloader(
  totalFrames: number,
  basePath: string,
  extension: string,
): PreloaderState {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const framesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = new Array(totalFrames);
    let loadedCount = 0;

    const loadSingle = (index: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        const padIndex = String(index + 1).padStart(3, "0");
        img.src = `${basePath}${padIndex}${extension}`;
        img.onload = img.onerror = () => {
          if (!cancelled) {
            images[index] = img;
            loadedCount += 1;
            setProgress(loadedCount / totalFrames);
          }
          resolve();
        };
      });

    async function loadBatched() {
      await loadSingle(0);
      if (cancelled) return;

      const batchSize = 10;
      for (let i = 1; i < totalFrames; i += batchSize) {
        if (cancelled) return;
        const batch: Promise<void>[] = [];
        for (let j = i; j < Math.min(i + batchSize, totalFrames); j++) {
          batch.push(loadSingle(j));
        }
        await Promise.all(batch);
      }

      if (!cancelled) {
        framesRef.current = images;
        setIsLoaded(true);
      }
    }

    loadBatched();

    return () => {
      cancelled = true;
    };
  }, [totalFrames, basePath, extension]);

  return { frames: framesRef.current, isLoaded, progress };
}
