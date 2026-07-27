import {
  POLICY_LAST_UPDATED,
  TERMS_SUMMARY,
  TermsPolicyContent,
} from "@/components/legal/policy-content";
import { PolicyPageShell } from "@/components/legal/policy-page-shell";

export default function TermsPage() {
  return (
    <PolicyPageShell
      title="Terms of Service"
      lastUpdated={POLICY_LAST_UPDATED}
      summary={TERMS_SUMMARY}
    >
      <TermsPolicyContent />
    </PolicyPageShell>
  );
}
