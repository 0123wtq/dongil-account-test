// 사업자등록 완료 후 실결제로 교체할 위치.
// 현재 MVP에서는 사용하지 않으며, mock provider가 결제 흐름을 담당한다.
import type { PaymentProvider } from './types';

export const tossProvider: PaymentProvider = {
  name: 'toss',
  async requestPayment() {
    throw new Error('Toss Payments는 아직 연결되어 있지 않습니다.');
  },
};
