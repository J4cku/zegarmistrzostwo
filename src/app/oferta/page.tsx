import Image from "next/image";
import type { Metadata } from "next";
import AnimateIn from "@/components/ui/AnimateIn";
import Container from "@/components/ui/Container";
import TextLink from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Oferta — Zegarmistrzostwo | Biżuteria, Zegarki, Serwis",
  description:
    "Biżuteria złota i srebrna, zegarki damskie i męskie, profesjonalny serwis zegarmistrzowski w Bolesławcu.",
};

const categories = [
  {
    title: "Biżuteria",
    description:
      "Oferujemy starannie dobraną kolekcję biżuterii złotej i srebrnej — pierścionki zaręczynowe, obrączki, naszyjniki, kolczyki i bransoletki. Pracujemy z moissanitem, topazem London Blue, morganitem, szmaragdami i diamentami.",
    features: [
      "Pierścionki zaręczynowe i obrączki",
      "Naszyjniki i wisiorki",
      "Kolczyki — złote i srebrne",
      "Bransoletki i łańcuszki",
      "Biżuteria z kamieniami szlachetnymi",
    ],
    image: "/images/gold-rings.jpg",
    imageAlt: "Złote pierścionki",
  },
  {
    title: "Zegarki",
    description:
      "Od sportowych Casio G-Shock po eleganckie zegarki damskie i męskie. W naszej ofercie znajdziesz zegarki na każdą okazję — do codziennego noszenia, na prezent, i na wyjątkowe chwile.",
    features: [
      "Casio G-Shock i sportowe",
      "Zegarki damskie — klasyczne i fashion",
      "Zegarki męskie — eleganckie i casualowe",
      "OBAKU Denmark — diamentowa kolekcja",
      "Zegarki ceramiczne",
    ],
    image: "/images/watches-1.jpg",
    imageAlt: "Kolekcja zegarków",
  },
];

const repairServices = [
  { name: "Wymiana baterii", price: "od 20 zł", time: "na poczekaniu" },
  { name: "Regulacja bransolety", price: "od 15 zł", time: "na poczekaniu" },
  { name: "Wymiana paska", price: "od 30 zł", time: "na poczekaniu" },
  { name: "Wymiana szkiełka", price: "od 60 zł", time: "1–3 dni" },
  { name: "Czyszczenie i serwis mechanizmu", price: "od 150 zł", time: "3–7 dni" },
  { name: "Restauracja zegarka", price: "wycena indywidualna", time: "do uzgodnienia" },
  { name: "Naprawa biżuterii", price: "wycena indywidualna", time: "do uzgodnienia" },
  { name: "Skracanie / wydłużanie łańcuszka", price: "od 40 zł", time: "1–3 dni" },
];

export default function OfertaPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-charcoal">
        <Image
          src="/images/jewelry-2.jpg"
          alt="Biżuteria Zegarmistrzostwo"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
        <Container className="relative z-10 pb-16">
          <AnimateIn>
            <h1 className="font-serif text-3xl font-light uppercase tracking-heading text-white sm:text-5xl">
              Nasza Oferta
            </h1>
            <p className="mt-3 max-w-lg text-sm text-white/60">
              Biżuteria &middot; Zegarki &middot; Profesjonalny serwis
              zegarmistrzowski
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* Category sections */}
      {categories.map((cat, i) => (
        <section key={cat.title} className="py-20 sm:py-28">
          <Container>
            <div
              className={`mx-auto grid max-w-5xl gap-12 sm:grid-cols-2 sm:gap-16 ${
                i % 2 === 1 ? "direction-rtl" : ""
              }`}
            >
              <AnimateIn
                direction={i % 2 === 0 ? "left" : "right"}
                className={i % 2 === 1 ? "sm:order-2" : ""}
              >
                <h2 className="font-serif text-2xl font-light uppercase tracking-heading text-charcoal sm:text-3xl">
                  {cat.title}
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-text-light sm:text-base">
                  {cat.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {cat.features.map((f) => (
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
              <AnimateIn
                direction={i % 2 === 0 ? "right" : "left"}
                delay={0.2}
                className={i % 2 === 1 ? "sm:order-1" : ""}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </AnimateIn>
            </div>
          </Container>
        </section>
      ))}

      {/* Repair services */}
      <section className="border-y border-light-border bg-warm-white py-20 sm:py-28">
        <Container>
          <AnimateIn>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-2xl font-light uppercase tracking-heading text-charcoal sm:text-3xl">
                Serwis Zegarmistrzowski
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-light sm:text-base">
                Profesjonalna naprawa zegarków i biżuterii. Wieloletnie
                doświadczenie, precyzja i dbałość o każdy szczegół.
              </p>
            </div>
          </AnimateIn>

          <div className="mx-auto mt-12 max-w-3xl">
            <AnimateIn delay={0.1}>
              <div className="overflow-hidden border border-light-border bg-white">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-light-border bg-cream/50">
                      <th className="px-5 py-3 text-left font-serif text-xs font-light uppercase tracking-wide-caps text-charcoal">
                        Usługa
                      </th>
                      <th className="hidden px-5 py-3 text-left font-serif text-xs font-light uppercase tracking-wide-caps text-charcoal sm:table-cell">
                        Czas realizacji
                      </th>
                      <th className="px-5 py-3 text-right font-serif text-xs font-light uppercase tracking-wide-caps text-charcoal">
                        Cena
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {repairServices.map((s, i) => (
                      <tr
                        key={s.name}
                        className={
                          i < repairServices.length - 1
                            ? "border-b border-light-border"
                            : ""
                        }
                      >
                        <td className="px-5 py-3.5 text-text">{s.name}</td>
                        <td className="hidden px-5 py-3.5 text-text-light sm:table-cell">
                          {s.time}
                        </td>
                        <td className="px-5 py-3.5 text-right font-medium text-charcoal">
                          {s.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="mt-4 text-center text-xs text-mid">
                Ceny orientacyjne. Dokładna wycena po oględzinach. Zapraszamy do
                kontaktu.
              </p>
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
