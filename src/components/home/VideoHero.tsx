"use client";

import { motion } from "framer-motion";
import TextLink from "@/components/ui/TextLink";

export default function VideoHero() {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden sm:min-h-[85vh]">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/video/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay — bottom only */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full pb-16 text-center text-white sm:pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="font-serif text-3xl font-light uppercase leading-tight tracking-heading sm:text-5xl"
        >
          Rzemiosło spotyka elegancję
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-4 text-xs uppercase tracking-wide-caps text-white/60"
        >
          Biżuteria &middot; Zegarki &middot; Serwis zegarmistrzowski
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-8"
        >
          <TextLink
            href="/oferta"
            className="border-white/50 text-white hover:border-white hover:text-white"
          >
            Odkryj naszą ofertę
          </TextLink>
        </motion.div>
      </div>
    </section>
  );
}
