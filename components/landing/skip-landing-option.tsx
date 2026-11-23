"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  APP_ORIGIN,
  readSkipLandingCookie,
  setSkipLandingCookie,
  subscribeSkipLandingCookie,
} from "@/lib/skip-landing";

export function SkipLandingOption() {
  const inputId = useId();
  const saved = useSyncExternalStore(
    subscribeSkipLandingCookie,
    readSkipLandingCookie,
    () => false,
  );
  const [pending, setPending] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const checked = pending || saved;

  const closeConfirm = () => {
    setConfirmOpen(false);
    setPending(false);
  };

  const onToggle = (next: boolean) => {
    if (next) {
      setPending(true);
      setConfirmOpen(true);
      return;
    }
    setPending(false);
    setSkipLandingCookie(false);
  };

  const confirmSkip = () => {
    setSkipLandingCookie(true);
    window.location.assign(APP_ORIGIN);
  };

  return (
    <>
      <label
        htmlFor={inputId}
        className="mt-3 flex cursor-pointer select-none items-center justify-center gap-2.5"
      >
        <button
          type="button"
          role="checkbox"
          id={inputId}
          aria-checked={checked}
          aria-label="Always open the app"
          onClick={() => onToggle(!checked)}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
            checked
              ? "border-white bg-white text-black"
              : "border-white/40 bg-white/10 text-transparent hover:border-white/70"
          }`}
        >
          <motion.span
            initial={false}
            animate={{ scale: checked ? 1 : 0.6, opacity: checked ? 1 : 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </motion.span>
        </button>
        <span className="text-sm font-medium text-white/80">Always open the app</span>
      </label>

      <Dialog
        open={confirmOpen}
        onOpenChange={(open) => {
          if (!open) closeConfirm();
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="gap-5 rounded-2xl border-white/15 bg-card p-6 sm:max-w-md sm:p-7"
        >
          <DialogHeader className="gap-3 text-left">
            <DialogTitle className="font-display text-2xl font-normal tracking-tight">
              Are you sure?
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
              If you want to see this page again, just go to acosta-ai.com/reset.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={closeConfirm}
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmSkip}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02]"
            >
              Skip landing page
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
