import Image from "next/image";
import type { Metadata } from "next";
import AnimateIn from "@/components/ui/AnimateIn";
import Container from "@/components/ui/Container";
import TextLink from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Zegarki — Zegarmistrzostwo | Damskie i męskie zegarki",
  description:
    "Od sportowych Casio G-Shock po eleganckie zegarki damskie i męskie. Zegarki na każdą okazję w Bolesławcu.",
};

const features = [
  "Casio G-Shock i sportowe",
  "Zegarki damskie — klasyczne i fashion",
  "Zegarki męskie — eleganckie i casualowe",
  "OBAKU Denmark — diamentowa kolekcja",
  "Zegarki ceramiczne",
];

export default function ZegarkiPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-charcoal">
        <Image
          src="/images/watches-1.jpg"
          alt="Kolekcja zegarków"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
        <Container className="relative z-10 pb-16">
          <AnimateIn>
            <h1 className="font-serif text-3xl font-light uppercase tracking-heading text-white sm:text-5xl">
              Zegarki
            </h1>
            <p className="mt-3 max-w-lg text-sm text-white/60">
              Damskie, męskie i sportowe
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* Content */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-2 sm:gap-16">
            <AnimateIn direction="left">
              <h2 className="font-serif text-2xl font-light uppercase tracking-heading text-charcoal sm:text-3xl">
                Nasza kolekcja
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-text-light sm:text-base">
                Od sportowych Casio G-Shock po eleganckie zegarki damskie i
                męskie. W naszej ofercie znajdziesz zegarki na każdą okazję — do
                codziennego noszenia, na prezent, i na wyjątkowe chwile.
              </p>
              <ul className="mt-6 space-y-2">
                {features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-text-light"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {f}
                  </li>
                ))}
              </ul>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.2}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/obaku.jpg"
                  alt="Zegarek OBAKU"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimateIn>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-light-border bg-cream py-16 text-center">
        <AnimateIn>
          <h2 className="font-serif text-xl font-light uppercase tracking-heading text-charcoal sm:text-2xl">
            Potrzebujesz pomocy w wyborze?
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-text-light">
            Skontaktuj się z nami — doradzimy idealny zegarek na każdą okazję.
          </p>
          <div className="mt-6">
            <TextLink href="/kontakt">Napisz do nas</TextLink>
          </div>
        </AnimateIn>
      </section>
    </>
  );
}
