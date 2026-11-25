"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PillNav from "@/components/ui/PillNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePlatformUser } from "@/hooks/use-platform-user";
import { PLATFORM_URL, getPlatformCtaLabels } from "@/lib/platform-user";
import { ArrowUpRight } from "lucide-react";
import { useFools } from "@/components/season/fools";

function NavLink({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href?.startsWith("http");
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}

export function Navigation() {
  const isMobile = useIsMobile();
  const { user } = usePlatformUser();
  const labels = getPlatformCtaLabels(user);
  const isSignedIn = Boolean(user);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  const [sectionActiveHref, setSectionActiveHref] = useState("");
  const activeHref = isHome ? sectionActiveHref : "";
  const fools = useFools();

  const navItems = [
    { label: fools?.nav.features ?? "Features", href: sectionHref("features") },
    { label: fools?.nav.testimonials ?? "Testimonials", href: sectionHref("testimonials") },
    { label: fools?.nav.pricing ?? "Pricing", href: sectionHref("pricing") },
    { label: "Pause", href: sectionHref("pause") },
    {
      label: fools?.nav.trust ?? "Trust Centre",
      href: "/policies",
      icon: <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />,
      iconPosition: "end",
    },
    {
      label: "Thanks",
      href: "/thanks",
      icon: <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />,
      iconPosition: "end",
    },
  ];

  useEffect(() => {
    if (!isHome) return;

    const sectionIds = ["features", "testimonials", "pricing", "pause"];

    const handleScroll = () => {
      // 1. Top of page check (Hero section)
      const firstEl = document.getElementById("features");
      if (firstEl) {
        const firstRect = firstEl.getBoundingClientRect();
        if (firstRect.top > 260) {
          setSectionActiveHref("");
          return;
        }
      } else if (window.scrollY < 200) {
        setSectionActiveHref("");
        return;
      }

      // 2. Bottom of page check (past the final homepage section / Footer)
      const isNearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      const pauseEl = document.getElementById("pause");
      const pastPause = pauseEl ? pauseEl.getBoundingClientRect().bottom < 80 : false;

      if (isNearBottom || pastPause) {
        setSectionActiveHref("");
        return;
      }

      // 3. Find section currently centered in reading focal view
      const focalPoint = Math.min(260, window.innerHeight * 0.35);

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= focalPoint && rect.bottom > focalPoint) {
          setSectionActiveHref(`#${id}`);
          return;
        }
      }

      // 4. Fallback for section transitions
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= focalPoint) {
          setSectionActiveHref(`#${id}`);
          return;
        }
      }
    };

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  const handleItemClick = (item: { href?: string }) => {
    if (item.href?.startsWith("#")) {
      setSectionActiveHref(item.href);
    }
  };

  const ctaButton = isSignedIn ? (
    <a
      href={PLATFORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex h-[38px] sm:h-[44px] items-center gap-1.5 rounded-full border border-white/10 bg-[#26232e]/70 px-3.5 sm:px-4 text-xs sm:text-sm font-medium text-white shadow-md backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-[#34303f] hover:scale-[1.02] active:scale-[0.98]"
    >
      <span>{labels.nav}</span>
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  ) : (
    <a
      href={PLATFORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex h-[38px] sm:h-[44px] items-center gap-1.5 rounded-full bg-white px-3.5 sm:px-4.5 text-xs sm:text-sm font-medium text-zinc-950 shadow-md transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
    >
      <span>{fools?.nav.cta ?? "Get started"}</span>
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="w-full max-w-5xl flex justify-center pointer-events-auto">
        <PillNav
          logo="/branding/favicon-on-dark-bg.png"
          logoAlt="Acosta AI"
          logoHref={isHome ? "#" : "/"}
          items={navItems}
          activeHref={activeHref}
          onItemClick={handleItemClick}
          action={ctaButton}
          linkComponent={NavLink}
          itemStyle="pill"
          hoverEffect="fill"
          indicator="dot"
          surface="glass"
          theme="dark"
          size="md"
          collapse={isMobile ? "always" : "auto"}
        />
      </div>
    </header>
  );
}
