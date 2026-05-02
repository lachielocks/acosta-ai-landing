"use client";

import { GraduationCap, Heart, Quote } from "lucide-react";

export function FounderSection() {
  return (
    <section id="founder" className="py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight">
            Built by a student,
            <br />
            for students. (and teachers!)
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            One person. One mission. A tool that students actually deserve.
          </p>
        </div>

        <div className="rounded-[32px] p-10 md:p-14 relative overflow-hidden border border-foreground/10 bg-foreground/[0.02]">
          <div className="absolute top-6 left-8 text-primary/30 pointer-events-none">
            <Quote className="w-16 h-16" />
          </div>
          <blockquote className="relative z-10 space-y-8">
            <p className="text-2xl md:text-4xl font-black leading-tight tracking-tight max-w-4xl">
              The best tools do not just perform — they earn your trust. Private by design. Beautiful by intention. Built to actually help.
            </p>
            <footer className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-bold">Lachie Thurlow</p>
                <p className="text-sm text-muted-foreground">Founder & CEO, Acosta AI</p>
              </div>
            </footer>
          </blockquote>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-[28px] p-8 space-y-6 border border-foreground/10 bg-foreground/[0.02]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <GraduationCap className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Lachie Thurlow</h3>
                <p className="text-sm text-muted-foreground">Founder & CEO</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              A high school student who got tired of AI tools that felt clunky, invasive, and built for someone else. So he built his own. Every line of code, every design decision, and every feature in Acosta AI came from one person who wanted a better way to learn.
            </p>
          </div>

          <div className="rounded-[28px] p-8 space-y-6 relative overflow-hidden bg-gradient-to-br from-[#2563eb] to-[#4f46e5] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18)_0%,transparent_60%)]" />
            <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest">
              Our Mission
            </div>
            <p className="relative z-10 text-2xl font-black leading-tight">
              Give every student access to a world-class learning companion.
            </p>
            <p className="relative z-10 text-white/80 leading-relaxed">
              One that respects privacy, adapts to individual needs, and makes studying worth doing. Not another surveillance tool dressed up as a tutor — a genuine partner in learning.
            </p>
            <div className="relative z-10 flex items-center gap-3 pt-2">
              <Heart className="w-5 h-5 text-white/70" />
              <span className="text-white/70 text-sm font-medium">Made with purpose, not profit.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
