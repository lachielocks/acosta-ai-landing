import { TermsPolicyContent } from "@/components/legal/policy-content";
import { PolicyPageShell } from "@/components/legal/policy-page-shell";

export default function TermsPage() {
  return (
    <PolicyPageShell
      title="Terms of Service"
      lastUpdated="February 2026"
      summary="The rules governing acceptable use, billing, intellectual property, and academic honesty expectations."
    >
      <TermsPolicyContent />
    </PolicyPageShell>
  );
}
