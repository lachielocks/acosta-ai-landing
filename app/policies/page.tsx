import Link from "next/link";
import { ArrowLeft, ArrowRight, Shield } from "lucide-react";

const cards = [
  {
    title: "Privacy Policy",
    description:
      "How we handle your data, your rights, and the controls you have over your account.",
    href: "/privacy",
  },
  {
    title: "Safety Features",
    description:
      "Built-in guardrails for academic integrity, wellbeing support, and responsible usage.",
    href: "/safety",
  },
  {
    title: "Terms of Service",
    description:
      "The rules around acceptable use, billing, content ownership, and platform responsibilities.",
    href: "/terms",
  },
];

export default function PoliciesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-8">
          <Link href="/" className="link-wipe link-wipe-flex text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
            Trust Centre
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Transparency is at the core of Acosta AI. Explore our commitments to privacy, safety guardrails, and terms of use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-6 transition hover:border-foreground/30 hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {card.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm text-foreground">
                Read policy
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
