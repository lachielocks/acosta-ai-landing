"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ACOSTA_2_FIRE_LANDING, DEFAULT_LANDING, getSeasonalLanding, resolveSeasonalEventId, type SeasonalLanding } from "@/lib/seasonal";
import { getAcosta2State, type Acosta2State } from "@/lib/acosta2";

type Ctx = { theme: SeasonalLanding; ready: boolean; acosta2: Acosta2State };
const PRE_LAUNCH: Acosta2State = { released: false, fire: false };
const SeasonContext = createContext<Ctx>({ theme: DEFAULT_LANDING, ready: false, acosta2: PRE_LAUNCH });

export function useSeason() {
  return useContext(SeasonContext);
}

/** Acosta 2 launch state. Always pre-launch on the server and first client render (no hydration mismatch). */
export function useAcosta2() {
  return useContext(SeasonContext).acosta2;
}

const SEASON_VARS = ["--season-accent", "--season-accent-2", "--season-page", "--background"];

function seasonOptedOut() {
  return new URLSearchParams(window.location.search).get("season")?.toLowerCase() === "none";
}

/** Resolves the season on the client and exposes it as CSS variables on <html>. */
export function SeasonProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Ctx>({ theme: DEFAULT_LANDING, ready: false, acosta2: PRE_LAUNCH });

  useEffect(() => {
    const root = document.documentElement;
    let key = "";

    const apply = () => {
      const acosta2 = getAcosta2State();
      const seasonal = getSeasonalLanding(resolveSeasonalEventId());
      // A real seasonal event wins; otherwise the Acosta 2 fire theme runs for its launch week.
      const theme = !seasonal.id && acosta2.fire && !seasonOptedOut() ? ACOSTA_2_FIRE_LANDING : seasonal;
      const next = `${theme.id}|${acosta2.released}|${acosta2.fire}`;
      if (next === key) return;
      key = next;
      if (theme.id) {
        root.dataset.season = theme.id;
        root.style.setProperty("--season-accent", theme.accent);
        root.style.setProperty("--season-accent-2", theme.accent2);
        root.style.setProperty("--season-page", theme.page);
        root.style.setProperty("--background", theme.page);
      } else {
        delete root.dataset.season;
        for (const v of SEASON_VARS) root.style.removeProperty(v);
      }
      setState({ theme, ready: true, acosta2 });
    };

    apply();
    // Re-check so an open tab flips at the release instant (and back at the fire theme's end) without a refresh.
    const timer = window.setInterval(apply, 5_000);
    // Leaving the homepage (e.g. client nav to the Trust Centre) puts <html> back to normal.
    return () => {
      window.clearInterval(timer);
      delete root.dataset.season;
      for (const v of SEASON_VARS) root.style.removeProperty(v);
    };
  }, []);

  return <SeasonContext.Provider value={state}>{children}</SeasonContext.Provider>;
}
