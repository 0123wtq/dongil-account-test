'use client';

import type { ScoreResult, AnswerSet } from './types';

const KEYS = {
  answers: 'dongil:answers',
  result: 'dongil:result',
  unlocked: 'dongil:report-unlocked',
} as const;

function safeGet<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function safeSet(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export const storage = {
  saveAnswers(a: AnswerSet) { safeSet(KEYS.answers, a); },
  loadAnswers() { return safeGet<AnswerSet>(KEYS.answers); },
  saveResult(r: ScoreResult) { safeSet(KEYS.result, r); },
  loadResult() { return safeGet<ScoreResult>(KEYS.result); },
  setUnlocked(v: boolean) { safeSet(KEYS.unlocked, v); },
  isUnlocked() { return safeGet<boolean>(KEYS.unlocked) === true; },
  reset() {
    if (typeof window === 'undefined') return;
    Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
  },
};
