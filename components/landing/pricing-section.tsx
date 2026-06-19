"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Check, Sparkles, Leaf, PackageOpen, Heart } from "lucide-react";
import { usePlatformUser } from "@/hooks/use-platform-user";
import {
  PLATFORM_URL,
  getPlatformCtaLabels,
  getPricingCardCta,
  isCurrentPlan,
  planToKey,
} from "@/lib/platform-user";

type PlanAccent = "neutral" | "blue" | "pink";

const planAccentClasses: Record<
  PlanAccent,
  {
    check: string;
    cardBorder: string;
    cardBorderHighlight: string;
    trialBadge: string;
    cta: string;
    planName: string;
    indexLabel: string;
  }
> = {
  neutral: {
    check: "text-muted-foreground",
    cardBorder: "border-foreground/10",
    cardBorderHighlight: "",
    trialBadge: "",
    cta: "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5",
    planName: "",
    indexLabel: "text-muted-foreground",
  },
  blue: {
    check: "text-blue-600",
    cardBorder: "border-blue-500/25",
    cardBorderHighlight: "border-blue-500/50 lg:ring-2 lg:ring-blue-500/20",
    trialBadge: "bg-blue-600 text-white",
    cta: "bg-blue-600 text-white hover:bg-blue-700",
    planName: "text-blue-700 dark:text-blue-400",
    indexLabel: "text-blue-600/90 dark:text-blue-400/90",
  },
  pink: {
    check: "text-pink-600 dark:text-pink-400",
    cardBorder: "border-pink-500/25",
    cardBorderHighlight: "",
    trialBadge: "",
    cta: "bg-pink-600 text-white hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600",
    planName: "text-pink-700 dark:text-pink-400",
    indexLabel: "text-pink-600/90 dark:text-pink-400/90",
  },
};

const plans: Array<{
  name: string;
  tagline: string;
  monthlyLabel: string;
  annualLabel: string;
  description: string;
  featureList: string[];
  cta: string;
  highlight: boolean;
  accent: PlanAccent;
  carbonMonthly?: string;
  carbonAnnual?: string;
}> = [
  {
    name: "Free",
    tagline: "The essentials for casual learning.",
    monthlyLabel: "$0",
    annualLabel: "$0",
    description: "Acosta AI Free",
    accent: "neutral",
    featureList: [
      "Unlimited Fast Mode",
      "Unlimited Live Conversation",
      "Unlimited Audio Tools",
      "Search Messages / mo: 500",
      "Thinking Messages / mo: 10",
      "Study Tools / mo: 10",
      "Images / mo: 10",
      "Analysis / mo: 5",
      "Exam Simulations / mo: 1",
    ],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Go",
    tagline: "For serious students and power users.",
    monthlyLabel: "$10",
    annualLabel: "$105",
    description: "Acosta AI Go",
    featureList: [
      "Everything in Free",
      "Unlimited Search Mode",
      "Thinking Messages / mo: 50",
      "Study Tools / mo: 50",
      "Images / mo: 50",
      "Analysis / mo: 30",
      "Exam Simulations / mo: 10",
    ],
    cta: "Start Go",
    highlight: true,
    accent: "blue",
    carbonMonthly: "$0.50/mo",
    carbonAnnual: "$5.25/yr",
  },
  {
    name: "Max",
    tagline: "Limitless intelligence without boundaries.",
    monthlyLabel: "$30",
    annualLabel: "$315",
    description: "Acosta AI Max",
    featureList: [
      "Everything in Go",
      "Unlimited Thinking Mode",
      "Unlimited Study Tools",
      "Unlimited Image Generation",
      "Unlimited Content Analysis",
      "Unlimited Exam Simulations",
    ],
    cta: "Choose Max",
    highlight: false,
    accent: "pink",
    carbonMonthly: "$1.50/mo",
    carbonAnnual: "$15.75/yr",
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { user } = usePlatformUser();
  const labels = getPlatformCtaLabels(user);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2, rootMargin: "0px 0px -20% 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="relative py-28 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
              <span className="w-12 h-px bg-foreground/30" />
              Pricing
            </span>
            <h2 className={`text-5xl md:text-7xl lg:text-[112px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0 blur-0 scale-100" : "opacity-0 translate-y-8 blur-md scale-[0.98]"
            }`}>
              Learn with
              <br />
              <span className="text-muted-foreground">confidence.</span>
            </h2>
            {labels.pricingIntro && (
              <p className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed">
                {labels.pricingIntro}
              </p>
            )}
          </div>

          <div className="lg:col-span-4 flex items-end lg:justify-end">
            <div
              className={`transition-all duration-1000 delay-100 ${
                isVisible ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-[0.98]"
              }`}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.03] p-1 text-sm">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`rounded-full px-4 py-2 transition-colors ${!isAnnual ? "bg-foreground text-background" : "text-muted-foreground"}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`rounded-full px-4 py-2 transition-colors ${isAnnual ? "bg-foreground text-background" : "text-muted-foreground"}`}
                >
                  Annual
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="grid lg:grid-cols-3 gap-4 lg:gap-0">
            {plans.map((plan, index) => {
              const accent = planAccentClasses[plan.accent];
              const cardPlan = planToKey(plan.name);
              const isYourPlan = isCurrentPlan(user, cardPlan);
              const cardCta = getPricingCardCta(user, cardPlan, plan.cta);
              return (
              <div
                key={plan.name}
                className={`relative bg-background border transition-all duration-700 ${
                  accent.cardBorder
                } ${
                  isYourPlan
                    ? "ring-2 ring-foreground/20 lg:z-10"
                    : plan.highlight
                    ? `${accent.cardBorderHighlight} lg:-mx-2 lg:z-10 lg:scale-105`
                    : "lg:first:-mr-2 lg:last:-ml-2"
                } ${
                  isVisible
                    ? "opacity-100 translate-y-0 blur-0 scale-100"
                    : "opacity-0 translate-y-12 blur-md scale-[0.98]"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {isYourPlan && (
                  <div className="absolute -top-4 left-8 right-8 flex justify-center">
                    <span className="inline-flex items-center gap-2 bg-foreground px-4 py-2 text-xs font-mono uppercase tracking-widest text-background">
                      Your plan
                    </span>
                  </div>
                )}

                {plan.highlight && !isAnnual && !isYourPlan && (
                  <div className="absolute -top-4 left-8 right-8 flex justify-center">
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-widest ${
                        accent.trialBadge || "bg-foreground text-background"
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      30-Day Free Trial
                    </span>
                  </div>
                )}

                <div className="p-8 lg:p-10">
                  <div className="mb-8 pb-8 border-b border-foreground/10">
                    <span className={`font-mono text-xs ${accent.indexLabel}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className={`text-2xl lg:text-3xl font-display mt-2 ${accent.planName}`}>{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                    <p className="text-sm text-muted-foreground mt-2">{plan.tagline}</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl lg:text-6xl font-display">
                        {isAnnual ? plan.annualLabel : plan.monthlyLabel}
                      </span>
                      <span className="text-muted-foreground text-sm">{isAnnual ? "/yr" : "/mo"}</span>
                    </div>
                    {plan.carbonMonthly && plan.carbonAnnual && (
                      <p className="text-xs text-green-600 mt-2 font-mono inline-flex items-center gap-1">
                        <Leaf className="w-3 h-3" />
                        Contributes {isAnnual ? plan.carbonAnnual : plan.carbonMonthly} to carbon removal
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-10">
                    {plan.featureList.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${accent.check}`} />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={PLATFORM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group ${accent.cta}`}
                  >
                    {cardCta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
              );
            })}
          </div>
        </div>

        <div
          className={`mt-16 grid gap-5 md:grid-cols-2 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 lg:p-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-foreground/10 bg-background text-blue-600 dark:text-blue-400">
                <PackageOpen className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">Credit top-ups</h3>
            </div>
            <p className="m-0 text-sm leading-relaxed text-muted-foreground">
              Bought more than your plan includes this month? Grab a one-time{" "}
              <strong className="font-medium text-foreground">Top-Up Pack</strong> (for example, 50 Thinking Credits).
              Top-ups <strong className="font-medium text-foreground">do not expire</strong> while your account is
              active and are only used <strong className="font-medium text-foreground">after</strong> you reach your
              plan&apos;s monthly limits. Available on the platform — one-time purchase, non-refundable.
            </p>
          </div>
          <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 lg:p-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-foreground/10 bg-background text-pink-600 dark:text-pink-400">
                <Heart className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">Donate &amp; support</h3>
            </div>
            <p className="m-0 text-sm leading-relaxed text-muted-foreground">
              Love what we&apos;re building? Optional{" "}
              <strong className="font-medium text-foreground">Supporter</strong> contributions are voluntary donations
              that help sustain Acosta AI. They show a special badge in-app but{" "}
              <strong className="font-medium text-foreground">don&apos;t add credits or features</strong> — they&apos;re
              a way to say thanks. Non-refundable. Find it in the platform when you&apos;re ready.
            </p>
          </div>
        </div>

        <div className={`mt-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pt-12 border-t border-foreground/10 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-[0.98]"
        }`}>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
              Encrypted execution
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0 text-pink-600 dark:text-pink-400" />
              Full audit logs
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0 text-muted-foreground" />
              Student-first design
            </span>
          </div>
          <a href={PLATFORM_URL} target="_blank" rel="noreferrer" className="link-wipe text-sm hover:text-foreground transition-colors">
            {user ? labels.primaryShort : "Open platform"}
          </a>
        </div>
      </div>
    </section>
  );
}
