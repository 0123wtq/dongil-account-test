'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QUESTIONS, SCALE_OPTIONS } from '@/lib/questions';
import { calcScore } from '@/lib/scoring';
import { storage } from '@/lib/storage';
import { ProgressBar } from '@/components/ProgressBar';

export default function TestPage() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  useEffect(() => {
    const saved = storage.loadAnswers();
    if (saved && saved.answers.length > 0 && saved.answers.length < QUESTIONS.length) {
      setAnswers(saved.answers);
      setIdx(saved.answers.length);
    }
  }, []);

  const pick = (value: number) => {
    const next = [...answers];
    next[idx] = value;
    setAnswers(next);

    if (idx + 1 < QUESTIONS.length) {
      setIdx(idx + 1);
      storage.saveAnswers({ answers: next, completedAt: 0 });
    } else {
      const result = calcScore(next);
      storage.saveAnswers({ answers: next, completedAt: Date.now() });
      storage.saveResult(result);
      router.push('/result');
    }
  };

  const q = QUESTIONS[idx];

  return (
    <main className="flex flex-col gap-8">
      <ProgressBar current={idx + 1} total={QUESTIONS.length} />

      <div>
        <p className="text-gold text-sm font-bold mb-3 tracking-widest">Q{idx + 1}.</p>
        <h2 className="heading-md">{q.text}</h2>
      </div>

      <div className="flex flex-col gap-3">
        {SCALE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => pick(opt.value)}
            className="w-full text-left rounded-2xl border-2 border-line bg-black/30 px-5 py-4 hover:border-gold/60 transition-colors"
          >
            <span className="text-gold font-bold mr-3">{opt.value}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      {idx > 0 && (
        <button
          onClick={() => setIdx(idx - 1)}
          className="text-sm text-muted hover:text-ink self-start"
        >
          ← 이전 문항
        </button>
      )}
    </main>
  );
}
