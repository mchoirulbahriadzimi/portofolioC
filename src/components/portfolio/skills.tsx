
"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  Server,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { skillGroups } from "@/config/profile";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./section-heading";
import { fadeUp, staggerContainer, viewportOnce } from "./animations";

const GROUP_ICONS: Record<string, LucideIcon> = {
  monitor: Monitor,
  server: Server,
  smartphone: Smartphone,
  wrench: Wrench,
};

export function Skills() {
  return (
    <section
      id="keahlian"
      className="scroll-mt-24 py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index={2}
          kicker="Keahlian"
          title={
            <>
              Teknologi yang Saya{" "}
              <span className="text-gradient">Kuasai</span>
            </>
          }
          description="Perangkat yang saya gunakan sehari-hari untuk membangun produk digital dari ujung ke ujung."
          align="center"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-10 grid w-full max-w-5xl grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
        >
          {skillGroups.map((group, groupIndex) => {
            const Icon = GROUP_ICONS[group.icon] ?? Wrench;

            return (
              <motion.div
                key={group.title}
                variants={fadeUp}
                className="h-full"
              >
                <div className="group relative flex h-full flex-col gap-4 rounded-3xl border border-border/70 bg-card/70 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-ember-500/50 hover:shadow-xl hover:shadow-ember-500/10">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl border border-ember-500/25 bg-ember-500/10 text-ember-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-ember-500/20 dark:border-ember-400/25 dark:bg-ember-400/10 dark:text-ember-300">
                      <Icon className="size-5" />
                    </span>

                    <span className="font-display text-3xl font-bold text-ink-200 transition-colors group-hover:text-ember-300 dark:text-ink-600 dark:group-hover:text-ember-700">
                      {String(groupIndex + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-semibold tracking-tight">
                    {group.title}
                  </h3>

                  <div className="flex w-full flex-1 flex-wrap content-start gap-2">
                    {(Array.isArray(group.skills) ? group.skills : []).map(
                      (skill) => {
                        const label =
                          typeof skill === "string"
                            ? skill
                            : skill?.name;

                        if (!label) return null;

                        return (
                          <Badge
                            key={label}
                            variant="secondary"
                            className="max-w-full whitespace-normal rounded-full text-center"
                          >
                            {label}
                          </Badge>
                        );
                      }
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
