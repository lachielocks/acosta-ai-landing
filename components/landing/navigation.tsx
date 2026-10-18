"use client";

import PillNav from "@/components/ui/PillNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePlatformUser } from "@/hooks/use-platform-user";
import { PLATFORM_URL, getPlatformCtaLabels } from "@/lib/platform-user";
import { ArrowUpRight } from "lucide-react";

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

  const navItems = [
    { label: "Classes", href: "#classes" },
    { label: "Features", href: "#features" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    {
      label: "Trust Centre",
      href: "/policies",
      icon: <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />,
      iconPosition: "end",
    },
  ];

  const ctaButton = isSignedIn ? (
    <a
      href={PLATFORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex h-[38px] sm:h-[44px] items-center gap-1.5 rounded-full border border-white/10 bg-[#26232e]/70 px-3.5 sm:px-4 text-xs sm:text-sm font-medium text-white shadow-md backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-[#34303f] hover:scale-[1.02] active:scale-[0.98]"
    >
      <span className="flex flex-col items-start leading-none gap-0.5">
        <span className="inline-flex items-center gap-1">
          {labels.nav}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
        {labels.planLabel && (
          <span className="text-[9px] font-mono uppercase tracking-wider text-white/50">
            {labels.planLabel}
          </span>
        )}
      </span>
    </a>
  ) : (
    <a
      href={PLATFORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex h-[38px] sm:h-[44px] items-center gap-1.5 rounded-full bg-white px-3.5 sm:px-4.5 text-xs sm:text-sm font-medium text-zinc-950 shadow-md transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
    >
      <span>Get started</span>
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="w-full max-w-5xl flex justify-center pointer-events-auto">
        <PillNav
          logo="/branding/favicon-on-dark-bg.png"
          logoAlt="Acosta AI"
          logoHref="#"
          items={navItems}
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
