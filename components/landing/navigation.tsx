"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { usePlatformUser } from "@/hooks/use-platform-user";
import { PLATFORM_URL, getPlatformCtaLabels } from "@/lib/platform-user";

const navLinks = [
  { name: "Classes", href: "#classes" },
  { name: "Features", href: "#features" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
  { name: "Trust Centre", href: "/policies" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user } = usePlatformUser();
  const labels = getPlatformCtaLabels(user);
  const isSignedIn = Boolean(user);

  const ctaLinkClass = `text-sm transition-colors duration-300 relative group ${
    isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"
  }`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileMenuOpen]);

  const mobileMenu =
    mounted &&
    createPortal(
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-[90] bg-background"
          >
            <div className="flex h-full flex-col px-6 pb-8 pt-24 safe-area-pad">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute right-4 top-4 z-[91] rounded-full border border-foreground/10 p-2 text-foreground"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>

              <nav className="flex-1 overflow-y-auto py-4">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 + i * 0.04, duration: 0.25 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between rounded-2xl px-2 py-3 text-3xl font-display text-foreground transition-colors hover:text-muted-foreground sm:text-4xl"
                      >
                        <span>{link.name}</span>
                        {link.href === "/policies" && <ArrowUpRight className="h-5 w-5 shrink-0" />}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-foreground/10 pt-6">
                {isSignedIn ? (
                  <a
                    href={PLATFORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex w-full flex-col items-center gap-1 text-base font-medium text-foreground"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {labels.nav}
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                    {labels.planLabel && (
                      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        {labels.planLabel}
                      </span>
                    )}
                  </a>
                ) : (
                  <Button
                    className="h-12 w-full rounded-full bg-foreground text-base text-background"
                    asChild
                  >
                    <a
                      href={PLATFORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {labels.nav}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );

  return (
    <>
      <header
        className={`fixed z-50 transition-all duration-500 ${
          isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"
        }`}
      >
        <nav
          className={`mx-auto transition-all duration-500 ${
            isScrolled
              ? "max-w-[1200px] rounded-2xl border border-foreground/10 bg-background/80 shadow-lg backdrop-blur-xl"
              : "max-w-[1400px] bg-transparent"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`flex items-center justify-between px-5 transition-all duration-500 sm:px-6 lg:px-8 ${
              isScrolled ? "h-14" : "h-16 sm:h-20"
            }`}
          >
            <a href="#" className="flex min-w-0 items-center gap-2.5 group sm:gap-3">
              <img
                src={
                  isScrolled
                    ? "/branding/favicon-on-light-bg.png"
                    : "/branding/favicon-on-dark-bg.png"
                }
                alt="Acosta AI logo"
                className="h-7 w-auto shrink-0 transition-transform duration-500 group-hover:scale-105 sm:h-8"
              />
              <span
                className={`truncate font-display tracking-tight transition-all duration-500 ${
                  isScrolled ? "text-lg text-foreground sm:text-xl" : "text-xl text-white sm:text-2xl"
                }`}
              >
                Acosta AI
              </span>
            </a>

            <div className="hidden items-center gap-10 lg:gap-12 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative group text-sm transition-colors duration-300 ${
                    isScrolled
                      ? "text-foreground/70 hover:text-foreground"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {link.name}
                    {link.href === "/policies" && <ArrowUpRight className="h-3.5 w-3.5" />}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                      isScrolled ? "bg-foreground" : "bg-white"
                    }`}
                  />
                </a>
              ))}
            </div>

            <div className="hidden items-center md:flex">
              {isSignedIn ? (
                <a
                  href={PLATFORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ctaLinkClass}
                >
                  <span className="inline-flex flex-col items-end gap-0.5">
                    <span className="inline-flex items-center gap-1.5">
                      {labels.nav}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                    {labels.planLabel && (
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider ${
                          isScrolled ? "text-foreground/45" : "text-white/45"
                        }`}
                      >
                        {labels.planLabel}
                      </span>
                    )}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                      isScrolled ? "bg-foreground" : "bg-white"
                    }`}
                  />
                </a>
              ) : (
                <Button
                  size="sm"
                  className={`rounded-full transition-all duration-500 ${
                    isScrolled
                      ? "h-8 bg-foreground px-4 text-xs text-background hover:bg-foreground/90"
                      : "bg-white px-6 text-black hover:bg-white/90"
                  }`}
                  asChild
                >
                  <a href={PLATFORM_URL} target="_blank" rel="noopener noreferrer">
                    {labels.nav}
                  </a>
                </Button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className={`p-2 transition-colors duration-500 md:hidden ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </motion.div>
        </nav>
      </header>

      {mobileMenu}
    </>
  );
}
