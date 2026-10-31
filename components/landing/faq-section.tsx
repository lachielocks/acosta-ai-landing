"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const faqs = [
  {
    question: "What are Acosta Classes?",
    answer:
      "Classes are spaces where teachers create a class, invite students with a code, and assign tasks like flashcards, exams, lesson wrap-ups and class materials. Students open them inside Acosta and get the same guided help, scoped to what their teacher set.",
  },
  {
    question: "Is using Acosta AI considered cheating?",
    answer:
      "Acosta AI is a learning companion, not an answer machine. It's designed to help students understand and teachers teach - not to bypass effort. Features like step-by-step reasoning and exam simulation are built to develop your skills, not replace them.",
  },
  {
    question: "Is it for teachers too?",
    answer:
      "Absolutely. Acosta AI is built for both students and teachers. Teachers get Classes for assigning work, Live Quizzes for the room, and Prep, Adapt and Wrap for planning and running lessons.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. We never sell your data. Your chats and generated study content stay in your private workspace on encrypted Google infrastructure, our AI providers never train on your data, and you can clear your chat history or delete your whole account yourself in Settings. The details are in the Privacy Policy.",
  },
  {
    question: "What about privacy after the Canvas / Instructure news?",
    answer:
      "Fair question. Instructure, which runs Canvas LMS, publicly confirmed a large-scale security incident in 2026 — the kind of story that makes everyone audit their vendors. Acosta is architected the boring way: TLS in transit, Firebase/Firestore for auth and data, Vercel for hosting, Cloudflare for DNS, CDN and security, paid API terms with Google, Anthropic and OpenAI so AI providers never train on your data, Stripe for card data so we never store it, and Guardian burnout signals from session metadata — not by reading your messages. If Canvas has you side-eyeing edtech, we wrote our Privacy Policy so you can see exactly what we collect and why. TL;DR: we'd rather be forgettable on BleepingComputer than unforgettable on your dean's emergency email.",
  },
  {
    question: "What's included in the free plan?",
    answer:
      "Unlimited Fast Mode, plus monthly allowances for Core and Thinking messages, study tools, images and exam simulations. Need more? Grab a $5 top-up pack, which lasts as long as your account is active. No card needed to start, and you can try Fast Mode as a guest without an account.",
  },
  {
    question: "What is beta, and how do I get access?",
    answer:
      "Acosta AI is currently in beta - meaning we're actively building and improving the platform, but you also may experience the occasional bug.",
  },
  {
    question: "What subjects and exams does it support?",
    answer:
      "Acosta AI supports a wide range of subjects and curricula. It's built Australia-first, with NSW and the HSC front of mind, and works for any subject from primary school through uni, TAFE and beyond.",
  },
  {
    question: "How is Acosta AI different from ChatGPT?",
    answer:
      "ChatGPT is a general-purpose tool. Acosta AI is purpose-built for education - with exam practice and marking, study tools, classes for teachers, Guardian for wellbeing and Learning Mode for academic integrity.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-14">
          <Reveal delay={0.02} direction="up" distance={10} blur={4}>
            <p className="text-sm font-mono text-muted-foreground uppercase tracking-[0.2em] mb-4">FAQ</p>
          </Reveal>
          <Reveal delay={0.08} direction="up" distance={10} blur={4}>
            <h2 className="text-4xl md:text-6xl font-display tracking-tight">Common questions, clear answers.</h2>
          </Reveal>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
            <motion.article
              key={faq.question}
              layout
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
              className={`group rounded-3xl border bg-foreground/[0.02] p-6 ${
                isOpen ? "border-foreground/25" : "border-foreground/10"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-lg md:text-xl font-semibold">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      initial={{ y: -6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -6, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="mt-4 text-muted-foreground leading-relaxed"
                    >
                      {faq.answer}
                    </motion.p>

                    {(faq.question === "Is my data private?" ||
                      faq.question === "What about privacy after the Canvas / Instructure news?") && (
                      <p className="mt-3 text-muted-foreground leading-relaxed">
                        Read more in our{" "}
                        <Link href="/privacy" className="link-wipe hover:text-foreground">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    )}

                    {faq.question === "What is beta, and how do I get access?" && (
                      <p className="mt-3 text-muted-foreground leading-relaxed">
                        You can sign up and start using it right now at{" "}
                        <a
                          href="https://app.acosta-ai.com"
                          target="_blank"
                          rel="noreferrer"
                          className="link-wipe hover:text-foreground"
                        >
                          app.acosta-ai.com
                        </a>
                        .
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
