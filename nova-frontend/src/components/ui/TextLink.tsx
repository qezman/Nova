import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type TextLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  children: React.ReactNode;
};

export function TextLink({
  href,
  className = "",
  children,
  ...props
}: TextLinkProps) {
  return (
    <Link
      href={href}
      className={`
        relative inline-block text-[var(--ink)] no-underline
        after:absolute after:bottom-0 after:left-0 after:h-px after:w-0
        after:bg-[var(--accent-text)] after:transition-[width] after:duration-300 after:ease-out-expo
        hover:after:w-full focus-visible:after:w-full
        focus-visible:text-[var(--accent-text)]
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </Link>
  );
}
