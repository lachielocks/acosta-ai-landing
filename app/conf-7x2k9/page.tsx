import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lachie @ Conf",
  description: "Lachlan Thurlow — Acosta AI",
};

export default function ConferencePage() {
  return (
    <main className="min-h-screen bg-[oklch(0.06_0.008_260)] flex items-center justify-center p-6">
      <div className="max-w-sm w-full">
        {/* Badge card */}
        <div
          className="relative rounded-3xl overflow-hidden border border-white/10"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.09 0.008 260) 0%, oklch(0.12 0.02 280) 100%)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.06), 0 32px 64px -16px rgba(0,0,0,0.6)",
          }}
        >
          {/* Top accent stripe */}
          <div
            className="h-1.5 w-full"
            style={{
              background:
                "linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
            }}
          />

          <div className="px-8 pt-8 pb-10 flex flex-col items-center gap-6 text-center">
            {/* "ATTENDEE" chip */}
            <span
              className="text-[10px] tracking-[0.2em] font-semibold uppercase px-3 py-1 rounded-full border"
              style={{
                color: "oklch(0.75 0.12 290)",
                borderColor: "oklch(0.75 0.12 290 / 0.35)",
                background: "oklch(0.75 0.12 290 / 0.08)",
              }}
            >
              Attendee
            </span>

            {/* Plane emoji */}
            <div className="text-6xl select-none" aria-hidden="true">
              ✈️
            </div>

            {/* Main headline */}
            <div>
              <h1
                className="text-3xl font-bold tracking-tight"
                style={{ color: "oklch(0.96 0.005 90)" }}
              >
                I&apos;m off to LA!
              </h1>
              <p
                className="mt-1 text-sm"
                style={{ color: "oklch(0.55 0.015 90)" }}
              >
                Startup Founder Conference 2026
              </p>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-white/8" />

            {/* Person details */}
            <div className="flex flex-col gap-1">
              <p
                className="text-xl font-semibold"
                style={{ color: "oklch(0.94 0.005 90)" }}
              >
                Lachlan Thurlow
              </p>
              <p
                className="text-sm font-medium"
                style={{ color: "oklch(0.65 0.05 290)" }}
              >
                Founder &amp; CEO — Acosta AI
              </p>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-white/8" />

            {/* Footer note */}
            <p
              className="text-xs leading-relaxed"
              style={{ color: "oklch(0.45 0.01 260)" }}
            >
              acosta.ai · building smarter learning tools
            </p>
          </div>
        </div>

        {/* Subtle glow underneath */}
        <div
          className="mx-auto mt-4 h-2 w-2/3 rounded-full blur-xl opacity-40"
          style={{
            background:
              "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
          }}
          aria-hidden="true"
        />
      </div>
    </main>
  );
}
