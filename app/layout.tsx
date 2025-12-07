import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MACHUPS - AI-Powered Brand Generation",
  description: "Generate complete brand packages in under 3 minutes with AI. Logos, design tokens, mockups, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
