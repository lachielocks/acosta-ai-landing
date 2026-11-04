"use client";

import Link from "next/link";
import { Lock, Shield } from "lucide-react";
import { useFools } from "@/components/season/fools";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";

const highlights = [
  {
    title: "AI providers never train on your data",
    body: "Google, Anthropic and OpenAI process your requests only to answer them, on paid API terms. We don't sell your notes either.",
  },
  {
    title: "Vercel, Cloudflare & Firebase",
    body: "Your data is stored in Australia and our servers run in Sydney, on Vercel and Google Firebase, with Cloudflare handling DNS, CDN and security. AI requests are handled by enterprise AI providers under paid business terms, and some processing may happen overseas. Clear your chats or delete your whole account yourself, any time, in Settings.",
  },
  {
    title: "Stripe handles the scary money bits",
    body: "Payments never land your full card number on our servers — billing stays in Stripe’s PCI-DSS lane.",
  },
];

export function PrivacyTrustSection() {
  const fools = useFools();
  return (
    <section id="trust" data-fools-calm className="relative border-t border-foreground/10 py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-14 text-center">
          <Reveal>
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">{fools?.trustEyebrow ?? "Trust"}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl tracking-tight md:text-6xl">Privacy isn&apos;t a footnote.</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              The same promises in our Privacy Policy, distilled for humans who skim — not lawyers who bill by the comma.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.06}>
          <div className="mb-10 rounded-[32px] border border-foreground/10 bg-foreground/[0.02] p-8 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex max-w-3xl flex-col gap-4">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-foreground/15 bg-background/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <Shield className="h-3.5 w-3.5 text-primary" aria-hidden />
                Reality check
              </div>
              <p className="m-0 text-xl font-semibold leading-snug md:text-2xl">
                We do the unglamorous work so you don&apos;t have to think about it: your data stored in Australia, servers in Sydney, Cloudflare security,
                &quot;no model training&quot; paid API terms with Google, Anthropic and OpenAI, and delete buttons you can actually find.
              </p>
              <p className="m-0 text-base leading-relaxed text-muted-foreground">
                No shade to your syllabus — just a reminder that &quot;enterprise education&quot; and &quot;enterprise security&quot; are not always the same spreadsheet row. Acosta is built so your study life
                stays boring on leak trackers and exciting in your actual grades.
              </p>
            </div>
            <div className="shrink-0 rounded-3xl bg-primary/10 p-5 text-primary md:self-center">
              <Lock className="h-10 w-10 md:h-12 md:w-12" aria-hidden />
            </div>
          </div>
          </div>
        </Reveal>

        <Stagger className="grid gap-5 md:grid-cols-3" delay={0}>
          {highlights.map((item) => (
            <StaggerItem key={item.title}>
              <article className="rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-7 transition-all hover:-translate-y-1 hover:border-foreground/25">
                <h3 className="mt-0 text-lg font-bold">{item.title}</h3>
                <p className="mb-0 mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.12}>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Want the receipts?{" "}
            <Link href="/privacy" className="link-wipe font-medium text-foreground hover:text-primary">
              Read the full Privacy Policy
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
