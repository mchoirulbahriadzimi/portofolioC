
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { profile } from "@/config/profile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "#beranda", label: "Beranda" },
  { href: "#tentang", label: "Tentang" },
  { href: "#keahlian", label: "Keahlian" },
  { href: "#proyek", label: "Proyek" },
  { href: "#kontak", label: "Kontak" },
] as const;

// Sesuaikan jika tinggi navbar berubah.
const NAVBAR_OFFSET = 10;

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");
  const [menuOpen, setMenuOpen] = useState(false);

  // Posisi scroll tujuan saat klik menu (kunci sementara scrollspy).
  const scrollLockTargetRef = useRef<number | null>(null);

  // Progress bar scroll halus (amber).
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  // Efek tampilan navbar ketika halaman di-scroll.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Menandai menu berdasarkan posisi scroll (scrollspy deterministik):
  // section aktif = section terakhir yang melewati garis batas viewport.
  useEffect(() => {
    let frame = 0;

    const computeActiveSection = () => {
      const sections = NAV_LINKS.map((link) =>
        document.getElementById(link.href.slice(1))
      ).filter((element): element is HTMLElement => Boolean(element));

      if (sections.length === 0) return;

      // Garis batas: section yang menyentuh/melewati garis ini dianggap aktif.
      const line = window.innerHeight * 0.35;

      let currentId = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) {
          currentId = section.id;
        } else {
          break;
        }
      }

      // Di dasar halaman, pastikan menu terakhir (Kontak) yang aktif.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      if (atBottom) {
        currentId = sections[sections.length - 1].id;
      }

      setActiveSection(currentId);
    };

    const onScroll = () => {
      // Throttle dengan requestAnimationFrame agar hemat performa.
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;

        const lockTarget = scrollLockTargetRef.current;

        if (lockTarget !== null) {
          // Scroll programatik (klik menu) sedang berlangsung:
          // pertahankan pilihan klik sampai posisi target tercapai.
          if (Math.abs(window.scrollY - lockTarget) <= 12) {
            scrollLockTargetRef.current = null;
            computeActiveSection();
          }
          return;
        }

        computeActiveSection();
      });
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Scroll menuju section dengan memperhitungkan tinggi navbar.
  const handleNavClick = useCallback(
    (
      event: React.MouseEvent<HTMLAnchorElement>,
      href: string
    ) => {
      event.preventDefault();

      const sectionId = href.slice(1);
      const section = document.getElementById(sectionId);

      setMenuOpen(false);

      if (!section) return;

      const sectionTop =
        section.getBoundingClientRect().top + window.scrollY;

      const targetPosition = Math.max(
        0,
        sectionTop - NAVBAR_OFFSET
      );

      window.history.replaceState(null, "", href);

      // Kunci scrollspy selama animasi scroll berlangsung agar menu yang
      // diklik tetap aktif, lalu terbuka otomatis saat target tercapai.
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const lockedTarget = Math.min(targetPosition, maxScroll);

      scrollLockTargetRef.current = lockedTarget;

      // Pengaman: lepas kunci jika animasi scroll tidak selesai juga.
      window.setTimeout(() => {
        if (scrollLockTargetRef.current === lockedTarget) {
          scrollLockTargetRef.current = null;
        }
      }, 2000);

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      setActiveSection(sectionId);
    },
    []
  );

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 w-full pt-3 sm:pt-4"
    >
      <nav
        aria-label="Navigasi utama"
        className={cn(
          "mx-auto flex h-14 w-[calc(100%-2rem)] max-w-5xl items-center justify-between rounded-2xl border px-3 transition-all duration-300 sm:w-[calc(100%-3rem)] sm:h-16 sm:px-4",
          scrolled
            ? "border-border/80 bg-card/85 shadow-lg shadow-ink-950/5 backdrop-blur-xl dark:shadow-black/20"
            : "border-transparent bg-card/60 backdrop-blur-lg"
        )}
      >
        {/* Logo dan nama */}
        <a
          href="#beranda"
          aria-label="Kembali ke beranda"
          onClick={(event) => handleNavClick(event, "#beranda")}
          className="group flex min-h-11 items-center gap-2.5 pl-1.5"
        >
          <motion.span
            whileHover={{ rotate: -8, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative flex size-9 items-center justify-center rounded-xl bg-ink-900 font-display text-sm font-bold text-cream-50 shadow-sm dark:bg-cream-100 dark:text-ink-950"
          >
            {profile.monogram}
            <span className="absolute -right-1 -top-1 size-2.5 rounded-full border-2 border-card bg-ember-500" />
          </motion.span>

          <span className="hidden font-display font-semibold tracking-tight sm:block">
            {profile.name}
          </span>
        </a>

        {/* Navigasi desktop */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link, index) => {
            const isActive =
              activeSection === link.href.slice(1);

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(event) =>
                    handleNavClick(event, link.href)
                  }
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "group relative inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground",
                    isActive
                      ? "text-ember-700 dark:text-ember-300"
                      : "text-muted-foreground"
                  )}
                >
                  <span className="font-mono text-[10px] leading-none text-ember-500/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute -bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-ember-500"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Tombol tema dan navigasi mobile */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="size-10 rounded-full"
            aria-label="Ganti tema terang/gelap"
            onClick={toggleTheme}
          >
            <Sun className="size-5 dark:hidden" />
            <Moon className="hidden size-5 dark:block" />
          </Button>

          {/* Tombol kontak desktop */}
          <Button
            asChild
            className="hidden h-10 rounded-full px-5 font-display sm:inline-flex"
          >
            <a
              href="#kontak"
              onClick={(event) =>
                handleNavClick(event, "#kontak")
              }
            >
              Hubungi Saya
            </a>
          </Button>

          {/* Navigasi mobile */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-10 rounded-full lg:hidden"
                aria-label="Buka menu navigasi"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2.5">
                  <span className="relative flex size-8 items-center justify-center rounded-lg bg-ink-900 font-display text-xs font-bold text-cream-50 dark:bg-cream-100 dark:text-ink-950">
                    {profile.monogram}
                    <span className="absolute -right-1 -top-1 size-2 rounded-full border-2 border-card bg-ember-500" />
                  </span>

                  {profile.name}
                </SheetTitle>

                <SheetDescription>
                  Navigasi portofolio
                </SheetDescription>
              </SheetHeader>

              <nav
                aria-label="Navigasi seluler"
                className="flex flex-col gap-1 px-4"
              >
                {NAV_LINKS.map((link, index) => {
                  const isActive =
                    activeSection === link.href.slice(1);

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(event) =>
                        handleNavClick(event, link.href)
                      }
                      aria-current={
                        isActive ? "location" : undefined
                      }
                      className={cn(
                        "flex h-11 items-center gap-2.5 rounded-xl px-3 text-sm font-medium transition-colors hover:bg-secondary",
                        isActive &&
                          "bg-ember-500/10 text-ember-700 dark:text-ember-300"
                      )}
                    >
                      <span className="font-mono text-[10px] text-ember-500/80">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </a>
                  );
                })}

                <Button asChild className="mt-3 h-11 rounded-xl font-display">
                  <a
                    href="#kontak"
                    onClick={(event) =>
                      handleNavClick(event, "#kontak")
                    }
                  >
                    Hubungi Saya
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Progress bar scroll (amber) */}
      <motion.div
        aria-hidden
        style={{ scaleX: scrollProgress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-top bg-gradient-to-r from-ember-600 via-ember-500 to-ember-400"
      />
    </motion.header>
  );
}
