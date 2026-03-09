import SectionHeading from "@/components/ui/SectionHeading";
import TextLink from "@/components/ui/TextLink";
import AnimateIn from "@/components/ui/AnimateIn";

export default function Collections() {
  return (
    <section className="bg-white py-20 text-center sm:py-28">
      <AnimateIn>
        <SectionHeading>Odkryj nasze kolekcje</SectionHeading>
      </AnimateIn>
      <AnimateIn delay={0.15}>
        <p className="mx-auto mt-4 max-w-md px-6 text-sm leading-relaxed text-text-light sm:text-base">
          Od eleganckich pierścionków z moissanitem po sportowe zegarki G-Shock
          &mdash; znajdź coś wyjątkowego.
        </p>
      </AnimateIn>
      <AnimateIn delay={0.3}>
        <div className="mt-6">
          <TextLink href="/bizuteria">Zobacz pełną ofertę</TextLink>
        </div>
      </AnimateIn>
    </section>
  );
}
