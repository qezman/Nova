interface SectionLabelProps {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}

export function SectionLabel({
  children,
  onDark = false,
  className = "",
}: SectionLabelProps) {
  return (
    <span
      className={`
        type-label
        ${onDark ? "text-[var(--accent-on-dark)]" : "text-[var(--accent-text)]"}
        ${className}
      `.trim()}
    >
      {children}
    </span>
  );
}
