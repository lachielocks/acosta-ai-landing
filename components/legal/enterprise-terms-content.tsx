import Link from "next/link";
import {
  Building2,
  CreditCard,
  FileText,
  GraduationCap,
  Lock,
  Scale,
  Server,
  Shield,
  UserCheck,
  Users,
} from "lucide-react";
import { PolicyPoint, SectionHeader } from "@/components/legal/policy-content";
import type { PolicyMeta } from "@/components/legal/policy-page-shell";

export const ENTERPRISE_TERMS_META: PolicyMeta = {
  version: "1.0",
  effectiveDate: "2 September 2026",
  appliesTo:
    "Schools, TAFEs, universities, districts, and other institutions that license Acosta AI through Transnology.",
};

export const ENTERPRISE_TERMS_SUMMARY =
  "Terms governing Acosta AI for schools, districts, and institutional customers licensing through Transnology.";

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 last:mb-0">
      <h4 className="mb-3 text-base font-bold">{title}</h4>
      <div className="text-base leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6 marker:text-primary/50">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="list-decimal space-y-3 pl-6 marker:font-semibold marker:text-primary/70">
      {items.map((item, index) => (
        <li key={index} className="pl-2">
          {item}
        </li>
      ))}
    </ol>
  );
}

function PolicyTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-foreground/12">
      <table className="w-full min-w-[320px] text-left text-sm">
        <thead>
          <tr className="border-b border-foreground/12 bg-foreground/[0.03]">
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-semibold text-foreground">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-foreground/8 last:border-0">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MailLink({ email }: { email: string }) {
  return (
    <a href={`mailto:${email}`} className="link-wipe font-medium text-primary">
      {email}
    </a>
  );
}

export function EnterpriseTermsContent() {
  return (
    <>
      <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
        These Enterprise Terms of Service (<strong className="text-foreground">Enterprise Terms</strong>) govern the
        provision of Acosta AI to your organisation under a school, district, pilot, or enterprise agreement with{" "}
        <strong className="text-foreground">Transnology</strong> (<strong className="text-foreground">we</strong>,{" "}
        <strong className="text-foreground">us</strong>, <strong className="text-foreground">our</strong>).
      </p>

      <p className="mb-4 text-base leading-relaxed text-muted-foreground">
        Acosta AI is an education-first AI learning platform operated by Transnology. The consumer-facing service is
        available at{" "}
        <a href="https://app.acosta-ai.com" className="link-wipe font-medium text-primary">
          app.acosta-ai.com
        </a>
        . Marketing and general policies are published at{" "}
        <a href="https://acosta-ai.com" className="link-wipe font-medium text-primary">
          acosta-ai.com
        </a>
        .
      </p>

      <p className="mb-4 text-base leading-relaxed text-muted-foreground">
        If your organisation has signed an order form, quote, purchase order, or other written agreement with us (
        <strong className="text-foreground">Commercial Agreement</strong>), that document controls where it conflicts
        with these Enterprise Terms. Otherwise, these Enterprise Terms apply.
      </p>

      <p className="mb-10 text-base leading-relaxed text-muted-foreground">
        By activating an organisation account, accepting a quote, paying an invoice, or otherwise using Acosta AI under
        an enterprise arrangement, your organisation agrees to these Enterprise Terms.
      </p>

      <SectionHeader icon={Building2} title="1. About these terms" />
      <div className="mb-4">
        <h4 className="mb-4 text-base font-bold">Contact</h4>
        <PolicyTable
          headers={["Purpose", "Email"]}
          rows={[
            ["Enterprise sales & onboarding", <MailLink key="sales" email="sales@transnology.co" />],
            ["Billing & invoices", <MailLink key="billing" email="billing@transnology.co" />],
            ["Product support", <MailLink key="support" email="support@acosta-ai.com" />],
          ]}
        />
      </div>

      <SectionHeader icon={FileText} title="2. Definitions" />
      <BulletList
        items={[
          <>
            <strong className="text-foreground">Customer</strong> — the school, institution, or legal entity entering
            into an enterprise arrangement with us.
          </>,
          <>
            <strong className="text-foreground">Authorised Users</strong> — students, teachers, staff, and
            administrators whom the Customer permits to use Acosta AI under its licence.
          </>,
          <>
            <strong className="text-foreground">Organisation</strong> — the Customer&apos;s tenant on the platform
            (including members, domains, usage, and configuration).
          </>,
          <>
            <strong className="text-foreground">School Admin Dashboard</strong> — the administrative interface
            available to designated Customer administrators (e.g. at <code className="text-sm">/school</code>).
          </>,
          <>
            <strong className="text-foreground">Platform</strong> — the Acosta AI web application, APIs, and related
            services we make available under these Enterprise Terms.
          </>,
          <>
            <strong className="text-foreground">Usage</strong> — metered platform activity (for example AI chat, study
            tools, image generation, and exam simulations) recorded against the Organisation.
          </>,
          <>
            <strong className="text-foreground">Personal Terms</strong> — the standard Acosta AI terms of service and
            privacy policy that apply to individual consumer accounts.
          </>,
        ]}
      />

      <SectionHeader icon={Server} title="3. Service description" />
      <SubSection title="3.1 What we provide">
        <p className="mb-4">
          Subject to these Enterprise Terms and payment of applicable fees, we provide the Customer with access to
          Acosta AI for Authorised Users, which may include:
        </p>
        <BulletList
          items={[
            <>
              unlimited organisation membership while the Organisation is <strong className="text-foreground">active</strong>;
            </>,
            <>
              platform access at the tier specified in the Commercial Agreement (typically{" "}
              <strong className="text-foreground">Max</strong>-equivalent access while active);
            </>,
            "a School Admin Dashboard for designated administrators;",
            "bulk member onboarding and invite tools;",
            "optional single sign-on (SSO) where configured by Transnology;",
            "usage reporting for billing and operational purposes.",
          ]}
        />
      </SubSection>
      <SubSection title="3.2 Education-first use">
        Acosta AI is designed to support learning, study, and exploration — not to replace a student&apos;s own thinking
        by default. <strong className="text-foreground">Learning Mode</strong> encourages academic integrity. The
        Customer is responsible for communicating its own academic integrity expectations to Authorised Users.
      </SubSection>
      <SubSection title="3.3 No guaranteed outcomes">
        We do not guarantee specific educational outcomes, grades, compliance with a particular syllabus, or
        uninterrupted availability. AI-generated content may be inaccurate or incomplete. Authorised Users should verify
        important information.
      </SubSection>
      <SubSection title="3.4 Changes to the service">
        We may improve, modify, or discontinue features of the Platform. We will use reasonable efforts to avoid
        material adverse changes to enterprise functionality without notice, but we do not guarantee that any particular
        model, feature, or integration will remain available indefinitely.
      </SubSection>

      <SectionHeader icon={UserCheck} title="4. Customer responsibilities" />
      <p className="mb-4 text-base text-muted-foreground">The Customer agrees to:</p>
      <NumberedList
        items={[
          <>
            <strong className="text-foreground">Authorisation</strong> — only add Authorised Users who are permitted to
            use the service (e.g. enrolled students, employees, or contractors).
          </>,
          <>
            <strong className="text-foreground">Administration</strong> — appoint at least one administrator with a
            valid account and keep administrator contact details current.
          </>,
          <>
            <strong className="text-foreground">Domains & linking</strong> — provide accurate email domains and linking
            rules; you are responsible for who joins via domain auto-join, invite links, or bulk invite.
          </>,
          <>
            <strong className="text-foreground">Acceptable use</strong> — ensure Authorised Users comply with Section 6
            and applicable law.
          </>,
          <>
            <strong className="text-foreground">Devices & networks</strong> — provide suitable internet access,
            browsers, and (where used) identity provider configuration for SSO.
          </>,
          <>
            <strong className="text-foreground">Policies</strong> — maintain and communicate your own student/staff
            acceptable use and academic integrity policies.
          </>,
          <>
            <strong className="text-foreground">Accurate information</strong> — provide correct billing, tax, and contact
            details.
          </>,
        ]}
      />
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        The Customer must not misrepresent its identity, attempt to access other organisations&apos; data, or use the
        Platform to develop a competing product through systematic extraction of our models or outputs.
      </p>

      <SectionHeader icon={Users} title="5. Accounts, access, and suspension" />
      <SubSection title="5.1 Organisation status">
        <p className="mb-4">
          Each Organisation has a status, typically <strong className="text-foreground">active</strong>,{" "}
          <strong className="text-foreground">suspended</strong>, or{" "}
          <strong className="text-foreground">churned</strong>.
        </p>
        <BulletList
          items={[
            <>
              While <strong className="text-foreground">active</strong>, Authorised Users receive the enterprise access
              level defined in the Commercial Agreement.
            </>,
            <>
              If the Organisation is <strong className="text-foreground">suspended</strong> or{" "}
              <strong className="text-foreground">churned</strong> (including for non-payment), enterprise access ends
              and Authorised Users revert to their <strong className="text-foreground">personal</strong> Acosta AI plan
              (if any), usually the Free tier.
            </>,
            "Suspension does not delete Customer data immediately; see Section 10.",
          ]}
        />
      </SubSection>
      <SubSection title="5.2 School administrators">
        Customer administrators may manage members, view usage summaries, and use onboarding tools made available in the
        School Admin Dashboard. Administrators must keep credentials secure and act only within their authority.
      </SubSection>
      <SubSection title="5.3 SSO">
        Where SSO is enabled, authentication may be handled by the Customer&apos;s identity provider. The Customer is
        responsible for provisioning and deprovisioning users in its IdP. Transnology configures SSO on request via{" "}
        <MailLink email="sales@transnology.co" />.
      </SubSection>
      <SubSection title="5.4 Platform administration">
        Transnology may access Organisation configuration and usage data as needed to operate, secure, bill, and support
        the service.
      </SubSection>

      <SectionHeader icon={Shield} title="6. Acceptable use" />
      <p className="mb-4 text-base text-muted-foreground">Authorised Users must not use Acosta AI to:</p>
      <BulletList
        items={[
          "harass, threaten, or exploit others;",
          "generate or distribute illegal, harmful, or sexually exploitative content, especially involving minors;",
          "attempt to bypass safety systems, rate limits, or access controls;",
          "scrape, reverse engineer, or systematically harvest the Platform except as expressly permitted;",
          "submit highly sensitive personal data (such as full medical records or government identifiers) unless the Customer has assessed the risk and has a lawful basis to do so;",
          "use the service in a way that infringes third-party intellectual property.",
        ]}
      />
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        We may investigate suspected violations and suspend or terminate access where reasonably necessary to protect
        users, comply with law, or enforce these Enterprise Terms.
      </p>

      <SectionHeader icon={CreditCard} title="7. Fees, billing, and payment" />
      <SubSection title="7.1 Usage-based billing">
        <p className="mb-4">
          Unless otherwise stated in a Commercial Agreement, enterprise customers are billed on{" "}
          <strong className="text-foreground">usage</strong>, not on a fixed seat cap. Typical components include:
        </p>
        <BulletList
          items={[
            <>
              a baseline charge per <strong className="text-foreground">active student</strong> per month (as agreed);
              and/or
            </>,
            <>
              charges based on <strong className="text-foreground">aggregated Platform usage</strong> (AI actions) per
              billing period.
            </>,
          ]}
        />
        <p className="mt-4">
          Specific rates, currency, billing cycle, payment terms, setup fees, discounts, and tax treatment are set out in
          the Commercial Agreement or invoice.
        </p>
      </SubSection>
      <SubSection title="7.2 Unlimited access while active">
        &quot;Unlimited members&quot; and &quot;unlimited usage&quot; mean there is no published seat cap while the
        Organisation is <strong className="text-foreground">active</strong>. This does not waive fees — usage and
        active students are still invoiced according to the agreed rates.
      </SubSection>
      <SubSection title="7.3 Invoicing">
        Enterprise fees are usually invoiced manually (purchase order, bank transfer, or other method agreed in writing).
        Stripe or other payment rails may be used where agreed.
      </SubSection>
      <SubSection title="7.4 Taxes">
        Fees are quoted in the agreed currency. The Customer is responsible for applicable taxes unless we state
        otherwise. Provide a valid ABN or tax identifier where required.
      </SubSection>
      <SubSection title="7.5 Late or non-payment">
        <p className="mb-4">If fees are not paid by the due date, we may:</p>
        <BulletList
          items={[
            "suspend the Organisation (reverting Authorised Users to personal tiers);",
            "charge reasonable interest or recovery costs where permitted by law; and/or",
            "terminate the agreement after written notice.",
          ]}
        />
        <p className="mt-4">
          Disputed invoices should be raised promptly with <MailLink email="billing@transnology.co" />.
        </p>
      </SubSection>

      <SectionHeader icon={Lock} title="8. Data protection and privacy" />
      <SubSection title="8.1 Roles">
        Depending on the jurisdiction and how the Customer uses the Platform, the Customer may act as a{" "}
        <strong className="text-foreground">controller</strong> of personal information about Authorised Users
        (especially students), and Transnology may act as a <strong className="text-foreground">processor</strong> or{" "}
        <strong className="text-foreground">service provider</strong> when handling that data on the Customer&apos;s
        instructions.
      </SubSection>
      <SubSection title="8.2 Privacy policy">
        Our general{" "}
        <Link href="/privacy" className="link-wipe font-medium text-primary">
          Privacy Policy
        </Link>{" "}
        describes how Acosta AI handles personal information. Enterprise customers with specific data-processing
        requirements may request a Data Processing Addendum (DPA) via <MailLink email="sales@transnology.co" />.
      </SubSection>
      <SubSection title="8.3 Student data">
        The Customer is responsible for obtaining any consents or authorisations required under applicable education and
        privacy law (including, in Australia, the <strong className="text-foreground">Privacy Act 1988 (Cth)</strong>{" "}
        and applicable state education requirements) before enabling student access.
      </SubSection>
      <SubSection title="8.4 Security">
        We implement reasonable technical and organisational measures to protect data. No online service is completely
        secure; the Customer should use SSO, strong passwords, and timely offboarding where possible.
      </SubSection>
      <SubSection title="8.5 Data location & subprocessors">
        The Platform uses infrastructure providers (including cloud hosting and AI model providers). Details of
        subprocessors and data handling can be provided on request.
      </SubSection>

      <SectionHeader icon={Scale} title="9. Intellectual property" />
      <PolicyPoint title="9.1 Our IP">
        Transnology and its licensors own the Platform, Acosta branding, software, documentation, and underlying
        technology. These Enterprise Terms do not transfer ownership of our IP to the Customer.
      </PolicyPoint>
      <PolicyPoint title="9.2 Customer content">
        The Customer and Authorised Users retain ownership of content they submit to the Platform (prompts, uploads,
        study materials, etc.), subject to the licence below.
      </PolicyPoint>
      <PolicyPoint title="9.3 Licence to operate the service">
        The Customer grants us a non-exclusive licence to host, process, transmit, and display Customer content solely
        to provide, maintain, secure, and improve the Platform and to meet legal obligations.
      </PolicyPoint>
      <PolicyPoint title="9.4 AI outputs">
        Subject to applicable law and third-party model terms, Authorised Users may use AI-generated outputs for lawful
        educational purposes. We do not warrant that outputs are original, non-infringing, or fit for a particular
        purpose.
      </PolicyPoint>
      <PolicyPoint title="9.5 Feedback">
        If the Customer provides suggestions or feedback, we may use it without restriction or compensation.
      </PolicyPoint>

      <SectionHeader icon={FileText} title="10. Term, termination, and data retention" />
      <SubSection title="10.1 Term">
        The agreement begins when the Organisation is provisioned or the Commercial Agreement is signed, and continues
        for the term specified in that agreement (or month-to-month if none is specified) until terminated.
      </SubSection>
      <SubSection title="10.2 Termination by Customer">
        The Customer may terminate by giving written notice in accordance with the Commercial Agreement, or if none is
        specified, thirty (30) days&apos; notice to <MailLink email="billing@transnology.co" />.
      </SubSection>
      <SubSection title="10.3 Termination by Transnology">
        We may suspend or terminate immediately if the Customer materially breaches these Enterprise Terms, fails to pay
        undisputed fees, or if continued provision would violate law or create unacceptable risk.
      </SubSection>
      <SubSection title="10.4 Effect of termination">
        <p className="mb-4">On termination:</p>
        <BulletList
          items={[
            "enterprise access ends;",
            "Authorised Users revert to personal accounts (if any);",
            "accrued fees remain payable;",
            "we may delete or anonymise Organisation data after a reasonable retention period, unless law requires longer retention or the parties agree otherwise.",
          ]}
        />
        <p className="mt-4">
          Data export requests should be made before termination where possible via{" "}
          <MailLink email="support@acosta-ai.com" />.
        </p>
      </SubSection>

      <SectionHeader icon={Lock} title="11. Confidentiality" />
      <p className="mb-4 text-base text-muted-foreground">
        Each party may receive non-public information from the other (pricing, security documentation, student lists,
        roadmaps, etc.). The receiving party will:
      </p>
      <BulletList
        items={[
          "use it only to perform under these Enterprise Terms;",
          "protect it with reasonable care; and",
          "not disclose it except to employees, contractors, or advisers who need to know and are bound by similar obligations,",
        ]}
      />
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        except where disclosure is required by law or the information is publicly available without breach.
      </p>

      <SectionHeader icon={Shield} title="12. Warranties and disclaimers" />
      <p className="mb-4 text-base text-muted-foreground">To the maximum extent permitted by law:</p>
      <BulletList
        items={[
          <>
            the Platform is provided <strong className="text-foreground">&quot;as is&quot;</strong> and{" "}
            <strong className="text-foreground">&quot;as available&quot;</strong>;
          </>,
          "we disclaim all implied warranties of merchantability, fitness for a particular purpose, and non-infringement;",
          "we do not warrant uninterrupted, error-free, or completely secure operation;",
          "AI features are probabilistic and may produce incorrect, biased, or inappropriate content.",
        ]}
      />
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        Nothing in these Enterprise Terms excludes, restricts, or modifies rights that cannot be excluded under the{" "}
        <strong className="text-foreground">Australian Consumer Law</strong> or other mandatory law.
      </p>

      <SectionHeader icon={Scale} title="13. Limitation of liability" />
      <p className="mb-4 text-base text-muted-foreground">To the maximum extent permitted by law:</p>
      <NumberedList
        items={[
          "Neither party is liable for indirect, incidental, special, consequential, or punitive damages, or for loss of profits, revenue, data, or goodwill.",
          <>
            Transnology&apos;s total aggregate liability arising from or related to these Enterprise Terms is limited to
            the fees paid by the Customer to Transnology in the{" "}
            <strong className="text-foreground">twelve (12) months</strong> before the event giving rise to liability.
          </>,
        ]}
      />
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        These limits do not apply to liability that cannot be limited under applicable law (including certain consumer
        guarantees, fraud, or wilful misconduct).
      </p>

      <SectionHeader icon={Shield} title="14. Indemnity" />
      <p className="mb-4 text-base text-muted-foreground">
        The Customer will indemnify and hold harmless Transnology against claims, damages, and reasonable costs arising
        from:
      </p>
      <BulletList
        items={[
          "the Customer's or Authorised Users' breach of these Enterprise Terms or applicable law;",
          "content submitted by Authorised Users;",
          "the Customer's failure to obtain required consents for student or staff data; or",
          "the Customer's combination of the Platform with third-party systems outside our documentation,",
        ]}
      />
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        except to the extent caused by Transnology&apos;s breach or negligence.
      </p>

      <SectionHeader icon={Server} title="15. Support and service levels" />
      <p className="text-base leading-relaxed text-muted-foreground">
        Standard product support is available at <MailLink email="support@acosta-ai.com" />. Enterprise onboarding, SSO
        setup, and billing enquiries are handled via the contacts in Section 1.
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Unless a separate support or uptime schedule is signed, we do not guarantee a specific response time or
        availability percentage.
      </p>

      <SectionHeader icon={FileText} title="16. General" />
      <PolicyPoint title="16.1 Assignment">
        The Customer may not assign these Enterprise Terms without our written consent. We may assign to an affiliate or
        in connection with a merger, acquisition, or sale of assets.
      </PolicyPoint>
      <PolicyPoint title="16.2 Force majeure">
        Neither party is liable for delay or failure caused by events beyond reasonable control (including outages of
        cloud or AI providers, natural disasters, or government action).
      </PolicyPoint>
      <PolicyPoint title="16.3 Notices">
        Notices to Transnology: <MailLink email="billing@transnology.co" /> (billing) or{" "}
        <MailLink email="sales@transnology.co" /> (commercial). Notices to the Customer: the billing or administrator
        email on the Organisation record.
      </PolicyPoint>
      <PolicyPoint title="16.4 Governing law">
        These Enterprise Terms are governed by the laws of <strong className="text-foreground">New South Wales, Australia</strong>. The parties submit to the non-exclusive jurisdiction of the courts of New South Wales.
      </PolicyPoint>
      <PolicyPoint title="16.5 Entire agreement">
        These Enterprise Terms, together with any Commercial Agreement, DPA, and accepted order documentation,
        constitute the entire agreement regarding the enterprise use of Acosta AI and supersede prior discussions on that
        subject.
      </PolicyPoint>
      <PolicyPoint title="16.6 Changes">
        We may update these Enterprise Terms by publishing a new version in this repository and/or notifying the
        Customer&apos;s administrators. Material changes take effect on the date stated in the updated version or
        thirty (30) days after notice, whichever is later. Continued use after that date constitutes acceptance. If the
        Customer objects, either party may terminate in accordance with Section 10.
      </PolicyPoint>
      <PolicyPoint title="16.7 Severability">
        If any provision is unenforceable, the remainder stays in effect.
      </PolicyPoint>

      <SectionHeader icon={GraduationCap} title="17. Relationship to personal accounts" />
      <p className="text-base leading-relaxed text-muted-foreground">
        Authorised Users may also hold personal Acosta AI subscriptions. Enterprise access applies only while the
        Organisation is active and the user is a member. If enterprise access ends, the user&apos;s personal plan (if
        any) applies.
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Personal accounts remain subject to the Personal Terms in addition to any school policies the Customer imposes.
      </p>

      <SectionHeader icon={Building2} title="18. Summary for administrators" />
      <PolicyTable
        headers={["Topic", "Enterprise position"]}
        rows={[
          ["Members", "Unlimited while active"],
          ["Usage", "Unlimited while active; billed on agreed usage metrics"],
          ["Non-payment", "Organisation may be suspended; users revert to personal/Free tier"],
          ["SSO", "Configured by Transnology on request"],
          ["Billing", "Usually manual invoice; rates in Commercial Agreement"],
          ["Support", <MailLink key="summary-support" email="support@acosta-ai.com" />],
          ["Sales", <MailLink key="summary-sales" email="sales@transnology.co" />],
        ]}
      />

      <p className="mt-12 text-center text-sm text-muted-foreground">
        Acosta AI is a Transnology product.{" "}
        <a href="https://transnology.co" className="link-wipe font-medium text-primary">
          transnology.co
        </a>{" "}
        ·{" "}
        <a href="https://acosta-ai.com" className="link-wipe font-medium text-primary">
          acosta-ai.com
        </a>
      </p>
    </>
  );
}
