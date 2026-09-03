"use client";

import Link from "next/link";
import { CounterValue } from "@/components/ui/CounterValue";
import { SectionLabel } from "@/components/ui/SectionLabel";

interface HighlightItem {
  type: "counter" | "static";
  value?: number;
  staticValue?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}

const HIGHLIGHTS: HighlightItem[] = [
  {
    type: "counter",
    value: 18,
    suffix: "hrs",
    label: "Continuous battery life",
  },
  {
    type: "static",
    staticValue: "IP68",
    label: "Dust & water immersion (6m)",
  },
  {
    type: "counter",
    value: 2.4,
    decimals: 1,
    suffix: "oz",
    label: "Total chassis weight",
  },
  {
    type: "static",
    staticValue: "5G",
    label: "Cellular standalone connectivity",
  },
];

export function SpecHighlights() {
  return (
    <section
      aria-label="Specification highlights"
      className="bg-[var(--canvas-deep)] py-28 sm:py-36 px-6 sm:px-10 lg:px-16 border-t border-[var(--border-on-dark)]"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-16">
          <SectionLabel onDark>Performance At A Glance</SectionLabel>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 pb-16 border-b border-[var(--border-on-dark)]">
          {HIGHLIGHTS.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="type-headline text-[var(--ink-on-dark)] font-display tracking-tight mb-3">
                {item.type === "counter" && item.value !== undefined ? (
                  <CounterValue
                    value={item.value}
                    suffix={item.suffix}
                    decimals={item.decimals}
                  />
                ) : (
                  <span>{item.staticValue}</span>
                )}
              </div>
              <span className="type-caption text-[var(--ink-on-dark-secondary)]">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-10 flex justify-end">
          <Link
            href="/specs"
            className="
              type-body text-sm font-medium text-[var(--ink-on-dark)]
              inline-flex items-center gap-2
              hover:text-[var(--accent-on-dark)] transition-colors duration-200
            "
          >
            View full specifications
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
