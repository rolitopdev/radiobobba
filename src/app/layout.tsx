import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RadioBobba - Nueva Experiencia",
  description: "Estamos planeando una nueva experiencia de usuario para ti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
