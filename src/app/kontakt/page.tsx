import type { Metadata } from "next";
import AnimateIn from "@/components/ui/AnimateIn";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt — Zegarmistrzostwo | Bolesławiec",
  description:
    "Skontaktuj się z nami. Salon biżuterii i serwis zegarmistrzowski — Sierpnia 80 12/13, Bolesławiec.",
};

const MAPS_URL =
  "https://www.google.com/maps/search/Zegarmistrzostwo+Sierpnia+80+Boles%C5%82awiec";

const MAPS_EMBED =
  "https://maps.google.com/maps?q=Zegarmistrzostwo+Sierpnia+80+12%2F13+Boles%C5%82awiec&t=&z=16&ie=UTF8&iwloc=&output=embed";

export default function KontaktPage() {
  return (
    <>
      {/* Header */}
      <section className="border-b border-light-border bg-white py-16 text-center sm:py-20">
        <AnimateIn>
          <h1 className="font-serif text-3xl font-light uppercase tracking-heading text-charcoal sm:text-5xl">
            Kontakt
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm text-text-light">
            Zapraszamy do naszego salonu w Bolesławcu. Chętnie odpowiemy na
            pytania i pomożemy dobrać idealny prezent.
          </p>
        </AnimateIn>
      </section>

      {/* Main content */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-2 sm:gap-16">
            {/* Left — info */}
            <AnimateIn direction="left">
              <div className="space-y-10">
                {/* Address */}
                <div>
                  <h2 className="font-serif text-lg font-light uppercase tracking-heading text-charcoal">
                    Adres
                  </h2>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block text-sm leading-relaxed text-text-light transition-colors hover:text-gold"
                  >
                    Sierpnia 80 12/13
                    <br />
                    59-700 Bolesławiec
                    <br />
                    <span className="mt-1 inline-block border-b border-gold/40 text-xs uppercase tracking-wide-caps text-gold">
                      Zobacz na mapie
                    </span>
                  </a>
                </div>

                {/* Phone */}
                <div>
                  <h2 className="font-serif text-lg font-light uppercase tracking-heading text-charcoal">
                    Telefon
                  </h2>
                  <a
                    href="tel:+48757342119"
                    className="mt-3 block text-sm text-text-light transition-colors hover:text-gold"
                  >
                    75 734 21 19
                  </a>
                </div>

                {/* Hours */}
                <div>
                  <h2 className="font-serif text-lg font-light uppercase tracking-heading text-charcoal">
                    Godziny Otwarcia
                  </h2>
                  <div className="mt-3 space-y-1 text-sm text-text-light">
                    <div className="flex justify-between max-w-xs">
                      <span>Poniedziałek &ndash; Piątek</span>
                      <span className="font-medium text-charcoal">9:00 &ndash; 18:00</span>
                    </div>
                    <div className="flex justify-between max-w-xs">
                      <span>Sobota</span>
                      <span className="font-medium text-charcoal">9:00 &ndash; 14:00</span>
                    </div>
                    <div className="flex justify-between max-w-xs">
                      <span>Niedziela</span>
                      <span className="text-mid">zamknięte</span>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div>
                  <h2 className="font-serif text-lg font-light uppercase tracking-heading text-charcoal">
                    Social Media
                  </h2>
                  <div className="mt-3 flex gap-4">
                    <a
                      href="https://www.facebook.com/zegarmistrzostwo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-light transition-colors hover:text-gold"
                    >
                      Facebook
                    </a>
                    <a
                      href="https://www.instagram.com/zegarmistrzostwo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-light transition-colors hover:text-gold"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* Right — form */}
            <AnimateIn direction="right" delay={0.15}>
              <div className="border border-light-border bg-warm-white p-6 sm:p-8">
                <h2 className="font-serif text-lg font-light uppercase tracking-heading text-charcoal">
                  Napisz do nas
                </h2>
                <ContactForm />
              </div>
            </AnimateIn>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="border-t border-light-border">
        <AnimateIn direction="none">
          <iframe
            src={MAPS_EMBED}
            className="h-[400px] w-full sm:h-[500px]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Zegarmistrzostwo — mapa"
          />
        </AnimateIn>
      </section>
    </>
  );
}
