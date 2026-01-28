
export const FEATURE_FLAGS = {
  AI_STRATEGY: true,
  HEATMAP_TOOL: true,
  ADVANCED_ANALYTICS: true,
  SENTIMENT_VOICE: true,
  AGENCY_PROSPECTOR: true,
  REQUEST_AUTOMATION: true
};

export type FeatureFlag = keyof typeof FEATURE_FLAGS;

export const isFeatureEnabled = (flag: FeatureFlag): boolean => {
  return FEATURE_FLAGS[flag];
};
