import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "solid" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "solid", className = "", type = "button", children, ...props },
    ref,
  ) => {
    const base =
      "inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium tracking-wide rounded-md transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3";

    const variants: Record<ButtonVariant, string> = {
      solid:
        "bg-[var(--accent-text)] text-[var(--canvas)] hover:bg-[var(--accent-hover)] active:bg-[var(--accent-hover)]",
      ghost:
        "border border-[var(--border-strong)] text-[var(--ink)] hover:border-[var(--ink)] active:bg-[var(--border)]",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={`${base} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
