"use client";

import { useState, type FormEvent } from "react";

/**
 * To activate: sign up at https://formspree.io, create a form,
 * and replace this with your form ID (e.g. "xpzvqkdl").
 */
const FORMSPREE_ID = "xaqdkoly";

const FORMSPREE_URL = FORMSPREE_ID
  ? `https://formspree.io/f/${FORMSPREE_ID}`
  : "";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!FORMSPREE_URL) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
        <p className="font-serif text-lg font-light uppercase tracking-heading text-charcoal">
          Dziękujemy!
        </p>
        <p className="mt-2 text-sm text-text-light">
          Wiadomość została wysłana. Odpowiemy najszybciej jak to możliwe.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 border-b border-gold/40 text-xs uppercase tracking-wide-caps text-gold transition-colors hover:border-gold"
        >
          Wyślij kolejną
        </button>
      </div>
    );
  }

  return (
    <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="name"
          className="block text-xs uppercase tracking-wide-caps text-mid"
        >
          Imię i nazwisko
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1.5 w-full border border-light-border bg-white px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-gold"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-xs uppercase tracking-wide-caps text-mid"
        >
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1.5 w-full border border-light-border bg-white px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-gold"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-xs uppercase tracking-wide-caps text-mid"
        >
          Wiadomość
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1.5 w-full resize-none border border-light-border bg-white px-4 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-gold"
        />
      </div>

      {status === "error" && (
        <p className="text-xs text-red-600">
          {FORMSPREE_URL
            ? "Nie udało się wysłać wiadomości. Spróbuj ponownie."
            : "Formularz nie jest jeszcze skonfigurowany. Skontaktuj się telefonicznie."}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full border border-charcoal bg-charcoal px-6 py-3 text-xs uppercase tracking-wide-caps text-white transition-colors hover:bg-transparent hover:text-charcoal disabled:opacity-50"
      >
        {status === "sending" ? "Wysyłanie..." : "Wyślij wiadomość"}
      </button>
    </form>
  );
}
