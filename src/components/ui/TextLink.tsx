import Link from "next/link";

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function TextLink({ href, children, className = "" }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-block border-b border-charcoal pb-0.5 text-xs uppercase tracking-wide-caps text-charcoal transition-colors hover:border-gold hover:text-gold ${className}`}
    >
      {children}
    </Link>
  );
}
