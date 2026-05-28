export interface PaymentRequest {
  amount: number;
  productName: string;
  orderId: string;
}

export interface PaymentResult {
  success: boolean;
  provider: string;
  orderId: string;
}

export interface PaymentProvider {
  name: string;
  requestPayment(req: PaymentRequest): Promise<PaymentResult>;
}
