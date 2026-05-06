"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Check, Sparkles, Leaf } from "lucide-react";

const plans = [
  {
    name: "Free",
    tagline: "The essentials for casual learning.",
    monthlyLabel: "$0",
    annualLabel: "$0",
    description: "Acosta AI Free",
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
    carbonMonthly: "$1.50/mo",
    carbonAnnual: "$15.75/yr",
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
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
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              Learn with
              <br />
              <span className="text-muted-foreground">confidence.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex items-end lg:justify-end">
            <div className={`transition-all duration-1000 delay-100 ${isVisible ? "opacity-100" : "opacity-0"}`}>
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
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative bg-background border transition-all duration-700 ${
                  plan.highlight 
                    ? "border-foreground lg:-mx-2 lg:z-10 lg:scale-105" 
                    : "border-foreground/10 lg:first:-mr-2 lg:last:-ml-2"
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {plan.highlight && !isAnnual && (
                  <div className="absolute -top-4 left-8 right-8 flex justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs font-mono uppercase tracking-widest">
                      <Sparkles className="w-3 h-3" />
                      30-Day Free Trial
                    </span>
                  </div>
                )}

                <div className="p-8 lg:p-10">
                  <div className="mb-8 pb-8 border-b border-foreground/10">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-display mt-2">{plan.name}</h3>
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
                        <Check className="w-4 h-4 text-[#eca8d6] mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://platform.acosta-ai.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group ${
                      plan.highlight
                        ? "bg-foreground text-background hover:bg-foreground/90"
                        : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pt-12 border-t border-foreground/10 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#eca8d6]" />
              Encrypted execution
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#eca8d6]" />
              Full audit logs
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#eca8d6]" />
              Student-first design
            </span>
          </div>
          <span className="text-sm text-muted-foreground">Acosta AI Free, Go, and Max tiers from the original pricing model.</span>
          <a href="https://platform.acosta-ai.com" target="_blank" rel="noreferrer" className="text-sm underline underline-offset-4 hover:text-foreground transition-colors">
            Open platform
          </a>
        </div>
      </div>
    </section>
  );
}
