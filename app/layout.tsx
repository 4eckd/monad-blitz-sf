import type { Metadata } from "next";
import "./globals.css";

// Using system fonts to avoid network dependency during build
// This ensures builds work in restricted network environments
const fontVariables = {
  sans: "var(--font-geist-sans, ui-sans-serif, system-ui, -apple-system, sans-serif)",
  mono: "var(--font-geist-mono, ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace)",
};

export const metadata: Metadata = {
  title: "Monad Blitz SF",
  description: "Next.js app with TypeScript, Tailwind CSS, and PostgreSQL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        style={{
          fontFamily: fontVariables.sans,
        }}
      >
        {children}
      </body>
    </html>
  );
}
