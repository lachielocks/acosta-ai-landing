
export enum AppMode {
  HOME = 'HOME',
  POLICIES = 'POLICIES',
  PRICING = 'PRICING',
}

export type PlanTier = 'free' | 'go' | 'max';

export interface UserProfile {
    name: string;
    yearLevel: string;
    location: string;
    liquidEnabled: boolean;
    spotlightEnabled: boolean;
    inactivityTimeoutMinutes: number;
    subjects: string[];
    learningMode: boolean;
    memoryEnabled: boolean;
    isSupporter?: boolean;
    isFounder?: boolean;
}
