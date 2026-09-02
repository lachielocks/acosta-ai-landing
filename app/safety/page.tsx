import type { Metadata } from "next";
import { SAFETY_META, SAFETY_SUMMARY, SafetyPolicyContent } from "@/components/legal/policy-content";
import { PolicyPageShell } from "@/components/legal/policy-page-shell";

export const metadata: Metadata = {
  title: "Safety Features | Acosta AI",
  description:
    "Explore built-in guardrails for Academic Integrity, Crisis Detection, and the Acosta Guardian wellbeing system.",
};

export default function SafetyPage() {
  return (
    <PolicyPageShell
      title="Safety Features"
      meta={SAFETY_META}
      summary={SAFETY_SUMMARY}
    >
      <SafetyPolicyContent />
    </PolicyPageShell>
  );
}
