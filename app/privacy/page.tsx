import { PRIVACY_META, PRIVACY_SUMMARY, PrivacyPolicyContent } from "@/components/legal/policy-content";
import { PolicyPageShell } from "@/components/legal/policy-page-shell";

export default function PrivacyPage() {
  return (
    <PolicyPageShell
      title="Privacy Policy"
      meta={PRIVACY_META}
      summary={PRIVACY_SUMMARY}
    >
      <PrivacyPolicyContent />
    </PolicyPageShell>
  );
}
