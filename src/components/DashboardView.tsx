import React, { useState } from 'react';
import logoImg from '../assets/logo.png';
import { CheckCircle2, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LESSONS_DATA } from '../data/lessonsData';
import { AU_PAIR_STAGES, AUSBILDUNG_STAGES, PROGRAM_STATUS_MAP } from '../data/programsData';
import { NavTab } from './Sidebar';

interface DashboardViewProps {
  onStartLesson: (lessonId: string) => void;
  onNavigateTab: (tab: NavTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onStartLesson, onNavigateTab }) => {
  const { profile, progress, isAdmin } = useAuth();
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'number' | 'learners'>('number');

  const totalActiveLessons = LESSONS_DATA.filter((l) => !l.isComingSoon).length;
  const progressList = Object.values(progress) as { passed?: boolean; scorePercent: number; attemptsCount?: number }[];
  const passedLessonsCount = progressList.filter((p) => p.passed).length;
  const coursePercent = totalActiveLessons > 0 ? Math.min(100, Math.round((passedLessonsCount / totalActiveLessons) * 100)) : 0;

  const scores = progressList.map((p) => p.scorePercent || 0);
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  const nextLesson = LESSONS_DATA.find((l) => !progress[l.id]?.passed && !l.isComingSoon) || LESSONS_DATA[0];

  const filteredLessons = LESSONS_DATA.filter((lesson) => {
    if (filterDifficulty !== 'all' && lesson.difficulty !== filterDifficulty) return false;
    const isPassed = progress[lesson.id]?.passed;
    if (filterStatus === 'completed' && !isPassed) return false;
    if (filterStatus === 'not_completed' && isPassed) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'learners') return b.totalLearners - a.totalLearners;
    return a.number - b.number;
  });

  const currentAuPairStage = AU_PAIR_STAGES.find((s) => s.id === (profile?.auPairStageId || 1)) || AU_PAIR_STAGES[0];
  const auPairStatusInfo = PROGRAM_STATUS_MAP[profile?.auPairStatus || 'not_started'] || PROGRAM_STATUS_MAP.not_started;

  return (
    <div
      id="dashboard-view"
      className="relative min-h-screen p-6 md:p-10 max-w-7xl mx-auto flex flex-col gap-10 font-sans text-zinc-950 dark:text-white bg-cover bg-center bg-fixed my-4 rounded-xl overflow-hidden shadow-xl border border-zinc-200/80 dark:border-zinc-800 transition-colors"
      style={{ backgroundImage: "url('/roman-kraft-g_gwdpsCVAY-unsplash.jpg')" }}
    >
      {/* Dynamic Theme Overlay for optimal readability */}
      <div className="absolute inset-0 bg-white/92 dark:bg-black/75 backdrop-blur-[2px] z-0 transition-colors" />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col gap-10">
        {/* Top Editorial Header */}
        <div className="border-b border-zinc-300 dark:border-white/20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 transition-colors">
          <div>
            <div className="mb-4">
              <img
                src={logoImg}
                alt="DELFI"
                className="h-16 md:h-24 w-auto max-w-xs md:max-w-md object-contain brightness-0 dark:invert transition-all"
              />
            </div>
            <div className="flex items-center gap-2 mb-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-300">
              <span>Delfi System</span>
              <span>/</span>
              <span>Панель студента</span>
              <span>/</span>
              <span className="text-[#0033CC] dark:text-blue-400 font-bold">Goethe A1</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-normal text-zinc-950 dark:text-white tracking-tight">
              {profile?.displayName ? `Willkommen, ${profile.displayName}.` : 'Willkommen bei Delfi.'}
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-200 font-normal mt-2 max-w-2xl">
              Подготовка к экзамену Goethe-Zertifikat и синхронизированный трекинг документов для Au-Pair и Ausbildung.
            </p>
          </div>

          {/* Minimalist Streak Widget */}
          <div className="border border-zinc-300 dark:border-white/20 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-md p-4 shrink-0 font-mono text-xs flex items-center gap-6 text-zinc-900 dark:text-white shadow-xs">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Дней подряд</div>
              <div className="text-xl font-bold text-zinc-950 dark:text-white font-serif">
                {profile?.streakDays || 1} дн.
              </div>
            </div>
            <div className="border-l border-zinc-300 dark:border-white/20 pl-4">
              <div className="text-[9px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Тест A1</div>
              <div className="text-xs font-bold text-[#0033CC] dark:text-blue-400 uppercase mt-0.5">В процессе</div>
            </div>
          </div>
        </div>

        {/* 3-Column Metrics Hero: Crisp Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-300 dark:bg-white/20 border border-zinc-300 dark:border-white/20 shadow-xs">
          {/* Metric 1 */}
          <div className="bg-white/95 dark:bg-zinc-900/85 backdrop-blur-md p-8 flex flex-col justify-between gap-6">
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                § 01 / Прогресс A1
              </span>
              <span className="font-mono text-xs text-zinc-800 dark:text-white border border-zinc-300 dark:border-white/20 px-2 py-0.5 bg-zinc-100 dark:bg-white/10 font-bold">
                {passedLessonsCount} из {totalActiveLessons}
              </span>
            </div>
            <div>
              <div className="font-serif text-5xl text-zinc-950 dark:text-white font-normal">
                {coursePercent}%
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 mt-4 overflow-hidden rounded-full">
                <div
                  className="bg-[#0033CC] dark:bg-blue-500 h-1.5 transition-all duration-300"
                  style={{ width: `${coursePercent}%` }}
                />
              </div>
            </div>
            <div className="font-mono text-[10px] text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
              {passedLessonsCount === totalActiveLessons ? 'Все модули курса завершены' : `Осталось ${totalActiveLessons - passedLessonsCount} модулей`}
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-white/95 dark:bg-zinc-900/85 backdrop-blur-md p-8 flex flex-col justify-between gap-6">
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                § 02 / Средний балл
              </span>
              <span className="font-mono text-xs text-[#0033CC] dark:text-blue-400 border border-blue-200 dark:border-white/20 px-2 py-0.5 bg-blue-50 dark:bg-white/10 font-bold">
                Порог 70%
              </span>
            </div>
            <div>
              <div className="font-serif text-5xl text-zinc-950 dark:text-white font-normal">
                {avgScore > 0 ? `${avgScore}%` : '—'}
              </div>
            </div>
            <div className="font-mono text-[10px] text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
              {avgScore >= 70 ? 'Готовность к сдаче экзамена: подтверждена' : 'Требуется тренировка тестов'}
            </div>
          </div>

          {/* Metric 3: Next Lesson */}
          <div className="bg-zinc-50/95 dark:bg-zinc-950/90 backdrop-blur-md text-zinc-950 dark:text-white p-8 flex flex-col justify-between gap-6 border-t md:border-t-0 md:border-l border-zinc-300 dark:border-white/20">
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                § 03 / Текущий урок
              </span>
              <span className="font-mono text-[10px] uppercase text-zinc-700 dark:text-zinc-200 border border-zinc-300 dark:border-white/30 px-2 py-0.5 bg-white dark:bg-transparent">
                Модуль #{nextLesson.number}
              </span>
            </div>
            <div>
              <div className="font-serif text-2xl font-normal text-zinc-950 dark:text-white">
                {nextLesson.titleDe}
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 line-clamp-2">
                {nextLesson.titleRu}
              </p>
            </div>
            <button
              id="dashboard-continue-btn"
              onClick={() => onStartLesson(nextLesson.id)}
              className="w-full py-3 px-4 bg-black hover:bg-[#0033CC] dark:bg-[#0033CC] dark:hover:bg-blue-600 text-white transition-colors font-mono text-xs uppercase tracking-wider font-bold text-center border border-black dark:border-blue-500 cursor-pointer"
            >
              Открыть урок #{nextLesson.number} →
            </button>
          </div>
        </div>

        {/* Relocation Trackers Row */}
        <div className="flex flex-col gap-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-300">
            [Программы переезда в Германию]
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Au-Pair Tracker Box */}
            <div
              id="dashboard-au-pair-widget"
              onClick={() => onNavigateTab('au-pair')}
              className="border border-zinc-300 dark:border-white/20 bg-white/95 dark:bg-zinc-900/80 backdrop-blur-md p-6 hover:border-black dark:hover:border-blue-400 transition-colors cursor-pointer flex flex-col justify-between gap-6 text-zinc-950 dark:text-white shadow-xs"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    Программа 01
                  </span>
                  <h3 className="font-serif text-2xl text-zinc-950 dark:text-white font-normal mt-1">
                    Au-Pair в Германии
                  </h3>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 border border-zinc-300 dark:border-white/20 bg-zinc-100 dark:bg-white/10 text-zinc-800 dark:text-white">
                  {auPairStatusInfo.label}
                </span>
              </div>

              <div className="border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-950/70 p-4 font-mono text-xs">
                <div className="font-bold text-zinc-950 dark:text-white mb-1">
                  Этап {currentAuPairStage.number}/8: {currentAuPairStage.titleRu}
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 line-clamp-2 text-[11px]">
                  {profile?.auPairNotes || currentAuPairStage.description}
                </p>
              </div>

              <div className="font-mono text-xs uppercase tracking-wider text-[#0033CC] dark:text-blue-400 font-bold">
                Перейти к трекеру Au-Pair →
              </div>
            </div>

            {/* Ausbildung Tracker Box */}
            <div
              id="dashboard-ausbildung-widget"
              onClick={() => onNavigateTab('ausbildung')}
              className="border border-zinc-300 dark:border-white/20 bg-white/95 dark:bg-zinc-900/80 backdrop-blur-md p-6 hover:border-black dark:hover:border-blue-400 transition-colors cursor-pointer flex flex-col justify-between gap-6 text-zinc-950 dark:text-white shadow-xs"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    Программа 02
                  </span>
                  <h3 className="font-serif text-2xl text-zinc-950 dark:text-white font-normal mt-1">
                    Ausbildung (Дуальное обучение)
                  </h3>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 border border-zinc-300 dark:border-white/20 bg-zinc-100 dark:bg-white/10 text-zinc-800 dark:text-white">
                  {PROGRAM_STATUS_MAP[profile?.ausbildungStatus || 'not_started'].label}
                </span>
              </div>

              <div className="border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-950/70 p-4 font-mono text-xs">
                <div className="font-bold text-zinc-950 dark:text-white mb-1">
                  Этап {profile?.ausbildungStageId || 1}/9: {AUSBILDUNG_STAGES[(profile?.ausbildungStageId || 1) - 1]?.titleRu}
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 line-clamp-2 text-[11px]">
                  {profile?.ausbildungNotes || 'Подготовьте резюме (Lebenslauf) и нотариальный перевод аттестата.'}
                </p>
              </div>

              <div className="font-mono text-xs uppercase tracking-wider text-[#0033CC] dark:text-blue-400 font-bold">
                Перейти к трекеру Ausbildung →
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Catalog Section */}
        <div className="flex flex-col gap-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-300 dark:border-white/20 pb-4 transition-colors">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-300">
                § 04 / Каталог заданий
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-zinc-950 dark:text-white font-normal mt-1">
                Учебные модули Goethe A1
              </h2>
            </div>

            {/* Minimalist Filter Form */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/30 px-3 py-2 uppercase tracking-wider rounded-none focus:outline-none focus:border-black dark:focus:border-blue-400 cursor-pointer"
              >
                <option value="all" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Уровень: Все</option>
                <option value="A1.1" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">A1.1</option>
                <option value="A1.2" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">A1.2</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/30 px-3 py-2 uppercase tracking-wider rounded-none focus:outline-none focus:border-black dark:focus:border-blue-400 cursor-pointer"
              >
                <option value="all" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Статус: Все</option>
                <option value="completed" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Пройденные</option>
                <option value="not_completed" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Не пройденные</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-300 dark:border-white/30 px-3 py-2 uppercase tracking-wider rounded-none focus:outline-none focus:border-black dark:focus:border-blue-400 cursor-pointer"
              >
                <option value="number" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">По номеру</option>
                <option value="learners" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">По популярности</option>
              </select>
            </div>
          </div>

          {/* 3-Column Architectural Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.slice(0, 6).map((lesson) => {
              const userProgress = progress[lesson.id];
              const isPassed = userProgress?.passed;
              const score = userProgress?.scorePercent;

              const prevLesson = LESSONS_DATA.find((l) => l.number === lesson.number - 1);
              const isUnlocked = isAdmin || lesson.number === 1 || (prevLesson && progress[prevLesson.id]?.passed);

              return (
                <div
                  key={lesson.id}
                  id={`lesson-card-${lesson.id}`}
                  className={`border p-6 flex flex-col justify-between gap-6 transition-colors rounded-none ${
                    isPassed
                      ? 'border-emerald-600/70 dark:border-emerald-500/60 bg-emerald-50/90 dark:bg-emerald-950/40 backdrop-blur-md shadow-xs'
                      : 'border-zinc-300 dark:border-white/20 bg-white/95 dark:bg-zinc-900/80 backdrop-blur-md hover:border-black dark:hover:border-blue-400 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                        [Paper #{lesson.number < 10 ? `0${lesson.number}` : lesson.number}]
                      </span>
                      <div className="flex items-center gap-1.5">
                        {isPassed && (
                          <span className="font-mono text-[10px] border border-emerald-600 dark:border-emerald-400 px-2 py-0.5 text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 flex items-center gap-1 font-bold uppercase tracking-wider">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            Пройден
                          </span>
                        )}
                        <span className="font-mono text-[10px] border border-zinc-300 dark:border-white/20 px-1.5 py-0.5 text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-white/10">
                          {lesson.estimatedMinutes} мин
                        </span>
                      </div>
                    </div>

                    <h3 className="font-serif text-xl font-normal text-zinc-950 dark:text-white mb-1">
                      {lesson.titleDe}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 mb-4">
                      {lesson.titleRu}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4 font-mono text-[9px] uppercase">
                      {lesson.tags.map((tag) => (
                        <span key={tag} className="border border-zinc-300 dark:border-white/20 px-1.5 py-0.5 text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-white/10">
                          {tag}
                        </span>
                      ))}
                      {lesson.isComingSoon && (
                        <span className="border border-amber-500 dark:border-amber-400/60 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 bg-amber-100 dark:bg-amber-950/60">
                          Скоро
                        </span>
                      )}
                    </div>

                    <div className="bg-zinc-50 dark:bg-zinc-950/70 p-2.5 border border-zinc-200 dark:border-white/10 font-mono text-xs">
                      <div className="text-[9px] uppercase text-zinc-500 dark:text-zinc-400">Результат</div>
                      <div className="font-bold mt-0.5">
                        {score !== undefined ? (
                          <span className={`flex items-center gap-1 ${isPassed ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-zinc-700 dark:text-zinc-300'}`}>
                            {score}%
                            {isPassed && <Check className="w-3 h-3 text-emerald-700 dark:text-emerald-400 inline" />}
                          </span>
                        ) : (
                          <span className="text-zinc-400 dark:text-zinc-500">—</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    {lesson.isComingSoon ? (
                      <button
                        disabled
                        className="w-full py-2.5 px-3 bg-zinc-100 dark:bg-zinc-950/50 text-zinc-400 dark:text-zinc-500 font-mono text-xs uppercase cursor-not-allowed border border-zinc-200 dark:border-white/10"
                      >
                        [В разработке]
                      </button>
                    ) : !isUnlocked ? (
                      <button
                        disabled
                        className="w-full py-2.5 px-3 bg-zinc-100 dark:bg-zinc-950/50 text-zinc-400 dark:text-zinc-500 font-mono text-xs uppercase cursor-not-allowed border border-zinc-200 dark:border-white/10"
                        title="Пройдите предыдущий урок на 70%+"
                      >
                        [Требуется Урок #{lesson.number - 1}]
                      </button>
                    ) : (
                      <button
                        id={`start-lesson-btn-${lesson.id}`}
                        onClick={() => onStartLesson(lesson.id)}
                        className={`w-full py-2.5 px-3 font-mono text-xs uppercase tracking-wider font-bold transition-colors border cursor-pointer ${
                          isPassed
                            ? 'bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white border-emerald-700 dark:border-emerald-400'
                            : 'bg-black hover:bg-[#0033CC] dark:bg-[#0033CC] dark:hover:bg-blue-600 text-white border-black dark:border-blue-500'
                        }`}
                      >
                        {isPassed ? 'Повторить модуль ✓' : 'Начать модуль →'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onNavigateTab('lessons')}
              className="font-mono text-xs uppercase tracking-widest text-zinc-900 dark:text-white hover:text-[#0033CC] dark:hover:text-blue-300 border-b border-zinc-900 dark:border-white pb-0.5 transition-colors font-bold cursor-pointer"
            >
              Все 23 урока курса A1 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
