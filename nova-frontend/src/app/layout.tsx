import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { LenisProvider } from "@/components/providers/LenisProvider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  title: "Nova - Presence, reimagined.",
  description:
    "Nova is a new kind of wearable device. Crafted for those who value what they carry.",
  openGraph: {
    title: "Nova - Presence, reimagined.",
    description: "A new kind of wearable. Launching soon.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
