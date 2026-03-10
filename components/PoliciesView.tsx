
import React, { useState, useEffect } from 'react';
import { 
    Shield, FileText, ArrowLeft, Lock, Scale, Heart, AlertTriangle, 
    GraduationCap, Timer, Image as ImageIcon, Activity, Database, 
    Server, Globe, CreditCard, UserCheck, AlertOctagon, Eye, Trash2, 
    Sparkles, Mic, FileJson, BookOpen, Brain
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';

type PolicySection = 'MENU' | 'TERMS' | 'PRIVACY' | 'SAFETY';

interface PoliciesViewProps {
    spotlightEnabled?: boolean;
    onBack?: () => void;
    initialSection?: PolicySection;
}

const SectionHeader: React.FC<{ icon: React.ElementType, title: string }> = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-3 mt-12 mb-6 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-primary">
            <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white m-0">{title}</h3>
    </div>
);

const PolicyPoint: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6 last:mb-0">
        <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            {title}
        </h4>
        <div className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-3.5 border-l border-neutral-200 dark:border-neutral-800">
            {children}
        </div>
    </div>
);

export const PoliciesView: React.FC<PoliciesViewProps> = ({ spotlightEnabled = true, onBack, initialSection = 'MENU' }) => {
  const [view, setView] = useState<PolicySection>(initialSection);

  // Sync view with initialSection prop if it changes
  useEffect(() => {
      if (initialSection) {
          setView(initialSection);
      }
  }, [initialSection]);

  const scrollToTop = () => {
    const el = document.getElementById('policy-content');
    if (el) el.scrollTop = 0;
  };

  const renderMenu = () => (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in-up relative py-8">
      <div className="text-center space-y-6 mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-neutral-100 dark:bg-neutral-800 rounded-2xl mb-4">
            <Scale className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-light text-neutral-900 dark:text-white tracking-tight">Trust Centre</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Transparency is at the core of Acosta AI, a Transnology company. Explore our commitments to privacy, safety guardrails, and terms of use.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SpotlightCard 
          className="group min-h-[280px] flex flex-col justify-between hover:border-emerald-500/30 transition-colors"
          spotlightColor="rgba(16, 185, 129, 0.15)"
          onClick={() => { setView('PRIVACY'); scrollToTop(); }}
          disabled={!spotlightEnabled}
        >
            <div>
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">Privacy Policy</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    How we handle your data, your rights, and how we use information to personalize your learning experience securely.
                </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-6 group-hover:translate-x-1 transition-transform">
                Read Policy <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
        </SpotlightCard>

        <SpotlightCard 
          className="group min-h-[280px] flex flex-col justify-between hover:border-red-500/30 transition-colors"
          spotlightColor="rgba(239, 68, 68, 0.15)"
          onClick={() => { setView('SAFETY'); scrollToTop(); }}
          disabled={!spotlightEnabled}
        >
            <div>
                <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">Safety Features</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Explore built-in guardrails for Academic Integrity, Crisis Detection, and the Acosta Guardian wellbeing system.
                </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400 mt-6 group-hover:translate-x-1 transition-transform">
                View Features <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
        </SpotlightCard>

        <SpotlightCard 
          className="group min-h-[280px] flex flex-col justify-between hover:border-blue-500/30 transition-colors"
          spotlightColor="rgba(59, 130, 246, 0.15)"
          onClick={() => { setView('TERMS'); scrollToTop(); }}
          disabled={!spotlightEnabled}
        >
            <div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Scale className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">Terms of Service</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    The rules governing acceptable use, billing, intellectual property, and academic honesty expectations.
                </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 mt-6 group-hover:translate-x-1 transition-transform">
                Read Terms <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
        </SpotlightCard>
      </div>
      
      <div className="text-center pt-8">
          <p className="text-xs text-neutral-400">
              Acosta AI is a <a href="https://transnology.store" target="_blank" rel="noreferrer" className="underline hover:text-neutral-600 dark:hover:text-neutral-300">Transnology</a> company.
          </p>
      </div>
    </div>
  );

  const renderContent = (title: string, lastUpdated: string, content: React.ReactNode) => (
    <div className="max-w-4xl mx-auto animate-fade-in-up pb-20">
        <button 
            onClick={() => setView('MENU')}
            className="group flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-8 transition-colors"
        >
            <div className="p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors">
                <ArrowLeft className="w-4 h-4" />
            </div>
            Back to Trust Centre
        </button>
        
        <div className="bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 md:p-16 shadow-sm">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-8 mb-8">
                <span className="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-semibold text-neutral-500 mb-4">
                    Last Updated: {lastUpdated}
                </span>
                <h1 className="text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
                    {title}
                </h1>
            </div>
            <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                {content}
            </div>
            <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800 text-center">
                <p className="text-xs text-neutral-400">
                    Acosta AI is a <a href="https://transnology.store" target="_blank" rel="noreferrer" className="underline hover:text-neutral-600 dark:hover:text-neutral-300">Transnology</a> company.
                </p>
            </div>
        </div>
    </div>
  );

  return (
    <div id="policy-content" className="h-full bg-transparent p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] overflow-y-auto transition-colors">
        {view === 'MENU' && renderMenu()}
        
        {view === 'PRIVACY' && renderContent("Privacy Policy", "February 2026", (
            <>
                <p className="text-lg text-neutral-600 dark:text-neutral-300">
                    At Acosta AI (a Transnology company), we believe your thoughts and data are personal. This policy outlines exactly what we collect, how it's processed, and your absolute right to privacy.
                </p>

                <SectionHeader icon={Database} title="1. Information We Collect" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <PolicyCard title="Identity Data" className="bg-neutral-50 dark:bg-neutral-900/50">
                        Email, display name, and Year Level/Role. We use this strictly for authentication and to tailor the AI's complexity (e.g., Year 7 vs University).
                    </PolicyCard>
                    <PolicyCard title="Third-Party Logins" className="bg-neutral-50 dark:bg-neutral-900/50">
                        If you sign in via Google or GitHub, we store your email and public profile info provided by them for authentication. We do not access your repositories or private data on those platforms.
                    </PolicyCard>
                    <PolicyCard title="Guest Sessions" className="bg-neutral-50 dark:bg-neutral-900/50">
                        For Guest users, we assign a temporary anonymous ID. No personal contact information is collected unless you choose to upgrade to a full account.
                    </PolicyCard>
                    <PolicyCard title="Generated Content" className="bg-neutral-50 dark:bg-neutral-900/50">
                        Chat logs, study plans, generated images, exam papers, flashcards, and mind dumps. These are stored in your private database until you delete them.
                    </PolicyCard>
                    <PolicyCard title="Guardian Metadata" className="bg-neutral-50 dark:bg-neutral-900/50">
                        We monitor interaction frequency and session duration locally to detect burnout/fatigue. We do NOT read your messages for this purpose.
                    </PolicyCard>
                    <PolicyCard title="Billing Information" className="bg-neutral-50 dark:bg-neutral-900/50">
                        Processed securely by Stripe. Acosta AI never sees or stores your full credit card number or bank details.
                    </PolicyCard>
                </div>

                <SectionHeader icon={Server} title="2. AI Processing & Third Parties" />
                <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl p-6 mb-6">
                    <div className="flex items-start gap-3">
                        <div className="mt-1 p-1 bg-emerald-100 dark:bg-emerald-900/50 rounded-full text-emerald-600 dark:text-emerald-400"><Lock className="w-4 h-4"/></div>
                        <div>
                            <p className="font-bold text-emerald-900 dark:text-emerald-100 m-0">No Training on User Data</p>
                            <p className="text-sm text-emerald-800 dark:text-emerald-200 mt-1 m-0">
                                Acosta branded models are powered by Google and Claude's enterprise grade API's. These providers do <strong>not</strong> use data sent via our API to train their foundational models. Your physics notes remain yours, not training data for the next GPT.
                            </p>
                        </div>
                    </div>
                </div>
                <PolicyPoint title="Google Cloud & Firebase">
                    We use Google's secure infrastructure for database hosting (Firestore), authentication, and serverless functions. Data is encrypted in transit (TLS) and at rest.
                </PolicyPoint>
                <PolicyPoint title="Acosta Models">
                    Primary provider for text generation, image creation, and audio synthesis. Data is sent to the API solely for the purpose of generating the immediate response.
                </PolicyPoint>
                <PolicyPoint title="Anthropic (Claude)">
                    Secondary provider used as a fallback system to ensure reliability. If Google services are unavailable, your request may be processed by Claude 3.5/3.7 Sonnet. Anthropic does not train on API data.
                </PolicyPoint>
                <PolicyPoint title="Stripe">
                        We use Stripe to process all payments and subscriptions. Your credit card details are never stored on our servers. All sensitive financial data is processed directly by Stripe's PCI-DSS compliant infrastructure. For more information, see <a href="https://stripe.com/au/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Stripe's Privacy Policy</a>.
                </PolicyPoint>

                <SectionHeader icon={Activity} title="3. Feature-Specific Privacy" />
                <div className="space-y-4">
                    <PolicyCard title="Live Audio" className="bg-neutral-50 dark:bg-neutral-900/50">
                        <div className="flex items-center gap-2 mb-2 text-primary"><Mic className="w-4 h-4"/> <strong>Ephemeral Streaming</strong></div>
                        <p className="text-sm m-0">When using Live Conversation, audio is streamed directly to the model for low latency. We do not permanently store raw audio recordings of your voice. Transcripts are saved to your history for your reference.</p>
                    </PolicyCard>
                    <PolicyCard title="Visual Intelligence" className="bg-neutral-50 dark:bg-neutral-900/50">
                        <div className="flex items-center gap-2 mb-2 text-primary"><Eye className="w-4 h-4"/> <strong>Image Analysis</strong></div>
                        <p className="text-sm m-0">Images uploaded for analysis (e.g., "Explain this diagram") are processed temporarily by the vision model. We do not retain uploaded images for training purposes.</p>
                    </PolicyCard>
                </div>

                <SectionHeader icon={Trash2} title="4. Data Retention & Deletion" />
                <p>
                    You have complete control. You can delete individual chat sessions, study plans, or exam papers at any time via the interface. 
                    Deleting an item removes it permanently from our database. If you delete your account, all associated data is wiped immediately.
                </p>
                <p className="mt-4 text-sm text-neutral-500">
                    <strong>Note for Guest Users:</strong> Data generated during a Guest session is linked to a temporary identifier. If you clear your browser cache, switch devices, or do not convert to a permanent account, this data will be lost and cannot be recovered.
                </p>
                <p className="mt-4">
                    For privacy inquiries, contact <a href="mailto:support@acosta-ai.com" className="text-primary hover:underline">support@acosta-ai.com</a>.
                </p>
            </>
        ))}

        {view === 'TERMS' && renderContent("Terms of Service", "February 2026", (
            <>
                <p className="text-lg text-neutral-600 dark:text-neutral-300">
                    By using Acosta AI (a Transnology company), you agree to these terms. We aim to be fair, transparent, and educational-first.
                </p>

                <div className="p-5 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/10 rounded-r-xl mb-8 mt-6">
                    <h4 className="font-bold text-amber-700 dark:text-amber-300 m-0 mb-1 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Beta Platform Notice</h4>
                    <p className="text-sm text-amber-600 dark:text-amber-200 m-0">
                        Acosta AI is currently in <strong>Beta</strong>. Features, pricing, and availability are subject to change without notice. 
                        While we strive for stability, you may encounter bugs or service interruptions. Your feedback is vital to our improvement.
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
                    When using "Sign in with Google" or "Sign in with GitHub", you are also subject to the terms of service of those respective platforms regarding your account authentication.
                </PolicyPoint>

                <SectionHeader icon={GraduationCap} title="2. Academic Integrity Code" />
                <div className="p-5 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/10 rounded-r-xl mb-6">
                    <h4 className="font-bold text-red-700 dark:text-red-300 m-0 mb-1 flex items-center gap-2"><AlertOctagon className="w-4 h-4"/> Zero Tolerance for Cheating</h4>
                    <p className="text-sm text-red-600 dark:text-red-200 m-0">
                        Acosta AI is a tutor, not a ghostwriter. Even with answer mode on, you strictly agree NOT to:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-red-600 dark:text-red-200">
                        <li>Use the "Exam Simulator" to answer questions during a real, active assessment.</li>
                        <li>Copy-paste AI generated essays and submit them as your own work.</li>
                        <li>Upload copyrighted exam papers that you do not have permission to use.</li>
                    </ul>
                </div>

                <SectionHeader icon={CreditCard} title="3. Billing, Plans & Credits" />
                <PolicyPoint title="Subscriptions & Free Trials">
                    'Go' and 'Max' plans are available in Monthly or Annual billing cycles. The 'Go' Monthly plan includes a 30-day free trial for new users. You may cancel at any time via the Stripe Portal; your access will continue until the end of the current billing cycle.
                </PolicyPoint>
                <PolicyPoint title="Support Us">
                    "Supporter" contributions are voluntary payments to help sustain the platform. These are non-refundable donations that grant a special badge but no additional functional credits.
                </PolicyPoint>
                <PolicyPoint title="Credit Top-Ups">
                    "Top-Up Packs" (e.g. 50 Thinking Credits) are one-time purchases. These credits <strong>do not expire</strong> as long as your account is active. They are consumed only after your monthly plan limit is reached. Top-ups are non-refundable.
                </PolicyPoint>
                <PolicyPoint title="Usage Limits">
                    We reserve the right to enforce fair usage limits on "Unlimited" tiers to prevent abuse (e.g., botting) that degrades service for others.
                </PolicyPoint>
                <p className="mt-2 text-sm">
                    For payment issues, contact <a href="mailto:payments@acosta-ai.com" className="text-primary hover:underline">payments@acosta-ai.com</a>.
                </p>

                <SectionHeader icon={Sparkles} title="4. AI Limitations & Liability" />
                <PolicyPoint title="Hallucinations & Models">
                    Generative AI models (Gemini 2.5/3.0/3.1 & Claude 3.5/3.7) can make mistakes, even in "Thinking" mode. The platform may automatically switch between models to ensure uptime. Always verify critical facts.
                </PolicyPoint>
                <PolicyPoint title="No Professional Advice">
                    Acosta AI is an educational tool. It does not provide medical diagnoses, legal counsel, or financial advice.
                </PolicyPoint>
                <PolicyPoint title="Service Availability">
                    "Live" mode and "Image Generation" rely on high-demand GPU clusters. Occasional downtime or high latency may occur during peak global usage.
                </PolicyPoint>

                <SectionHeader icon={Scale} title="5. Intellectual Property" />
                <PolicyPoint title="Your Content">
                    You retain ownership of the prompts you input and the content generated by the AI in response to your prompts (Subject to Google's GenAI terms).
                </PolicyPoint>
                <PolicyPoint title="Our Platform">
                    The interface, code, "Guardian" system, and "Liquid Ether" design are the property of Transnology.
                </PolicyPoint>
            </>
        ))}

        {view === 'SAFETY' && renderContent("Safety Features", "February 2026", (
            <>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
                    We've built Acosta AI with safety and ethics as foundational pillars. Below is a breakdown of the active protection systems.
                </p>

                <div className="space-y-6">
                    {/* GUARDIAN */}
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900/50 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        
                        <h3 className="flex items-center gap-3 text-2xl font-bold text-neutral-900 dark:text-white mt-0 mb-6 relative z-10">
                            <div className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20">
                                <Activity className="w-6 h-6" />
                            </div>
                            Acosta Guardian
                        </h3>
                        
                        <p className="text-neutral-600 dark:text-neutral-300 font-medium mb-6 relative z-10">
                            Built-In Wellbeing & Workload Protection System
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                            {[
                                { title: "Always-On Support", desc: "Monitors platform activity to proactively protect against burnout." },
                                { title: "Smart Load Balancing", desc: "Breaks complex tasks into steps and adjusts pacing." },
                                { title: "Adaptive Modes", desc: "Switches to revision modes when high cognitive load is detected." },
                                { title: "Stress Detection", desc: "Identifies frustration or prolonged difficulty patterns." },
                                { title: "Recovery Prompts", desc: "Suggests micro-breaks and subject switching." },
                                { title: "Supportive Guidance", desc: "Uses calm, non-judgmental language." },
                                { title: "Privacy-First", desc: "Only monitors in-platform metadata; no private message access." },
                                { title: "Duty of Care", desc: "Helps schools provide proactive wellbeing support." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-white/60 dark:bg-black/20 border border-blue-100 dark:border-blue-900/30">
                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                    <div>
                                        <span className="block text-sm font-bold text-neutral-900 dark:text-white">{item.title}</span>
                                        <span className="text-xs text-neutral-500 dark:text-neutral-400 leading-snug">{item.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PolicyCard title="Academic Integrity" className="bg-neutral-50 dark:bg-neutral-900/50">
                            <div className="flex items-center gap-2 mb-3 text-blue-600 dark:text-blue-400"><GraduationCap className="w-5 h-5"/></div>
                            <ul className="list-disc pl-4 space-y-2 marker:text-neutral-400">
                                <li>Refuses "Write my essay" commands.</li>
                                <li>Offers outlines and critiques instead.</li>
                                <li>Detects and verifies raw exam papers.</li>
                            </ul>
                        </PolicyCard>

                        <PolicyCard title="Crisis Detection" className="bg-neutral-50 dark:bg-neutral-900/50">
                            <div className="flex items-center gap-2 mb-3 text-red-600 dark:text-red-400"><Heart className="w-5 h-5"/></div>
                            <ul className="list-disc pl-4 space-y-2 marker:text-neutral-400">
                                <li>Recognizes signs of self-harm or distress.</li>
                                <li>Triggers supportive intervention overlays.</li>
                                <li>Provides direct links to lifelines.</li>
                            </ul>
                        </PolicyCard>

                        <PolicyCard title="PII Protection" className="bg-neutral-50 dark:bg-neutral-900/50">
                            <div className="flex items-center gap-2 mb-3 text-emerald-600 dark:text-emerald-400"><Lock className="w-5 h-5"/></div>
                            <ul className="list-disc pl-4 space-y-2 marker:text-neutral-400">
                                <li>Scans messages for sensitive data before sending.</li>
                                <li>Detects phone numbers, cards, and keys.</li>
                                <li>One-click redaction tools.</li>
                            </ul>
                        </PolicyCard>

                        <PolicyCard title="Responsible Imagery" className="bg-neutral-50 dark:bg-neutral-900/50">
                            <div className="flex items-center gap-2 mb-3 text-purple-600 dark:text-purple-400"><ImageIcon className="w-5 h-5"/></div>
                            <ul className="list-disc pl-4 space-y-2 marker:text-neutral-400">
                                <li>SynthID watermarking on all images.</li>
                                <li>Person filter prevents deepfakes.</li>
                                <li>Strict violent/sexual content blocks.</li>
                            </ul>
                        </PolicyCard>
                    </div>

                    <div className="p-6 rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/10 flex items-start gap-4">
                        <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600 dark:text-amber-400 shrink-0">
                            <Timer className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">Session Security</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                To protect your account on shared devices, we automatically log you out after inactivity. 
                                This interval is configurable in Settings (Default: 30 mins).
                            </p>
                        </div>
                    </div>
                </div>
            </>
        ))}
    </div>
  );
};

// Helper components internal to this file to keep it clean
const PolicyCard = ({ title, children, className = "" }: any) => (
    <div className={`p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 ${className}`}>
        {children && !title ? children : (
            <>
                {title && <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-2">{title}</h4>}
                <div className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {children}
                </div>
            </>
        )}
    </div>
);
