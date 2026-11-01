"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { recordPath } from "@/lib/nav-history";

interface AppTemplateProps {
  children: ReactNode;
}

export default function AppTemplate({ children }: AppTemplateProps) {
  const pathname = usePathname();
  useEffect(() => { recordPath(pathname); }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
