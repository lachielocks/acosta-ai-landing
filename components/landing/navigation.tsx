"use client";

import PillNav from "@/components/ui/PillNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePlatformUser } from "@/hooks/use-platform-user";
import { PLATFORM_URL, getPlatformCtaLabels } from "@/lib/platform-user";

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

  const navItems = [
    { label: "Classes", href: "#classes" },
    { label: "Features", href: "#features" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Trust Centre", href: "/policies" },
    { label: labels.nav, href: PLATFORM_URL },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="w-full max-w-5xl flex justify-center pointer-events-auto">
        <PillNav
          logo="/branding/favicon-on-dark-bg.png"
          logoAlt="Acosta AI"
          logoHref="#"
          items={navItems}
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
