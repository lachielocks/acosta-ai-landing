import { POLICY_LAST_UPDATED, PRIVACY_SUMMARY, PrivacyPolicyContent } from "@/components/legal/policy-content";
import { PolicyPageShell } from "@/components/legal/policy-page-shell";

export default function PrivacyPage() {
  return (
    <PolicyPageShell
      title="Privacy Policy"
      lastUpdated={POLICY_LAST_UPDATED}
      summary={PRIVACY_SUMMARY}
    >
      <PrivacyPolicyContent />
    </PolicyPageShell>
  );
}
