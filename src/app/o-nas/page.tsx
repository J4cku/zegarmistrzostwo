import Image from "next/image";
import type { Metadata } from "next";
import AnimateIn from "@/components/ui/AnimateIn";
import Container from "@/components/ui/Container";
import TextLink from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "O Nas — Zegarmistrzostwo | Bolesławiec",
  description:
    "Poznaj historię naszego salonu biżuterii i warsztatu zegarmistrzowskiego w Bolesławcu.",
};

export default function ONasPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-charcoal">
        <Image
          src="/images/watches-1.jpg"
          alt="Warsztat zegarmistrzowski"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
        <Container className="relative z-10 pb-16">
          <AnimateIn>
            <h1 className="font-serif text-3xl font-light uppercase tracking-heading text-white sm:text-5xl">
              O Nas
            </h1>
            <p className="mt-3 max-w-lg text-sm text-white/60">
              Tradycja, precyzja i pasja do pięknych przedmiotów
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* Story */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-2 sm:gap-16">
            <AnimateIn direction="left">
              <h2 className="font-serif text-2xl font-light uppercase tracking-heading text-charcoal sm:text-3xl">
                Nasza Historia
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-text-light sm:text-base">
                <p>
                  Zegarmistrzostwo to miejsce, w którym tradycja zegarmistrzowska
                  spotyka się z nowoczesnym designem. Od lat łączymy precyzję
                  rzemiosła z pasją do pięknych przedmiotów — bo wierzymy, że
                  każdy detal ma znaczenie.
                </p>
                <p>
                  Nasz salon w Bolesławcu to nie tylko sklep z biżuterią i
                  zegarkami. To warsztat, w którym każdy zegarek jest traktowany z
                  najwyższą starannością, a każdy pierścionek dobieramy z myślą o
                  wyjątkowej historii, którą opowie.
                </p>
                <p>
                  Wierzymy, że prawdziwa elegancja tkwi w szczegółach — w
                  precyzyjnie osadzonym kamieniu, w idealnie wyregulowanym
                  mechanizmie, w uśmiechu klienta, który znalazł coś naprawdę
                  wyjątkowego.
                </p>
              </div>
            </AnimateIn>
            <AnimateIn direction="right" delay={0.2}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/jewelry-3.jpg"
                  alt="Biżuteria w salonie Zegarmistrzostwo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimateIn>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="border-y border-light-border bg-warm-white py-20 sm:py-28">
        <Container>
          <AnimateIn>
            <h2 className="text-center font-serif text-2xl font-light uppercase tracking-heading text-charcoal sm:text-3xl">
              Nasze Wartości
            </h2>
          </AnimateIn>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3 sm:gap-12">
            {[
              {
                title: "Rzemiosło",
                desc: "Każda naprawa i każdy serwis wykonujemy z najwyższą precyzją. Zegarmistrzowskie rzemiosło to nasza duma.",
              },
              {
                title: "Jakość",
                desc: "Dobieramy biżuterię i zegarki od sprawdzonych producentów. Oferujemy tylko to, co sami byśmy nosili.",
              },
              {
                title: "Zaufanie",
                desc: "Budujemy relacje oparte na uczciwości. Nasi klienci wracają do nas od lat — i przyprowadzają swoich bliskich.",
              },
            ].map((val, i) => (
              <AnimateIn key={val.title} delay={i * 0.15}>
                <div className="text-center">
                  <h3 className="font-serif text-lg font-light uppercase tracking-heading text-charcoal">
                    {val.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-light">
                    {val.desc}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section className="py-20 sm:py-28">
        <Container>
          <AnimateIn>
            <h2 className="text-center font-serif text-2xl font-light uppercase tracking-heading text-charcoal sm:text-3xl">
              Z Naszego Salonu
            </h2>
            <p className="mx-auto mt-4 max-w-md text-center text-sm text-text-light">
              Zaglądaj do nas również na{" "}
              <a
                href="https://www.instagram.com/zegarmistrzostwo"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-charcoal text-charcoal transition-colors hover:border-gold hover:text-gold"
              >
                Instagram
              </a>
            </p>
          </AnimateIn>
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {[
              { src: "/images/ring-heart.jpg", alt: "Pierścionek z sercem" },
              { src: "/images/topaz-ring.jpg", alt: "Pierścionek z topazem London Blue" },
              { src: "/images/morganit.jpg", alt: "Pierścionek z morganitem" },
              { src: "/images/jewelry-1.jpg", alt: "Biżuteria złota" },
              { src: "/images/gold-jewelry.jpg", alt: "Złota biżuteria" },
              { src: "/images/gold-rings.jpg", alt: "Złote pierścionki" },
            ].map((img, i) => (
              <AnimateIn key={img.src} delay={i * 0.1} className="group">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
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
            Odwiedź nas w Bolesławcu
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-text-light">
            Zapraszamy do naszego salonu — chętnie pomożemy Ci znaleźć coś
            wyjątkowego.
          </p>
          <div className="mt-6">
            <TextLink href="/kontakt">Skontaktuj się z nami</TextLink>
          </div>
        </AnimateIn>
      </section>
    </>
  );
}
