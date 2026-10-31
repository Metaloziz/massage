"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/content";
import { scrollToElement } from "@/components/layout/SmoothScroll";
import { silkPrimaryClass } from "@/components/ui/Button";
import { useBooking } from "@/components/booking/BookingProvider";
import { lockBodyScroll } from "@/lib/scrollLock";
import { useThemeFlags } from "@/hooks/useThemeId";

function resolveNavHref(href: string) {
  if (href.startsWith("/#")) {
    return { pathname: "/", hash: href.slice(2) };
  }
  return { pathname: href, hash: null as string | null };
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isDesign2 } = useThemeFlags();
  const { openBooking } = useBooking();
  const onHero = pathname === "/" || pathname === "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    return lockBodyScroll();
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const { pathname: targetPath, hash } = resolveNavHref(href);

    if (hash) {
      if (pathname === "/" || pathname === "") {
        scrollToElement(`#${hash}`);
      } else {
        router.push(`/#${hash}`);
      }
      return;
    }

    if (targetPath === pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    router.push(targetPath);
  };

  useEffect(() => {
    if (pathname !== "/" && pathname !== "") return;
    const hash = window.location.hash;
    if (!hash) return;

    const timer = window.setTimeout(() => {
      scrollToElement(hash);
    }, 100);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  const solidBar = scrolled || menuOpen || !onHero;

  const barClass = menuOpen
    ? "border-b border-[var(--line)] bg-background"
    : solidBar
      ? isDesign2
        ? "border-b border-[var(--line)] bg-[#ebe4d2]/95 shadow-[var(--shadow-tile)]"
        : "border-b border-[var(--line)] bg-background/95 backdrop-blur-md"
      : "border-b border-transparent bg-transparent";

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${barClass}`}
      style={{ paddingRight: "var(--scrollbar-compensation, 0px)" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link
          href="/#about"
          className={`font-serif text-xl font-medium tracking-tight md:text-2xl ${
            !solidBar && !menuOpen
              ? isDesign2
                ? "text-[#f3f0e6]"
                : "text-[var(--hero-text)]"
              : "text-foreground"
          }`}
          onClick={(event) => {
            event.preventDefault();
            handleNavClick("/#about");
          }}
        >
          {site.brandDisplay}
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Основная навигация"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className={`text-sm transition-colors ${
                !solidBar
                  ? isDesign2
                    ? "text-[#f3f0e6]/75 hover:text-[#f3f0e6]"
                    : "text-[var(--hero-muted)] hover:text-[var(--hero-text)]"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={() => openBooking()}
            className={`${silkPrimaryClass} inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] border border-transparent bg-foreground px-5 py-2.5 text-sm font-medium tracking-[0.02em] text-background transition-all hover:bg-foreground/90`}
          >
            Записаться
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex h-11 w-11 items-center justify-center border ${
              !solidBar && !menuOpen
                ? isDesign2
                  ? "rounded-[var(--radius-control)] border-white/35 text-[#f3f0e6]"
                  : "rounded-[var(--radius-control)] border-white/30 text-[var(--hero-text)]"
                : "rounded-[var(--radius-control)] border-[var(--line)] text-foreground"
            }`}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 top-16 z-40 min-h-[calc(100dvh-4rem)] transition-all duration-500 lg:hidden ${
          "bg-background"
        } ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <nav
          className="flex flex-col gap-2 px-5 py-8"
          aria-label="Мобильная навигация"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="rounded-[var(--radius-control)] px-4 py-4 text-left text-lg font-medium transition-colors hover:bg-accent-light"
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openBooking();
            }}
            className={`${silkPrimaryClass} mt-4 inline-flex items-center justify-center rounded-[var(--radius-control)] border border-transparent bg-foreground px-6 py-4 text-center text-base font-medium tracking-[0.02em] text-background`}
          >
            Записаться
          </button>
        </nav>
      </div>
    </header>
  );
}
