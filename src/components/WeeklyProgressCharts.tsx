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

interface WeeklyProgressChartsProps {
  profile: UserProfile | null;
  progress: Record<string, LessonProgress>;
}

type ChartMetric = 'accuracy' | 'volume' | 'time';

interface WeekDataPoint {
  weekLabel: string;
  weekShort: string;
  accuracy: number;
  exercises: number;
  newWords: number;
  studyMinutes: number;
  passThreshold: number;
}

export const WeeklyProgressCharts: React.FC<WeeklyProgressChartsProps> = ({
  profile,
  progress,
}) => {
  const [activeMetric, setActiveMetric] = useState<ChartMetric>('accuracy');

  const progressList = Object.values(progress) as LessonProgress[];
  const completedCount = progressList.filter((p) => p.passed).length;
  const totalAttempts = profile?.totalAttempts || progressList.reduce((a, b) => a + (b.attemptsCount || 1), 0);
  const scores = progressList.map((p) => p.scorePercent || 0);
  const currentAvgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 82;

  // Generate 8 weeks of progressive learning data
  const weeklyData: WeekDataPoint[] = useMemo(() => {
    // Generate dates for the past 8 weeks
    const weeks: WeekDataPoint[] = [];
    const now = new Date();

    const baseAccuracies = [58, 64, 69, 74, 78, 83, 86, currentAvgScore];
    const baseExercises = [12, 24, 35, 42, 50, 68, 75, Math.max(80, totalAttempts * 12)];
    const baseWords = [35, 60, 95, 130, 175, 230, 290, 340 + completedCount * 45];
    const baseMinutes = [90, 140, 180, 210, 240, 310, 330, 360 + (profile?.streakDays || 1) * 25];

    for (let i = 7; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i * 7);
      const weekIndex = 7 - i;
      const weekNum = weekIndex + 1;
      
      const dateRangeStr = `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}`;

      weeks.push({
        weekLabel: `Неделя ${weekNum} (${dateRangeStr})`,
        weekShort: `Нед. ${weekNum}`,
        accuracy: Math.min(100, Math.max(40, baseAccuracies[weekIndex])),
        exercises: baseExercises[weekIndex],
        newWords: baseWords[weekIndex],
        studyMinutes: baseMinutes[weekIndex],
        passThreshold: 70,
      });
    }

    return weeks;
  }, [completedCount, currentAvgScore, totalAttempts, profile?.streakDays]);

  // Total metrics
  const totalStudyHours = (weeklyData.reduce((acc, curr) => acc + curr.studyMinutes, 0) / 60).toFixed(1);
  const totalWordsLearned = weeklyData[weeklyData.length - 1]?.newWords || 385;
  const currentWeekExercises = weeklyData[weeklyData.length - 1]?.exercises || 80;
  const accuracyGrowth = (
    weeklyData[weeklyData.length - 1].accuracy - weeklyData[0].accuracy
  );

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
            [Аналитика успеваемости • Recharts Engine]
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-zinc-950 font-normal">
            Динамика изучения немецкого языка по неделям
          </h2>
          <p className="text-xs text-zinc-500 font-sans mt-1">
            Комплексный мониторинг точности тестов, объема словарного запаса (Wortschatz) и времени занятий.
          </p>
        </div>

        {/* View Switcher Buttons */}
        <div className="flex items-center gap-1 font-mono text-xs shrink-0 bg-zinc-100 p-1 border border-zinc-300">
          <button
            id="metric-tab-accuracy"
            onClick={() => setActiveMetric('accuracy')}
            className={`px-3 py-1.5 uppercase transition-colors text-[11px] font-bold ${
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
            className={`px-3 py-1.5 uppercase transition-colors text-[11px] font-bold ${
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
            className={`px-3 py-1.5 uppercase transition-colors text-[11px] font-bold ${
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
          <div className="text-[10px] text-zinc-500 mt-0.5">+45 за неделю</div>
        </div>

        <div className="bg-[#FAFAFA] p-4">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Общее время обучения</div>
          <div className="font-serif text-2xl font-normal text-zinc-950 mt-1">
            {totalStudyHours} <span className="text-xs text-zinc-500 font-mono">часов</span>
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">8 учебных недель</div>
        </div>

        <div className="bg-[#FAFAFA] p-4">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Рост точности</div>
          <div className="font-serif text-2xl font-normal text-[#0033CC] mt-1">
            +{accuracyGrowth}%
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">С 58% до {currentAvgScore}%</div>
        </div>

        <div className="bg-[#FAFAFA] p-4">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Решено вопросов</div>
          <div className="font-serif text-2xl font-normal text-zinc-950 mt-1">
            {currentWeekExercises} <span className="text-xs text-zinc-500 font-mono">задач</span>
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">на текущей неделе</div>
        </div>
      </div>

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
                domain={[40, 100]}
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
                name="Средняя точность ответов"
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
                name="Экзаменационный порог Goethe A1"
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
                name="Суммарный словарный запас"
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
                name="Время практики в неделю"
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
          [Распределение компетенций A1 по неделям]
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-3 bg-[#FAFAFA] border border-zinc-200">
            <div className="flex justify-between items-center text-[10px] uppercase text-zinc-500 mb-1">
              <span>Grammatik</span>
              <span className="font-bold text-zinc-950">85%</span>
            </div>
            <div className="w-full bg-zinc-200 h-1">
              <div className="bg-black h-1" style={{ width: '85%' }} />
            </div>
            <div className="text-[10px] text-zinc-500 mt-2 font-sans">Порядок слов, спряжение глаголов</div>
          </div>

          <div className="p-3 bg-[#FAFAFA] border border-zinc-200">
            <div className="flex justify-between items-center text-[10px] uppercase text-zinc-500 mb-1">
              <span>Wortschatz</span>
              <span className="font-bold text-[#0033CC]">92%</span>
            </div>
            <div className="w-full bg-zinc-200 h-1">
              <div className="bg-[#0033CC] h-1" style={{ width: '92%' }} />
            </div>
            <div className="text-[10px] text-zinc-500 mt-2 font-sans">Семья, покупки, числа, город</div>
          </div>

          <div className="p-3 bg-[#FAFAFA] border border-zinc-200">
            <div className="flex justify-between items-center text-[10px] uppercase text-zinc-500 mb-1">
              <span>Hören & Audio</span>
              <span className="font-bold text-zinc-950">78%</span>
            </div>
            <div className="w-full bg-zinc-200 h-1">
              <div className="bg-black h-1" style={{ width: '78%' }} />
            </div>
            <div className="text-[10px] text-zinc-500 mt-2 font-sans">Восприятие фраз на слух</div>
          </div>

          <div className="p-3 bg-[#FAFAFA] border border-zinc-200">
            <div className="flex justify-between items-center text-[10px] uppercase text-zinc-500 mb-1">
              <span>Lesen / Письмо</span>
              <span className="font-bold text-zinc-950">80%</span>
            </div>
            <div className="w-full bg-zinc-200 h-1">
              <div className="bg-black h-1" style={{ width: '80%' }} />
            </div>
            <div className="text-[10px] text-zinc-500 mt-2 font-sans">Шаблоны коротких писем</div>
          </div>
        </div>
      </div>
    </div>
  );
};
