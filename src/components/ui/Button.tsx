import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
  children: ReactNode;
};

const variants = {
  primary:
    "bg-foreground text-background hover:opacity-85",
  outline:
    "border border-border bg-transparent text-foreground hover:border-accent hover:text-accent",
  ghost:
    "bg-transparent text-muted hover:text-foreground",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-7 py-3 text-sm font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
