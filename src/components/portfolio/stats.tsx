"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Clock3, FolderCheck, type LucideIcon } from "lucide-react";

import { fadeUp, staggerContainer, viewportOnce } from "./animations";

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1200;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplay(Math.round(eased * value));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: LucideIcon;
}

interface StatsProps {
  projectCount: number;
}

export function Stats({ projectCount }: StatsProps) {
  const stats: StatItem[] = [
    {
      label: "Freshgraduate",
      value: 0,
      suffix: "+",
      icon: Clock3,
    },
    {
      label: "Proyek Selesai",
      value: projectCount,
      suffix: "+",
      icon: FolderCheck,
    },
    {
      label: "Penghargaan & Sertifikat",
      value: 1,
      suffix: "",
      icon: Award,
    },
  ];

  return (
    <section aria-label="Statistik singkat" className="w-full py-12 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid w-full grid-cols-1 overflow-hidden rounded-3xl border border-border/70 bg-card/60 sm:grid-cols-3"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className={`group relative flex items-center gap-5 px-7 py-7 transition-colors hover:bg-ember-500/5 sm:px-8 ${
                  index > 0
                    ? "border-t border-border/70 sm:border-l sm:border-t-0"
                    : ""
                }`}
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-ember-500/10 text-ember-700 transition-transform duration-300 group-hover:scale-110 dark:bg-ember-400/10 dark:text-ember-300">
                  <Icon className="size-5" />
                </span>

                <div className="min-w-0">
                  <p className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>

                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
