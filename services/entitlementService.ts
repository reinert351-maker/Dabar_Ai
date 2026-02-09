
import { Entitlement } from '../types';

const CACHE_KEY = 'dabar_entitlement_v1';
const GRACE_PERIOD_MS = 7 * 24 * 60 * 60 * 1000; // 7 dias

export const entitlementService = {
  getStoredEntitlement(): Entitlement | null {
    const saved = localStorage.getItem(CACHE_KEY);
    return saved ? JSON.parse(saved) : null;
  },

  cacheEntitlement(entitlement: Entitlement) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entitlement));
  },

  isPremiumActive(entitlement: Entitlement | null | undefined): boolean {
    if (!entitlement) return false;
    
    const now = Date.now();
    // Lógica Offline-First: Se o status for ACTIVE ou se estivermos dentro do Grace Period
    const isWithinGracePeriod = now < (entitlement.validUntil + GRACE_PERIOD_MS);
    
    return (entitlement.status === 'ACTIVE' || entitlement.status === 'PAST_DUE') && isWithinGracePeriod;
  },

  async syncWithServer(userId: string): Promise<Entitlement | null> {
    if (!navigator.onLine) return this.getStoredEntitlement();

    try {
      // Simulação de chamada ao Firebase Cloud Function
      // const response = await fetch(`/api/me/entitlement?uid=${userId}`);
      // const data = await response.json();
      
      // Mock de resposta para demonstração
      const mockData: Entitlement = {
        status: 'ACTIVE',
        validUntil: Date.now() + 30 * 24 * 60 * 60 * 1000,
        lastCheckedAt: Date.now(),
        planType: 'monthly'
      };
      
      this.cacheEntitlement(mockData);
      return mockData;
    } catch (e) {
      console.error("Sync entitlement failed, falling back to cache", e);
      return this.getStoredEntitlement();
    }
  }
};
