import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-light-border bg-cream">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 py-12 text-sm sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:gap-10 lg:py-14">
        {/* Kontakt */}
        <div>
          <h5 className="mb-4 font-serif text-sm font-light uppercase tracking-heading text-charcoal">
            Kontakt
          </h5>
          <div className="space-y-1.5 text-text-light">
            <a
              href="https://www.google.com/maps/place/Zegarmistrzostwo/@51.2612,15.5689,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-colors hover:text-gold"
            >
              Sierpnia 80 12/13
              <br />
              59-700 Bolesławiec
            </a>
            <a href="tel:+48757342119" className="block transition-colors hover:text-gold">
              tel. 75 734 21 19
            </a>
          </div>
        </div>

        {/* Godziny */}
        <div>
          <h5 className="mb-4 font-serif text-sm font-light uppercase tracking-heading text-charcoal">
            Godziny
          </h5>
          <div className="space-y-1.5 text-text-light">
            <p>Pon&ndash;Pt: 9:00&ndash;18:00</p>
            <p>Sob: 9:00&ndash;14:00</p>
            <p>Nd: zamknięte</p>
          </div>
        </div>

        {/* Serwis */}
        <div>
          <h5 className="mb-4 font-serif text-sm font-light uppercase tracking-heading text-charcoal">
            Serwis
          </h5>
          <div className="space-y-1.5 text-text-light">
            <Link href="/kontakt" className="block hover:text-charcoal">
              Umów wizytę
            </Link>
            <Link href="/oferta" className="block hover:text-charcoal">
              Cennik usług
            </Link>
          </div>
        </div>

        {/* Społeczność */}
        <div>
          <h5 className="mb-4 font-serif text-sm font-light uppercase tracking-heading text-charcoal">
            Społeczność
          </h5>
          <div className="space-y-1.5 text-text-light">
            <a
              href="https://www.facebook.com/zegarmistrzostwo"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-charcoal"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/zegarmistrzostwo"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-charcoal"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-light-border py-6 text-center text-xs text-mid">
        &copy; {new Date().getFullYear()} Zegarmistrzostwo
      </div>
    </footer>
  );
}
