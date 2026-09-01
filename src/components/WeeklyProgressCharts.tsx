import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Cell,
} from 'recharts';
import { UserProfile, LessonProgress } from '../types';
import { calculateRealAnalytics, RealAnalyticsSummary } from '../utils/analytics';

interface WeeklyProgressChartsProps {
  profile: UserProfile | null;
  progress: Record<string, LessonProgress>;
}

export const WeeklyProgressCharts: React.FC<WeeklyProgressChartsProps> = ({
  profile,
  progress,
}) => {
  const analytics: RealAnalyticsSummary = useMemo(() => {
    return calculateRealAnalytics(profile, progress);
  }, [profile, progress]);

  const {
    moduleData,
    totalWordsLearned,
    passedLessonsCount,
    totalLessonsCount,
    totalQuestionsSolved,
    totalQuestionsAttempted,
    hasAnyAttempt,
    avgScore,
  } = analytics;

  // Custom Editorial Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = moduleData.find((m) => m.moduleShort === label);
      return (
        <div className="bg-[#09090B] text-white p-3.5 border border-zinc-700 shadow-xl font-mono text-xs max-w-xs">
          <div className="text-[10px] uppercase text-zinc-400 border-b border-zinc-800 pb-1.5 mb-2">
            [{item?.moduleFull || label}]
          </div>
          <div className="text-[11px] text-zinc-300 mb-2">
            Ступень: <span className="text-white font-bold">{item?.difficulty}</span> • Статус:{' '}
            <span
              className={`font-bold ${
                item?.status === 'passed'
                  ? 'text-emerald-400'
                  : item?.status === 'failed'
                  ? 'text-amber-400'
                  : 'text-zinc-400'
              }`}
            >
              {item?.status === 'passed'
                ? 'Сдано'
                : item?.status === 'failed'
                ? 'Не сдано'
                : 'Не начато'}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <span className="text-zinc-300 text-[11px]">{entry.name}:</span>
                <span className="font-bold text-white text-xs">
                  {entry.value}
                  {entry.unit || ''}
                </span>
              </div>
            ))}
          </div>
          {item && (
            <div className="mt-2 pt-1.5 border-t border-zinc-800 text-[10px] text-zinc-400 flex justify-between">
              <span>Слов в уроке: {item.newWords}</span>
              <span>Попыток: {item.attemptsCount}</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div id="module-progress-charts" className="border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8 flex flex-col gap-8 transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
            [Аналитика успеваемости • Модульный срез A1]
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-zinc-950 dark:text-white font-normal">
            Результаты тестирования по модулям
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans mt-1">
            {hasAnyAttempt
              ? `График успеваемости по всем ${totalLessonsCount} модулям курса Goethe-Zertifikat A1 (сдано ${passedLessonsCount} из ${totalLessonsCount}).`
              : 'Пройдите ваш первый модуль A1, чтобы активировать персональную графическую аналитику.'}
          </p>
        </div>
      </div>

      {/* 4 KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 font-mono text-center">
        <div className="bg-[#FAFAFA] dark:bg-zinc-900 p-4">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Сдано модулей</div>
          <div className="font-serif text-2xl font-normal text-zinc-950 dark:text-white mt-1">
            {passedLessonsCount} <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">из {totalLessonsCount}</span>
          </div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            {passedLessonsCount > 0 ? `${Math.round((passedLessonsCount / totalLessonsCount) * 100)}% курса завершено` : 'Старт курса'}
          </div>
        </div>

        <div className="bg-[#FAFAFA] dark:bg-zinc-900 p-4">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Словарный запас</div>
          <div className="font-serif text-2xl font-normal text-zinc-950 dark:text-white mt-1">
            {totalWordsLearned} <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">слов</span>
          </div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            {hasAnyAttempt ? 'Изучено в модулях' : 'Ожидает 1-го теста'}
          </div>
        </div>

        <div className="bg-[#FAFAFA] dark:bg-zinc-900 p-4">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Средний результат</div>
          <div className="font-serif text-2xl font-normal text-[#0033CC] dark:text-blue-400 mt-1">
            {avgScore}%
          </div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            {hasAnyAttempt ? 'По сданным тестам' : 'Нет данных'}
          </div>
        </div>

        <div className="bg-[#FAFAFA] dark:bg-zinc-900 p-4">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Решено вопросов</div>
          <div className="font-serif text-2xl font-normal text-zinc-950 dark:text-white mt-1">
            {totalQuestionsSolved} <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">задач</span>
          </div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            из {totalQuestionsAttempted || totalQuestionsSolved} попыток
          </div>
        </div>
      </div>

      {!hasAnyAttempt && (
        <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 p-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 text-center flex flex-col gap-1">
          <div className="font-bold text-zinc-950 dark:text-white uppercase text-[11px]">
            [Информационная панель]
          </div>
          <p className="font-sans text-xs text-zinc-600 dark:text-zinc-400">
            Вы еще не проходили тесты. Пройдите первый модуль в каталоге уроков, чтобы график автоматически заполнился вашими реальными результатами.
          </p>
        </div>
      )}

      {/* Main Chart Rendering Box */}
      <div className="w-full h-80 pt-2 font-mono text-xs overflow-x-auto">
        <ResponsiveContainer width="100%" height="100%" minWidth={600}>
          <BarChart data={moduleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3F3F46" opacity={0.3} vertical={false} />
            <XAxis
              dataKey="moduleShort"
              stroke="#71717A"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#52525B' }}
            />
            <YAxis
              stroke="#71717A"
              fontSize={11}
              domain={[0, 100]}
              unit="%"
              tickLine={false}
              axisLine={{ stroke: '#52525B' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: '16px', fontSize: '11px', fontFamily: 'monospace' }}
            />
            <ReferenceLine
              y={70}
              stroke="#EF4444"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: 'Порог 70%',
                position: 'insideTopLeft',
                fill: '#EF4444',
                fontSize: 10,
                fontFamily: 'monospace',
              }}
            />
            <Bar
              dataKey="scorePercent"
              name="Результат теста"
              unit="%"
              radius={[2, 2, 0, 0]}
            >
              {moduleData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.isPassed
                      ? '#10B981'
                      : entry.status === 'failed'
                      ? '#F59E0B'
                      : '#71717A'
                  }
                  opacity={entry.status === 'not_started' ? 0.35 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend / Status indicator strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-emerald-500 inline-block" />
            <span>Сдано (&ge; 70%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-amber-500 inline-block" />
            <span>Не сдан (&lt; 70%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-zinc-500/40 inline-block" />
            <span>Не начато</span>
          </div>
        </div>
        <div className="text-[10px] text-zinc-400">
          M01–M12: Ступень A1.1 • M13–M24: Ступень A1.2
        </div>
      </div>
    </div>
  );
};

