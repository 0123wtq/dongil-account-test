import type { PaymentProvider } from './types';

export const mockProvider: PaymentProvider = {
  name: 'mock',
  async requestPayment({ orderId }) {
    await new Promise((r) => setTimeout(r, 350));
    return { success: true, provider: 'mock', orderId };
  },
};
