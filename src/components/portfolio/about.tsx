
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      href: "https://maps.app.goo.gl/eSF2Tz6GSgBvzTzb7?g_st=ac",
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
    <section id="tentang" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
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
              <span className="text-sm font-medium text-foreground">
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
                    className="rounded-full border-navy-500/20 bg-navy-500/10 text-navy-800 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300"
                  >
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
          >
            <Card className="h-full rounded-2xl border-border/70 p-6 shadow-sm sm:p-8">
              <CardHeader className="px-0">
                <CardTitle className="text-lg">
                  Informasi Singkat
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-3 px-0">
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
                    className="flex items-center gap-4 rounded-xl border border-border/60 bg-background/40 p-4 transition-colors hover:border-cyan-500/40"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy-500/10 text-navy-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                      <item.icon className="size-5" />
                    </span>

                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
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
                          className="truncate text-sm font-semibold transition-colors hover:text-cyan-600 dark:hover:text-cyan-300"
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
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
