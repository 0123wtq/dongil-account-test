export const SITE = {
  brand: '돈길 계좌체력 진단',
  reportPrice: 990,
  reportProductName: '돈길 계좌체력 상세 리포트',
  membershipPrice: 30000,
  membershipProductName: '돈길 계좌체력 멤버십',
};

export function getMembershipUrl(): string {
  return process.env.NEXT_PUBLIC_MEMBERSHIP_APPLY_URL || '#';
}

export function getKakaoUrl(): string {
  return process.env.NEXT_PUBLIC_KAKAO_CONTACT_URL || '#';
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://dongil-account-test.vercel.app';
}
