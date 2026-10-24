import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Startup Pitch Competition 2026 — SABIS Sharjah Entrepreneurship Club",
  description:
    "Have a business idea you've always wanted to bring to life? Register for the Startup Pitch Competition hosted by the Entrepreneurship Club at SABIS International School, Sharjah.",
  keywords: ["startup", "pitch competition", "SABIS Sharjah", "entrepreneurship", "students", "UAE"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
