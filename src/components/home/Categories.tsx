"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Biżuteria",
    subtitle: "Pierścionki, naszyjniki, kolczyki",
    href: "/oferta",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
        <circle cx="12" cy="14" r="7" />
        <path d="M8.5 3h7l-2.5 4h-2L8.5 3z" />
      </svg>
    ),
  },
  {
    title: "Zegarki",
    subtitle: "Damskie, męskie, sportowe",
    href: "/oferta",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l2.5 2.5" />
        <path d="M9 2h6M9 22h6" />
      </svg>
    ),
  },
  {
    title: "Serwis",
    subtitle: "Naprawa, wymiana baterii",
    href: "/oferta",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export default function Categories() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 divide-y divide-light-border border-y border-light-border sm:grid-cols-3 sm:divide-x sm:divide-y-0"
    >
      {categories.map((cat) => (
        <motion.div key={cat.title} variants={item}>
          <Link
            href={cat.href}
            className="group flex flex-col items-center px-6 py-12 text-center transition-colors hover:bg-warm-white sm:py-14"
          >
            <div className="mb-4 text-mid transition-all duration-500 group-hover:scale-110 group-hover:text-gold">
              {cat.icon}
            </div>
            <h3 className="font-serif text-base font-light uppercase tracking-heading text-charcoal">
              {cat.title}
            </h3>
            <p className="mt-1 text-xs text-mid">{cat.subtitle}</p>
          </Link>
        </motion.div>
      ))}
    </motion.section>
  );
}
