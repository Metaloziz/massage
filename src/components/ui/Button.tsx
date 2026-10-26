import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

type SharedProps = {
  variant?: "primary" | "outline" | "ghost";
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants = {
  primary:
    "border border-transparent bg-foreground text-background hover:bg-foreground/90 active:translate-y-px",
  outline:
    "border border-[var(--line)] bg-transparent text-foreground hover:border-accent hover:bg-accent/10 active:translate-y-px",
  ghost:
    "border border-transparent bg-transparent text-muted hover:bg-accent/10 hover:text-foreground",
};

const baseClass =
  "inline-flex min-h-12 items-center justify-center rounded-[var(--radius-control)] px-6 py-3 text-sm font-medium tracking-[0.02em] transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:active:translate-y-0";

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${baseClass} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <a href={href} className={classes} {...linkProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
