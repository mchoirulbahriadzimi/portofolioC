"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { blurUp, fadeUp, staggerContainer, viewportOnce } from "./animations";

interface SectionHeadingProps {
  /** Label kecil di atas judul, mis. "Tentang Saya" */
  kicker: string;
  /** Judul section — bisa mengandung elemen bertanda (mis. <span> berwarna) */
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  /** Nomor urut editorial, mis. 01, 02 — opsional */
  index?: number;
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = "center",
  index,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      <motion.span
        variants={fadeUp}
        className="inline-flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
      >
        <span className="inline-block h-px w-8 bg-ember-500" aria-hidden />
        {typeof index === "number" ? (
          <span className="text-ember-600 dark:text-ember-400">
            {String(index).padStart(2, "0")}
          </span>
        ) : null}
        {kicker}
        {align === "center" ? (
          <span className="inline-block h-px w-8 bg-ember-500" aria-hidden />
        ) : null}
      </motion.span>
      <motion.h2
        variants={blurUp}
        className="max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={fadeUp}
          className={cn(
            "max-w-2xl text-base text-muted-foreground text-pretty",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
