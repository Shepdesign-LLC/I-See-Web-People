/**
 * Type definitions for "I See Web People" Product Strategy Studio
 */

export type PlatformType = 'wordpress' | 'pwa' | 'native';

export interface PlatformConcept {
  id: PlatformType;
  title: string;
  tagline: string;
  verdictBadge: string;
  speedToMarket: string;
  distributionChannel: string;
  monetizationModel: string;
  primaryAudience: string;
  pros: string[];
  cons: string[];
  coreTechStack: string[];
  killerFeatures: {
    title: string;
    description: string;
    impact: string;
  }[];
  architectureSummary: string;
}

export interface VisitorSession {
  id: string;
  siteId: string;
  siteName: string;
  visitorLabel: string;
  city: string;
  country: string;
  flag: string;
  device: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  currentPath: string;
  durationSeconds: number;
  status: 'active' | 'idle' | 'ghost_form' | 'rage_clicking' | 'converted';
  cartValue?: number;
  rageClicksCount?: number;
  ghostField?: string;
  ghostValuePreview?: string;
  lastAction: string;
  timeAgo: string;
}

export interface ManagedSite {
  id: string;
  name: string;
  domain: string;
  platform: 'WordPress' | 'Shopify' | 'Next.js' | 'Webflow';
  activeVisitors: number;
  healthStatus: 'healthy' | 'attention_needed' | 'high_traffic';
  lastRageClick?: string;
  ghostFormsSavedToday: number;
}

export interface PluginSettings {
  adminBarTicker: boolean;
  ghostFormCapture: boolean;
  rageClickDetection: boolean;
  visitorWelcomeToast: boolean;
  privacyStrictGdpr: boolean;
  anonymizeIp: boolean;
  alertThresholdValue: number;
  slackWebhookUrl: string;
}

export interface WizardAnswers {
  primaryGoal: 'agency_value' | 'saas_revenue' | 'free_brand_building';
  targetAudience: 'wp_users' | 'mixed_clients' | 'mobile_first';
  teamCapacity: 'solo_builder' | 'small_team' | 'funded';
  monetizationPreference: 'one_time' | 'recurring_saas' | 'agency_retainer';
}

export interface RecommendationResult {
  recommendedPlatform: PlatformType;
  secondaryPlatform: PlatformType;
  confidenceScore: number;
  reasoning: string[];
  suggestedRoadmap: {
    phase: string;
    timeline: string;
    deliverable: string;
  }[];
}
