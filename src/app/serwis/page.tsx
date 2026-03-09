import type { Metadata } from "next";
import AnimateIn from "@/components/ui/AnimateIn";
import Container from "@/components/ui/Container";
import TextLink from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Serwis — Zegarmistrzostwo | Naprawa zegarków i biżuterii",
  description:
    "Profesjonalny serwis zegarmistrzowski w Bolesławcu. Wymiana baterii, naprawa mechanizmów, restauracja zegarków, naprawa biżuterii.",
};

const watchServices = [
  { name: "Wymiana baterii", price: "od 20 zł", time: "na poczekaniu" },
  { name: "Regulacja bransolety", price: "od 15 zł", time: "na poczekaniu" },
  { name: "Wymiana paska", price: "od 30 zł", time: "na poczekaniu" },
  { name: "Wymiana szkiełka", price: "od 60 zł", time: "1–3 dni" },
  { name: "Czyszczenie i serwis mechanizmu", price: "od 150 zł", time: "3–7 dni" },
  { name: "Restauracja zegarka", price: "wycena indywidualna", time: "do uzgodnienia" },
];

const jewelryServices = [
  { name: "Naprawa biżuterii", price: "wycena indywidualna", time: "do uzgodnienia" },
  { name: "Skracanie / wydłużanie łańcuszka", price: "od 40 zł", time: "1–3 dni" },
  { name: "Lutowanie i spawanie", price: "od 50 zł", time: "1–3 dni" },
  { name: "Wymiana zapięcia", price: "od 30 zł", time: "1–3 dni" },
  { name: "Czyszczenie i polerowanie", price: "od 25 zł", time: "na poczekaniu" },
  { name: "Zmiana rozmiaru pierścionka", price: "od 60 zł", time: "3–7 dni" },
];

function ServiceTable({ services }: { services: typeof watchServices }) {
  return (
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
          {services.map((s, i) => (
            <tr
              key={s.name}
              className={
                i < services.length - 1
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
  );
}

export default function SerwisPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal py-20 sm:py-28">
        <Container>
          <AnimateIn>
            <h1 className="font-serif text-3xl font-light uppercase tracking-heading text-white sm:text-5xl">
              Serwis
            </h1>
            <p className="mt-3 max-w-lg text-sm text-white/60">
              Profesjonalna naprawa zegarków i biżuterii
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* Watch services */}
      <section className="py-20 sm:py-28">
        <Container>
          <AnimateIn>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-2xl font-light uppercase tracking-heading text-charcoal sm:text-3xl">
                Serwis zegarków
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-light sm:text-base">
                Wieloletnie doświadczenie w naprawie zegarków mechanicznych i
                kwarcowych. Precyzja i dbałość o każdy szczegół.
              </p>
            </div>
          </AnimateIn>
          <div className="mx-auto mt-12 max-w-3xl">
            <AnimateIn delay={0.1}>
              <ServiceTable services={watchServices} />
            </AnimateIn>
          </div>
        </Container>
      </section>

      {/* Jewelry services */}
      <section className="border-y border-light-border bg-warm-white py-20 sm:py-28">
        <Container>
          <AnimateIn>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-2xl font-light uppercase tracking-heading text-charcoal sm:text-3xl">
                Serwis biżuterii
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-light sm:text-base">
                Naprawiamy i odnawiamy biżuterię złotą i srebrną. Przywrócimy
                blask Twoim ulubionym przedmiotom.
              </p>
            </div>
          </AnimateIn>
          <div className="mx-auto mt-12 max-w-3xl">
            <AnimateIn delay={0.1}>
              <ServiceTable services={jewelryServices} />
            </AnimateIn>
          </div>
        </Container>
      </section>

      {/* Note + CTA */}
      <section className="py-16 text-center">
        <AnimateIn>
          <p className="text-center text-xs text-mid">
            Ceny orientacyjne. Dokładna wycena po oględzinach.
          </p>
        </AnimateIn>
      </section>

      <section className="border-t border-light-border bg-cream py-16 text-center">
        <AnimateIn>
          <h2 className="font-serif text-xl font-light uppercase tracking-heading text-charcoal sm:text-2xl">
            Potrzebujesz naprawy?
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-text-light">
            Skontaktuj się z nami — chętnie pomożemy i wycenimy naprawę.
          </p>
          <div className="mt-6">
            <TextLink href="/kontakt">Umów wizytę</TextLink>
          </div>
        </AnimateIn>
      </section>
    </>
  );
}
