
"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  FolderCheck,
  Github,
  Instagram,
  Linkedin,
  Mail,
  type LucideIcon,
} from "lucide-react";

import { aboutHighlights, profile, type SocialLink } from "@/config/profile";
import { SafeImage } from "./safe-image";
import { Button } from "@/components/ui/button";
import {
  fadeUp,
  hoverLift,
  slideInLeft,
  slideInRight,
  staggerContainer,
} from "./animations";

const SOCIAL_ICONS: Record<SocialLink["icon"], LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  mail: Mail,
};

interface HeroProps {
  projectCount: number;
}

export function Hero({ projectCount }: HeroProps) {
  return (
    <section
      id="beranda"
      className="relative flex min-h-[92svh] items-center overflow-hidden pt-28 pb-16 sm:pt-32"
    >
      {/* Latar: pola titik + glow hangat yang mengapung */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dotgrid [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]" />
        <div className="animate-blob absolute -top-32 -left-32 size-[28rem] rounded-full bg-ember-400/15 blur-[130px] dark:bg-ember-500/10" />
        <div className="animate-blob-delayed absolute top-1/3 -right-40 size-[30rem] rounded-full bg-cream-300/40 blur-[140px] dark:bg-ink-500/20" />
        <div className="animate-blob-slow absolute bottom-0 left-1/3 size-80 rounded-full bg-ember-300/15 blur-[120px] dark:bg-ember-600/10" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-8">
        {/* Kolom teks */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-6"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 rounded-full border border-ember-500/30 bg-ember-500/10 px-4 py-1.5 text-sm font-medium text-ember-700 dark:text-ember-300"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ember-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-ember-500" />
            </span>
            Terbuka untuk Kesempatan Kerja
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-[4.2rem]"
          >
            Halo, saya{" "}
            <span className="relative whitespace-nowrap">
              <span className="text-gradient">{profile.name}</span>
              <svg
                aria-hidden
                viewBox="0 0 220 12"
                className="absolute -bottom-1 left-0 w-full text-ember-500/70"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9C60 3 160 3 218 8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-mono text-sm font-medium uppercase tracking-[0.14em] text-ember-700 sm:text-base dark:text-ember-300"
          >
            {profile.roleLine}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={hoverLift.transition}
              className="inline-flex"
            >
              <Button
                asChild
                size="lg"
                className="h-12 gap-2 rounded-full px-7 font-display shadow-lg shadow-ink-950/15 dark:shadow-black/30"
              >
                <a href="#proyek">
                  Lihat Proyek Saya
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 pt-1"
          >
            {profile.socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon];

              return (
                <motion.span
                  key={social.label}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.94 }}
                  transition={hoverLift.transition}
                  className="inline-flex"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-11 rounded-full bg-card/70 transition-colors hover:border-ember-500/60 hover:bg-ember-500/10 hover:text-ember-700 dark:hover:text-ember-300"
                    asChild
                  >
                    <a
                      href={social.href}
                      target={
                        social.href.startsWith("http")
                          ? "_blank"
                          : undefined
                      }
                      rel="noreferrer"
                      aria-label={social.label}
                    >
                      <Icon className="size-5" />
                    </a>
                  </Button>
                </motion.span>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Kolom foto profil */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          <div
            aria-hidden
            className="absolute -inset-5 rounded-t-[10rem] rounded-b-[2.5rem] bg-gradient-to-b from-ember-400/25 via-ember-500/10 to-transparent blur-2xl"
          />

          {/* Bingkai arch editorial mengelilingi foto */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 rounded-t-[9.5rem] rounded-b-[2.3rem] border-2 border-dashed border-ember-500/40 dark:border-ember-400/30"
          />

          <div className="relative rounded-t-[9rem] rounded-b-[2rem] border border-ink-200/70 bg-card p-2.5 shadow-2xl shadow-ink-950/10 backdrop-blur dark:border-ink-500/30 dark:shadow-black/30">
            <SafeImage
              src={profile.avatar}
              alt={`Foto profil ${profile.name}`}
              className="aspect-[4/5] w-full rounded-t-[8rem] rounded-b-[1.5rem] object-cover"
              fallbackClassName="aspect-[4/5] rounded-t-[8rem] rounded-b-[1.5rem]"
              fallbackIcon={
                <span className="font-display text-5xl font-bold text-ember-700/40 dark:text-ember-300/30">
                  {profile.monogram}
                </span>
              }
            />

            {/* Strip nama bawah foto */}
            <p className="py-3 text-center font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {profile.location}
            </p>
          </div>

          {/* Kartu Freshgraduate */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
            className="absolute -top-4 -right-3 sm:-right-8"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/95 px-4 py-3 shadow-xl backdrop-blur"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-ember-500/15 text-ember-700 dark:bg-ember-400/15 dark:text-ember-300">
                <Award className="size-5" />
              </span>

              <span>
                <span className="block font-display text-sm font-bold leading-tight">
                  Freshgraduate
                </span>
              </span>
            </motion.div>
          </motion.div>

          {/* Kartu jumlah proyek selesai */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="absolute -bottom-8 -left-3 sm:-left-8"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/95 px-4 py-3 shadow-xl backdrop-blur"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-ink-900/10 text-ink-800 dark:bg-cream-100/10 dark:text-cream-100">
                <FolderCheck className="size-5" />
              </span>

              <span>
                <span className="block font-display text-sm font-bold leading-tight">
                  {projectCount}+ Proyek
                </span>

                <span className="block text-xs text-muted-foreground">
                  Selesai
                </span>
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Strip marquee kata kunci — memakai daftar fokus utama */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 border-y border-border/70 bg-card/50 py-3 backdrop-blur-sm"
      >
        <div className="flex w-max animate-marquee gap-10 pr-10">
          {[
            ...aboutHighlights,
            ...aboutHighlights,
            ...aboutHighlights,
            ...aboutHighlights,
          ].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground"
            >
              {item}
              <span className="text-ember-500">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
