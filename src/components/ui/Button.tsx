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
  primary: "bg-foreground text-background hover:opacity-85",
  outline:
    "border border-border bg-transparent text-foreground hover:border-accent hover:text-accent",
  ghost: "bg-transparent text-muted hover:text-foreground",
};

const baseClass =
  "inline-flex min-h-11 items-center justify-center rounded-full px-7 py-3 text-sm font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50";

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
