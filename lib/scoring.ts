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

const SHORT_DIAGNOSIS: Record<ResultTypeId, string> = {
  chase: '장 시작 30분 안에 누르는 손가락이 가장 위험합니다.',
  neglect: '손실은 시간이 해결해주는 게 아니라, 그대로 굳어집니다.',
  allin: '하체운동 안 된 계좌는 조정장 한 번이면 흔들립니다.',
  fomo: '남이 번 종목을 따라 사는 순간, 손실은 내 몫이 됩니다.',
  etf_avoid: '한 방을 노리는 매수가 계좌 변동성을 키우고 있습니다.',
  novice: '실력 문제가 아니라, 장중에 의지할 기준이 없는 겁니다.',
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
