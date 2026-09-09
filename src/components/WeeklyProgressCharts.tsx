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
import { BarChart3, CheckCircle2, BookOpen, Award, Layers } from 'lucide-react';

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
        <div className="bg-[#0B1526] text-white p-3.5 border border-slate-700 rounded-xl shadow-xl font-sans text-xs max-w-xs">
          <div className="text-[10px] uppercase font-mono text-slate-400 border-b border-slate-700 pb-1.5 mb-2 font-bold">
            {item?.moduleFull || label}
          </div>
          <div className="text-[11px] text-slate-300 mb-2">
            Ступень: <span className="text-white font-bold">{item?.difficulty}</span> • Статус:{' '}
            <span
              className={`font-bold ${
                item?.status === 'passed'
                  ? 'text-emerald-400'
                  : item?.status === 'failed'
                  ? 'text-amber-400'
                  : 'text-slate-400'
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
                <span className="text-slate-300 text-[11px]">{entry.name}:</span>
                <span className="font-bold text-white text-xs">
                  {entry.value}
                  {entry.unit || ''}
                </span>
              </div>
            ))}
          </div>
          {item && (
            <div className="mt-2 pt-1.5 border-t border-slate-700 text-[10px] text-slate-400 flex justify-between">
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
    <div id="module-progress-charts" className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-xs transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="font-heading font-bold text-xs uppercase tracking-widest text-[#3B82F6] mb-1 flex items-center gap-1.5">
            <BarChart3 size={14} />
            <span>Аналитика успеваемости • Модульный срез A1</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A] dark:text-white tracking-tight">
            Результаты тестирования по модулям
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#94A3B8] font-medium mt-1">
            {hasAnyAttempt
              ? `График успеваемости по всем ${totalLessonsCount} модулям курса Goethe-Zertifikat A1 (сдано ${passedLessonsCount} из ${totalLessonsCount}).`
              : 'Пройдите ваш первый модуль A1, чтобы активировать персональную графическую аналитику.'}
          </p>
        </div>
      </div>

      {/* 4 KPIs: 4 Rounded-xl metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-slate-50 dark:bg-[#111C2E] border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 flex flex-col">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] font-semibold">Сдано модулей</div>
          <div className="font-heading font-extrabold text-2xl text-[#0B1F3A] dark:text-white mt-1">
            {passedLessonsCount} <span className="text-xs text-slate-400 font-normal">из {totalLessonsCount}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-medium">
            {passedLessonsCount > 0 ? `${Math.round((passedLessonsCount / totalLessonsCount) * 100)}% курса завершено` : 'Старт курса'}
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-[#111C2E] border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 flex flex-col">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] font-semibold">Словарный запас</div>
          <div className="font-heading font-extrabold text-2xl text-[#0B1F3A] dark:text-white mt-1">
            {totalWordsLearned} <span className="text-xs text-slate-400 font-normal">слов</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-medium">
            {hasAnyAttempt ? 'Изучено в модулях' : 'Ожидает 1-го теста'}
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-[#111C2E] border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 flex flex-col">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] font-semibold">Средний результат</div>
          <div className="font-heading font-extrabold text-2xl text-[#3B82F6] mt-1">
            {avgScore}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-medium">
            {hasAnyAttempt ? 'По сданным тестам' : 'Нет данных'}
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-[#111C2E] border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 flex flex-col">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] font-semibold">Решено вопросов</div>
          <div className="font-heading font-extrabold text-2xl text-[#0B1F3A] dark:text-white mt-1">
            {totalQuestionsSolved} <span className="text-xs text-slate-400 font-normal">задач</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-medium">
            из {totalQuestionsAttempted || totalQuestionsSolved} попыток
          </div>
        </div>
      </div>

      {!hasAnyAttempt && (
        <div className="bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 p-4 rounded-xl text-xs text-slate-700 dark:text-slate-300 text-center flex flex-col gap-1">
          <div className="font-bold text-[#0B1F3A] dark:text-white text-xs">
            Информационная панель
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Вы еще не проходили тесты. Пройдите первый модуль в каталоге уроков, чтобы график автоматически заполнился вашими результатами.
          </p>
        </div>
      )}

      {/* Main Chart Rendering Box */}
      <div className="w-full h-80 pt-2 font-sans text-xs overflow-x-auto">
        <ResponsiveContainer width="100%" height="100%" minWidth={600}>
          <BarChart data={moduleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94A3B8" opacity={0.2} vertical={false} />
            <XAxis
              dataKey="moduleShort"
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#CBD5E1' }}
            />
            <YAxis
              stroke="#94A3B8"
              fontSize={11}
              domain={[0, 100]}
              unit="%"
              tickLine={false}
              axisLine={{ stroke: '#CBD5E1' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: '16px', fontSize: '11px', fontFamily: 'inherit' }}
            />
            <ReferenceLine
              y={70}
              stroke="#EF1B2D"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: 'Порог 70%',
                position: 'insideTopLeft',
                fill: '#EF1B2D',
                fontSize: 11,
                fontFamily: 'inherit',
                fontWeight: 600,
              }}
            />
            <Bar
              dataKey="scorePercent"
              name="Результат теста"
              unit="%"
              radius={[4, 4, 0, 0]}
            >
              {moduleData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.isPassed
                      ? '#10B981'
                      : entry.status === 'failed'
                      ? '#F59E0B'
                      : '#94A3B8'
                  }
                  opacity={entry.status === 'not_started' ? 0.35 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend / Status indicator strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Сдано (&ge; 70%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span>Не сдан (&lt; 70%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400/40 inline-block" />
            <span>Не начато</span>
          </div>
        </div>
        <div className="text-[11px] text-slate-400 font-medium">
          M01–M12: Ступень A1.1 • M13–M24: Ступень A1.2
        </div>
      </div>
    </div>
  );
};
