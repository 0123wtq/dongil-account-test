import type { ScoreResult, ResultTypeId, RiskScores, RiskArea } from './types';
import { QUESTIONS } from './questions';

const TYPE_NAMES: Record<ResultTypeId, string> = {
  chase: '장초반 추격매수형',
  neglect: '손실방치형',
  allin: '몰빵체력부족형',
  fomo: 'FOMO추종형',
  etf_avoid: 'ETF회피형',
  novice: '초보불안형',
};

const TOP_RISK_LABEL: Record<ResultTypeId, string> = {
  chase: '장 초반 추격매수',
  neglect: '손실 종목 방치',
  allin: '현금 비중 0의 몰빵 매매',
  fomo: '남 따라가는 FOMO 매수',
  etf_avoid: '한 방 종목 편식',
  novice: '장중 판단 흔들림',
};

const SHORT_DIAGNOSIS: Record<ResultTypeId, string[]> = {
  chase: [
    '아침에 빨간 봉을 보면 “안 사면 놓칠 것 같아서” 손이 먼저 움직입니다.',
    '문제는 한 번 맞추는 것보다, 평균단가가 늘 위에 박혀서 계좌가 흔들린다는 점입니다.',
    '지금 필요한 건 더 빠른 손가락이 아니라, 매수 버튼 누르기 전 멈추는 기준입니다.',
  ],
  neglect: [
    '손실 종목을 “언젠가는 오르겠지” 하며 그대로 묻어두는 패턴이 강합니다.',
    '문제는 시간이 손실을 풀어주는 게 아니라, 그 자금이 다른 기회까지 같이 묶어버린다는 점입니다.',
    '지금 필요한 건 더 많은 인내심이 아니라, 손절 기준이 적힌 한 줄입니다.',
  ],
  allin: [
    '좋은 종목을 발견하면 한 번에 풀매수로 들어가는 성향이 보입니다.',
    '문제는 한 번 맞추는 것보다, 가격이 빠질 때 추가매수 할 현금이 0원이라는 점입니다.',
    '지금 필요한 건 더 좋은 종목이 아니라, 계좌를 오래 버티게 하는 현금 비중입니다.',
  ],
  fomo: [
    '남들이 수익 인증하면 따라 사고 싶은 마음이 강해서, 매수 이유가 늘 “남”에서 출발합니다.',
    '문제는 한 번 맞추는 것보다, 가격이 빠질 때 들고 있을 근거가 없다는 점입니다.',
    '지금 필요한 건 더 빠른 정보가 아니라, 매수 이유를 한 문장으로 쓸 수 있는 기준입니다.',
  ],
  etf_avoid: [
    '수익을 크게 내고 싶은 마음이 강해서 안정적인 누적보다 급등 종목에 끌리기 쉽습니다.',
    '문제는 한 번 맞추는 것보다, 틀렸을 때 1년치 수익이 한 종목에서 다 빠진다는 점입니다.',
    '지금 필요한 건 더 센 종목이 아니라, 계좌를 오래 버티게 하는 분산 기준입니다.',
  ],
  novice: [
    '수익이 나도, 손실이 나도, 조정장이 와도 일단 불안한 마음이 큽니다.',
    '문제는 실력 부족이 아니라, 장중에 의지할 기준이 없다는 점입니다.',
    '지금 필요한 건 더 많은 정보가 아니라, 매수 전에 종이에 적어둘 기준 한 줄입니다.',
  ],
};

export function calcRiskScores(answers: number[]): RiskScores {
  const raw: Record<RiskArea, number> = {
    chase: 0, neglect: 0, cash: 0, split: 0, fomo: 0, etf_avoid: 0, novice: 0,
  };
  const max: Record<RiskArea, number> = {
    chase: 0, neglect: 0, cash: 0, split: 0, fomo: 0, etf_avoid: 0, novice: 0,
  };

  QUESTIONS.forEach((q, i) => {
    const a = Math.max(0, (answers[i] ?? 1) - 1);
    for (const [area, w] of Object.entries(q.weights)) {
      raw[area as RiskArea] += a * (w as number);
      max[area as RiskArea] += 3 * (w as number);
    }
  });

  const norm = (k: RiskArea) =>
    max[k] === 0 ? 0 : Math.round((raw[k] / max[k]) * 100);

  return {
    chase: norm('chase'),
    neglect: norm('neglect'),
    cash: norm('cash'),
    split: norm('split'),
    fomo: norm('fomo'),
    etfAvoid: norm('etf_avoid'),
    novice: norm('novice'),
  };
}

export function calcScore(answers: number[]): ScoreResult {
  const risks = calcRiskScores(answers);

  const candidates: { id: ResultTypeId; score: number }[] = [
    { id: 'chase', score: risks.chase },
    { id: 'neglect', score: risks.neglect },
    { id: 'allin', score: risks.cash * 0.7 + risks.split * 0.3 },
    { id: 'fomo', score: risks.fomo },
    { id: 'etf_avoid', score: risks.etfAvoid },
    { id: 'novice', score: risks.novice },
  ];
  candidates.sort((a, b) => b.score - a.score);
  const typeId = candidates[0].id;

  const avgRisk =
    (risks.chase + risks.neglect + risks.cash + risks.split + risks.fomo +
      risks.etfAvoid + risks.novice) / 7;
  const fitnessScore = Math.max(10, Math.min(95, Math.round(100 - avgRisk)));

  return {
    typeId,
    typeName: TYPE_NAMES[typeId],
    fitnessScore,
    topRiskLabel: TOP_RISK_LABEL[typeId],
    shortDiagnosis: SHORT_DIAGNOSIS[typeId],
    risks,
  };
}
