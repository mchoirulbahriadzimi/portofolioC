
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

import { profile, type SocialLink } from "@/config/profile";
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
      className="relative flex min-h-[92svh] items-center overflow-hidden pt-24 pb-16 sm:pt-28"
    >
      {/* Latar: pola grid + blobs gradasi navy & cyan yang mengapung */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]" />
        <div className="animate-blob absolute -top-32 -left-32 size-[28rem] rounded-full bg-navy-500/20 blur-[130px] dark:bg-navy-400/20" />
        <div className="animate-blob-delayed absolute top-1/3 -right-40 size-[30rem] rounded-full bg-cyan-500/15 blur-[140px] dark:bg-cyan-400/20" />
        <div className="animate-blob-slow absolute bottom-0 left-1/3 size-80 rounded-full bg-navy-400/10 blur-[120px] dark:bg-cyan-300/10" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        {/* Kolom teks */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-6"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-700 dark:text-cyan-300"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-cyan-500" />
            </span>
            Terbuka untuk Kesempatan Kerja
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Halo, saya <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg font-semibold text-foreground/90 sm:text-xl"
          >
            {profile.roleLine}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base text-muted-foreground text-pretty sm:text-lg"
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
                className="h-11 gap-2 px-6 shadow-lg shadow-cyan-500/25"
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
                    className="size-11 rounded-xl transition-colors hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-300"
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
            className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-tr from-navy-500/25 via-cyan-500/10 to-cyan-400/25 blur-2xl"
          />

          {/* Ring gradasi berputar mengelilingi foto */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 rounded-[2.4rem] border-2 border-dashed border-cyan-500/30 dark:border-cyan-400/25"
          />

          <div className="relative rotate-1 rounded-[2rem] border border-navy-500/20 bg-card/80 p-2.5 shadow-2xl shadow-navy-500/15 backdrop-blur dark:border-cyan-400/20">
            <SafeImage
              src={profile.avatar}
              alt={`Foto profil ${profile.name}`}
              className="aspect-square w-full rounded-[1.6rem] object-cover"
              fallbackClassName="aspect-square rounded-[1.6rem]"
              fallbackIcon={
                <span className="text-5xl font-bold text-navy-700/40 dark:text-cyan-300/30">
                  {profile.monogram}
                </span>
              }
            />
          </div>

          {/* Kartu Freshgraduate */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
            className="absolute -top-5 -right-3 sm:-right-6"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/90 px-4 py-3 shadow-xl backdrop-blur"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-navy-500/15 text-navy-700 dark:bg-cyan-400/15 dark:text-cyan-300">
                <Award className="size-5" />
              </span>

              <span>
                <span className="block text-sm font-bold leading-tight">
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
            className="absolute -bottom-6 -left-3 sm:-left-6"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/90 px-4 py-3 shadow-xl backdrop-blur"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300">
                <FolderCheck className="size-5" />
              </span>

              <span>
                <span className="block text-sm font-bold leading-tight">
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
    </section>
  );
}
