
import React, { useState, useEffect } from 'react';
import { Check, Zap, Sparkles, Brain, Image as ImageIcon, ScanEye, Volume2, Shield, Loader2, CreditCard, X, ExternalLink, Building2, Mail, PlusCircle, Layers, ClipboardCheck, Calendar, Bug, Leaf, LogIn, Heart } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import { PLANS, SubscriptionService, PlanTier, TOP_UPS, UsageFeature, PERKS } from '../services/subscriptionService';
import { useToast } from './Toast';

interface PricingViewProps {
    onBack: () => void;
    onOpenStripePortal: () => void;
    onSimulateSuccess?: (tier: PlanTier) => void;
    isAnonymous?: boolean;
    onLogin?: () => void;
}

interface PortalModalState {
    isOpen: boolean;
    action: 'update' | 'cancel';
}

export const PricingView: React.FC<PricingViewProps> = ({ onBack, onOpenStripePortal, onSimulateSuccess, isAnonymous, onLogin }) => {
    const { toast } = useToast();
    const [loadingTier, setLoadingTier] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'plans' | 'topups' | 'support'>('plans');
    const [isAnnual, setIsAnnual] = useState(false);
    const [currentTier, setCurrentTier] = useState<PlanTier>(SubscriptionService.getCurrentTier());
    const [usage, setUsage] = useState<any>(SubscriptionService.getCounts());
    const [subDetails, setSubDetails] = useState(SubscriptionService.getSubscriptionDetails());
    const [error, setError] = useState<string | null>(null);
    const [portalModal, setPortalModal] = useState<PortalModalState>({ isOpen: false, action: 'update' });

    useEffect(() => {
        // Initial fetch
        setCurrentTier(SubscriptionService.getCurrentTier());
        setUsage(SubscriptionService.getCounts());
        setSubDetails(SubscriptionService.getSubscriptionDetails());

        // Check intent
        const intent = SubscriptionService.getPricingTab();
        if (intent) setActiveTab(intent as 'plans' | 'topups' | 'support');

        // Listen for updates
        const unsub = SubscriptionService.onUsageUpdate(() => {
             setUsage(SubscriptionService.getCounts());
             setCurrentTier(SubscriptionService.getCurrentTier());
             setSubDetails(SubscriptionService.getSubscriptionDetails());
        });
        return () => { unsub(); };
    }, []);

    const handleSubscribe = async (tier: 'go' | 'max') => {
        setLoadingTier(tier);
        setError(null);
        try {
            await SubscriptionService.subscribeToPlan(tier, isAnnual);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to start checkout.");
            setLoadingTier(null);
        }
    };

    const handleBuyTopUp = async (featureId: string) => {
        setLoadingTier(featureId);
        setError(null);
        try {
            await SubscriptionService.buyTopUp(featureId as UsageFeature);
        } catch (err: any) {
            console.error(err);
            // DEV: Simulate success for demo if Price ID is placeholder
            if (err.message.includes('placeholder') || err.message.includes('configuration missing')) {
                const topUp = TOP_UPS[featureId as keyof typeof TOP_UPS];
                if (topUp) {
                    SubscriptionService.debugAddCredits(featureId as UsageFeature, topUp.credits);
                    toast.success(`(Demo Mode) Added ${topUp.credits} credits for ${topUp.name}. In production, this redirects to Stripe.`);
                }
            } else {
                setError(err.message || "Failed to start checkout.");
            }
            setLoadingTier(null);
        }
    };

    const handleBuyPerk = async (perkId: string) => {
        setLoadingTier(perkId);
        setError(null);
        try {
            await SubscriptionService.buyPerk(perkId);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to start checkout.");
            setLoadingTier(null);
        }
    };

    const handlePlanClick = (targetTier: PlanTier) => {
        if (currentTier === targetTier && !isAnonymous) return; 

        if (isAnonymous && onLogin) {
            onLogin();
            return;
        }

        if (currentTier === 'free') {
            if (targetTier === 'go' || targetTier === 'max') {
                handleSubscribe(targetTier);
            }
        } else {
            if (targetTier === 'free') {
                setPortalModal({ isOpen: true, action: 'cancel' });
            } else {
                setPortalModal({ isOpen: true, action: 'update' });
            }
        }
    };

    const handlePortalRedirect = () => {
        onOpenStripePortal();
        setPortalModal({ ...portalModal, isOpen: false });
    };
    
    const calculateTotalContribution = () => {
        if (currentTier === 'free' || !subDetails.subscriptionCreated) return null;
        
        const now = Date.now();
        const start = subDetails.subscriptionCreated;
        const diffTime = Math.abs(now - start);
        const diffMonths = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30)));
        
        const monthlyAmt = currentTier === 'go' ? 0.50 : 1.50;
        const total = (diffMonths * monthlyAmt).toFixed(2);
        
        return total;
    };

    const renderFeature = (text: string, included: boolean = true) => (
        <div className={`flex items-center gap-3 text-sm ${included ? 'text-neutral-700 dark:text-neutral-300' : 'text-neutral-400 dark:text-neutral-600 opacity-60'}`}>
            <div className={`p-0.5 rounded-full ${included ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'}`}>
                <Check className="w-3 h-3" />
            </div>
            {text}
        </div>
    );

    const renderLimitFeature = (text: string, featureKey: string, limit: number | string, cardTier: PlanTier, included: boolean = true) => {
         const count = usage[featureKey] || 0;
         const isUnlimited = limit === 'Unlimited';
         const isCurrent = currentTier === cardTier && !isAnonymous;
         
         let subText = '';
         if (included) {
             if (isUnlimited) {
                 // No subtext for unlimited usually, unless we want to emphasize it
             } else {
                 if (isCurrent) {
                     const remaining = Math.max(0, (limit as number) - count);
                     subText = `${count} / ${limit} used (${remaining} left)`;
                 } else {
                     subText = `${limit} per month`;
                 }
             }
         }

         return (
            <div className={`flex items-start gap-3 text-sm ${included ? 'text-neutral-700 dark:text-neutral-300' : 'text-neutral-400 dark:text-neutral-600 opacity-60'}`}>
                <div className={`mt-0.5 p-0.5 rounded-full ${included ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'}`}>
                    <Check className="w-3 h-3" />
                </div>
                <div className="flex flex-col">
                    <span>{text}</span>
                    {subText && (
                        <span className="text-xs text-neutral-500 dark:text-neutral-500 font-medium mt-0.5">
                            {subText}
                        </span>
                    )}
                </div>
            </div>
         );
    };

    const getIconForFeature = (id: string) => {
        switch(id) {
            case 'exam_sim': return <ClipboardCheck className="w-5 h-5 text-purple-500" />;
            case 'study_tools': return <Layers className="w-5 h-5 text-emerald-500" />;
            case 'image_gen': return <ImageIcon className="w-5 h-5 text-amber-500" />;
            case 'analysis': return <ScanEye className="w-5 h-5 text-emerald-500" />;
            case 'thinking': return <Brain className="w-5 h-5 text-pink-500" />;
            case 'search': return <Zap className="w-5 h-5 text-blue-500" />;
            default: return <PlusCircle className="w-5 h-5 text-neutral-500" />;
        }
    };

    return (
        <div className="h-full bg-transparent p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] overflow-y-auto transition-colors relative">
            
            {/* Subscription Management Modal */}
            {portalModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in-up">
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden text-center space-y-4">
                        <button onClick={() => setPortalModal({ ...portalModal, isOpen: false })} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"><X className="w-5 h-5" /></button>
                        
                        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
                             <CreditCard className="w-7 h-7" />
                        </div>

                        <h2 className="text-xl font-medium text-neutral-900 dark:text-white">Manage your subscription</h2>
                        
                        <div className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                            <p className="mb-2">Manage your subscription through the Stripe Customer Portal.</p>
                            <p className="font-medium text-neutral-800 dark:text-neutral-200">
                                {portalModal.action === 'cancel' 
                                    ? "Just click on cancel subscription." 
                                    : "Just click on update subscription, and select the one you choose."}
                            </p>
                        </div>

                        <button 
                            onClick={handlePortalRedirect}
                            className="w-full py-3 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-xl font-medium hover:opacity-90 flex items-center justify-center gap-2 transition-all mt-4"
                        >
                             <ExternalLink className="w-4 h-4"/>
                             Open Portal
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto space-y-8 pb-12">
                
                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <div className="bg-neutral-100 dark:bg-neutral-900 p-1 rounded-xl flex gap-1">
                            <button 
                                onClick={() => setActiveTab('plans')}
                                className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'plans' ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                            >
                                Plans
                            </button>
                            <button 
                                onClick={() => setActiveTab('topups')}
                                className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'topups' ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                            >
                                Top Ups
                            </button>
                            <button 
                                onClick={() => setActiveTab('support')}
                                className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'support' ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                            >
                                Support Us
                            </button>
                        </div>

                        {activeTab === 'plans' && (
                            <div className="flex items-center gap-3 bg-neutral-100 dark:bg-neutral-900 p-1 rounded-xl">
                                <button 
                                    onClick={() => setIsAnnual(false)}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${!isAnnual ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500'}`}
                                >
                                    Monthly
                                </button>
                                <button 
                                    onClick={() => setIsAnnual(true)}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${isAnnual ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500'}`}
                                >
                                    Annual <span className="text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded-full">Save 12.5%</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {!isAnonymous && currentTier !== 'free' && (
                        <button 
                            onClick={onOpenStripePortal}
                            className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg text-sm font-medium transition-colors text-neutral-600 dark:text-neutral-300"
                        >
                            <CreditCard className="w-4 h-4"/>
                            Manage Subscription
                        </button>
                    )}
                </div>

                <div className="text-center space-y-4 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-light text-neutral-900 dark:text-white tracking-tight">
                        {activeTab === 'plans' ? "Upgrade your Intelligence" : activeTab === 'topups' ? "Power Up your Workflow" : "Support the Mission"}
                    </h1>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        {activeTab === 'plans' 
                            ? "Choose the plan that fits your learning style. From casual study help to academic excellence." 
                            : activeTab === 'topups'
                            ? "Running low? Add one-time credit packs that never expire. Perfect for Free and Go plans."
                            : "Help us keep Acosta AI growing and unlock exclusive in-platform perks to show your support."}
                    </p>
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm inline-block max-w-lg">
                            {error}
                        </div>
                    )}
                </div>

                {/* PLANS TAB */}
                {activeTab === 'plans' && (
                    <>
                        {/* Current Subscription Banner */}
                        {!isAnonymous && currentTier !== 'free' && subDetails.renewDate && subDetails.cardLast4 && !subDetails.cancelAtPeriodEnd && (
                            <div className="max-w-2xl mx-auto mb-8 flex flex-col gap-2">
                                <div className="p-4 bg-white/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex items-start gap-4 shadow-sm animate-fade-in-up">
                                    <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl shrink-0">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                        Your <strong>{currentTier === 'go' ? 'Go' : 'Max'}</strong> plan will renew on <strong>{subDetails.renewDate.toLocaleDateString()}</strong> and will charge <strong>{subDetails.cardBrand?.toUpperCase() || 'Card'}</strong> ending in <strong>{subDetails.cardLast4}</strong>.
                                    </div>
                                </div>
                                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl flex items-start gap-4 shadow-sm animate-fade-in-up">
                                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
                                        <Leaf className="w-5 h-5" />
                                    </div>
                                    <div className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">
                                        You've helped us contribute a total of <strong>${calculateTotalContribution()}</strong> to carbon removal. <a href="https://climate.stripe.com/XJwMfa" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-900 dark:hover:text-emerald-100">See more info here</a>.
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch animate-fade-in-up">
                            
                            {/* FREE TIER */}
                            <SpotlightCard id="tour-plan-free" className="flex flex-col gap-6 relative h-full" spotlightColor="rgba(100, 116, 139, 0.1)">
                                <div className="space-y-2 flex flex-col items-center text-center">
                                    <h3 className="text-xl font-medium text-neutral-900 dark:text-white">Free</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-neutral-900 dark:text-white">$0</span>
                                        <span className="text-neutral-500">{isAnnual ? '/yr' : '/mo'}</span>
                                    </div>
                                    <p className="text-sm text-neutral-500">The essentials for casual learning.</p>
                                </div>
                                <div className="space-y-4 flex-1">
                                    {renderFeature("Unlimited Fast Mode")}
                                    {renderFeature("Unlimited Live Conversation")}
                                    {renderFeature("Unlimited Audio Tools")}
                                    {renderLimitFeature("Search Messages / mo", 'search', PLANS.FREE.limits.search, 'free')}
                                    {renderLimitFeature("Thinking Messages / mo", 'thinking', PLANS.FREE.limits.thinking, 'free')}
                                    {renderLimitFeature("Study Tools / mo", 'study_tools', PLANS.FREE.limits.study_tools, 'free')}
                                    {renderLimitFeature("Images / mo", 'image_gen', PLANS.FREE.limits.image_gen, 'free')}
                                    {renderLimitFeature("Analysis / mo", 'analysis', PLANS.FREE.limits.analysis, 'free')}
                                    {renderLimitFeature("Exam Simulations / mo", 'exam_sim', PLANS.FREE.limits.exam_sim, 'free')}
                                </div>
                                <button 
                                    onClick={() => handlePlanClick('free')}
                                    disabled={currentTier === 'free' && !isAnonymous}
                                    className={`w-full py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 font-medium transition-colors ${currentTier === 'free' && !isAnonymous ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 cursor-default' : 'text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800'}`}
                                >
                                    {isAnonymous ? "Login / Sign Up" : (currentTier === 'free' ? 'Current Plan' : 'Downgrade to Free')}
                                </button>
                            </SpotlightCard>

                            {/* GO TIER */}
                            <SpotlightCard id="tour-plan-go" className="flex flex-col gap-6 relative border-blue-500/30 dark:border-blue-500/30 h-full" spotlightColor="rgba(59, 130, 246, 0.2)">
                                {!isAnnual && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-blue-500/20 whitespace-nowrap z-10 flex items-center gap-1 animate-pulse">
                                        <Sparkles className="w-3 h-3 text-yellow-300" /> 30-Day Free Trial
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <div className="h-14 w-full overflow-hidden relative mb-2 flex items-center justify-center">
                                        <img 
                                            src="/logos/go-light.png" 
                                            alt="Go" 
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300%] w-auto max-w-none object-contain block dark:hidden" 
                                        />
                                        <img 
                                            src="/logos/go-dark.png" 
                                            alt="Go" 
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300%] w-auto max-w-none object-contain hidden dark:block" 
                                        />
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-bold text-neutral-900 dark:text-white">{isAnnual ? PLANS.GO.priceAnnual : PLANS.GO.price}</span>
                                            <span className="text-neutral-500">{isAnnual ? '/yr' : '/mo'}</span>
                                        </div>
                                        <div className="text-[10px] text-green-600 dark:text-green-400 flex items-center gap-1 mt-1 font-medium justify-center">
                                            <Leaf className="w-3 h-3" /> Contributes {isAnnual ? '$5.25/yr' : '$0.50/mo'} to carbon removal
                                        </div>
                                    </div>
                                    <p className="text-sm text-neutral-500 text-center">For serious students and power users.</p>
                                </div>
                                <div className="space-y-4 flex-1">
                                    {renderFeature("Everything in Free")}
                                    {renderLimitFeature("Unlimited Search Mode", 'search', PLANS.GO.limits.search, 'go', true)}
                                    {renderLimitFeature("Thinking Messages / mo", 'thinking', PLANS.GO.limits.thinking, 'go')}
                                    {renderLimitFeature("Study Tools / mo", 'study_tools', PLANS.GO.limits.study_tools, 'go')}
                                    {renderLimitFeature("Images / mo", 'image_gen', PLANS.GO.limits.image_gen, 'go')}
                                    {renderLimitFeature("Analysis / mo", 'analysis', PLANS.GO.limits.analysis, 'go')}
                                    {renderLimitFeature("Exam Simulations / mo", 'exam_sim', PLANS.GO.limits.exam_sim, 'go')}
                                </div>
                                <button 
                                    onClick={() => handlePlanClick('go')}
                                    disabled={!!loadingTier || currentTier === 'go' || isAnonymous}
                                    className={`w-full py-3 rounded-xl font-medium shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 ${
                                        (currentTier === 'go' || isAnonymous)
                                        ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 shadow-none cursor-default hover:scale-100 disabled:opacity-70' 
                                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20'
                                    }`}
                                >
                                    {loadingTier === 'go' ? <Loader2 className="w-4 h-4 animate-spin"/> : null}
                                    {isAnonymous ? <><LogIn className="w-4 h-4"/> Login Required</> : (currentTier === 'go' ? 'Current Plan' : (currentTier === 'max' ? 'Downgrade to Go' : (isAnnual ? 'Subscribe to Go' : 'Start 30-Day Free Trial')))}
                                </button>
                            </SpotlightCard>

                            {/* MAX TIER */}
                            <SpotlightCard id="tour-plan-max" className="flex flex-col gap-6 relative overflow-hidden h-full" spotlightColor="rgba(168, 85, 247, 0.2)">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 pointer-events-none" />
                                <div className="space-y-2 relative">
                                    <div className="h-14 w-full overflow-hidden relative mb-2 flex items-center justify-center">
                                        <img 
                                            src="/logos/max-light.png" 
                                            alt="Max" 
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300%] w-auto max-w-none object-contain block dark:hidden" 
                                        />
                                        <img 
                                            src="/logos/max-dark.png" 
                                            alt="Max" 
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300%] w-auto max-w-none object-contain hidden dark:block" 
                                        />
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-bold text-neutral-900 dark:text-white">{isAnnual ? PLANS.MAX.priceAnnual : PLANS.MAX.price}</span>
                                            <span className="text-neutral-500">{isAnnual ? '/yr' : '/mo'}</span>
                                        </div>
                                        <div className="text-[10px] text-green-600 dark:text-green-400 flex items-center gap-1 mt-1 font-medium justify-center">
                                            <Leaf className="w-3 h-3" /> Contributes {isAnnual ? '$15.75/yr' : '$1.50/mo'} to carbon removal
                                        </div>
                                    </div>
                                    <p className="text-sm text-neutral-500 text-center">Limitless intelligence without boundaries.</p>
                                </div>
                                <div className="space-y-4 flex-1 relative">
                                    {renderFeature("Everything in Go")}
                                    {renderFeature("Unlimited Thinking Mode", true)}
                                    {renderFeature("Unlimited Study Tools", true)}
                                    {renderFeature("Unlimited Image Generation", true)}
                                    {renderFeature("Unlimited Content Analysis", true)}
                                    {renderFeature("Unlimited Exam Simulations", true)}
                                </div>
                                <button 
                                    onClick={() => handlePlanClick('max')}
                                    disabled={!!loadingTier || currentTier === 'max' || isAnonymous}
                                    className={`w-full py-3 rounded-xl font-medium shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 ${
                                        (currentTier === 'max' || isAnonymous)
                                        ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 shadow-none cursor-default hover:scale-100 disabled:opacity-70'
                                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 shadow-purple-600/20'
                                    }`}
                                >
                                    {loadingTier === 'max' ? <Loader2 className="w-4 h-4 animate-spin"/> : null}
                                    {isAnonymous ? <><LogIn className="w-4 h-4"/> Login Required</> : (currentTier === 'max' ? 'Current Plan' : 'Subscribe to Max')}
                                </button>
                            </SpotlightCard>
                        </div>

                        {/* ENTERPRISE PLAN */}
                        <SpotlightCard 
                            id="tour-plan-enterprise" 
                            className="w-full flex flex-col md:flex-row items-center justify-between gap-8 bg-neutral-900/5 dark:bg-white/5 border-neutral-200 dark:border-neutral-800 p-8 animate-fade-in-up"
                            spotlightColor="rgba(37, 99, 235, 0.1)"
                        >
                            <div className="flex items-center gap-6 flex-1">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                                    <Building2 className="w-8 h-8 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white">Enterprise</h3>
                                    <p className="text-neutral-600 dark:text-neutral-400">Custom solutions for schools, institutions, and large organizations.</p>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                                        <div className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                                            <Check className="w-4 h-4 text-green-500" /> Flexible limits
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                                            <Check className="w-4 h-4 text-green-500" /> SSO Integration
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a 
                                href="mailto:support@acosta-ai.com?subject=Enterprise%20Enquiry"
                                className="px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/5 flex items-center gap-2 shrink-0"
                            >
                                <Mail className="w-5 h-5" />
                                Get in touch
                            </a>
                        </SpotlightCard>
                    </>
                )}

                {/* TOP UPS TAB */}
                {activeTab === 'topups' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 animate-fade-in-up">
                        {Object.values(TOP_UPS).map((pack) => {
                            const balance = SubscriptionService.getBoostBalance(pack.id as UsageFeature);
                            const hasUnlimited = SubscriptionService.getPlanLimit(pack.id as UsageFeature) === 'Unlimited';

                            return (
                                <SpotlightCard 
                                    key={pack.id} 
                                    className={`flex flex-col relative h-full ${hasUnlimited ? 'opacity-60 pointer-events-none grayscale' : ''}`} 
                                    spotlightColor="rgba(59, 130, 246, 0.15)"
                                >
                                    {hasUnlimited && (
                                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-[1px] rounded-3xl">
                                            <span className="text-xs font-bold px-3 py-1 bg-green-500 text-white rounded-full">Included in your plan</span>
                                        </div>
                                    )}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                                                {getIconForFeature(pack.id)}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-neutral-900 dark:text-white">{pack.name}</h3>
                                                <p className="text-xs text-neutral-500">+{pack.credits} Credits</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-end justify-between border-t border-neutral-100 dark:border-neutral-800 pt-4">
                                            <div>
                                                <p className="text-xs font-medium text-neutral-500">Current Balance</p>
                                                <p className="text-lg font-mono font-medium text-neutral-700 dark:text-neutral-300">{balance}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-xl font-bold text-neutral-900 dark:text-white">{pack.price}</span>
                                                <div className="text-[9px] text-green-600 dark:text-green-400 flex items-center gap-1 font-medium">
                                                    <Leaf className="w-2.5 h-2.5" /> $0.25 to carbon
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => {
                                            if (isAnonymous && onLogin) {
                                                onLogin();
                                            } else {
                                                handleBuyTopUp(pack.id);
                                            }
                                        }}
                                        disabled={!!loadingTier || (isAnonymous ? false : false)}
                                        className={`w-full mt-6 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-primary dark:hover:border-primary text-neutral-900 dark:text-white rounded-xl text-sm font-medium transition-all hover:bg-neutral-50 dark:hover:bg-neutral-700 flex items-center justify-center gap-2 ${isAnonymous ? 'hover:scale-[1.02]' : ''}`}
                                    >
                                        {loadingTier === pack.id ? <Loader2 className="w-4 h-4 animate-spin" /> : isAnonymous ? <LogIn className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                                        {isAnonymous ? "Login Required" : "Buy Now"}
                                    </button>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                )}

                {/* SUPPORT US TAB */}
                {activeTab === 'support' && (
                    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs font-bold">
                                    <Heart className="w-3 h-3 fill-current" /> Community Perk
                                </div>
                                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Supporter Badge</h2>
                                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                    Become an official supporter of Acosta AI. Your contribution helps us develop new features, maintain our servers, and keep the platform accessible for everyone.
                                </p>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-sm text-neutral-900 dark:text-white uppercase tracking-wider">Unlocked Perks:</h4>
                                    <div className="space-y-3">
                                        {renderFeature("Exclusive Supporter Badge in your header")}
                                        {renderFeature("Badge visible to everyone in Live Quizzes")}
                                        {renderFeature("Display under your name in the Quiz Lobby")}
                                        {renderFeature("Badge next to your name on Leaderboards")}
                                        {renderFeature("Our eternal gratitude")}
                                    </div>
                                </div>
                            </div>
                            
                            <SpotlightCard className="flex flex-col items-center text-center p-10 gap-6" spotlightColor="rgba(239, 68, 68, 0.1)">
                                <div className="w-32 h-32 relative">
                                    <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full animate-pulse" />
                                    <img 
                                        src={PERKS.supporter.image} 
                                        alt="Supporter Badge" 
                                        className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <div className="text-3xl font-black text-neutral-900 dark:text-white">Pay what you want</div>
                                    <p className="text-sm text-neutral-500">Minimum $2 • Recommended $5</p>
                                </div>
                                <button 
                                    onClick={() => {
                                        if (isAnonymous && onLogin) {
                                            onLogin();
                                        } else {
                                            handleBuyPerk('supporter');
                                        }
                                    }}
                                    disabled={!!loadingTier || (isAnonymous ? false : usage.isSupporter)}
                                    className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${
                                        usage.isSupporter && !isAnonymous
                                        ? 'bg-emerald-500 text-white cursor-default shadow-emerald-500/20' 
                                        : isAnonymous 
                                        ? 'bg-neutral-900 dark:bg-white text-white dark:text-black shadow-black/20 dark:shadow-white/10' 
                                        : 'bg-neutral-900 dark:bg-white text-white dark:text-black shadow-black/20 dark:shadow-white/10'
                                    }`}
                                >
                                    {loadingTier === 'supporter' ? <Loader2 className="w-5 h-5 animate-spin" /> : usage.isSupporter ? <Check className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
                                    {usage.isSupporter ? "Already a Supporter" : isAnonymous ? "Login to Support" : "Get the Badge"}
                                </button>
                                <p className="text-[10px] text-neutral-400">
                                    This is a one-time purchase. The badge will be permanently linked to your account.
                                </p>
                            </SpotlightCard>
                        </div>

                        <div className="p-8 bg-neutral-100 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 text-center space-y-4">
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">More perks coming soon...</h3>
                            <p className="text-sm text-neutral-500 max-w-lg mx-auto">
                                We're working on more ways for you to customize your experience and support the platform. Stay tuned for custom themes, avatar frames, and more!
                            </p>
                        </div>
                    </div>
                )}
                
                <div className="text-center space-y-4 border-t border-neutral-100 dark:border-neutral-800 pt-8">
                    <div className="space-y-1">
                        <p className="text-xs text-neutral-400">
                            Prices are in Australian Dollars (AUD). Top-up credits do not expire as long as your account is active.
                        </p>
                        <p className="text-xs text-neutral-400">
                            If you encounter any problems, please contact <a href="mailto:support@acosta-ai.com?subject=Subscription%20Plans" className="text-neutral-600 dark:text-neutral-300 hover:underline">support@acosta-ai.com</a>
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2 pt-4">
                        <a 
                            href="https://climate.stripe.com/XJwMfa" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-400 rounded-full text-xs font-medium hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors"
                        >
                            <Leaf className="w-3 h-3" />
                            Stripe Climate Member
                        </a>
                        <p className="text-[10px] text-neutral-400 max-w-md mx-auto leading-relaxed">
                            Acosta AI automatically contributes 5% of revenue to carbon removal via the Stripe Climate Program. 
                            We help fund emerging technologies like direct air capture and enhanced weathering to fight climate change.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
