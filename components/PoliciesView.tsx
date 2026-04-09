import React, { useState, useEffect } from 'react';
import { 
    Shield, FileText, ArrowLeft, Lock, Scale, Heart, AlertTriangle, 
    GraduationCap, Timer, Image as ImageIcon, Activity, Database, 
    Server, Globe, CreditCard, UserCheck, AlertOctagon, Eye, Trash2, 
    Sparkles, Mic, FileJson, BookOpen, Brain, ChevronRight
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import { motion, AnimatePresence } from 'motion/react';

type PolicySection = 'MENU' | 'TERMS' | 'PRIVACY' | 'SAFETY';

interface PoliciesViewProps {
    spotlightEnabled?: boolean;
    onBack?: () => void;
    initialSection?: PolicySection;
    onNavigate?: (mode: any) => void;
    navigate?: (path: string) => void;
}

const SectionHeader: React.FC<{ icon: React.ElementType, title: string }> = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-4 mt-16 mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-heading font-bold text-neutral-900 dark:text-white m-0">{title}</h3>
    </div>
);

const PolicyPoint: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8 last:mb-0 group">
        <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all duration-300" />
            {title}
        </h4>
        <div className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed pl-5 border-l-2 border-neutral-100 dark:border-neutral-800 group-hover:border-primary/30 transition-colors">
            {children}
        </div>
    </div>
);

export const PoliciesView: React.FC<PoliciesViewProps> = ({ spotlightEnabled = true, onBack, initialSection = 'MENU', onNavigate, navigate: navigateProp }) => {
  const [view, setView] = useState<PolicySection>(initialSection);

  useEffect(() => {
      if (initialSection) {
          setView(initialSection);
      }
  }, [initialSection]);

  const goToSection = (section: PolicySection) => {
    if (navigateProp) {
      const pathMap: Record<PolicySection, string> = {
        MENU: '/policies',
        PRIVACY: '/privacy',
        TERMS: '/terms',
        SAFETY: '/safety',
      };
      navigateProp(pathMap[section]);
    } else {
      setView(section);
    }
  };

  const scrollToTop = () => {
    const el = document.getElementById('policy-content');
    if (el) el.scrollTop = 0;
  };

  const renderMenu = () => (
    <div className="max-w-6xl mx-auto relative py-12 px-4 sm:px-6 lg:px-8">

      <div className="text-center max-w-3xl mx-auto mb-20 space-y-8">
        <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              y: [0, -12, 0]
            }}
            transition={{ 
              duration: 0.8, 
              type: "spring", 
              bounce: 0.4,
              y: {
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              }
            }}
            className="inline-flex items-center justify-center p-6 bg-primary/10 text-primary rounded-[2.5rem] mb-4 shadow-2xl shadow-primary/20 border border-primary/20 relative group"
        >
            <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-50" />
            <Shield className="w-14 h-14 relative z-10" />
        </motion.div>
        <div className="space-y-4">
            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl md:text-8xl font-heading font-bold text-neutral-900 dark:text-white tracking-tighter leading-none"
            >
                Trust Centre
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium max-w-2xl mx-auto"
            >
              Transparency is at the core of Acosta AI. Explore our commitments to privacy, safety guardrails, and terms of use.
            </motion.p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
            <SpotlightCard 
            className="group h-full flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-500 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 rounded-[3rem] p-10 relative overflow-hidden"
            spotlightColor="rgba(16, 185, 129, 0.15)"
            onClick={() => { goToSection('PRIVACY'); scrollToTop(); }}
            disabled={!spotlightEnabled}
            >
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-500/10 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-emerald-100 dark:border-emerald-500/20 shadow-inner relative">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Lock className="w-10 h-10 text-emerald-600 dark:text-emerald-400 relative z-10" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-neutral-900 dark:text-white mb-4">Privacy Policy</h2>
                    <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                        How we handle your data, your rights, and how we use information to personalise your learning experience securely.
                    </p>
                </motion.div>
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800/50">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">Read Policy</span>
                    <motion.div 
                        whileHover={{ x: 5 }}
                        className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20 shadow-sm"
                    >
                        <ChevronRight className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </motion.div>
                </div>
            </SpotlightCard>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
            <SpotlightCard 
            className="group h-full flex flex-col justify-between hover:border-red-500/50 transition-all duration-500 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-2xl hover:shadow-red-500/10 rounded-[3rem] p-10 relative overflow-hidden"
            spotlightColor="rgba(239, 68, 68, 0.15)"
            onClick={() => { goToSection('SAFETY'); scrollToTop(); }}
            disabled={!spotlightEnabled}
            >
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <div className="w-20 h-20 bg-red-50 dark:bg-red-500/10 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 border border-red-100 dark:border-red-500/20 shadow-inner relative">
                        <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Heart className="w-10 h-10 text-red-600 dark:text-red-400 relative z-10" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-neutral-900 dark:text-white mb-4">Safety Features</h2>
                    <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                        Explore built-in guardrails for Academic Integrity, Crisis Detection, and the Acosta Guardian wellbeing system.
                    </p>
                </motion.div>
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800/50">
                    <span className="text-xs font-bold text-red-600 dark:text-red-400 tracking-tight">View Features</span>
                    <motion.div 
                        whileHover={{ x: 5 }}
                        className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center border border-red-100 dark:border-red-500/20 shadow-sm"
                    >
                        <ChevronRight className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </motion.div>
                </div>
            </SpotlightCard>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <SpotlightCard 
            className="group h-full flex flex-col justify-between hover:border-blue-500/50 transition-all duration-500 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 rounded-[3rem] p-10 relative overflow-hidden"
            spotlightColor="rgba(59, 130, 246, 0.15)"
            onClick={() => { goToSection('TERMS'); scrollToTop(); }}
            disabled={!spotlightEnabled}
            >
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <div className="w-20 h-20 bg-blue-50 dark:bg-blue-500/10 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-blue-100 dark:border-blue-500/20 shadow-inner relative">
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Scale className="w-10 h-10 text-blue-600 dark:text-blue-400 relative z-10" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-neutral-900 dark:text-white mb-4">Terms of Service</h2>
                    <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                        The rules governing acceptable use, billing, intellectual property, and academic honesty expectations.
                    </p>
                </motion.div>
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800/50">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-tight">Read Terms</span>
                    <motion.div 
                        whileHover={{ x: 5 }}
                        className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center border border-blue-100 dark:border-blue-500/20 shadow-sm"
                    >
                        <ChevronRight className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                </div>
            </SpotlightCard>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="text-center mt-24 space-y-4"
      >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-900 mb-2 border border-neutral-200 dark:border-neutral-800 shadow-inner">
              <Shield className="w-6 h-6 text-neutral-400" />
          </div>
          <p className="text-base text-neutral-500 dark:text-neutral-400 font-medium">
              Acosta AI is a <a href="https://transnology.co" target="_blank" rel="noreferrer" className="font-bold text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors">Transnology</a> company.
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 tracking-tight font-bold">
              Acosta AI is a trading name of Lachlan Thurlow (ABN 59 312 943 638).
          </p>
      </motion.div>
    </div>
  );

  const renderContent = (title: string, lastUpdated: string, content: React.ReactNode, Icon: React.ElementType, summary: string, onNavigate?: (mode: any) => void) => (
    <div className="w-full pb-24">
        {/* Full-Width Hero Section */}
        <div className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 dark:border-neutral-800 bg-transparent backdrop-blur-sm">
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.button 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: -8 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => goToSection('MENU')}
                    className="group flex items-center gap-3 text-sm font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-12 transition-colors"
                >
                    <div className="p-2.5 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="tracking-tight">Back to Trust Centre</span>
                </motion.button>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl"
                    >
                        <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 backdrop-blur-md relative group overflow-hidden shadow-inner">
                            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-60 transition-opacity">
                                <Sparkles className="w-6 h-6 text-indigo-500" />
                            </div>
                            <h4 className="text-[10px] font-bold text-indigo-500 tracking-tight mb-4 flex items-center gap-2">
                                <Sparkles className="w-3 h-3" /> AI Summary
                            </h4>
                            <p className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-200 leading-relaxed font-medium italic">
                                "{summary}"
                            </p>
                        </div>
                    </motion.div>

                    <div className="flex flex-col items-start md:items-end gap-6 text-left md:text-right shrink-0">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center md:justify-end gap-3">
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold tracking-tight">
                                    <Timer className="w-3 h-3" /> Last Updated
                                </span>
                                <span className="text-xs font-bold text-neutral-400 tracking-tight">{lastUpdated}</span>
                            </div>
                            <h1 className="text-6xl md:text-9xl font-heading font-bold text-neutral-900 dark:text-white tracking-tighter leading-[0.85]">
                                {title.split(' ')[0]}<br/>
                                <span className="text-primary">{title.split(' ').slice(1).join(' ')}</span>
                            </h1>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
                            animate={{ opacity: 1, scale: 1, rotate: 6 }}
                            transition={{ delay: 0.4, type: "spring" }}
                            className="hidden lg:block"
                        >
                            <div className="w-28 h-28 rounded-[2.5rem] bg-primary/5 border border-primary/10 flex items-center justify-center group hover:rotate-0 transition-all duration-500 shadow-inner">
                                <Icon className="w-12 h-12 text-primary/40 group-hover:text-primary transition-colors" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Sidebar / Quick Nav */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="sticky top-24 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h4 className="text-[10px] font-bold text-neutral-400 tracking-tight mb-4">On this page</h4>
                            <nav className="space-y-4">
                                <div className="h-1.5 w-16 bg-primary rounded-full mb-6" />
                                <p className="text-base text-neutral-500 leading-relaxed italic font-medium">
                                    This policy outlines our commitment to your safety and privacy while using Acosta AI.
                                </p>
                            </nav>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                            className="p-8 rounded-[2.5rem] bg-neutral-100/50 dark:bg-neutral-900/40 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 group hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-xl"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all border border-primary/20 shadow-inner">
                                <Icon className="w-7 h-7" />
                            </div>
                            <h5 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">Need help?</h5>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed font-medium">
                                If you have questions about this policy, our support team is here to help.
                            </p>
                            <motion.button 
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onNavigate && onNavigate('SUPPORT')}
                                className="w-full py-4 bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-xl shadow-black/10 tracking-tight"
                            >
                                Contact Support
                            </motion.button>
                        </motion.div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="lg:col-span-9">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="prose prose-xl prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-h2:text-5xl prose-h2:mt-20 prose-h2:mb-10 prose-h2:tracking-tight prose-h3:text-3xl prose-a:text-primary hover:prose-a:text-primary/80 prose-a:transition-colors prose-p:leading-relaxed prose-p:text-neutral-600 dark:prose-p:text-neutral-400 prose-li:leading-relaxed"
                    >
                        {content}
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-32 pt-16 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-12"
                    >
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200 dark:border-neutral-700 shadow-inner">
                                <Shield className="w-8 h-8 text-neutral-400" />
                            </div>
                            <div className="text-left">
                                <p className="text-lg font-bold text-neutral-900 dark:text-white">Acosta AI Trust Centre</p>
                                <p className="text-sm font-bold text-neutral-400 tracking-tight">Verified Policy Document</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col items-center sm:items-end text-center sm:text-right space-y-2">
                            <p className="text-base text-neutral-500 dark:text-neutral-400 font-medium">
                                Acosta AI is a <a href="https://transnology.co" target="_blank" rel="noreferrer" className="font-bold text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors">Transnology</a> company.
                            </p>
                            <p className="text-xs text-neutral-400 dark:text-neutral-500 tracking-tight font-bold">
                                Trading as Lachlan Thurlow (ABN 59 312 943 638).
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    </div>
  );

  const wipeVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div id="policy-content" className="h-full bg-transparent overflow-y-auto transition-colors">
      <AnimatePresence mode="wait">
        {view === 'MENU' && (
          <motion.div
            key="MENU"
            variants={wipeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderMenu()}
          </motion.div>
        )}
        
        {view === 'PRIVACY' && (
          <motion.div
            key="PRIVACY"
            variants={wipeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderContent("Privacy Policy", "February 2026", (
            <>
                <p className="text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed mb-12">
                    At Acosta AI (a Transnology company), we believe your thoughts and data are personal. This policy outlines exactly what we collect, how it's processed, and your absolute right to privacy.
                </p>

                <SectionHeader icon={Database} title="1. Information We Collect" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <PolicyCard title="Identity Data" className="bg-transparent dark:bg-transparent">
                        Email, display name, and Year Level/Role. We use this strictly for authentication and to tailor the AI's complexity (e.g., Year 7 vs University).
                    </PolicyCard>
                    <PolicyCard title="Third-Party Logins" className="bg-transparent dark:bg-transparent">
                        If you sign in via Google or GitHub, we store your email and public profile info provided by them for authentication. We do not access your repositories or private data on those platforms.
                    </PolicyCard>
                    <PolicyCard title="Guest Sessions" className="bg-transparent dark:bg-transparent">
                        For Guest users, we assign a temporary anonymous ID. No personal contact information is collected unless you choose to upgrade to a full account.
                    </PolicyCard>
                    <PolicyCard title="Generated Content" className="bg-transparent dark:bg-transparent">
                        Chat logs, study plans, generated images, exam papers, flashcards, and mind dumps. These are stored in your private database until you delete them.
                    </PolicyCard>
                    <PolicyCard title="Guardian Metadata" className="bg-transparent dark:bg-transparent">
                        We monitor interaction frequency and session duration locally to detect burnout/fatigue. We do NOT read your messages for this purpose.
                    </PolicyCard>
                    <PolicyCard title="Billing Information" className="bg-transparent dark:bg-transparent">
                        Processed securely by Stripe. Acosta AI never sees or stores your full credit card number or bank details.
                    </PolicyCard>
                </div>

                <SectionHeader icon={Server} title="2. AI Processing & Third Parties" />
                <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-900/30 rounded-3xl p-8 mb-10 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start gap-5">
                        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl text-emerald-600 dark:text-emerald-400 shrink-0">
                            <Lock className="w-6 h-6"/>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 m-0 mb-2">No Training on User Data</h4>
                            <p className="text-base text-emerald-800 dark:text-emerald-200 m-0 leading-relaxed">
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
                    Secondary provider used as a fallback system to ensure reliability. If Google Gemini services are unavailable, your request may be processed by (at the moment) Claude 4.5 Haiku, or Claude 4.6 Sonnet. Claude models do not support image generation and voice mode. Anthropic does not train on API data.
                </PolicyPoint>
                <PolicyPoint title="Stripe">
                    We use Stripe to process all payments and subscriptions. Your credit card details are never stored on our servers. All sensitive financial data is processed directly by Stripe's PCI-DSS compliant infrastructure. For more information, see <a href="https://stripe.com/au/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Stripe's Privacy Policy</a>.
                </PolicyPoint>

                <SectionHeader icon={Activity} title="3. Feature-Specific Privacy" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <PolicyCard title="Live Audio" className="bg-transparent dark:bg-transparent">
                        <div className="flex items-center gap-2 mb-3 text-primary font-bold"><Mic className="w-5 h-5"/> Ephemeral Streaming</div>
                        <p className="text-base m-0 text-neutral-600 dark:text-neutral-400">When using Live Conversation, audio is streamed directly to the model for low latency. We do not permanently store raw audio recordings of your voice. Transcripts are saved to your history for your reference.</p>
                    </PolicyCard>
                    <PolicyCard title="Visual Intelligence" className="bg-transparent dark:bg-transparent">
                        <div className="flex items-center gap-2 mb-3 text-primary font-bold"><Eye className="w-5 h-5"/> Image Analysis</div>
                        <p className="text-base m-0 text-neutral-600 dark:text-neutral-400">Images uploaded for analysis (e.g., "Explain this diagram") are processed temporarily by the vision model. We do not retain uploaded images for training purposes.</p>
                    </PolicyCard>
                </div>

                <SectionHeader icon={Trash2} title="4. Data Retention & Deletion" />
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    You have complete control. You can delete individual chat sessions, study plans, or exam papers at any time via the interface. 
                    Deleting an item removes it permanently from our database. If you delete your account, all associated data is wiped immediately.
                </p>
                <div className="p-6 bg-neutral-100 dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-700 mb-8">
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 m-0">
                        <strong className="text-neutral-900 dark:text-white">Note for Guest Users:</strong> Data generated during a Guest session is linked to a temporary identifier. If you clear your browser cache, switch devices, or do not convert to a permanent account, this data will be lost and cannot be recovered.
                    </p>
                </div>
                <p className="text-base text-neutral-600 dark:text-neutral-400">
                    For privacy inquiries, contact <a href="mailto:support@acosta-ai.com" className="text-primary hover:underline font-medium">support@acosta-ai.com</a>.
                </p>
            </>
        ), Shield, "Your thoughts and data are personal. This policy outlines exactly what we collect, how it's processed, and your absolute right to privacy.", onNavigate)}
          </motion.div>
        )}

        {view === 'TERMS' && (
          <motion.div
            key="TERMS"
            variants={wipeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderContent("Terms of Service", "February 2026", (
            <>
                <p className="text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8">
                    By using Acosta AI (a Transnology company), you agree to these terms. We aim to be fair, transparent, and educational-first.
                </p>

                <div className="p-6 border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/10 rounded-3xl mb-12 shadow-sm">
                    <h4 className="text-lg font-bold text-amber-800 dark:text-amber-300 m-0 mb-2 flex items-center gap-2"><AlertTriangle className="w-5 h-5"/> Beta Platform Notice</h4>
                    <p className="text-base text-amber-700 dark:text-amber-200/80 m-0 leading-relaxed">
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
                <div className="p-8 border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 rounded-3xl mb-10 shadow-sm">
                    <h4 className="text-xl font-bold text-red-800 dark:text-red-300 m-0 mb-3 flex items-center gap-3">
                        <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-xl"><AlertOctagon className="w-5 h-5"/></div>
                        Zero Tolerance for Cheating
                    </h4>
                    <p className="text-base text-red-700 dark:text-red-200/80 m-0 mb-4">
                        Acosta AI is a tutor, not a ghostwriter. Even with answer mode on, you strictly agree NOT to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base text-red-700 dark:text-red-200/80 marker:text-red-400">
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
                <p className="mt-6 text-base text-neutral-600 dark:text-neutral-400">
                    For payment issues, contact <a href="mailto:payments@acosta-ai.com" className="text-primary hover:underline font-medium">payments@acosta-ai.com</a>.
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
        ), Scale, "The rules governing acceptable use, billing, intellectual property, and academic honesty expectations.", onNavigate)}
          </motion.div>
        )}

        {view === 'SAFETY' && (
          <motion.div
            key="SAFETY"
            variants={wipeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderContent("Safety Features", "February 2026", (
            <>
                <p className="text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed mb-12">
                    We've built Acosta AI with safety and ethics as foundational pillars. Below is a breakdown of the active protection systems.
                </p>

                <div className="space-y-10">
                    {/* GUARDIAN */}
                    <div className="p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900/50 shadow-lg shadow-blue-500/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        
                        <h3 className="flex items-center gap-4 text-3xl font-heading font-bold text-neutral-900 dark:text-white mt-0 mb-4 relative z-10">
                            <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-600/30">
                                <Activity className="w-7 h-7" />
                            </div>
                            Acosta Guardian
                        </h3>
                        
                        <p className="text-lg text-blue-800 dark:text-blue-200 font-medium mb-10 relative z-10">
                            Built-In Wellbeing & Workload Protection System
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
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
                                <div key={i} className="flex gap-4 items-start p-4 rounded-2xl bg-white/80 dark:bg-black/40 backdrop-blur-sm border border-blue-100 dark:border-blue-900/30 hover:border-blue-300 dark:hover:border-blue-700/50 transition-colors">
                                    <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-sm shadow-blue-500/50" />
                                    <div>
                                        <span className="block text-base font-bold text-neutral-900 dark:text-white mb-1">{item.title}</span>
                                        <span className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PolicyCard title="Academic Integrity" className="bg-transparent dark:bg-transparent shadow-sm">
                            <div className="flex items-center gap-3 mb-4 text-blue-600 dark:text-blue-400">
                                <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl"><GraduationCap className="w-5 h-5"/></div>
                            </div>
                            <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400 marker:text-blue-400">
                                <li>Refuses "Write my essay" commands.</li>
                                <li>Offers outlines and critiques instead.</li>
                                <li>Detects and verifies raw exam papers.</li>
                            </ul>
                        </PolicyCard>

                        <PolicyCard title="Crisis Detection" className="bg-transparent dark:bg-transparent shadow-sm">
                            <div className="flex items-center gap-3 mb-4 text-red-600 dark:text-red-400">
                                <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-xl"><Heart className="w-5 h-5"/></div>
                            </div>
                            <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400 marker:text-red-400">
                                <li>Recognizes signs of self-harm or distress.</li>
                                <li>Triggers supportive intervention overlays.</li>
                                <li>Provides direct links to lifelines.</li>
                            </ul>
                        </PolicyCard>

                        <PolicyCard title="PII Protection" className="bg-transparent dark:bg-transparent shadow-sm">
                            <div className="flex items-center gap-3 mb-4 text-emerald-600 dark:text-emerald-400">
                                <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl"><Lock className="w-5 h-5"/></div>
                            </div>
                            <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400 marker:text-emerald-400">
                                <li>Scans messages for sensitive data before sending.</li>
                                <li>Detects phone numbers, cards, and keys.</li>
                                <li>One-click redaction tools.</li>
                            </ul>
                        </PolicyCard>

                        <PolicyCard title="Responsible Imagery" className="bg-transparent dark:bg-transparent shadow-sm">
                            <div className="flex items-center gap-3 mb-4 text-purple-600 dark:text-purple-400">
                                <div className="p-2 bg-purple-50 dark:bg-purple-500/10 rounded-xl"><ImageIcon className="w-5 h-5"/></div>
                            </div>
                            <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400 marker:text-purple-400">
                                <li>SynthID watermarking on all images.</li>
                                <li>Person filter prevents deepfakes.</li>
                                <li>Strict violent/sexual content blocks.</li>
                            </ul>
                        </PolicyCard>
                    </div>

                    <div className="p-8 rounded-3xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/10 flex flex-col sm:flex-row items-start gap-6 shadow-sm">
                        <div className="p-4 bg-amber-100 dark:bg-amber-900/40 rounded-2xl text-amber-600 dark:text-amber-400 shrink-0 shadow-inner">
                            <Timer className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Session Security</h3>
                            <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                To protect your account on shared devices, we automatically log you out after inactivity. 
                                This interval is configurable in Settings (Default: 30 mins).
                            </p>
                        </div>
                    </div>
                </div>
            </>
        ), Heart, "Safety and ethics are foundational pillars. Explore built-in guardrails for Academic Integrity, Crisis Detection, and the Acosta Guardian wellbeing system.", onNavigate)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PolicyCard = ({ title, children, className = "" }: any) => (
    <div className={`p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 transition-all hover:shadow-md bg-transparent dark:bg-transparent ${className}`}>
        {children && !title ? children : (
            <>
                {title && <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">{title}</h4>}
                <div className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {children}
                </div>
            </>
        )}
    </div>
);

export default PoliciesView;
