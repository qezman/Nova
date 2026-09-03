"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";

const NAV_LINKS = [
  { label: "Specs", href: "/specs" },
  { label: "Waitlist", href: "/waitlist" },
] as const;

export function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 80,
      onEnter: () => navRef.current?.setAttribute("data-scrolled", "true"),
      onLeaveBack: () => navRef.current?.removeAttribute("data-scrolled"),
    });
    return () => trigger.kill();
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className="
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-between
        px-8 md:px-12 h-16
        transition-all duration-300
        border-b border-transparent
        data-[scrolled]:border-[rgba(23,22,15,0.08)]
        data-[scrolled]:bg-white/75
        data-[scrolled]:backdrop-blur-xl
        data-[scrolled]:shadow-[0_2px_12px_rgba(0,0,0,0.04)]
      "
    >
      <Link
        href="/"
        aria-label="Nova home"
        className="text-[var(--ink)] hover:text-[var(--accent-text)] transition-colors duration-200"
      >
        <NovaLogo />
      </Link>

      <ul role="list" className="flex items-center gap-8 m-0 p-0 list-none">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="
                type-label text-[var(--ink-secondary)]
                hover:text-[var(--ink)] transition-colors duration-200
                focus-visible:text-[var(--accent-text)]
              "
            >
              {label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/waitlist"
            className="
              inline-flex items-center px-5 py-2 type-label rounded-md
              border border-[var(--border-strong)] text-[var(--ink)]
              hover:border-[var(--ink)] transition-colors duration-200
            "
          >
            Pre-order
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function NovaLogo() {
  return (
    <svg
      width="72"
      height="20"
      viewBox="0 0 72 20"
      fill="none"
      aria-hidden="true"
    >
      <text
        x="0"
        y="16"
        fontFamily="var(--font-display)"
        fontSize="18"
        fontWeight="500"
        fill="currentColor"
        letterSpacing="-0.03em"
      >
        Nova
      </text>
    </svg>
  );
}
