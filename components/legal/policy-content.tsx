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
  version: "1.1",
  effectiveDate: "30 October 2026",
  appliesTo:
    "Individual users of Acosta AI, including students, teachers, and other account holders using the platform.",
};

export const TERMS_META: PolicyMeta = {
  version: "1.1",
  effectiveDate: "30 October 2026",
  appliesTo:
    "Individual users who create or use a consumer Acosta AI account at app.acosta-ai.com.",
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
      <p className="mb-8 text-base leading-relaxed text-muted-foreground">
        We collect data to make the Acosta AI platform curriculum-aware, personalized, and safe.
      </p>
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <PolicyCard title="Identity Data">
          When you register for an account, we collect basic profile information, including your name and email address. We require your year level (e.g., Year 7-12, University) and your location (e.g., NSW, Australia) during onboarding to ensure curriculum and region-appropriate responses.
        </PolicyCard>
        <PolicyCard title="Third-Party Logins">
          You can sign in with email and password, a magic link or emailed code, a phone number, a passkey, or Google, GitHub or Microsoft. If you use a third-party provider, we receive a sign-in token and basic profile details (like your name, email and profile picture) from them. If you add a phone number we store it for sign-in and two-factor authentication.
        </PolicyCard>
        <PolicyCard title="Guest Sessions">
          You can use Fast chat and join Live Quizzes without an account. Guests get a temporary anonymous identifier, and guest chats are saved in your browser on that device. Guest messages are still sent to our AI providers to generate replies. If you create an account, your guest chats and their files move into it. If you clear your browser data or switch devices first, they are lost and cannot be recovered.
        </PolicyCard>
        <PolicyCard title="Location (Optional)">
          We ask for a general location (like state and country) during onboarding for curriculum mapping. If you tap the Home weather widget, your browser asks for permission to share your location. Your coordinates are then sent from your device to Open-Meteo (for the weather) and BigDataCloud (to show your town&apos;s name). We don&apos;t store the result. It is kept in memory only until you close the page.
        </PolicyCard>
        <PolicyCard title="Generated Content">
          We store the content you actively create and interact with on the platform. This includes:
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Chat transcripts and uploaded files/attachments</li>
            <li>Flashcard decks</li>
            <li>Mind Maps, Timelines, Documents, and Generated Code in the Canvas</li>
            <li>Study plans and Exam Simulation responses</li>
            <li>Images and music generated via our AI models</li>
            <li>Planner items, Mind Dump notes, Study Garden progress and study group content</li>
            <li>Class tasks, submissions and Live Quiz answers</li>
          </ul>
        </PolicyCard>
        <PolicyCard title="Classes & Subjects Metadata">
          We store your selected subjects and curriculum preferences to tailor study tools and explanations directly to what you are currently learning.
        </PolicyCard>
        <PolicyCard title="Guardian & Memory Metadata">
          We track session length and inactivity timeouts (defaulting to 30 minutes) to power the Acosta Guardian wellness system. If Memory is enabled, the AI extracts key facts about you to personalize future conversations, which you can review and delete at any time.
        </PolicyCard>
        <PolicyCard title="Connected Apps (Optional)">
          If you connect Notion or another connected app (such as Craft or GitHub), we store the access token that app gives us so Acosta can read or write the pages you choose. If you share a YouTube link, we fetch that video&apos;s transcript. You can disconnect an app at any time in Settings.
        </PolicyCard>
        <PolicyCard title="Family Digest (Optional)">
          If you turn on the weekly family digest, we store the email address you give us and send a weekly summary of your study activity to it. You can turn it off at any time in Settings.
        </PolicyCard>
        <PolicyCard title="Billing Information">
          When you pay for Go, Max, a top-up pack, a gift, the Supporter badge or a donation, your payment details are collected and processed directly by Stripe. We keep a record of your plan and purchases, but we never store full card numbers.
        </PolicyCard>
        <PolicyCard title="Technical Logs & Preferences">
          We store your app preferences (such as theme, background and cursor settings) and usage counts for your plan limits. We use Vercel Web Analytics to understand page visits in aggregate, and collect basic technical logs for security and reliability.
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
              No Training on Your Data
            </h4>
            <p className="m-0 mb-4 text-base leading-relaxed text-emerald-800 dark:text-emerald-200">
              Acosta AI uses paid APIs from Google (Gemini), Anthropic (Claude) and OpenAI. Under their commercial API terms, these providers process your prompts and files to generate a response, and <strong>they do not use Acosta traffic to train their models.</strong>
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
        We use Firebase Authentication for secure sign-ins and Cloud Firestore/Storage (hosted on Google Cloud) to store your profile, settings, and generated content securely.
      </PolicyPoint>
      <PolicyPoint title="Vercel (Application Hosting)">
        The Acosta AI web application is hosted on Vercel&apos;s global edge network to ensure fast load times and reliable performance.
      </PolicyPoint>
      <PolicyPoint title="Google (Gemini)">
        Gemini is our main AI engine. It powers Fast, Core and Thinking chat, study tools, exam marking, image and music generation and read-aloud voice. Chats use Google Search grounding, so parts of your question may be used to search the web for up-to-date answers.
      </PolicyPoint>
      <PolicyPoint title="Anthropic (Claude) & OpenAI">
        We use Claude (Anthropic) and then OpenAI as backup models, so Acosta keeps working if Gemini is down or busy.
      </PolicyPoint>
      <PolicyPoint title="Leonardo AI (Backup Image Generation)">
        If our main image model can&apos;t complete a request, the image prompt is sent to Leonardo AI instead.
      </PolicyPoint>
      <PolicyPoint title="Stripe">
        All subscription payments, top-ups, and billing are managed by Stripe. You can review <a href="https://stripe.com/au/privacy" target="_blank" rel="noopener noreferrer" className="link-wipe link-wipe-flex font-medium text-primary">Stripe&apos;s Privacy Policy<ArrowUpRight className="h-3.5 w-3.5" /></a> for more details.
      </PolicyPoint>

      <PolicyPoint title="Resend (Email)">
        We use Resend to send emails such as sign-in codes, welcome and purchase emails, product updates youWe use Resend to send emails such as sign-in codes and the optional family digest.apos;ve opted into and the optional family digest. Resend stores your name, email address and email preferences for this.
      </PolicyPoint>
      <PolicyPoint title="Pusher (Live Quiz)">
        Live Quiz uses Pusher to send questions and answers between players in real time. Quiz rooms are temporary and expire after about four hours.
      </PolicyPoint>
      <PolicyPoint title="Where your data is stored">
        Our providers are based overseas, mainly in the United States, so your data may be stored and processed outside Australia. We choose providers with strong security practices and take reasonable steps under the Australian Privacy Principles to make sure your information is protected.
      </PolicyPoint>

      <SectionHeader icon={Trash2} title="3. Data Retention & Deletion" />
      <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
        <strong>You have complete control.</strong> You can delete chats, flashcard decks, study plans, exam sessions and other items yourself at any time. Deleting an item removes it from our Firebase databases. We keep the rest of your content for as long as your account is open.
      </p>
      <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
        To delete your whole account, email support@acosta-ai.com from the address on your account. We&apos;ll delete your profile and content from our active databases. Records we have to keep by law, such as payment records, may be kept for longer.
      </p>
      <div className="mb-8 rounded-2xl border border-foreground/15 bg-foreground/[0.03] p-6">
        <p className="m-0 text-sm text-muted-foreground">
          <strong className="text-foreground">Provider retention:</strong> Model providers may briefly retain API request logs for abuse monitoring and reliability under their own policies. That retention is separate from Acosta&apos;s product storage and is not used to train foundation models on your Acosta content.
        </p>
      </div>

      <SectionHeader icon={GraduationCap} title="4. Students & Children" />
      <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
        Acosta AI is used by school students, including younger children. Users under 13 need a parent or guardian&apos;s consent to create an account. We only collect what we need to run the service, we never sell student data, and we don&apos;t use it for advertising. If you&apos;re a parent or guardian and want to see or delete your child&apos;s data, contact us below.
      </p>
      <p className="mb-12 text-lg leading-relaxed text-muted-foreground">
        If you join a class, your teacher can see your name, the tasks you complete and your results for that class.
      </p>

      <SectionHeader icon={Scale} title="5. Your Rights" />
      <p className="mb-12 text-lg leading-relaxed text-muted-foreground">
        We handle personal information in line with the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles. You can ask to access or correct the information we hold about you. If you have a complaint, contact us first and we&apos;ll aim to respond within 30 days. If you&apos;re not happy with our response, you can complain to the Office of the Australian Information Commissioner at oaic.gov.au.
      </p>

      <SectionHeader icon={UserCheck} title="6. Contact Us" />
      <p className="text-base text-muted-foreground">
        For privacy questions, access or correction requests, data exports or account deletion, contact Transnology at:{" "}
        <a href="mailto:support@acosta-ai.com" className="link-wipe font-medium text-primary">
          <strong>support@acosta-ai.com</strong>
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
          Acosta AI is currently in Beta. Features, pricing, and availability are subject to change without notice. While we strive for stability, you may encounter bugs or service interruptions. Your feedback is vital to our improvement.
        </p>
      </div>

      <SectionHeader icon={UserCheck} title="1. Eligibility & Access" />
      <PolicyPoint title="Age Requirement">
        Acosta AI is for learners from primary school (K-6) through high school, university, TAFE and adult learning, and for teachers. Users under the age of 13 require parental or guardian consent to create an account. If you are under 18, please read these terms with a parent or guardian.
      </PolicyPoint>
      <PolicyPoint title="Account Security">
        You are responsible for safeguarding your login credentials. You must not share your account with others to bypass subscription limits. To protect your account on shared devices, we automatically log you out after inactivity (configurable in Settings, defaulting to 30 minutes).
      </PolicyPoint>
      <PolicyPoint title="Guest Accounts">
        You can use Fast chat and join Live Quizzes as a guest without an account. Core and Thinking modes and most study tools need an account. Guest chats are saved only in your browser until you sign up, at which point they move into your account.
      </PolicyPoint>
      <PolicyPoint title="Third-Party Authentication">
        If you sign in with Google, Microsoft or GitHub, or connect Notion or another app, you also agree to that service&apos;s own terms.
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
          Acosta AI is a tutor, not a ghostwriter. Our core philosophy is <strong>Education-first</strong>, and our AI is designed to guide thinking, not to do homework for you. Even if Learning Mode is adjusted or you use specific tools, you strictly agree NOT to:
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-6 text-base text-red-700 marker:text-red-400 dark:text-red-200/80">
          <li>Use the <strong>Exam Simulator</strong> to answer questions during a real, active assessment.</li>
          <li>Copy-paste AI-generated essays, code, or assignments and submit them as your own original work.</li>
          <li>Upload copyrighted exam papers, textbooks, or proprietary materials that you do not have permission to use.</li>
          <li>Attempt to trick the AI (e.g., masquerading homework as a &quot;game&quot;) to bypass its educational guardrails.</li>
        </ul>
        <p className="m-0 text-base text-red-700 dark:text-red-200/80">
          Violations of the Academic Integrity Code may result in account suspension or termination.
        </p>
      </div>

      <SectionHeader icon={CreditCard} title="3. Billing, Plans & Credits" />
      <PolicyPoint title="Subscriptions & Free Trials">
        Acosta AI has three plans: Free, Go ($10/month or $105/year) and Max ($30/month or $315/year). All prices are in Australian dollars. Subscriptions renew automatically through Stripe until you cancel. You can cancel at any time and keep access until the end of your billing period. Fees are generally non-refundable, except where Australian Consumer Law says otherwise.
      </PolicyPoint>
      <PolicyPoint title="Support Us">
        Acosta AI partners with Stripe Climate. A portion of revenue goes to carbon removal. You can also buy an optional Supporter badge (you choose the price), make a charity donation (minimum $2), or gift Go or Max to someone else for 1, 3 or 6 months. Gifts, Supporter payments and donations are one-off payments and are non-refundable.
      </PolicyPoint>
      <PolicyPoint title="Credit Top-Ups">
        If you run out of a monthly allowance, you can buy a one-off $5 top-up pack (Exam, Image, Thinking, Study or Core). Packs are non-refundable, are used before your monthly allowance, and last as long as your account is open.
      </PolicyPoint>
      <PolicyPoint title="Usage Limits">
        Usage limits reset monthly in line with your billing cycle. We track usage for Core messages, Thinking messages, study tools, images and exam simulations. Some features, like music generation, are only on Max.
      </PolicyPoint>
      <p className="mt-6 text-base text-muted-foreground">
        For payment issues, contact{" "}
        <a href="mailto:billing@transnology.co" className="link-wipe font-medium text-primary">
          billing@transnology.co
        </a>
        .
      </p>

      <SectionHeader icon={Sparkles} title="4. AI Limitations & Liability" />
      <PolicyPoint title="Hallucinations & Models">
        AI models (including Gemini, Claude, and OpenAI) are probabilistic. They may hallucinate, produce factual errors, or omit critical information. You must verify any academic, historical, or scientific information generated by the platform.
      </PolicyPoint>
      <PolicyPoint title="No Professional Advice">
        Acosta AI is an educational tool. It does not provide professional medical, legal, financial, or psychological advice.
      </PolicyPoint>
      <PolicyPoint title="Service Availability">
        While we use reliable hosting and backup AI models, we do not guarantee 100% uptime. Transnology is not liable for data loss, missed deadlines, or academic penalties resulting from platform unavailability.
      </PolicyPoint>

      <SectionHeader icon={Scale} title="5. Intellectual Property" />
      <PolicyPoint title="Your Content">
        You retain all rights to the prompts, documents, and materials you upload. You grant Transnology a license to process and display this content solely to provide the service. You may use the outputs generated by Acosta AI for your own personal, educational purposes.
      </PolicyPoint>
      <PolicyPoint title="Our Platform">
        Transnology retains all rights to the Acosta AI brand, UI, source code, prompt architecture, and proprietary algorithms (including the Guardian Service and Learning Mode protocols).
      </PolicyPoint>

      <SectionHeader icon={Scale} title="6. Governing Law & Contact" />
      <PolicyPoint title="Governing Law">
        These terms are governed by the laws of New South Wales, Australia. Nothing in these terms limits your rights under the Australian Consumer Law.
      </PolicyPoint>
      <PolicyPoint title="Contact">
        Questions about these terms? Email support@acosta-ai.com.
      </PolicyPoint>
    </>
  );
}

export function SafetyPolicyContent() {
  return (
    <>
      <p className="mb-12 text-xl leading-relaxed text-muted-foreground">
        We&apos;ve built Acosta AI with safety and ethics as foundational pillars. Below is a breakdown of the active protection systems designed to keep students secure, focused, and mentally healthy.
      </p>

      <div className="space-y-10">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-slate-900 shadow-lg shadow-blue-500/5 dark:border-blue-900/50 dark:from-blue-950/30 dark:to-indigo-950/30 dark:text-slate-100 md:p-12">
          <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
          <h3 className="relative z-10 mt-0 mb-4 flex items-center gap-4 text-3xl font-bold text-slate-900 dark:text-slate-50">
            <span className="rounded-2xl bg-blue-600 p-3 text-white shadow-xl shadow-blue-600/30">
              <Activity className="h-7 w-7" />
            </span>
            1. Acosta Guardian
          </h3>
          <p className="relative z-10 mb-6 text-lg font-medium text-blue-800 dark:text-blue-200">
            Built-In Wellbeing & Workload Protection System
          </p>
          <div className="relative z-10 space-y-4 text-base leading-relaxed text-blue-900 dark:text-blue-100">
            <p>
              The Guardian Service is a background monitor that looks out for student well-being during long study sessions.
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-blue-500">
              <li>It tracks session duration, interaction intensity, and signs of study fatigue.</li>
              <li>If burnout is detected, Guardian triggers supportive intervention overlays, suggesting breaks, hydration, or a shift in study methods.</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PolicyCard title="2. Academic Integrity">
            <div className="mb-4 flex items-center gap-3 text-blue-600 dark:text-blue-400">
              <span className="rounded-xl bg-blue-50 p-2 dark:bg-blue-500/10">
                <GraduationCap className="h-5 w-5" />
              </span>
            </div>
            <p className="mb-4 text-muted-foreground">
              Acosta AI is an educational tool designed to foster independent thought.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground marker:text-blue-400">
              <li><strong>Refuses &quot;Write my essay&quot; commands:</strong> The AI is strictly instructed to reject requests for complete essays or assignments.</li>
              <li><strong>Socratic Guidance:</strong> Instead of giving answers, it offers outlines, critiques, and guiding questions.</li>
              <li><strong>Masquerade Detection:</strong> The system recognizes attempts to disguise homework as hobbies or games to bypass rules.</li>
              <li><strong>Exam Integrity:</strong> Detects and verifies raw exam papers. In Exam Sim mode, we enforce anti-cheat mechanisms by logging tab switches and hiding the context menu to ensure a focused environment.</li>
            </ul>
          </PolicyCard>

          <PolicyCard title="3. Crisis Detection">
            <div className="mb-4 flex items-center gap-3 text-red-600 dark:text-red-400">
              <span className="rounded-xl bg-red-50 p-2 dark:bg-red-500/10">
                <Heart className="h-5 w-5" />
              </span>
            </div>
            <p className="mb-4 text-muted-foreground">
              We prioritize the mental health of our users above all else.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground marker:text-red-400">
              <li><strong>Recognizes distress:</strong> The AI is trained to recognize signs of self-harm, severe distress, or depressive language in prompts.</li>
              <li><strong>Supportive overlays:</strong> When a crisis is detected, the system overrides standard responses and triggers supportive intervention overlays.</li>
              <li><strong>Direct resources:</strong> We provide immediate, direct links to crisis lifelines and mental health support services.</li>
            </ul>
          </PolicyCard>

          <PolicyCard title="4. PII Protection">
            <div className="mb-4 flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
              <span className="rounded-xl bg-emerald-50 p-2 dark:bg-emerald-500/10">
                <Lock className="h-5 w-5" />
              </span>
            </div>
            <p className="mb-4 text-muted-foreground">
              Protecting Personally Identifiable Information (PII) is critical, especially for younger students.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground marker:text-emerald-400">
              <li><strong>Pre-send scanning:</strong> The platform scans messages for highly sensitive data before sending them to the AI models.</li>
              <li><strong>Data detection:</strong> Automatically detects phone numbers, credit cards, government IDs, and API keys.</li>
              <li><strong>Redaction:</strong> Offers one-click redaction tools to ensure students don&apos;t accidentally leak private information.</li>
            </ul>
          </PolicyCard>

          <PolicyCard title="5. Responsible Imagery">
            <div className="mb-4 flex items-center gap-3 text-purple-600 dark:text-purple-400">
              <span className="rounded-xl bg-purple-50 p-2 dark:bg-purple-500/10">
                <ImageIcon className="h-5 w-5" />
              </span>
            </div>
            <p className="mb-4 text-muted-foreground">
              Image generation (powered by our AI partners) comes with strict guardrails.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground marker:text-purple-400">
              <li><strong>SynthID watermarking:</strong> All AI-generated images contain SynthID watermarks to ensure transparency and traceability.</li>
              <li><strong>Person filter:</strong> Strict filters prevent the generation of deepfakes or likenesses of real individuals.</li>
              <li><strong>Content blocks:</strong> Absolute blocks on the generation of violent, sexually explicit, or otherwise harmful visual content.</li>
            </ul>
          </PolicyCard>
        </div>

        <div className="flex flex-col items-start gap-6 rounded-3xl border border-amber-300 bg-amber-50 p-8 text-amber-950 shadow-sm dark:border-amber-900/50 dark:bg-amber-900/10 dark:text-amber-100 sm:flex-row">
          <div className="shrink-0 rounded-2xl bg-amber-100 p-4 text-amber-600 shadow-inner dark:bg-amber-900/40 dark:text-amber-400">
            <Timer className="h-8 w-8" />
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold text-amber-950 dark:text-amber-100">6. Session Security</h3>
            <p className="mb-4 text-base leading-relaxed text-amber-900 dark:text-amber-200">
              To protect your account and data—especially if you are using shared computers in a school library or classroom—Acosta AI features automatic session management.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-base text-amber-900 marker:text-amber-500 dark:text-amber-200">
              <li><strong>Inactivity Timeout:</strong> We automatically log you out after a period of inactivity.</li>
              <li><strong>Configurable:</strong> This interval is configurable in your Settings, defaulting to 30 minutes.</li>
            </ul>
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
