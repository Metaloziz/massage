"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/content";
import { useBooking } from "@/components/booking/BookingProvider";
import { scrollToElement } from "@/components/layout/SmoothScroll";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { lockBodyScroll } from "@/lib/scrollLock";

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
  const { openSessionBooking } = useBooking();
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

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        menuOpen
          ? "border-b border-border bg-background"
          : solidBar
            ? "border-b border-border/60 bg-background/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
      }`}
      style={{ paddingRight: "var(--scrollbar-compensation, 0px)" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link
          href="/#about"
          className={`font-serif text-xl font-medium tracking-tight md:text-2xl ${
            !solidBar && !menuOpen ? "text-[var(--hero-text)]" : "text-foreground"
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
                  ? "text-[var(--hero-muted)] hover:text-[var(--hero-text)]"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle
            className={
              !solidBar
                ? "border-white/30 text-[var(--hero-text)] hover:border-white/60 hover:text-[var(--hero-text)]"
                : ""
            }
          />
          <button
            type="button"
            onClick={() => openSessionBooking()}
            className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            Записаться
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle
            className={
              !solidBar && !menuOpen
                ? "border-white/30 text-[var(--hero-text)] hover:border-white/60 hover:text-[var(--hero-text)]"
                : ""
            }
          />
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex h-11 w-11 items-center justify-center rounded-full border ${
              !solidBar && !menuOpen
                ? "border-white/30 text-[var(--hero-text)]"
                : "border-border text-foreground"
            }`}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 top-16 z-40 min-h-[calc(100dvh-4rem)] bg-background transition-all duration-500 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
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
              className="rounded-xl px-4 py-4 text-left text-lg font-medium transition-colors hover:bg-accent-light"
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openSessionBooking();
            }}
            className="mt-4 rounded-full bg-foreground px-6 py-4 text-base font-medium text-background"
          >
            Записаться
          </button>
        </nav>
      </div>
    </header>
  );
}
