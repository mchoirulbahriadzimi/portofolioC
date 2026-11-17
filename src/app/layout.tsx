import type { Metadata } from "next";
import { Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { ThemeProvider } from "@/components/portfolio/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { profile } from "@/config/profile";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `Portofolio — ${profile.name}`,
  description:
    "Portofolio pribadi full-stack developer: proyek web & mobile, keahlian, dan kontak. Terbuka untuk kesempatan kerja dan kolaborasi.",
  keywords: [
    "portofolio",
    "full-stack developer",
    "web developer",
    "mobile developer",
    "Next.js",
    "React",
    "Indonesia",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `Portofolio — ${profile.name}`,
    description:
      "Full-Stack Developer | Web & Mobile — lihat proyek, keahlian, dan hubungi saya.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MotionConfig reducedMotion="user">
            {children}
            <Toaster richColors position="bottom-right" />
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
