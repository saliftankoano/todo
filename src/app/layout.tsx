import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "To do",
  description: "To do app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
