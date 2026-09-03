"use client";

import { useState } from "react";
import type { SpecSection, SpecCategory } from "@/lib/specs";
import { SectionLabel } from "@/components/ui/SectionLabel";

interface SpecTableProps {
  sections: SpecSection[];
}

const ALL = "All" as const;
type Filter = SpecCategory | typeof ALL;

export function SpecTable({ sections }: SpecTableProps) {
  const [active, setActive] = useState<Filter>(ALL);

  const categories: Filter[] = [ALL, ...sections.map((s) => s.category)];
  const visible =
    active === ALL ? sections : sections.filter((s) => s.category === active);

  return (
    <div className="w-full">
      {/* Category filter tabs */}
      <div
        role="tablist"
        aria-label="Filter specs by category"
        className="flex flex-wrap gap-2 mb-10"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            onClick={() => setActive(cat)}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${
                active === cat
                  ? "bg-[var(--ink)] text-[var(--canvas)]"
                  : "bg-[var(--canvas-raised)] text-[var(--ink-secondary)] hover:text-[var(--ink)] border border-[var(--border)]"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Spec sections */}
      <div className="space-y-12">
        {visible.map((section) => (
          <div key={section.category}>
            <div className="mb-4">
              <SectionLabel>{section.category}</SectionLabel>
            </div>
            <table
              className="w-full border-collapse"
              aria-label={`${section.category} specifications`}
            >
              <tbody>
                {section.entries.map((entry, i) => (
                  <tr
                    key={entry.label}
                    className={`
                      grid grid-cols-2 sm:grid-cols-[280px_1fr] gap-4 py-4
                      ${i < section.entries.length - 1 ? "border-b border-[var(--border)]" : ""}
                    `}
                  >
                    <td className="text-sm text-[var(--ink-secondary)] font-medium leading-relaxed">
                      {entry.label}
                    </td>
                    <td className="text-sm text-[var(--ink)] leading-relaxed">
                      {entry.value}
                      {entry.note && (
                        <span className="block mt-0.5 text-xs text-[var(--ink-tertiary)]">
                          {entry.note}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
