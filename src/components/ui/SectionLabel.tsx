type SectionLabelProps = {
  children: string;
};

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="mb-4 text-xs font-medium tracking-[0.2em] text-accent uppercase">
      {children}
    </p>
  );
}
