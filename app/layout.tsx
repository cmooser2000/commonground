import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CommonGround — Share with your neighbors",
  description:
    "Borrow a tent, share a skill, ask for help. CommonGround connects neighbors through resource sharing — hyperlocal, trust-based, non-commercial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased bg-cream text-charcoal`}>
        {children}
      </body>
    </html>
  );
}
