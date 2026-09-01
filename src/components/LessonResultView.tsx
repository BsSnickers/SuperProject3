import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
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
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0033CC', '#000000', '#71717A'],
      });
    }
  }, [isPassed]);

  return (
    <div id="lesson-result-view" className="min-h-screen bg-[#F8F9FA] dark:bg-[#09090B] flex items-center justify-center p-6 font-sans transition-colors">
      <div className="border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 md:p-12 max-w-lg w-full flex flex-col gap-8 shadow-2xl">
        {/* Top Status Header */}
        <div className="text-center flex flex-col gap-2 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            [Протокол тестирования • Модуль #{lesson.number}]
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-zinc-950 dark:text-white">
            {isPassed ? 'Модуль успешно сдан.' : 'Требуется повторение.'}
          </h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans mt-1">
            {isPassed
              ? `Вы набрали ${scorePercent}% и подтвердили порог ${lesson.passThreshold}%.`
              : `Текущий результат ${scorePercent}%. Необходимый порог для зачета — ${lesson.passThreshold}%.`}
          </p>
        </div>

        {/* Score Grid: Architectural Data Box */}
        <div className="grid grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 font-mono text-center">
          <div className="bg-[#FAFAFA] dark:bg-zinc-950 p-4">
            <div className="text-[9px] uppercase tracking-wider text-zinc-400">Результат</div>
            <div className="font-serif text-2xl font-normal text-zinc-950 dark:text-white mt-1">
              {scorePercent}%
            </div>
          </div>
          <div className="bg-[#FAFAFA] dark:bg-zinc-950 p-4">
            <div className="text-[9px] uppercase tracking-wider text-zinc-400">Правильно</div>
            <div className="font-serif text-2xl font-normal text-zinc-950 dark:text-white mt-1">
              {correctAnswers}/{totalQuestions}
            </div>
          </div>
          <div className="bg-[#FAFAFA] dark:bg-zinc-950 p-4">
            <div className="text-[9px] uppercase tracking-wider text-zinc-400">Порог</div>
            <div className="font-serif text-2xl font-normal text-zinc-600 dark:text-zinc-400 mt-1">
              {lesson.passThreshold}%
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col gap-2 font-mono text-xs">
          {isPassed && nextLesson ? (
            <button
              id="result-next-lesson-btn"
              onClick={() => onNextLesson(nextLesson.id)}
              className="w-full py-3.5 px-4 bg-black dark:bg-[#0033CC] hover:bg-[#0033CC] dark:hover:bg-blue-500 text-white uppercase tracking-wider font-bold transition-colors border border-black dark:border-blue-600 text-center cursor-pointer"
            >
              Следующий модуль (#{nextLesson.number}) →
            </button>
          ) : (
            <button
              id="result-retry-btn"
              onClick={onRetry}
              className="w-full py-3.5 px-4 bg-black dark:bg-zinc-100 hover:bg-[#0033CC] dark:hover:bg-blue-600 text-white dark:text-zinc-950 dark:hover:text-white uppercase tracking-wider font-bold transition-colors border border-black dark:border-zinc-100 text-center cursor-pointer"
            >
              Повторить тестирование ↺
            </button>
          )}

          <div className="grid grid-cols-2 gap-2 pt-2">
            {isPassed && (
              <button
                onClick={onRetry}
                className="py-2.5 px-3 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 uppercase tracking-wider border border-zinc-300 dark:border-zinc-700 transition-colors text-center cursor-pointer"
              >
                Повторить
              </button>
            )}

            <button
              id="result-catalog-btn"
              onClick={onGoToCatalog}
              className={`py-2.5 px-3 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 uppercase tracking-wider border border-zinc-300 dark:border-zinc-700 transition-colors text-center cursor-pointer ${
                !isPassed ? 'col-span-2' : ''
              }`}
            >
              Каталог уроков →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
