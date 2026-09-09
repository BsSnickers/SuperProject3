import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, RotateCcw, ArrowRight, BookOpen } from 'lucide-react';
import { Lesson } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';

interface LessonResultViewProps {
  lesson: Lesson;
  scorePercent: number;
  correctAnswers: number;
  totalQuestions: number;
  onRetry: () => void;
  onNextLesson: (nextLessonId: string) => void;
  onGoToCatalog: () => void;
}

export const LessonResultView: React.FC<LessonResultViewProps> = ({
  lesson,
  scorePercent,
  correctAnswers,
  totalQuestions,
  onRetry,
  onNextLesson,
  onGoToCatalog,
}) => {
  const isPassed = scorePercent >= lesson.passThreshold;
  const nextLesson = LESSONS_DATA.find((l) => l.number === lesson.number + 1 && !l.isComingSoon);

  useEffect(() => {
    if (isPassed) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#EF1B2D', '#0B1F3A', '#10B981'],
      });
    }
  }, [isPassed]);

  return (
    <div
      id="lesson-result-view"
      className="min-h-screen bg-[#F4F6F8] dark:bg-[#070D18] flex items-center justify-center p-4 md:p-6 font-sans text-[#0B1F3A] dark:text-[#F4F6F8] transition-colors"
    >
      <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 md:p-10 max-w-lg w-full flex flex-col gap-6 shadow-xl">
        {/* Top Status Header */}
        <div className="text-center flex flex-col items-center gap-3 pb-6 border-b border-slate-200/80 dark:border-slate-800">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xs ${
              isPassed
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
            }`}
          >
            {isPassed ? <Award className="w-8 h-8" /> : <RotateCcw className="w-8 h-8" />}
          </div>

          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#94A3B8]">
              Модуль #{lesson.number}: {lesson.titleDe}
            </span>
            <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0B1F3A] dark:text-white mt-1">
              {isPassed ? 'Модуль успешно сдан!' : 'Требуется повторение'}
            </h1>
            <p className="text-xs md:text-sm text-[#94A3B8] font-medium mt-1">
              {isPassed
                ? `Отличный результат! Вы набрали ${scorePercent}% при проходном пороге ${lesson.passThreshold}%.`
                : `Вы набрали ${scorePercent}%. Необходимый порог для зачета — ${lesson.passThreshold}%.`}
            </p>
          </div>
        </div>

        {/* Score Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 bg-[#F4F6F8] dark:bg-[#111C2E] rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#94A3B8]">Результат</div>
            <div
              className={`font-heading font-extrabold text-2xl mt-1 ${
                isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#0B1F3A] dark:text-white'
              }`}
            >
              {scorePercent}%
            </div>
          </div>

          <div className="p-4 bg-[#F4F6F8] dark:bg-[#111C2E] rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#94A3B8]">Правильно</div>
            <div className="font-heading font-extrabold text-2xl text-[#0B1F3A] dark:text-white mt-1">
              {correctAnswers}/{totalQuestions}
            </div>
          </div>

          <div className="p-4 bg-[#F4F6F8] dark:bg-[#111C2E] rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#94A3B8]">Порог сдачи</div>
            <div className="font-heading font-extrabold text-2xl text-[#3B82F6] mt-1">
              {lesson.passThreshold}%
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col gap-2.5 pt-2">
          {isPassed && nextLesson ? (
            <button
              id="result-next-lesson-btn"
              onClick={() => onNextLesson(nextLesson.id)}
              className="w-full py-3 px-4 bg-[#0B1F3A] hover:bg-[#152e54] text-white text-xs md:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Следующий модуль (#{nextLesson.number})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="result-retry-btn"
              onClick={onRetry}
              className="w-full py-3 px-4 bg-[#0B1F3A] hover:bg-[#152e54] text-white text-xs md:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Пройти модуль заново</span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2.5">
            {isPassed && (
              <button
                onClick={onRetry}
                className="py-2.5 px-3 bg-[#F4F6F8] dark:bg-[#111C2E] hover:bg-slate-200 dark:hover:bg-slate-800 text-[#0B1F3A] dark:text-white text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700/80 transition-colors text-center cursor-pointer"
              >
                Повторить
              </button>
            )}

            <button
              id="result-catalog-btn"
              onClick={onGoToCatalog}
              className={`py-2.5 px-3 bg-[#F4F6F8] dark:bg-[#111C2E] hover:bg-slate-200 dark:hover:bg-slate-800 text-[#0B1F3A] dark:text-white text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700/80 transition-colors text-center cursor-pointer ${
                !isPassed ? 'col-span-2' : ''
              }`}
            >
              В каталог модулей →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
