"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_LANDING, getSeasonalLanding, resolveSeasonalEventId, type SeasonalLanding } from "@/lib/seasonal";

type Ctx = { theme: SeasonalLanding; ready: boolean };
const SeasonContext = createContext<Ctx>({ theme: DEFAULT_LANDING, ready: false });

export function useSeason() {
  return useContext(SeasonContext);
}

/** Resolves the season on the client and exposes it as CSS variables on <html>. */
export function SeasonProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Ctx>({ theme: DEFAULT_LANDING, ready: false });

  useEffect(() => {
    const theme = getSeasonalLanding(resolveSeasonalEventId());
    const root = document.documentElement;
    if (theme.id) {
      root.dataset.season = theme.id;
      root.style.setProperty("--season-accent", theme.accent);
      root.style.setProperty("--season-accent-2", theme.accent2);
      root.style.setProperty("--season-page", theme.page);
      root.style.setProperty("--background", theme.page);
    }
    setState({ theme, ready: true });
  }, []);

  return <SeasonContext.Provider value={state}>{children}</SeasonContext.Provider>;
}
