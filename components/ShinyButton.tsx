
import React from 'react';
import { motion } from 'motion/react';

interface ShinyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({ children, onClick, className, href }) => {
  const content = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative px-8 py-4 rounded-2xl font-bold overflow-hidden group transition-all ${className}`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[radial-gradient(circle_at_var(--x)_var(--y),white,transparent_25%)]" />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    return <a href={href} className="block">{content}</a>;
  }

  return content;
};
