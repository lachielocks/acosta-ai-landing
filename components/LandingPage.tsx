
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Shield, 
  CreditCard, 
  Home, 
  ExternalLink, 
  Sparkles, 
  Brain, 
  Mic, 
  ScanEye, 
  MessageSquare,
  Menu,
  X,
  Zap,
  Cpu,
  GraduationCap,
  Heart,
  Activity,
  Lock,
  Trophy,
  Layers,
  Search,
  Quote,
  ChevronDown,
  Check
} from 'lucide-react';
import { PricingView } from './PricingView';
import { PoliciesView } from './PoliciesView';
import { AppMode } from '../types';
import LiquidEther from './LiquidEther';
import RotatingText from './RotatingText';

export const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'pricing' | 'policies'>('home');
  const [policySection, setPolicySection] = useState<'MENU' | 'TERMS' | 'PRIVACY' | 'SAFETY'>('MENU');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (mode: AppMode) => {
    if (mode === AppMode.PRICING) setActiveTab('pricing');
    else if (mode === AppMode.POLICIES) {
      setActiveTab('policies');
      setPolicySection('MENU');
    }
    else if (mode === AppMode.HOME) setActiveTab('home');
    else {
      window.open('https://platform.acosta-ai.com', '_blank');
    }
  };

  const navigateToPolicy = (section: 'MENU' | 'TERMS' | 'PRIVACY' | 'SAFETY') => {
    setActiveTab('policies');
    setPolicySection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'pricing', label: 'Pricing', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'policies', label: 'Trust Centre', icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background text-neutral-900 dark:text-white selection:bg-primary/30 selection:text-primary overflow-x-hidden font-sans">
      {/* Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <LiquidEther />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/70 dark:bg-black/70 backdrop-blur-2xl border-b border-neutral-200/50 dark:border-neutral-800/50 py-3' : 'bg-white/10 dark:bg-black/10 backdrop-blur-md py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
                <img src="https://i.ibb.co/C5B2KJTk/Favicon-Small-Icon.png" alt="Acosta AI" className="h-8 w-auto group-hover:scale-110 transition-transform duration-500" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400">Acosta AI</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`px-4 py-2 text-sm font-medium transition-all rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 flex items-center gap-2 ${activeTab === item.id ? 'text-primary bg-primary/5' : 'text-neutral-500 dark:text-neutral-400'}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <div className="w-px h-4 bg-neutral-200 dark:border-neutral-800 mx-4" />
            <a 
              href="https://platform.acosta-ai.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-xl shadow-black/10 dark:shadow-white/5"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-xl transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-40 bg-white/90 dark:bg-black/90 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setIsMenuOpen(false);
                  }}
                  className={`text-3xl font-bold flex items-center justify-between p-4 rounded-3xl transition-all ${activeTab === item.id ? 'text-primary bg-primary/5' : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${activeTab === item.id ? 'bg-primary/10' : 'bg-neutral-100 dark:bg-neutral-900'}`}>
                        {React.cloneElement(item.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
                    </div>
                    {item.label}
                  </div>
                  <ArrowRight className="w-6 h-6 opacity-30" />
                </button>
              ))}
              <div className="h-px bg-neutral-100 dark:bg-neutral-900 my-4" />
              <a 
                href="https://platform.acosta-ai.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-5 bg-primary text-white rounded-3xl text-center font-bold text-xl shadow-2xl shadow-primary/20 flex items-center justify-center gap-3"
              >
                Go to App
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10 pt-24 min-h-screen">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              {/* Hero Section */}
              <div className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center space-y-10">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] text-neutral-900 dark:text-white">
                  Learn <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-indigo-600">smarter.</span>
                </h1>

                <p className="text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed font-medium">
                  Acosta AI is your personal tutor, study partner, and creative assistant. 
                  Built for students who want to excel without the burnout.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                  <a 
                    href="https://platform.acosta-ai.com" 
                    className="w-full sm:w-auto px-12 py-6 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-3xl font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 dark:shadow-white/10 flex items-center justify-center gap-3"
                  >
                    Get Started Free
                    <ArrowRight className="w-7 h-7" />
                  </a>
                  <button 
                    onClick={() => setActiveTab('pricing')}
                    className="w-full sm:w-auto px-12 py-6 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-3xl font-bold text-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all"
                  >
                    View Pricing
                  </button>
                </div>
              </div>

              {/* Acosta 1 Section */}
              <div className="max-w-7xl mx-auto px-6 py-32">
                <div className="bg-white rounded-[40px] p-12 md:p-20 flex flex-col md:flex-row items-center gap-16 overflow-hidden relative group shadow-2xl shadow-black/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="flex-1 space-y-8 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-100 text-neutral-500 rounded-full text-xs font-bold uppercase tracking-widest border border-neutral-200">
                            Proprietary Intelligence
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-black leading-tight">
                            Our own models, <br/>
                            built on <RotatingText 
                                texts={['privacy.', 'security.', 'speed.', 'trust.']}
                                mainClassName="text-primary inline-flex"
                                staggerDuration={0.03}
                                rotationInterval={2500}
                            />
                        </h2>
                        <p className="text-xl text-neutral-600 leading-relaxed max-w-lg">
                            Acosta 1 is our custom-tuned reasoning engine. It doesn't just give answers—it understands your syllabus and respects your academic integrity.
                        </p>
                        <div className="flex items-center gap-10 pt-4">
                            <div className="flex flex-col">
                                <span className="text-4xl font-black text-black">100%</span>
                                <span className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Private</span>
                            </div>
                            <div className="w-px h-12 bg-neutral-200" />
                            <div className="flex flex-col">
                                <span className="text-4xl font-black text-black">0.1s</span>
                                <span className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Latency</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 relative flex justify-center items-center">
                        <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full animate-pulse" />
                        <img src="https://i.ibb.co/LDXpf68c/Acosta-1.png" alt="Acosta 1" className="w-full max-w-md h-auto relative z-10 drop-shadow-[0_0_50px_rgba(59,130,246,0.2)]" />
                    </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="max-w-7xl mx-auto px-6 py-32 space-y-20">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight">Everything you need to excel.</h2>
                    <p className="text-xl text-neutral-500 max-w-2xl mx-auto">A complete suite of tools designed for the modern student.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FeatureCard 
                    icon={<Brain className="w-8 h-8 text-pink-500" />}
                    title="Deep Thinking"
                    desc="Solve complex problems with step-by-step reasoning chains that explain the 'why', not just the 'what'."
                    spotlight="rgba(236, 72, 153, 0.1)"
                  />
                  <FeatureCard 
                    icon={<Mic className="w-8 h-8 text-red-500" />}
                    title="Live Voice"
                    desc="Interact with Acosta in real-time. Practice languages, debate topics, or just chat naturally."
                    spotlight="rgba(239, 68, 68, 0.1)"
                  />
                  <FeatureCard 
                    icon={<ScanEye className="w-8 h-8 text-emerald-500" />}
                    title="Content Intelligence"
                    desc="Analyse PDFs, images, and handwritten notes. Extract key concepts and generate study guides instantly."
                    spotlight="rgba(16, 185, 129, 0.1)"
                  />
                  <FeatureCard 
                    icon={<Search className="w-8 h-8 text-blue-500" />}
                    title="Web Search"
                    desc="Real-time access to the latest information, cited with sources for academic integrity."
                    spotlight="rgba(59, 130, 246, 0.1)"
                  />
                  <FeatureCard 
                    icon={<Cpu className="w-8 h-8 text-purple-500" />}
                    title="Exam Simulation"
                    desc="Practice with timed, unseen questions tailored to your syllabus. Get instant grading and gap analysis."
                    spotlight="rgba(168, 85, 247, 0.1)"
                  />
                  <FeatureCard 
                    icon={<Activity className="w-8 h-8 text-blue-600" />}
                    title="Acosta Guardian"
                    desc="Our built-in wellbeing system monitors your workload to prevent burnout and encourage healthy study habits."
                    spotlight="rgba(37, 99, 235, 0.1)"
                  />
                  <FeatureCard 
                    icon={<GraduationCap className="w-8 h-8 text-neutral-900 dark:text-white" />}
                    title="Study Hub"
                    desc="A centralized dashboard for your planner, flashcards, and mind dump tools."
                    spotlight="rgba(120, 120, 120, 0.1)"
                  />
                  <FeatureCard 
                    icon={<Trophy className="w-8 h-8 text-amber-500" />}
                    title="Live Quiz"
                    desc="Join or host real-time competitive quizzes with your friends or classmates."
                    spotlight="rgba(245, 158, 11, 0.1)"
                  />
                  <FeatureCard 
                    icon={<Layers className="w-8 h-8 text-indigo-500" />}
                    title="Multi-Modal"
                    desc="Generate images, synthesize speech, and process documents all in one unified interface."
                    spotlight="rgba(99, 102, 241, 0.1)"
                  />
                </div>
              </div>

              {/* Comparison Section */}
              <div className="max-w-7xl mx-auto px-6 py-32 space-y-12">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tight">Built for learners and educators.<br/>Not just anyone.</h2>
                  <p className="text-xl text-neutral-500 max-w-2xl mx-auto">Generic AI wasn't designed with classrooms in mind.</p>
                </div>
                <div className="overflow-x-auto rounded-[32px] border border-neutral-100 dark:border-neutral-800 shadow-xl shadow-black/5">
                  <table className="w-full min-w-[560px] bg-white dark:bg-neutral-900">
                    <thead>
                      <tr className="border-b border-neutral-100 dark:border-neutral-800">
                        <th className="text-left px-8 py-6 text-sm font-bold uppercase tracking-widest text-neutral-400 w-1/2">Feature</th>
                        <th className="px-8 py-6 text-center text-sm font-bold uppercase tracking-widest text-primary w-1/4">Acosta AI</th>
                        <th className="px-8 py-6 text-center text-sm font-bold uppercase tracking-widest text-neutral-400 w-1/4">General AI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { feature: 'Designed for students & teachers', acosta: true, general: false },
                        { feature: 'Exam simulation & syllabus alignment', acosta: true, general: false },
                        { feature: 'Academic integrity built-in', acosta: true, general: false },
                        { feature: 'Student wellbeing monitoring', acosta: true, general: false },
                        { feature: 'Lesson planning & teaching tools', acosta: true, general: false },
                        { feature: 'Real-time web search with citations', acosta: true, general: 'partial' },
                        { feature: 'PDF & handwritten note analysis', acosta: true, general: 'partial' },
                        { feature: 'Live voice interaction', acosta: true, general: 'partial' },
                        { feature: 'Private — no data sold', acosta: true, general: false },
                      ].map((row, i) => (
                        <tr key={i} className={`border-b border-neutral-100 dark:border-neutral-800 last:border-0 ${i % 2 === 0 ? 'bg-neutral-50/50 dark:bg-neutral-800/20' : ''}`}>
                          <td className="px-8 py-5 font-medium text-neutral-700 dark:text-neutral-300">{row.feature}</td>
                          <td className="px-8 py-5 text-center">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                              <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                            </span>
                          </td>
                          <td className="px-8 py-5 text-center">
                            {row.general === 'partial' ? (
                              <span className="text-sm font-semibold text-neutral-400">Partial</span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800">
                                <X className="w-4 h-4 text-neutral-400" strokeWidth={3} />
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* About Section */}
              <div className="max-w-7xl mx-auto px-6 py-32 space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tight">Built by a student,<br/>for students.</h2>
                  <p className="text-xl text-neutral-500 max-w-2xl mx-auto">One person. One mission. A tool that students actually deserve.</p>
                </div>

                {/* Mission Quote */}
                <div className="bg-white dark:bg-neutral-900 rounded-[40px] p-12 md:p-20 relative overflow-hidden shadow-xl shadow-black/5 border border-neutral-100 dark:border-neutral-800">
                  <div className="absolute top-8 left-10 text-primary opacity-30 select-none pointer-events-none">
                    <Quote className="w-24 h-24" strokeWidth={1.5} />
                  </div>
                  <blockquote className="relative z-10 space-y-10">
                    <p className="text-3xl md:text-5xl font-black text-neutral-900 dark:text-white leading-tight tracking-tight max-w-4xl">
                      The best tools don't just perform — they earn your trust. Private by design. Beautiful by intention. Built to actually help.
                    </p>
                    <footer className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900 dark:text-white">Lachie Thurlow</p>
                        <p className="text-sm text-neutral-400 font-medium">Founder & CEO, Acosta AI</p>
                      </div>
                    </footer>
                  </blockquote>
                </div>

                {/* Founder + Mission Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-neutral-900 rounded-[32px] p-10 space-y-6 border border-neutral-100 dark:border-neutral-800 shadow-xl shadow-black/5">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Lachie Thurlow</h3>
                        <p className="text-sm text-neutral-400 font-medium">Founder & CEO</p>
                      </div>
                    </div>
                    <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
                      A high school student who got tired of AI tools that felt clunky, invasive, and built for someone else. So he built his own. Every line of code, every design decision, every feature in Acosta AI came from one person who just wanted a better way to learn.
                    </p>
                  </div>

                  <div className="bg-primary rounded-[32px] p-10 space-y-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15)_0%,transparent_60%)]" />
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white rounded-full text-xs font-bold uppercase tracking-widest relative z-10">
                      Our Mission
                    </div>
                    <p className="text-white text-2xl font-black leading-tight relative z-10">
                      Give every student access to a world-class learning companion.
                    </p>
                    <p className="text-white/70 leading-relaxed font-medium relative z-10">
                      One that respects their privacy, adapts to their needs, and makes studying something worth doing. Not another surveillance tool dressed up as a tutor — a genuine partner in learning.
                    </p>
                    <div className="flex items-center gap-3 relative z-10 pt-2">
                      <Heart className="w-5 h-5 text-white/50" />
                      <span className="text-white/50 text-sm font-medium">Made with purpose, not profit.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="max-w-7xl mx-auto px-6 py-32">
                <div className="bg-primary rounded-[40px] p-12 md:p-24 text-center space-y-10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
                    <h2 className="text-5xl md:text-7xl font-black text-white relative z-10 tracking-tight">Ready to transform <br/> your learning?</h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                        <a 
                            href="https://platform.acosta-ai.com" 
                            className="w-full sm:w-auto px-12 py-6 bg-white text-primary rounded-3xl font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/10 flex items-center justify-center gap-3"
                        >
                            Get Started Now
                            <ArrowRight className="w-7 h-7" />
                        </a>
                    </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="max-w-4xl mx-auto px-6 py-32 space-y-12">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tight">Frequently Asked Questions</h2>
                  <p className="text-xl text-neutral-500">Everything you need to know before getting started.</p>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      q: 'Is using Acosta AI considered cheating?',
                      a: 'Acosta AI is a learning companion, not an answer machine. It\'s designed to help students understand and teachers teach — not to bypass effort. Features like step-by-step reasoning and exam simulation are built to develop your skills, not replace them.'
                    },
                    {
                      q: 'Is it for teachers too?',
                      a: 'Absolutely. Acosta AI is built for both students and teachers. Educators can use it for lesson planning, generating practice questions, and supporting student wellbeing — all in one platform.'
                    },
                    {
                      q: 'Is my data private?',
                      a: 'Yes. We never sell your data. All conversations are private to you, and the platform is built on strict privacy principles. You can read more in our Privacy Policy.'
                    },
                    {
                      q: 'What\'s included in the free plan?',
                      a: 'The free plan gives you access to core study and teaching features with a monthly credit limit. No credit card required to get started.'
                    },
                    {
                      q: 'What is beta, and how do I get access?',
                      a: 'Acosta AI is currently in beta — meaning we\'re actively building and improving the platform. You can sign up and start using it right now at platform.acosta-ai.com.'
                    },
                    {
                      q: 'What subjects and exams does it support?',
                      a: 'Acosta AI supports a wide range of subjects and curricula. Whether you\'re studying for IB, HSC, A-Levels, SATs, or general coursework, the platform adapts to your needs.'
                    },
                    {
                      q: 'How is Acosta AI different from ChatGPT?',
                      a: 'ChatGPT is a general-purpose tool. Acosta AI is purpose-built for education — with exam prep, teacher tools, student wellbeing monitoring, academic integrity features, and a privacy-first design that general AI tools simply don\'t offer.'
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 overflow-hidden shadow-sm shadow-black/5">
                      <button
                        className="w-full flex items-center justify-between px-8 py-6 text-left gap-6"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      >
                        <span className="font-bold text-neutral-900 dark:text-white text-lg">{item.q}</span>
                        <motion.div
                          animate={{ rotate: openFaq === i ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="shrink-0 text-neutral-400"
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
                      </button>
                      <AnimatePresence initial={false}>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <p className="px-8 pb-6 text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <footer className="max-w-7xl mx-auto px-6 py-24 border-t border-neutral-100 dark:border-neutral-900 space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                            <img src="https://i.ibb.co/C5B2KJTk/Favicon-Small-Icon.png" alt="Acosta AI" className="h-8 w-auto" />
                            <span className="text-2xl font-bold tracking-tighter">Acosta AI</span>
                        </div>
                        <p className="text-neutral-500 max-w-sm leading-relaxed">
                            The intelligent study companion built for the next generation of learners. 
                            Empowering students with elite AI, safely and ethically.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-neutral-400">Platform</h4>
                        <div className="flex flex-col gap-4 text-neutral-500 font-medium">
                            <button onClick={() => setActiveTab('home')} className="hover:text-primary transition-colors text-left">Home</button>
                            <button onClick={() => setActiveTab('pricing')} className="hover:text-primary transition-colors text-left">Pricing</button>
                            <a href="https://platform.acosta-ai.com" className="hover:text-primary transition-colors">Launch App</a>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-neutral-400">Trust</h4>
                        <div className="flex flex-col gap-4 text-neutral-500 font-medium">
                            <button onClick={() => navigateToPolicy('PRIVACY')} className="hover:text-primary transition-colors text-left">Privacy Policy</button>
                            <button onClick={() => navigateToPolicy('TERMS')} className="hover:text-primary transition-colors text-left">Terms of Service</button>
                            <button onClick={() => navigateToPolicy('SAFETY')} className="hover:text-primary transition-colors text-left">Safety Features</button>
                            <a href="mailto:support@acosta-ai.com" className="hover:text-primary transition-colors">Support</a>
                            <a href="https://status.acosta-ai.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Status</a>
                        </div>
                    </div>
                </div>
                <div className="pt-12 border-t border-neutral-100 dark:border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-neutral-400 text-sm font-medium">
                        © 2026 Transnology. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="https://transnology.store" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-primary transition-colors text-sm font-bold">Transnology</a>
                        <div className="w-1 h-1 bg-neutral-300 rounded-full" />
                        <span className="text-neutral-400 text-sm font-medium">Built with ❤️ for Students and Teachers</span>
                    </div>
                </div>
              </footer>
            </motion.div>
          )}

          {activeTab === 'pricing' && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <PricingView 
                onBack={() => setActiveTab('home')} 
                onOpenStripePortal={() => window.open('https://platform.acosta-ai.com', '_blank')}
                isAnonymous={true}
                onLogin={() => window.open('https://platform.acosta-ai.com', '_blank')}
              />
            </motion.div>
          )}

          {activeTab === 'policies' && (
            <motion.div
              key="policies"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <PoliciesView 
                onBack={() => setActiveTab('home')}
                initialSection={policySection}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string, spotlight?: string }> = ({ icon, title, desc, spotlight }) => (
  <div className="p-10 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 rounded-[32px] space-y-6 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="p-5 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm w-fit group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative z-10">
      {icon}
    </div>
    <div className="space-y-3 relative z-10">
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">{title}</h3>
        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
        {desc}
        </p>
    </div>
  </div>
);
