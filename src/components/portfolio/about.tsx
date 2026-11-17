
"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  GraduationCap,
  Mail,
  MapPin,
  type LucideIcon,
} from "lucide-react";

import { aboutHighlights, aboutParagraphs, profile } from "@/config/profile";
import { openEmailCompose } from "@/lib/email";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./section-heading";
import { fadeUp, slideInRight, staggerContainer, viewportOnce } from "./animations";

interface InfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

export function About() {
  const infoItems: InfoItem[] = [
    {
      icon: MapPin,
      label: "Lokasi",
      value: profile.location,
      href: "https://maps.app.goo.gl/7aih3FZaNN2Gvy2P6?g_st=ac",
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: GraduationCap,
      label: "Pendidikan",
      value: profile.education,
    },
    {
      icon: BadgeCheck,
      label: "Status",
      value: profile.availability,
    },
  ];

  // Email dibuka langsung ke aplikasi Gmail di ponsel.
  const handleEmailClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    openEmailCompose({ to: profile.email });
  };

  return (
    <section id="tentang" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index={1}
          align="left"
          kicker="Tentang Saya"
          title={
            <>
              Kenalan dengan <span className="text-gradient">Saya</span>
            </>
          }
          description="Sedikit cerita tentang latar belakang, pengalaman, dan ketertarikan saya di bidang teknologi informasi."
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-14">
          {/* Narasi */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-5"
          >
            {aboutParagraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={fadeUp}
                className="text-base leading-relaxed text-muted-foreground text-pretty"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-2 pt-2"
            >
              <span className="mr-1 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Fokus utama:
              </span>

              {aboutHighlights.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{
                    delay: 0.15 + index * 0.06,
                    type: "spring",
                    stiffness: 260,
                    damping: 18,
                  }}
                  className="inline-flex"
                >
                  <Badge
                    variant="secondary"
                    className="gap-1.5 rounded-full border border-ember-500/25 bg-ember-500/10 text-ember-800 dark:border-ember-400/25 dark:bg-ember-400/10 dark:text-ember-200"
                  >
                    <span className="size-1.5 rounded-full bg-ember-500" aria-hidden />
                    {tech}
                  </Badge>
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Kartu info */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative"
          >
            {/* Aksen sudut editorial */}
            <span
              aria-hidden
              className="absolute -top-3 -left-3 h-14 w-14 rounded-tl-3xl border-l-2 border-t-2 border-ember-500/50"
            />
            <span
              aria-hidden
              className="absolute -bottom-3 -right-3 h-14 w-14 rounded-br-3xl border-b-2 border-r-2 border-ember-500/50"
            />

            <div className="flex h-full flex-col gap-3 rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Informasi Singkat
              </p>

              <div className="mt-2 flex flex-col divide-y divide-border/60">
                {infoItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewportOnce}
                    transition={{
                      delay: 0.1 + index * 0.08,
                      duration: 0.45,
                      ease: "easeOut",
                    }}
                    className="group flex items-center gap-4 py-3.5 transition-colors"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-ember-500/25 bg-ember-500/10 text-ember-700 transition-transform group-hover:scale-105 dark:border-ember-400/25 dark:bg-ember-400/10 dark:text-ember-300">
                      <item.icon className="size-5" />
                    </span>

                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {item.label}
                      </p>

                      {item.href ? (
                        <a
                          href={item.href}
                          onClick={
                            item.label === "Email"
                              ? handleEmailClick
                              : undefined
                          }
                          target={item.external ? "_blank" : undefined}
                          rel={
                            item.external
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="truncate text-sm font-semibold transition-colors hover:text-ember-700 dark:hover:text-ember-300"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="truncate text-sm font-semibold">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
