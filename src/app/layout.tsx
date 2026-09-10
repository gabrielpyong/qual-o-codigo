import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Códigos Rissul", description: "Consulta rápida de códigos de produtos" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
