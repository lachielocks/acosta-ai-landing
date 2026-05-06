"use client";

const footerLinks = {
  Product: [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Get Started", href: "https://platform.acosta-ai.com" },
  ],
  Trust: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
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
  return (
    <footer className="border-t border-foreground/10 py-16 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <a href="#" className="text-2xl font-display tracking-tight">
              Acosta AI
            </a>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Private, student-first AI for deeper learning, smarter study, and better outcomes.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-medium mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-foreground/10 flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 Acosta AI. All rights reserved.</p>
          <p>Built for students and teachers.</p>
        </div>
      </div>
    </footer>
  );
}
