export type RiskArea =
  | 'chase'
  | 'neglect'
  | 'cash'
  | 'split'
  | 'fomo'
  | 'etf_avoid'
  | 'novice';

export type ResultTypeId =
  | 'chase'
  | 'neglect'
  | 'allin'
  | 'fomo'
  | 'etf_avoid'
  | 'novice';

export interface AnswerSet {
  answers: number[];
  completedAt: number;
}

export interface RiskScores {
  chase: number;
  neglect: number;
  cash: number;
  split: number;
  fomo: number;
  etfAvoid: number;
  novice: number;
}

export interface ScoreResult {
  typeId: ResultTypeId;
  typeName: string;
  fitnessScore: number;
  topRiskLabel: string;
  shortDiagnosis: string[];
  risks: RiskScores;
}

export interface RiskIndicator {
  label: string;
  level: number;
  comment?: string;
}

export interface ReportContent {
  typeId: ResultTypeId;
  typeName: string;
  oneLineDiagnosis: string;
  coreExplanation: string;
  topRisk: string;
  indicatorComments: Record<'chase' | 'neglect' | 'cash' | 'split' | 'fomo', string>;
  repeatedMistakes: string[];
  thisWeekBans: string[];
  preBuyChecklist: string[];
  oneLinePrescription: string;
  membershipPitch: string;
}
