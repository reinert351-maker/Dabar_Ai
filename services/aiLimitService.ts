
const QUOTA_KEY_PREFIX = 'dabar_ai_quota_';

export const aiLimitService = {
  canUseFeature(featureId: string): boolean {
    const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const lastUsed = localStorage.getItem(`${QUOTA_KEY_PREFIX}${featureId}`);
    return lastUsed !== today;
  },

  recordUsage(featureId: string): void {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`${QUOTA_KEY_PREFIX}${featureId}`, today);
  },

  getRemainingMessage(featureId: string): string | null {
    if (!this.canUseFeature(featureId)) {
      return "Limite diário de IA atingido para esta função. Tente novamente amanhã.";
    }
    return null;
  }
};
