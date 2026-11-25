"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useFools } from "@/components/season/fools";
import { Reveal } from "@/components/ui/reveal";

export function PrivacyTrustSection() {
  const fools = useFools();

  return (
    <section id="privacy" data-fools-calm className="relative scroll-mt-28 border-t border-foreground/10 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1100px] gap-8 px-6 md:grid-cols-[1fr_1.1fr] md:items-center lg:gap-16">
        <div>
          <Reveal>
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground">
              {fools?.trustEyebrow ?? "Privacy"}
            </p>
            <h2 className="font-display text-4xl tracking-tight md:text-6xl">
              As private as private gets.
            </h2>
          </Reveal>
        </div>

        <div>
          <Reveal delay={0.08}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              No ads. We don&apos;t sell your data or use your chats to train AI models. Your data is stored in Australia, and you can clear your chats or delete your account whenever you choose. Some AI processing may happen overseas.
            </p>
            <Link
              href="/privacy"
              className="link-wipe link-wipe-flex mt-6 text-sm font-semibold text-foreground hover:text-primary"
            >
              Read our Privacy Policy
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
