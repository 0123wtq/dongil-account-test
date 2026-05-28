import { mockProvider } from './mock';
import type { PaymentProvider } from './types';

export const payments: PaymentProvider = mockProvider;
export type { PaymentRequest, PaymentResult, PaymentProvider } from './types';
