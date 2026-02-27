import type { Metadata } from "next";
import { cormorant, dmSans, inter } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zegarmistrzostwo — Biżuteria, Zegarki, Serwis | Bolesławiec",
  description:
    "Biżuteria, zegarki i profesjonalny serwis zegarmistrzowski w Bolesławcu. Rzemiosło spotyka elegancję.",
  icons: {
    icon: "/logo/logo-icon.svg",
    apple: "/logo/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${inter.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
