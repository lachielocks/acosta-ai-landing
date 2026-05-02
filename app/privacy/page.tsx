import { PrivacyPolicyContent } from "@/components/legal/policy-content";
import { PolicyPageShell } from "@/components/legal/policy-page-shell";

export default function PrivacyPage() {
  return (
    <PolicyPageShell
      title="Privacy Policy"
      lastUpdated="February 2026"
      summary="Your thoughts and data are personal. This policy outlines exactly what we collect, how it's processed, and your absolute right to privacy."
    >
      <PrivacyPolicyContent />
    </PolicyPageShell>
  );
}
