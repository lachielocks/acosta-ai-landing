import { TERMS_META, TERMS_SUMMARY, TermsPolicyContent } from "@/components/legal/policy-content";
import { PolicyPageShell } from "@/components/legal/policy-page-shell";

export default function TermsPage() {
  return (
    <PolicyPageShell
      title="Terms of Service"
      meta={TERMS_META}
      summary={TERMS_SUMMARY}
    >
      <TermsPolicyContent />
    </PolicyPageShell>
  );
}
