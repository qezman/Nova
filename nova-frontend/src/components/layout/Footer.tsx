import Link from "next/link";
import {
  IconBrandX,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";

const LINKS = [
  { label: "Specs", href: "/specs" },
  { label: "Waitlist", href: "/waitlist" },
  { label: "Press", href: "/press" },
] as const;

const SOCIAL = [
  { label: "X (Twitter)", href: "https://x.com", Icon: IconBrandX },
  {
    label: "Instagram",
    href: "https://instagram.com",
    Icon: IconBrandInstagram,
  },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: IconBrandLinkedin },
] as const;

export function Footer() {
  return (
    <footer
      className="bg-[var(--canvas-deep)] border-t border-[var(--border-on-dark)]"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <span className="type-title text-[var(--ink-on-dark)] font-display">
          Nova
        </span>

        <nav aria-label="Footer navigation">
          <ul role="list" className="flex flex-wrap gap-8 m-0 p-0 list-none">
            {LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="type-label text-[var(--ink-on-dark-secondary)] hover:text-[var(--ink-on-dark)] transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          {SOCIAL.map(({ label, href, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[var(--ink-on-dark-secondary)] hover:text-[var(--ink-on-dark)] transition-colors duration-200"
            >
              <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-12 pb-8">
        <p className="type-caption text-[var(--ink-on-dark-secondary)] m-0">
          © {new Date().getFullYear()} Nova. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
