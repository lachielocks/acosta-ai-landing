import type { Metadata } from "next";
import {
  ENTERPRISE_TERMS_META,
  ENTERPRISE_TERMS_SUMMARY,
  EnterpriseTermsContent,
} from "@/components/legal/enterprise-terms-content";
import { PolicyPageShell } from "@/components/legal/policy-page-shell";

export const metadata: Metadata = {
  title: "Enterprise Terms of Service | Acosta AI",
  description:
    "Terms governing Acosta AI for schools, TAFEs, universities, districts, and institutional customers licensing through Transnology.",
};

export default function EnterpriseTermsPage() {
  return (
    <PolicyPageShell
      title="Enterprise Terms of Service"
      meta={ENTERPRISE_TERMS_META}
      summary={ENTERPRISE_TERMS_SUMMARY}
    >
      <EnterpriseTermsContent />
    </PolicyPageShell>
  );
}
