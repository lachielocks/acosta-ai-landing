"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { ArrowUpRight } from "lucide-react";
import { usePlatformUser } from "@/hooks/use-platform-user";
import { PLATFORM_URL, getPlatformCtaLabels } from "@/lib/platform-user";

const footerLinks = {
  Product: [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
  ],
  Trust: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Enterprise Terms", href: "/enterprise-terms" },
    { name: "Safety Features", href: "/safety" },
    { name: "Status", href: "https://status.acosta-ai.com" },
  ],
  Company: [
    { name: "About", href: "https://transnology.co" },
    { name: "Support", href: "mailto:support@acosta-ai.com" },
    { name: "Contact", href: "https://transnology.co/contact" },
    { name: "Work Here", href: "https://transnology.co/work-here" },
  ],
};

export function FooterSection() {
  const { user } = usePlatformUser();
  const labels = getPlatformCtaLabels(user);
  const isExternalPageLink = (href: string) => href.startsWith("http");
  const platformLink = {
    name: labels.primaryShort,
    href: PLATFORM_URL,
  };

  return (
    <footer className="border-t border-foreground/10 py-16 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <Stagger
          className="grid gap-12 md:grid-cols-5"
          amount={0.2}
          triggerMargin="0px 0px -20% 0px"
        >
          <StaggerItem>
            <div className="md:col-span-2">
              <a href="#" className="link-wipe text-2xl font-display tracking-tight">
                Acosta AI
              </a>
              <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
                Private, student-first AI for deeper learning, smarter study, and better outcomes.
              </p>
            </div>
          </StaggerItem>

          {Object.entries(footerLinks).map(([title, links]) => {
            const sectionLinks =
              title === "Product" ? [...links, platformLink] : links;

            return (
            <StaggerItem key={title}>
              <div>
                <h3 className="text-sm font-medium mb-4">{title}</h3>
                <ul className="space-y-3">
                  {sectionLinks.map((link) => (
                    <li key={link.name}>
                      {isExternalPageLink(link.href) ? (
                        <a
                          href={link.href}
                          className="link-wipe text-sm text-muted-foreground hover:text-foreground transition-colors"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className="inline-flex items-center gap-1.5">
                            {link.name}
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </span>
                        </a>
                      ) : (
                      <a
                        href={link.href}
                        className="link-wipe text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.08} direction="up" distance={12} blur={4}>
          <div className="mt-12 pt-8 border-t border-foreground/10 flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>&copy; 2026 Acosta AI. All rights reserved.</p>
            <p>Built for students and teachers.</p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
