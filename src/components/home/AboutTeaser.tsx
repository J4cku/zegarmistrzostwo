import Image from "next/image";
import TextLink from "@/components/ui/TextLink";
import AnimateIn from "@/components/ui/AnimateIn";

export default function AboutTeaser() {
  return (
    <section className="grid min-h-[400px] grid-cols-1 sm:grid-cols-2">
      {/* Text */}
      <div className="flex flex-col justify-center px-6 py-16 sm:order-1 sm:px-12 lg:px-20">
        <AnimateIn direction="left">
          <h2 className="font-serif text-2xl font-light uppercase leading-snug tracking-heading text-charcoal sm:text-3xl">
            Znamy się na tym,
            <br />
            co robimy
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-text-light sm:text-base">
            Od lat łączymy rzemiosło zegarmistrzowskie z nowoczesną biżuterią. Nasz
            salon w Bolesławcu to miejsce, gdzie tradycja spotyka się z pasją do
            pięknych przedmiotów.
          </p>
          <div className="mt-6">
            <TextLink href="/o-nas">Poznaj naszą historię</TextLink>
          </div>
        </AnimateIn>
      </div>

      {/* Image */}
      <AnimateIn direction="right" delay={0.2} className="relative min-h-[300px] sm:order-2">
        <Image
          src="/images/jewelry-1.jpg"
          alt="Biżuteria w salonie Zegarmistrzostwo"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </AnimateIn>
    </section>
  );
}
