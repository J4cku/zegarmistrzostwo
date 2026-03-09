import Image from "next/image";
import type { Metadata } from "next";
import AnimateIn from "@/components/ui/AnimateIn";
import Container from "@/components/ui/Container";
import TextLink from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Biżuteria — Zegarmistrzostwo | Złota i srebrna biżuteria",
  description:
    "Starannie dobrana kolekcja biżuterii złotej i srebrnej — pierścionki zaręczynowe, obrączki, naszyjniki, kolczyki i bransoletki w Bolesławcu.",
};

const features = [
  "Pierścionki zaręczynowe i obrączki",
  "Naszyjniki i wisiorki",
  "Kolczyki — złote i srebrne",
  "Bransoletki i łańcuszki",
  "Biżuteria z kamieniami szlachetnymi",
];

export default function BizuteriaPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-charcoal">
        <Image
          src="/images/gold-rings.jpg"
          alt="Biżuteria złota"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
        <Container className="relative z-10 pb-16">
          <AnimateIn>
            <h1 className="font-serif text-3xl font-light uppercase tracking-heading text-white sm:text-5xl">
              Biżuteria
            </h1>
            <p className="mt-3 max-w-lg text-sm text-white/60">
              Złoto, srebro i kamienie szlachetne
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
                Oferujemy starannie dobraną kolekcję biżuterii złotej i srebrnej
                — pierścionki zaręczynowe, obrączki, naszyjniki, kolczyki i
                bransoletki. Pracujemy z moissanitem, topazem London Blue,
                morganitem, szmaragdami i diamentami.
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
                  src="/images/gold-jewelry.jpg"
                  alt="Kolekcja biżuterii"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimateIn>
          </div>
        </Container>
      </section>

      {/* Gallery strip */}
      <section className="py-20">
        <Container>
          <AnimateIn>
            <h2 className="text-center font-serif text-2xl font-light uppercase tracking-heading text-charcoal sm:text-3xl">
              Wybrane Produkty
            </h2>
          </AnimateIn>
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {[
              { src: "/images/ring-heart.jpg", alt: "Pierścionek serce" },
              { src: "/images/topaz-ring.jpg", alt: "Topaz London Blue" },
              { src: "/images/morganit.jpg", alt: "Morganit" },
              { src: "/images/jewelry-4.jpg", alt: "Biżuteria" },
            ].map((img, i) => (
              <AnimateIn key={img.src} delay={i * 0.1} className="group">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </AnimateIn>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-light-border bg-cream py-16 text-center">
        <AnimateIn>
          <h2 className="font-serif text-xl font-light uppercase tracking-heading text-charcoal sm:text-2xl">
            Szukasz czegoś szczególnego?
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-text-light">
            Skontaktuj się z nami — chętnie doradzimy i pomożemy wybrać idealny
            prezent.
          </p>
          <div className="mt-6">
            <TextLink href="/kontakt">Napisz do nas</TextLink>
          </div>
        </AnimateIn>
      </section>
    </>
  );
}
