
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface TextRevealProps {
  text: string;
  className?: string;
}

export const TextReveal: React.FC<TextRevealProps> = ({ text, className }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.9", "end 0.5"]
  });

  const words = text.split(" ");

  return (
    <div ref={targetRef} className={className}>
      <div className="flex flex-wrap justify-center">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </div>
    </div>
  );
};

interface WordProps {
  children: React.ReactNode;
  progress: any;
  range: [number, number];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative mx-1 lg:mx-2">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }} className="text-neutral-900 dark:text-white">
        {children}
      </motion.span>
    </span>
  );
};
