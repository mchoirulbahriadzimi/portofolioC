"use client";

import { ArrowUp, Github, Instagram, Linkedin, Mail, type LucideIcon } from "lucide-react";

import { profile, type SocialLink } from "@/config/profile";
import { Button } from "@/components/ui/button";

const SOCIAL_ICONS: Record<SocialLink["icon"], LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  mail: Mail,
};

const QUICK_LINKS = [
  { href: "#beranda", label: "Beranda" },
  { href: "#tentang", label: "Tentang" },
  { href: "#keahlian", label: "Keahlian" },
  { href: "#proyek", label: "Proyek" },
  { href: "#kontak", label: "Kontak" },
] as const;

/** Inisial display untuk tipografi raksasa footer (diambil dari nama profil). */
const DISPLAY_INITIALS = profile.name
  .split(/\s+/)
  .slice(0, 3)
  .map((word) => word.charAt(0).toUpperCase())
  .join("");

export function Footer() {
  return (
    <footer className="mt-auto overflow-hidden border-t border-border/60 bg-card/40">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Tipografi raksasa gaya editorial */}
        <p
          aria-hidden
          className="text-outline pointer-events-none -mb-4 mt-10 text-center font-display text-[16vw] leading-none font-bold tracking-tight select-none sm:-mb-6 sm:text-[11vw] lg:text-[7.5rem]"
        >
          {DISPLAY_INITIALS}
        </p>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#beranda"
              aria-label="Kembali ke beranda"
              className="flex items-center gap-2.5"
            >
              <span className="relative flex size-9 items-center justify-center rounded-xl bg-ink-900 font-display text-sm font-bold text-cream-50 shadow-sm dark:bg-cream-100 dark:text-ink-950">
                {profile.monogram}
                <span className="absolute -right-1 -top-1 size-2.5 rounded-full border-2 border-card bg-ember-500" />
              </span>
              <span className="font-display font-semibold tracking-tight">{profile.name}</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Lulusan S1 Informatika yang memiliki minat dalam pengembangan website, aplikasi, dan teknologi informasi. Siap terus belajar, mengembangkan kemampuan, serta berkontribusi melalui solusi teknologi yang bermanfaat.
            </p>
          </div>

          {/* Tautan cepat */}
          <nav aria-label="Tautan footer">
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Tautan Cepat
            </p>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-ember-700 dark:hover:text-ember-300"
                  >
                    <span className="font-mono text-[10px] text-ember-500/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sosial + ke atas */}
          <div>
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Ikuti Saya
            </p>
            <div className="flex items-center gap-2">
              {profile.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="icon"
                    className="size-10 rounded-full transition-colors hover:border-ember-500/60 hover:bg-ember-500/10 hover:text-ember-700 dark:hover:text-ember-300"
                    asChild
                  >
                    <a
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      aria-label={social.label}
                    >
                      <Icon className="size-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
            <Button variant="ghost" size="sm" className="mt-4 gap-2" asChild>
              <a href="#beranda">
                <ArrowUp className="size-4" />
                Kembali ke Atas
              </a>
            </Button>
          </div>
        </div>

        {/* Copyright — aman untuk safe area bawah (notch/home indicator) */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-border/60 py-6 pb-[calc(1.5rem_+_env(safe-area-inset-bottom))] text-center font-mono text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p>
            © 2025 {profile.name}. Dibuat dengan{" "}
            <span role="img" aria-label="cinta">
              ❤️
            </span>{" "}
            menggunakan Next.js
          </p>
          <p>Next.js · TypeScript · Tailwind CSS · shadcn/ui</p>
        </div>
      </div>
    </footer>
  );
}
