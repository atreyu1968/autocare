import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoCare",
  description: "Mantenimiento preventivo y predictivo de vehículos"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
