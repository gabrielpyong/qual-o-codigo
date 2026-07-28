import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Qual o Código?", description: "Consulta rápida de códigos do açougue" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
