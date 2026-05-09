import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowUpRight,
  CreditCard,
  Database,
  Eye,
  GraduationCap,
  Heart,
  Image as ImageIcon,
  Lock,
  Mic,
  Scale,
  Server,
  Shield,
  Sparkles,
  Timer,
  Trash2,
  UserCheck,
} from "lucide-react";

export const POLICY_LAST_UPDATED = "February 2026";
export const PRIVACY_SUMMARY =
  "Your thoughts and data are personal. This policy outlines exactly what we collect, how it's processed, and your absolute right to privacy.";
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
        At Acosta AI (a Transnology company), we believe your thoughts and data are personal. This policy outlines exactly what we collect, how it&apos;s processed, and your absolute right to privacy.
      </p>

      <SectionHeader icon={Database} title="1. Information We Collect" />
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <PolicyCard title="Identity Data">
          Email, display name, and Year Level/Role. We use this strictly for authentication and to tailor the AI&apos;s complexity (e.g., Year 7 vs University).
        </PolicyCard>
        <PolicyCard title="Third-Party Logins">
          If you sign in via Google or GitHub, we store your email and public profile info provided by them for authentication. We do not access your repositories or private data on those platforms.
        </PolicyCard>
        <PolicyCard title="Guest Sessions">
          For Guest users, we assign a temporary anonymous ID. No personal contact information is collected unless you choose to upgrade to a full account.
        </PolicyCard>
        <PolicyCard title="Generated Content">
          Chat logs, study plans, generated images, exam papers, flashcards, and mind dumps. These are stored in your private database until you delete them.
        </PolicyCard>
        <PolicyCard title="Guardian Metadata">
          We monitor interaction frequency and session duration locally to detect burnout/fatigue. We do NOT read your messages for this purpose.
        </PolicyCard>
        <PolicyCard title="Billing Information">
          Processed securely by Stripe. Acosta AI never sees or stores your full credit card number or bank details.
        </PolicyCard>
      </div>

      <SectionHeader icon={Server} title="2. AI Processing & Third Parties" />
      <div className="mb-10 rounded-3xl border border-emerald-200 bg-emerald-50 p-8 shadow-sm dark:border-emerald-900/30 dark:bg-emerald-900/10">
        <div className="flex flex-col items-start gap-5 sm:flex-row">
          <div className="shrink-0 rounded-2xl bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <h4 className="mb-2 text-xl font-bold text-emerald-900 dark:text-emerald-100">
              No Training on User Data
            </h4>
            <p className="m-0 text-base leading-relaxed text-emerald-800 dark:text-emerald-200">
              Acosta branded models are powered by Google and Claude&apos;s enterprise grade API&apos;s. These providers do <strong>not</strong> use data sent via our API to train their foundational models. Your physics notes remain yours, not training data for the next GPT.
            </p>
          </div>
        </div>
      </div>
      <PolicyPoint title="Google Cloud & Firebase">
        We use Google&apos;s secure infrastructure for database hosting (Firestore), authentication, and serverless functions. Data is encrypted in transit (TLS) and at rest.
      </PolicyPoint>
      <PolicyPoint title="Acosta Models">
        Primary provider for text generation, image creation, and audio synthesis. Data is sent to the API solely for the purpose of generating the immediate response.
      </PolicyPoint>
      <PolicyPoint title="Anthropic (Claude)">
        Secondary provider used as a fallback system to ensure reliability. If Google Gemini services are unavailable, your request may be processed by (at the moment) Claude 4.5 Haiku, or Claude 4.6 Sonnet. Claude models do not support image generation and voice mode. Anthropic does not train on API data.
      </PolicyPoint>
      <PolicyPoint title="Stripe">
        We use Stripe to process all payments and subscriptions. Your credit card details are never stored on our servers. All sensitive financial data is processed directly by Stripe&apos;s PCI-DSS compliant infrastructure. For more information, see{" "}
        <a
          href="https://stripe.com/au/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="link-wipe font-medium text-primary"
        >
          Stripe&apos;s Privacy Policy
        </a>
        .
      </PolicyPoint>

      <SectionHeader icon={Activity} title="3. Feature-Specific Privacy" />
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <PolicyCard title="Live Audio">
          <div className="mb-3 flex items-center gap-2 font-bold text-primary">
            <Mic className="h-5 w-5" /> Ephemeral Streaming
          </div>
          <p className="m-0 text-base text-muted-foreground">
            When using Live Conversation, audio is streamed directly to the model for low latency. We do not permanently store raw audio recordings of your voice. Transcripts are saved to your history for your reference.
          </p>
        </PolicyCard>
        <PolicyCard title="Visual Intelligence">
          <div className="mb-3 flex items-center gap-2 font-bold text-primary">
            <Eye className="h-5 w-5" /> Image Analysis
          </div>
          <p className="m-0 text-base text-muted-foreground">
            Images uploaded for analysis (e.g., &quot;Explain this diagram&quot;) are processed temporarily by the vision model. We do not retain uploaded images for training purposes.
          </p>
        </PolicyCard>
      </div>

      <SectionHeader icon={Trash2} title="4. Data Retention & Deletion" />
      <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
        You have complete control. You can delete individual chat sessions, study plans, or exam papers at any time via the interface. Deleting an item removes it permanently from our database. If you delete your account, all associated data is wiped immediately.
      </p>
      <div className="mb-8 rounded-2xl border border-foreground/15 bg-foreground/[0.03] p-6">
        <p className="m-0 text-sm text-muted-foreground">
          <strong className="text-foreground">Note for Guest Users:</strong> Data generated during a Guest session is linked to a temporary identifier. If you clear your browser cache, switch devices, or do not convert to a permanent account, this data will be lost and cannot be recovered.
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
        When using &quot;Sign in with Google&quot; or &quot;Sign in with GitHub&quot;, you are also subject to the terms of service of those respective platforms regarding your account authentication.
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
        Generative AI models (Gemini 2.5/3.0/3.1 & Claude 3.5/3.7) can make mistakes, even in &quot;Thinking&quot; mode. The platform may automatically switch between models to ensure uptime. Always verify critical facts.
      </PolicyPoint>
      <PolicyPoint title="No Professional Advice">
        Acosta AI is an educational tool. It does not provide medical diagnoses, legal counsel, or financial advice.
      </PolicyPoint>
      <PolicyPoint title="Service Availability">
        &quot;Live&quot; mode and &quot;Image Generation&quot; rely on high-demand GPU clusters. Occasional downtime or high latency may occur during peak global usage.
      </PolicyPoint>

      <SectionHeader icon={Scale} title="5. Intellectual Property" />
      <PolicyPoint title="Your Content">
        You retain ownership of the prompts you input and the content generated by the AI in response to your prompts (Subject to Google&apos;s GenAI terms).
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
