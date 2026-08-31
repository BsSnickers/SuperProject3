import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { UserProfile, LessonProgress } from '../types';
import { calculateRealAnalytics, RealAnalyticsSummary } from '../utils/analytics';

interface WeeklyProgressChartsProps {
  profile: UserProfile | null;
  progress: Record<string, LessonProgress>;
}

type ChartMetric = 'accuracy' | 'volume' | 'time';

export const WeeklyProgressCharts: React.FC<WeeklyProgressChartsProps> = ({
  profile,
  progress,
}) => {
  const [activeMetric, setActiveMetric] = useState<ChartMetric>('accuracy');

  const analytics: RealAnalyticsSummary = useMemo(() => {
    return calculateRealAnalytics(profile, progress);
  }, [profile, progress]);

  const {
    weeklyData,
    totalWordsLearned,
    totalStudyHours,
    accuracyGrowth,
    totalQuestionsSolved,
    competences,
    hasAnyAttempt,
    avgScore,
  } = analytics;

  const currentWeekExercises = weeklyData[weeklyData.length - 1]?.exercises || 0;

  // Custom Editorial Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#09090B] text-white p-3.5 border border-zinc-700 shadow-xl font-mono text-xs max-w-xs">
          <div className="text-[10px] uppercase text-zinc-400 border-b border-zinc-800 pb-1.5 mb-2">
            [{label}]
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
        </div>
      );
    }
    return null;
  };

  return (
    <div id="weekly-progress-charts" className="border border-zinc-300 bg-white p-6 md:p-8 flex flex-col gap-8">
      {/* Header & Metric Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
            [Аналитика успеваемости • Реальные данные тестов]
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-zinc-950 font-normal">
            Динамика изучения немецкого языка по неделям
          </h2>
          <p className="text-xs text-zinc-500 font-sans mt-1">
            {hasAnyAttempt
              ? `Мониторинг на основе ${analytics.passedLessonsCount} сданных модулей и ${analytics.totalAttempts} попыток тестирования.`
              : 'Пройдите ваш первый модуль A1, чтобы активировать персональную графическую аналитику.'}
          </p>
        </div>

        {/* View Switcher Buttons */}
        <div className="flex items-center gap-1 font-mono text-xs shrink-0 bg-zinc-100 p-1 border border-zinc-300">
          <button
            id="metric-tab-accuracy"
            onClick={() => setActiveMetric('accuracy')}
            className={`px-3 py-1.5 uppercase transition-colors text-[11px] font-bold cursor-pointer ${
              activeMetric === 'accuracy'
                ? 'bg-black text-white'
                : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            Точность (%)
          </button>
          <button
            id="metric-tab-volume"
            onClick={() => setActiveMetric('volume')}
            className={`px-3 py-1.5 uppercase transition-colors text-[11px] font-bold cursor-pointer ${
              activeMetric === 'volume'
                ? 'bg-black text-white'
                : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            Слова и Задания
          </button>
          <button
            id="metric-tab-time"
            onClick={() => setActiveMetric('time')}
            className={`px-3 py-1.5 uppercase transition-colors text-[11px] font-bold cursor-pointer ${
              activeMetric === 'time'
                ? 'bg-black text-white'
                : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            Время (мин)
          </button>
        </div>
      </div>

      {/* 4 Weekly KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200 font-mono text-center">
        <div className="bg-[#FAFAFA] p-4">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Словарный запас</div>
          <div className="font-serif text-2xl font-normal text-zinc-950 mt-1">
            {totalWordsLearned} <span className="text-xs text-zinc-500 font-mono">слов</span>
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">
            {hasAnyAttempt ? 'Изучено в модулях' : 'Ожидает 1-го теста'}
          </div>
        </div>

        <div className="bg-[#FAFAFA] p-4">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Время практики</div>
          <div className="font-serif text-2xl font-normal text-zinc-950 mt-1">
            {totalStudyHours} <span className="text-xs text-zinc-500 font-mono">часов</span>
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">
            {analytics.totalStudyMinutes} минут тестов
          </div>
        </div>

        <div className="bg-[#FAFAFA] p-4">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Динамика точности</div>
          <div className="font-serif text-2xl font-normal text-[#0033CC] mt-1">
            {accuracyGrowth >= 0 ? `+${accuracyGrowth}%` : `${accuracyGrowth}%`}
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">
            {hasAnyAttempt ? `Текущая точность: ${avgScore}%` : 'Нет данных'}
          </div>
        </div>

        <div className="bg-[#FAFAFA] p-4">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Решено вопросов</div>
          <div className="font-serif text-2xl font-normal text-zinc-950 mt-1">
            {totalQuestionsSolved} <span className="text-xs text-zinc-500 font-mono">задач</span>
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">
            {currentWeekExercises} за тек. неделю
          </div>
        </div>
      </div>

      {!hasAnyAttempt && (
        <div className="bg-zinc-100 border border-zinc-300 p-4 font-mono text-xs text-zinc-800 text-center flex flex-col gap-1">
          <div className="font-bold text-zinc-950 uppercase text-[11px]">
            [Информационная панель]
          </div>
          <p className="font-sans text-xs text-zinc-600">
            Вы еще не проходили тесты. Пройдите первый модуль в каталоге уроков, чтобы график и компетенции автоматически заполнились вашими реальными результатами.
          </p>
        </div>
      )}

      {/* Main Chart Rendering Box */}
      <div className="w-full h-80 pt-2 font-mono text-xs">
        <ResponsiveContainer width="100%" height="100%">
          {activeMetric === 'accuracy' ? (
            <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0033CC" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0033CC" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" vertical={false} />
              <XAxis
                dataKey="weekShort"
                stroke="#71717A"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#D4D4D8' }}
              />
              <YAxis
                stroke="#71717A"
                fontSize={11}
                domain={[0, 100]}
                unit="%"
                tickLine={false}
                axisLine={{ stroke: '#D4D4D8' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '16px', fontSize: '11px', fontFamily: 'monospace' }}
              />
              <Area
                type="monotone"
                dataKey="accuracy"
                name="Точность ответов (реальная)"
                unit="%"
                stroke="#0033CC"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#accuracyGradient)"
                activeDot={{ r: 5, fill: '#0033CC', stroke: '#FFFFFF', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="passThreshold"
                name="Порог сдачи (70%)"
                unit="%"
                stroke="#A1A1AA"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                dot={false}
              />
            </AreaChart>
          ) : activeMetric === 'volume' ? (
            <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" vertical={false} />
              <XAxis
                dataKey="weekShort"
                stroke="#71717A"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#D4D4D8' }}
              />
              <YAxis
                stroke="#71717A"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#D4D4D8' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '16px', fontSize: '11px', fontFamily: 'monospace' }}
              />
              <Bar
                dataKey="newWords"
                name="Словарный запас"
                unit=" слов"
                fill="#18181B"
                barSize={18}
              />
              <Bar
                dataKey="exercises"
                name="Решенные задания"
                unit=" упр."
                fill="#0033CC"
                barSize={18}
              />
            </BarChart>
          ) : (
            <LineChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" vertical={false} />
              <XAxis
                dataKey="weekShort"
                stroke="#71717A"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#D4D4D8' }}
              />
              <YAxis
                stroke="#71717A"
                fontSize={11}
                unit=" мин"
                tickLine={false}
                axisLine={{ stroke: '#D4D4D8' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '16px', fontSize: '11px', fontFamily: 'monospace' }}
              />
              <Line
                type="monotone"
                dataKey="studyMinutes"
                name="Время практики"
                unit=" мин"
                stroke="#09090B"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#09090B' }}
                activeDot={{ r: 6, fill: '#0033CC', stroke: '#FFFFFF', strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Competence Breakdown footer */}
      <div className="border-t border-zinc-200 pt-6">
        <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-3">
          [Распределение компетенций A1 по реальным ответам]
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          {competences.map((comp) => (
            <div key={comp.id} className="p-3 bg-[#FAFAFA] border border-zinc-200 flex flex-col justify-between gap-2">
              <div>
                <div className="flex justify-between items-center text-[10px] uppercase text-zinc-500 mb-1">
                  <span className="font-bold text-zinc-800">{comp.title}</span>
                  <span className={`font-bold ${comp.hasData ? 'text-[#0033CC]' : 'text-zinc-400'}`}>
                    {comp.hasData ? `${comp.accuracy}%` : '0%'}
                  </span>
                </div>
                <div className="w-full bg-zinc-200 h-1 mt-1">
                  <div
                    className="bg-[#0033CC] h-1 transition-all duration-300"
                    style={{ width: comp.hasData ? `${comp.accuracy}%` : '0%' }}
                  />
                </div>
              </div>
              <div className="text-[10px] text-zinc-500 font-sans leading-tight">
                {comp.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

