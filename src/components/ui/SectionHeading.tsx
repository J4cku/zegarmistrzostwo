interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2
      className={`font-serif text-2xl font-light uppercase tracking-heading text-charcoal sm:text-3xl ${className}`}
    >
      {children}
    </h2>
  );
}
