import type { RiskArea } from './types';

export interface Question {
  id: number;
  text: string;
  weights: Partial<Record<RiskArea, number>>;
}

export const QUESTIONS: Question[] = [
  { id: 1, text: '장 시작 직후 급등 종목을 보고 바로 매수한 적이 있다.',
    weights: { chase: 1.2, fomo: 0.4 } },
  { id: 2, text: '수익이 나면 불안해서 빨리 팔고 싶다.',
    weights: { novice: 1.0, neglect: 0.2 } },
  { id: 3, text: '손실이 나면 언젠가 오르겠지 하고 오래 들고 간다.',
    weights: { neglect: 1.3 } },
  { id: 4, text: '매수 전에 2차, 3차 매수 구간을 정하지 않는다.',
    weights: { split: 1.3 } },
  { id: 5, text: '계좌에 현금이 거의 남아 있지 않은 상태로 매매한다.',
    weights: { cash: 1.3, split: 0.3 } },
  { id: 6, text: '남들이 수익 인증하면 나도 따라 사고 싶어진다.',
    weights: { fomo: 1.3 } },
  { id: 7, text: 'ETF보다 한 방 크게 오를 종목이 더 끌린다.',
    weights: { etf_avoid: 1.3, fomo: 0.3 } },
  { id: 8, text: '내가 왜 이 종목을 샀는지 한 문장으로 설명하기 어렵다.',
    weights: { novice: 0.8, fomo: 0.4, chase: 0.3 } },
  { id: 9, text: '조정장이 오면 추가매수보다 불안감이 먼저 든다.',
    weights: { novice: 1.0, split: 0.5, cash: 0.3 } },
  { id: 10, text: '혼자 매매하다가 장중에 판단이 자주 흔들린다.',
    weights: { novice: 1.0 } },
];

export const SCALE_OPTIONS = [
  { value: 1, label: '전혀 아니다' },
  { value: 2, label: '가끔 그렇다' },
  { value: 3, label: '자주 그렇다' },
  { value: 4, label: '거의 항상 그렇다' },
];
