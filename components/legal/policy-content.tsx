import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowUpRight,
  CreditCard,
  Database,
  GraduationCap,
  Heart,
  Image as ImageIcon,
  Lock,
  Scale,
  Server,
  Sparkles,
  Timer,
  Trash2,
  UserCheck,
} from "lucide-react";

import type { PolicyMeta } from "@/components/legal/policy-page-shell";

export const PRIVACY_META: PolicyMeta = {
  version: "1.0",
  effectiveDate: "4 September 2026",
  appliesTo:
    "Individual users of Acosta AI, including students, teachers, and other account holders using the platform.",
};

export const TERMS_META: PolicyMeta = {
  version: "1.0",
  effectiveDate: "4 September 2026",
  appliesTo:
    "Individual users who create or use a consumer Acosta AI account at platform.acosta-ai.com.",
};

export const SAFETY_META: PolicyMeta = {
  version: "1.0",
  effectiveDate: "4 September 2026",
  appliesTo:
    "All users of Acosta AI, including consumer accounts and Authorised Users under enterprise arrangements.",
};

export const PRIVACY_SUMMARY =
  "Your thoughts and data are personal. This policy outlines exactly what we collect, how it's processed, who helps us process it, and your absolute right to privacy.";
export const TERMS_SUMMARY =
  "The rules governing acceptable use, billing, intellectual property, and academic honesty expectations.";
export const SAFETY_SUMMARY =
  "Safety and ethics are foundational pillars. Explore built-in guardrails for Academic Integrity, Crisis Detection, and the Acosta Guardian wellbeing system.";

export function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="mt-16 mb-8 flex items-center gap-4 border-b border-foreground/15 pb-4">
      <div className="rounded-2xl bg-primary/10 p-3 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="m-0 text-2xl font-bold">{title}</h3>
    </div>
  );
}

export function PolicyPoint({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group mb-8 last:mb-0">
      <h4 className="mb-3 flex items-center gap-3 text-base font-bold">
        <span className="h-2 w-2 rounded-full bg-primary/50 transition-transform group-hover:scale-125 group-hover:bg-primary" />
        {title}
      </h4>
      <div className="border-l-2 border-foreground/10 pl-5 text-base leading-relaxed text-muted-foreground transition-colors group-hover:border-primary/35">
        {children}
      </div>
    </div>
  );
}

export function PolicyCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-foreground/12 bg-foreground/[0.02] p-8">
      <h4 className="mb-4 text-xl font-bold">{title}</h4>
      <div className="text-base leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

export function PrivacyPolicyContent() {
  return (
    <>
      <p className="mb-12 text-xl leading-relaxed text-muted-foreground">
        At Acosta AI (a Transnology company), we believe your thoughts and data are personal. This policy outlines exactly what we collect, how it&apos;s processed, which providers help us run the platform, and your absolute right to privacy.
      </p>

      <SectionHeader icon={Database} title="1. Information We Collect" />
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <PolicyCard title="Identity Data">
          When you register for an account, we collect basic profile information, including your name and email address. We require your year level (e.g., Year 7-12, University) and your location (e.g., NSW, Australia) during onboarding to ensure curriculum and region-appropriate responses.
        </PolicyCard>
        <PolicyCard title="Third-Party Logins">
          You may choose to sign in using third-party identity providers such as Google, GitHub, or Microsoft. When you do, we receive your authentication token and basic profile information from these providers.
        </PolicyCard>
        <PolicyCard title="Guest Sessions">
          You can use certain features (like Fast Chat and Live Quiz) without an account. Data generated during a Guest session is linked to a temporary identifier. If you clear your browser cache, switch devices, or do not convert to a permanent account, this data will be lost and cannot be recovered.
        </PolicyCard>
        <PolicyCard title="Location (Optional)">
          While we collect a general location (like State/Country) during onboarding for curriculum mapping, we may also request permission to access your local weather context to power the Home Dashboard&apos;s weather widget. This data is not permanently stored.
        </PolicyCard>
        <PolicyCard title="Generated Content">
          We store the content you actively create and interact with on the platform. This includes:
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Chat transcripts and uploaded files/attachments</li>
            <li>Flashcard decks</li>
            <li>Mind Maps, Timelines, Documents, and Generated Code in the Canvas</li>
            <li>Study plans and Exam Simulation responses</li>
            <li>Images generated via our AI models</li>
          </ul>
        </PolicyCard>
        <PolicyCard title="Classes & Subjects Metadata">
          We store your selected subjects and curriculum preferences to tailor study tools and explanations directly to what you are currently learning.
        </PolicyCard>
        <PolicyCard title="Guardian & Memory Metadata">
          We track session length and inactivity timeouts (defaulting to 30 minutes) to power the Acosta Guardian wellness system. If Memory is enabled, the AI extracts key facts about you to personalize future conversations, which you can review and delete at any time.
        </PolicyCard>
        <PolicyCard title="Billing Information">
          If you upgrade to Go or Max, your payment details (credit card, billing address) are collected and securely processed directly by Stripe. We do not store full credit card numbers on our servers.
        </PolicyCard>
        <PolicyCard title="Technical Logs & Preferences">
          We store your application preferences (such as Dark/Light theme, LiquidEther background toggles, and Spotlight cursor preferences) and collect basic telemetry data for security and platform improvements.
        </PolicyCard>
      </div>

      <SectionHeader icon={Server} title="2. Hosting, AI Processing & Third Parties" />
      <div className="mb-10 rounded-3xl border border-emerald-200 bg-emerald-50 p-8 shadow-sm dark:border-emerald-900/30 dark:bg-emerald-900/10">
        <div className="flex flex-col items-start gap-5 sm:flex-row">
          <div className="shrink-0 rounded-2xl bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <h4 className="mb-2 text-xl font-bold text-emerald-900 dark:text-emerald-100">
              No Training on Your Data — Full Stop
            </h4>
            <p className="m-0 mb-4 text-base leading-relaxed text-emerald-800 dark:text-emerald-200">
              Acosta AI is powered by paid, enterprise-grade APIs from{" "}
              <strong>OpenAI</strong>, <strong>Google</strong> (Gemini), and{" "}
              <strong>Anthropic</strong> (Claude). Under these commercial API terms, providers process your prompts and files{" "}
              <strong>only to generate the immediate response</strong>. They do{" "}
              <strong>not</strong> use Acosta traffic to train, fine-tune, or improve their foundation models.
            </p>
            <ul className="m-0 list-disc space-y-2 pl-5 text-base leading-relaxed text-emerald-800 dark:text-emerald-200">
              <li>We do not sell your chats, notes, or class content.</li>
              <li>We do not license your data for model training — ours or anyone else&apos;s.</li>
              <li>Your physics notes stay yours, not fuel for the next public model release.</li>
            </ul>
          </div>
        </div>
      </div>

      <PolicyPoint title="Firebase & Google Cloud (Auth & Database)">
        We use Firebase Authentication and Cloud Firestore for secure sign-in and to store your account data, chats, classes, and study content. Data is encrypted in transit (TLS) and at rest on Google&apos;s infrastructure.
      </PolicyPoint>
      <PolicyPoint title="Vercel (Application Hosting)">
        The Acosta AI web application is hosted on Vercel. Vercel runs our frontend and serverless backend so the product can scale securely. Traffic to our app is encrypted in transit (TLS). Vercel does not use your application content to train AI models.
      </PolicyPoint>
      <PolicyPoint title="Cloudflare (Edge, CDN & Security)">
        We use Cloudflare for DNS, content delivery, and edge security (including DDoS mitigation and bot protection). Cloudflare may process connection metadata and cached assets to deliver and protect the site. Your chat content is not used by Cloudflare for AI training.
      </PolicyPoint>
      <PolicyPoint title="OpenAI">
        OpenAI models may power text generation, reasoning, multimodal analysis, music generation, and related features depending on availability and routing. Requests are sent solely to produce your response. OpenAI&apos;s API terms for our usage exclude training on customer content.
      </PolicyPoint>
      <PolicyPoint title="Google (Gemini)">
        Google Gemini models may be used for text, multimodal understanding, and image-related features. Data is sent to Google&apos;s API solely to generate the immediate response under enterprise/API terms that do not permit training on that traffic.
      </PolicyPoint>
      <PolicyPoint title="Anthropic (Claude)">
        Anthropic Claude models may be used as a primary or fallback provider for reliability and quality. If another provider is unavailable or unsuitable for a task, your request may be routed to Claude. Anthropic does not train on API customer data.
      </PolicyPoint>
      <PolicyPoint title="Model Routing">
        To keep the platform reliable, Acosta may automatically select or switch between OpenAI, Google, and Anthropic models for a given request. Regardless of which provider answers, the no-training commitment above applies.
      </PolicyPoint>
      <PolicyPoint title="Stripe">
        We use Stripe to process all payments and subscriptions. Your credit card details are never stored on our servers. All sensitive financial data is processed directly by Stripe&apos;s PCI-DSS compliant infrastructure. For more information, see{" "}
        <a
          href="https://stripe.com/au/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="link-wipe link-wipe-flex font-medium text-primary"
        >
          Stripe&apos;s Privacy Policy
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
        .
      </PolicyPoint>

      <SectionHeader icon={Trash2} title="3. Data Retention & Deletion" />
      <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
        You have complete control. You can delete individual chat sessions, study plans, exam papers, or class-related items at any time via the interface. Deleting an item removes it permanently from our Firebase/Firestore systems. If you delete your account, associated personal data is wiped.
      </p>
      <div className="mb-8 rounded-2xl border border-foreground/15 bg-foreground/[0.03] p-6">
        <p className="m-0 text-sm text-muted-foreground">
          <strong className="text-foreground">Note for Guest Users:</strong> Data generated during a Guest session is linked to a temporary identifier. If you clear your browser cache, switch devices, or do not convert to a permanent account, this data will be lost and cannot be recovered.
        </p>
      </div>
      <div className="mb-8 rounded-2xl border border-foreground/15 bg-foreground/[0.03] p-6">
        <p className="m-0 text-sm text-muted-foreground">
          <strong className="text-foreground">Provider retention:</strong> Model providers may briefly retain API request logs for abuse monitoring and reliability under their own policies. That retention is separate from Acosta&apos;s product storage and is not used to train foundation models on your Acosta content.
        </p>
      </div>
      <p className="text-base text-muted-foreground">
        For privacy inquiries, contact{" "}
        <a href="mailto:support@acosta-ai.com" className="link-wipe font-medium text-primary">
          support@acosta-ai.com
        </a>
        .
      </p>
    </>
  );
}

export function TermsPolicyContent() {
  return (
    <>
      <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
        By using Acosta AI (a Transnology company), you agree to these terms. We aim to be fair, transparent, and educational-first.
      </p>

      <div className="mb-12 rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm dark:border-amber-900/50 dark:bg-amber-900/10">
        <h4 className="mb-2 flex items-center gap-2 text-lg font-bold text-amber-800 dark:text-amber-300">
          <AlertTriangle className="h-5 w-5" />
          Beta Platform Notice
        </h4>
        <p className="m-0 text-base leading-relaxed text-amber-700 dark:text-amber-200/80">
          Acosta AI is currently in <strong>Beta</strong>. Features, pricing, and availability are subject to change without notice. While we strive for stability, you may encounter bugs or service interruptions. Your feedback is vital to our improvement.
        </p>
      </div>

      <SectionHeader icon={UserCheck} title="1. Eligibility & Access" />
      <PolicyPoint title="Age Requirement">
        If you are a student under 13, you confirm you have parental or school consent.
      </PolicyPoint>
      <PolicyPoint title="Account Security">
        You are responsible for keeping your password secure. We recommend enabling Two-Factor Authentication (2FA) in Settings.
      </PolicyPoint>
      <PolicyPoint title="Guest Accounts">
        Guest access is provided for trial purposes with limited features (e.g., message limits, restricted modes). We accept no liability for data loss associated with anonymous guest sessions. To permanently save your history, you must upgrade to a full account.
      </PolicyPoint>
      <PolicyPoint title="Third-Party Authentication">
        When using &quot;Sign in with Google&quot;, &quot;Sign in with GitHub&quot;, or &quot;Sign in with Microsoft&quot;, you are also subject to the terms of service of those respective platforms regarding your account authentication.
      </PolicyPoint>

      <SectionHeader icon={GraduationCap} title="2. Academic Integrity Code" />
      <div className="mb-10 rounded-3xl border border-red-200 bg-red-50 p-8 shadow-sm dark:border-red-900/50 dark:bg-red-900/10">
        <h4 className="mb-3 flex items-center gap-3 text-xl font-bold text-red-800 dark:text-red-300">
          <span className="rounded-xl bg-red-100 p-2 dark:bg-red-900/50">
            <AlertOctagon className="h-5 w-5" />
          </span>
          Zero Tolerance for Cheating
        </h4>
        <p className="m-0 mb-4 text-base text-red-700 dark:text-red-200/80">
          Acosta AI is a tutor, not a ghostwriter. Even with answer mode on, you strictly agree NOT to:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-base text-red-700 marker:text-red-400 dark:text-red-200/80">
          <li>Use the &quot;Exam Simulator&quot; to answer questions during a real, active assessment.</li>
          <li>Copy-paste AI generated essays and submit them as your own work.</li>
          <li>Upload copyrighted exam papers that you do not have permission to use.</li>
        </ul>
      </div>

      <SectionHeader icon={CreditCard} title="3. Billing, Plans & Credits" />
      <PolicyPoint title="Subscriptions & Free Trials">
        &apos;Go&apos; and &apos;Max&apos; plans are available in Monthly or Annual billing cycles. The &apos;Go&apos; Monthly plan includes a 30-day free trial for new users. You may cancel at any time via the Stripe Portal; your access will continue until the end of the current billing cycle.
      </PolicyPoint>
      <PolicyPoint title="Support Us">
        &quot;Supporter&quot; contributions are voluntary payments to help sustain the platform. These are non-refundable donations that grant a special badge but no additional functional credits.
      </PolicyPoint>
      <PolicyPoint title="Credit Top-Ups">
        &quot;Top-Up Packs&quot; (e.g. 50 Thinking Credits) are one-time purchases. These credits <strong>do not expire</strong> as long as your account is active. They are consumed only after your monthly plan limit is reached. Top-ups are non-refundable.
      </PolicyPoint>
      <PolicyPoint title="Usage Limits">
        We reserve the right to enforce fair usage limits on &quot;Unlimited&quot; tiers to prevent abuse (e.g., botting) that degrades service for others.
      </PolicyPoint>
      <p className="mt-6 text-base text-muted-foreground">
        For payment issues, contact{" "}
        <a href="mailto:payments@acosta-ai.com" className="link-wipe font-medium text-primary">
          payments@acosta-ai.com
        </a>
        .
      </p>

      <SectionHeader icon={Sparkles} title="4. AI Limitations & Liability" />
      <PolicyPoint title="Hallucinations & Models">
        Generative AI models (including OpenAI, Google Gemini, and Anthropic Claude variants) can make mistakes, even in &quot;Thinking&quot; mode. The platform may automatically switch between providers and models to ensure uptime and quality. Always verify critical facts.
      </PolicyPoint>
      <PolicyPoint title="No Professional Advice">
        Acosta AI is an educational tool. It does not provide medical diagnoses, legal counsel, or financial advice.
      </PolicyPoint>
      <PolicyPoint title="Service Availability">
        Features such as &quot;Image Generation&quot; and &quot;Music Generation&quot; rely on high-demand model infrastructure. Occasional downtime or high latency may occur during peak global usage. Availability of specific providers (OpenAI, Google Gemini, Anthropic Claude) may also vary as we route for reliability.
      </PolicyPoint>

      <SectionHeader icon={Scale} title="5. Intellectual Property" />
      <PolicyPoint title="Your Content">
        You retain ownership of the prompts you input and the content generated by the AI in response to your prompts (subject to the terms of the relevant model providers when their services are used).
      </PolicyPoint>
      <PolicyPoint title="Our Platform">
        The interface, code, &quot;Guardian&quot; system, and &quot;Liquid Ether&quot; design are the property of Transnology.
      </PolicyPoint>
    </>
  );
}

export function SafetyPolicyContent() {
  return (
    <>
      <p className="mb-12 text-xl leading-relaxed text-muted-foreground">
        We&apos;ve built Acosta AI with safety and ethics as foundational pillars. Below is a breakdown of the active protection systems.
      </p>

      <div className="space-y-10">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-slate-900 shadow-lg shadow-blue-500/5 dark:border-blue-900/50 dark:from-blue-950/30 dark:to-indigo-950/30 dark:text-slate-100 md:p-12">
          <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
          <h3 className="relative z-10 mt-0 mb-4 flex items-center gap-4 text-3xl font-bold text-slate-900 dark:text-slate-50">
            <span className="rounded-2xl bg-blue-600 p-3 text-white shadow-xl shadow-blue-600/30">
              <Activity className="h-7 w-7" />
            </span>
            Acosta Guardian
          </h3>
          <p className="relative z-10 mb-10 text-lg font-medium text-blue-800 dark:text-blue-200">
            Built-In Wellbeing & Workload Protection System
          </p>
          <div className="relative z-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              { title: "Always-On Support", desc: "Monitors platform activity to proactively protect against burnout." },
              { title: "Smart Load Balancing", desc: "Breaks complex tasks into steps and adjusts pacing." },
              { title: "Adaptive Modes", desc: "Switches to revision modes when high cognitive load is detected." },
              { title: "Stress Detection", desc: "Identifies frustration or prolonged difficulty patterns." },
              { title: "Recovery Prompts", desc: "Suggests micro-breaks and subject switching." },
              { title: "Supportive Guidance", desc: "Uses calm, non-judgmental language." },
              { title: "Privacy-First", desc: "Only monitors in-platform metadata; no private message access." },
              { title: "Duty of Care", desc: "Helps schools provide proactive wellbeing support." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-blue-200 bg-white/95 p-4 transition-colors hover:border-blue-400 dark:border-blue-900/30 dark:bg-black/40 dark:hover:border-blue-700/50"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
                <div>
                  <span className="mb-1 block text-base font-bold text-slate-900 dark:text-slate-100">{item.title}</span>
                  <span className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PolicyCard title="Academic Integrity">
            <div className="mb-4 flex items-center gap-3 text-blue-600 dark:text-blue-400">
              <span className="rounded-xl bg-blue-50 p-2 dark:bg-blue-500/10">
                <GraduationCap className="h-5 w-5" />
              </span>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground marker:text-blue-400">
              <li>Refuses &quot;Write my essay&quot; commands.</li>
              <li>Offers outlines and critiques instead.</li>
              <li>Detects and verifies raw exam papers.</li>
            </ul>
          </PolicyCard>

          <PolicyCard title="Crisis Detection">
            <div className="mb-4 flex items-center gap-3 text-red-600 dark:text-red-400">
              <span className="rounded-xl bg-red-50 p-2 dark:bg-red-500/10">
                <Heart className="h-5 w-5" />
              </span>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground marker:text-red-400">
              <li>Recognizes signs of self-harm or distress.</li>
              <li>Triggers supportive intervention overlays.</li>
              <li>Provides direct links to lifelines.</li>
            </ul>
          </PolicyCard>

          <PolicyCard title="PII Protection">
            <div className="mb-4 flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
              <span className="rounded-xl bg-emerald-50 p-2 dark:bg-emerald-500/10">
                <Lock className="h-5 w-5" />
              </span>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground marker:text-emerald-400">
              <li>Scans messages for sensitive data before sending.</li>
              <li>Detects phone numbers, cards, and keys.</li>
              <li>One-click redaction tools.</li>
            </ul>
          </PolicyCard>

          <PolicyCard title="Responsible Imagery">
            <div className="mb-4 flex items-center gap-3 text-purple-600 dark:text-purple-400">
              <span className="rounded-xl bg-purple-50 p-2 dark:bg-purple-500/10">
                <ImageIcon className="h-5 w-5" />
              </span>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground marker:text-purple-400">
              <li>SynthID watermarking on all images.</li>
              <li>Person filter prevents deepfakes.</li>
              <li>Strict violent/sexual content blocks.</li>
            </ul>
          </PolicyCard>
        </div>

        <div className="flex flex-col items-start gap-6 rounded-3xl border border-amber-300 bg-amber-50 p-8 text-amber-950 shadow-sm dark:border-amber-900/50 dark:bg-amber-900/10 dark:text-amber-100 sm:flex-row">
          <div className="shrink-0 rounded-2xl bg-amber-100 p-4 text-amber-600 shadow-inner dark:bg-amber-900/40 dark:text-amber-400">
            <Timer className="h-8 w-8" />
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold text-amber-950 dark:text-amber-100">Session Security</h3>
            <p className="text-base leading-relaxed text-amber-900 dark:text-amber-200">
              To protect your account on shared devices, we automatically log you out after inactivity. This interval is configurable in Settings (Default: 30 mins).
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function PolicyFooter() {
  return (
    <div className="mt-16 border-t border-foreground/12 pt-10 text-center">
      <p className="text-base font-medium text-muted-foreground">
        Acosta AI is a{" "}
        <a
          href="https://transnology.co"
          target="_blank"
          rel="noreferrer"
          className="link-wipe link-wipe-flex font-bold text-foreground hover:text-primary"
        >
          Transnology
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>{" "}
        company.
      </p>
      <p className="mt-2 text-xs font-bold tracking-tight text-muted-foreground">
        Trading as Lachlan Thurlow (ABN 59 312 943 638).
      </p>
    </div>
  );
}
