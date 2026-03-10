
export type UsageFeature = 'search' | 'thinking' | 'image_gen' | 'analysis' | 'exam_sim' | 'study_tools';
export type PlanTier = 'free' | 'go' | 'max';

interface UsageCounts {
    search: number;
    thinking: number;
    study_tools: number;
    image_gen: number;
    analysis: number;
    exam_sim: number;
    isSupporter?: boolean;
    boosts?: {
        [key: string]: number;
    };
    lastReset?: number;
    [key: string]: any;
}

export interface SubscriptionDetails {
    renewDate: Date | null;
    cardBrand: string | null;
    cardLast4: string | null;
    cancelAtPeriodEnd: boolean;
    subscriptionCreated: number | null;
}

const usageListeners = new Set<() => void>();

export const TOP_UPS = {
    exam_sim: { id: 'exam_sim', name: 'Exam Pack', credits: 10, price: '$5' },
    image_gen: { id: 'image_gen', name: 'Image Pack', credits: 25, price: '$5' },
    analysis: { id: 'analysis', name: 'Analysis Pack', credits: 25, price: '$5' },
    thinking: { id: 'thinking', name: 'Thinking Pack', credits: 50, price: '$5' },
    study_tools: { id: 'study_tools', name: 'Study Pack', credits: 50, price: '$5' },
    search: { id: 'search', name: 'Search Pack', credits: 500, price: '$5' }
};

export const PERKS = {
    supporter: {
        id: 'supporter',
        name: 'Supporter Badge',
        price: 'Choose your price',
        image: 'https://i.ibb.co/5pqY59b/Supporter.png'
    }
};

export const PLANS = {
    FREE: {
        id: 'free',
        name: 'Acosta AI Free',
        price: '$0',
        limits: { search: 500, thinking: 10, study_tools: 10, image_gen: 10, analysis: 5, exam_sim: 1 }
    },
    GO: {
        id: 'go',
        name: 'Acosta AI Go',
        price: '$10',
        priceAnnual: '$105',
        limits: { search: 'Unlimited', thinking: 50, study_tools: 50, image_gen: 50, analysis: 30, exam_sim: 10 }
    },
    MAX: {
        id: 'max',
        name: 'Acosta AI Max',
        price: '$30',
        priceAnnual: '$315',
        limits: { search: 'Unlimited', thinking: 'Unlimited', study_tools: 'Unlimited', image_gen: 'Unlimited', analysis: 'Unlimited', exam_sim: 'Unlimited' }
    }
};

let currentTier: PlanTier = 'free';
let localUsageCache: UsageCounts = { search: 0, thinking: 0, study_tools: 0, image_gen: 0, analysis: 0, exam_sim: 0, boosts: {} };
let localSubDetails: SubscriptionDetails = { renewDate: null, cardBrand: null, cardLast4: null, cancelAtPeriodEnd: false, subscriptionCreated: null };

export const SubscriptionService = {
    getCurrentTier: () => currentTier,
    getSubscriptionDetails: () => localSubDetails,
    setPricingTab: () => {},
    getPricingTab: () => 'plans',
    
    init: (callback?: (tier: PlanTier) => void) => {
        if (callback) callback(currentTier);
        return () => {};
    },

    getCounts: (): UsageCounts => localUsageCache,
    
    increment: async (feature: UsageFeature) => {
        localUsageCache[feature] = (localUsageCache[feature] || 0) + 1;
        usageListeners.forEach(l => l());
    },

    onUsageUpdate: (callback: () => void) => {
        usageListeners.add(callback);
        return () => usageListeners.delete(callback);
    },

    getPlanLimit: (feature: UsageFeature): number | 'Unlimited' => {
        const plan = PLANS[currentTier.toUpperCase() as keyof typeof PLANS];
        // @ts-ignore
        return plan.limits?.[feature] || 0;
    },

    getBoostBalance: (feature: UsageFeature): number => localUsageCache.boosts?.[feature] || 0,

    isOverLimit: (feature: UsageFeature): boolean => {
        const limit = SubscriptionService.getPlanLimit(feature);
        if (limit === 'Unlimited') return false;
        return (localUsageCache[feature] || 0) >= (limit as number);
    },

    getLimitMessage: () => "You've hit your plan limit. Upgrade your plan to continue.",
    
    getUsageString: (feature: UsageFeature): string => {
        const limit = SubscriptionService.getPlanLimit(feature);
        const used = localUsageCache[feature] || 0;
        if (limit === 'Unlimited') return 'Unlimited';
        return `${used} / ${limit}`;
    },

    subscribeToPlan: async (tier?: string, isAnnual?: boolean) => alert("Subscribing is disabled in this demo."),
    buyTopUp: async (featureId?: string) => alert("Purchasing is disabled in this demo."),
    buyPerk: async (perkId?: string) => alert("Purchasing is disabled in this demo."),
    debugAddCredits: async (feature: UsageFeature, amount: number) => {
        localUsageCache.boosts = localUsageCache.boosts || {};
        localUsageCache.boosts[feature] = (localUsageCache.boosts[feature] || 0) + amount;
        usageListeners.forEach(l => l());
    },
    getPortalLink: async () => alert("Billing portal is disabled in this demo.")
};
