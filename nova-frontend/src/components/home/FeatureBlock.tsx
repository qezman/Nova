"use client";

import Image from "next/image";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export interface FeatureBlockProps {
  eyebrow: string;
  headline: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  layout: "image-left" | "image-right";
}

export function FeatureBlock({
  eyebrow,
  headline,
  body,
  imageSrc,
  imageAlt,
  layout,
}: FeatureBlockProps) {
  const containerRef = useRef<HTMLElement>(null);
  useScrollReveal(containerRef);

  const isImageLeft = layout === "image-left";

  return (
    <section
      ref={containerRef}
      aria-label={headline}
      className="py-14 sm:py-24 lg:py-40 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 items-center">
        <div
          className={`
            feature-image lg:col-span-7
            ${isImageLeft ? "lg:order-1" : "lg:order-2"}
          `}
        >
          <div className="relative w-full aspect-[4/3] bg-[var(--canvas-raised)] border border-[var(--border)] overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
        </div>

        <div
          className={`
            feature-text lg:col-span-5 flex flex-col justify-center
            ${isImageLeft ? "lg:order-2 lg:pl-4" : "lg:order-1 lg:pr-4"}
          `}
        >
          <div className="mb-3 sm:mb-4">
            <SectionLabel>{eyebrow}</SectionLabel>
          </div>

          <h2 className="type-headline text-[var(--ink)] mb-4 sm:mb-6">{headline}</h2>

          <p className="type-body text-[var(--ink-secondary)] max-w-[420px]">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
