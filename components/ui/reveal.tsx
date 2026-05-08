"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

function directionOffset(direction: RevealDirection, distance: number) {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    case "none":
    default:
      return { x: 0, y: 0 };
  }
}

export function Reveal({
  children,
  className,
  direction = "up",
  distance = 18,
  duration = 0.55,
  delay = 0,
  blur = 6,
  once = true,
  amount = 0.25,
  triggerMargin = "0px 0px -20% 0px",
}: {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  delay?: number;
  blur?: number;
  once?: boolean;
  amount?: number;
  triggerMargin?: string;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const offset = directionOffset(direction, distance);
  const effectiveAmount = isMobile ? Math.min(amount, 0.15) : amount;
  const effectiveMargin = isMobile ? "0px 0px -8% 0px" : triggerMargin;
  const effectiveBlur = isMobile ? Math.min(blur, 2) : blur;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset, filter: effectiveBlur ? `blur(${effectiveBlur}px)` : undefined }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount: effectiveAmount, margin: effectiveMargin }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const staggerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Stagger({
  children,
  className,
  once = true,
  amount = 0.25,
  triggerMargin = "0px 0px -20% 0px",
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
  triggerMargin?: string;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const effectiveAmount = isMobile ? Math.min(amount, 0.15) : amount;
  const effectiveMargin = isMobile ? "0px 0px -8% 0px" : triggerMargin;

  return (
    <motion.div
      className={className}
      variants={staggerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: effectiveAmount, margin: effectiveMargin }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={childVariants} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

