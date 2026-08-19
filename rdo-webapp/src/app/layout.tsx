import type { Metadata, Viewport } from "next";
import { Overpass } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const overpass = Overpass({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-overpass",
});

export const metadata: Metadata = {
  title: { default: "RDO Interproject", template: "%s | RDO Interproject" },
  description: "Diário de campo, apontamento de horas e integrações operacionais.",
  applicationName: "RDO Interproject",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0D151D",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={overpass.variable}>
      <body>{children}</body>
    </html>
  );
}
