import React, { useState } from 'react';
import { BookOpen, BarChart3, Users, Flame, ChevronRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LESSONS_DATA } from '../data/lessonsData';
import { HANDBOOK_DATA } from '../data/handbookData';
import { AU_PAIR_STAGES, AUSBILDUNG_STAGES, PROGRAM_STATUS_MAP } from '../data/programsData';
import { NavTab } from './Sidebar';

interface DashboardViewProps {
  onStartLesson: (lessonId: string) => void;
  onNavigateTab: (tab: NavTab) => void;
  onOpenHandbook?: (topicId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onStartLesson,
  onNavigateTab,
  onOpenHandbook,
}) => {
  const { profile, progress, isAdmin } = useAuth();
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'number' | 'learners'>('number');

  const totalActiveLessons = LESSONS_DATA.filter((l) => !l.isComingSoon).length;
  const progressList = Object.values(progress) as {
    passed?: boolean;
    scorePercent: number;
    attemptsCount?: number;
  }[];
  const passedLessonsCount = progressList.filter((p) => p.passed).length;
  const coursePercent =
    totalActiveLessons > 0
      ? Math.min(100, Math.round((passedLessonsCount / totalActiveLessons) * 100))
      : 0;

  const scores = progressList.map((p) => p.scorePercent || 0);
  const avgScore =
    scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  const nextLesson =
    LESSONS_DATA.find((l) => !progress[l.id]?.passed && !l.isComingSoon) || LESSONS_DATA[0];

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

  const currentAuPairStage =
    AU_PAIR_STAGES.find((s) => s.id === (profile?.auPairStageId || 1)) || AU_PAIR_STAGES[0];
  const auPairStatusInfo =
    PROGRAM_STATUS_MAP[profile?.auPairStatus || 'not_started'] || PROGRAM_STATUS_MAP.not_started;

  return (
    <div id="dashboard-view" className="flex flex-col font-sans text-[#0B1F3A] dark:text-[#F4F6F8]">
      {/* 2.3 Hero Banner with Brandenburg Gate - Pinned/Sticky on Desktop, Rectangular Without Rounded Borders */}
      <div
        id="dashboard-hero-banner"
        className="w-full bg-white dark:bg-[#0B1526] md:sticky md:top-[64px] shrink-0 box-border z-10 border-b border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden"
      >
        {/* Brandenburg Gate Image on the right with smooth fade */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 pointer-events-none overflow-hidden">
          <img
            src="/images/brandenburger_tor.jpg"
            alt="Brandenburger Tor Berlin"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[center_30%] md:object-[center_35%] translate-y-3 sm:translate-y-4 opacity-95 dark:opacity-45 transition-transform"
          />
          {/* Softened gradient overlay (weakened white transition to show more of the photograph) */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/55 to-transparent/10 dark:from-[#0B1526] dark:via-[#0B1526]/55 dark:to-transparent/10" />
        </div>

        {/* Handwritten script above the gate matching reference - positioned lower and further right */}
        <div className="hidden lg:flex flex-col items-start absolute right-9 xl:right-9 top-5 xl:top-5 z-20 pointer-events-none -rotate-6 select-none">
          <span className="font-['Caveat',cursive] text-2xl xl:text-3xl font-bold text-[#0B1F3A] dark:text-blue-200 tracking-wide leading-tight drop-shadow-xs">
            Deutsch
          </span>
          <span className="font-['Caveat',cursive] text-2xl xl:text-3xl font-bold text-[#0B1F3A] dark:text-blue-200 tracking-wide leading-tight drop-shadow-xs pl-2">
            öffnet Türen ♡
          </span>
        </div>

        {/* Compact red circle in the bottom-right corner matching reference - moved lower */}
        <div
          id="dashboard-hero-red-circle"
          className="hidden sm:block absolute -bottom-19 -right-8 sm:-bottom-19 sm:-right-10 md:-bottom-19 md:-right-10 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-[#EF1B2D] shadow-md z-20 pointer-events-none select-none"
        />

        {/* Text «Больше, чем просто язык» positioned lower in the corner of the hero banner */}
        <div
          id="dashboard-hero-corner-text"
          className="hidden sm:block absolute bottom-1.5 right-2 sm:bottom-2 sm:right-2.5 md:bottom-2 md:right-3 z-25 pointer-events-none select-none text-white text-left"
        >
          <div className="font-heading font-bold text-[12px] sm:text-[13px] md:text-xs leading-tight tracking-tight drop-shadow-xs">
            Больше,<br />
            чем просто<br />
            язык
          </div>
        </div>

        {/* Banner Content Container */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 md:py-6 relative z-10">
          <div className="max-w-2xl flex flex-col gap-2">
            {/* Tag: МОДУЛИ A1 */}
            <div className="font-heading font-bold text-[11px] uppercase tracking-widest text-[#3B82F6]">
              МОДУЛИ A1
            </div>

            {/* Heading matching reference: Dein Weg in navy, beginnt hier. in red */}
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A] dark:text-white leading-tight tracking-tight">
              Dein Weg <span className="text-[#EF1B2D]">beginnt hier.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              Изучай. Практикуй. Достигай своих целей.
            </p>

            {/* 3 functional points in a row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2.5 mt-0.5 border-t border-slate-200/70 dark:border-slate-800/70 text-xs font-medium text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                <span>Структурированное обучение</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                <span>Реальный прогресс</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                <span>Поддержка на каждом этапе</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content Area */}
      <div className="p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
        {/* Top Welcome Card */}
        <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <img
            src="/delfi-logo-circle.svg"
            alt="Delfi Logo"
            className="w-14 h-14 rounded-full shadow-sm shrink-0 object-contain"
          />
          <div>
            <div className="font-heading font-bold text-xs uppercase tracking-widest text-[#3B82F6]">
              Delfi Training Platform
            </div>
            <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0B1F3A] dark:text-white mt-0.5">
              {profile?.displayName ? `Willkommen, ${profile.displayName}!` : 'Willkommen bei Delfi!'}
            </h1>
            <p className="text-xs md:text-sm text-[#94A3B8] font-medium mt-1">
              Изучай немецкий A1 и отслеживай оформление программ Au-Pair и Ausbildung.
            </p>
          </div>
        </div>

        {/* Minimalist Streak Widget */}
        <div className="flex items-center gap-4 bg-[#F4F6F8] dark:bg-[#111C2E] border border-slate-200 dark:border-slate-800 px-4 py-3 rounded-xl shrink-0">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#EF1B2D]" />
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-[#94A3B8]">Серия дней</div>
              <div className="font-heading font-bold text-base text-[#0B1F3A] dark:text-white">
                {profile?.streakDays || 1} дн.
              </div>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
          <div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#94A3B8]">Уровень</div>
            <div className="font-heading font-bold text-base text-[#3B82F6]">A1 Goethe</div>
          </div>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {/* Metric 1: A1 Progress */}
        <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-[12px] p-5 flex flex-col justify-between gap-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-[#94A3B8]">01 / ПРОГРЕСС A1</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F4F6F8] dark:bg-slate-800 text-[#0B1F3A] dark:text-white">
              {passedLessonsCount} из {totalActiveLessons}
            </span>
          </div>
          <div>
            <div className="font-heading font-bold text-3xl md:text-4xl text-[#0B1F3A] dark:text-white">
              {coursePercent}%
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-[#3B82F6] rounded-full transition-all duration-300"
                style={{ width: `${coursePercent}%` }}
              />
            </div>
          </div>
          <div className="text-xs text-[#94A3B8]">
            {passedLessonsCount === totalActiveLessons
              ? 'Все модули завершены!'
              : `Осталось ${totalActiveLessons - passedLessonsCount} модулей до экзамена`}
          </div>
        </div>

        {/* Metric 2: Average Score */}
        <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-[12px] p-5 flex flex-col justify-between gap-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-[#94A3B8]">02 / СРЕДНИЙ БАЛЛ</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#3B82F6]">
              Порог 70%
            </span>
          </div>
          <div>
            <div className="font-heading font-bold text-3xl md:text-4xl text-[#0B1F3A] dark:text-white">
              {avgScore > 0 ? `${avgScore}%` : '—'}
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-[#3B82F6] rounded-full transition-all duration-300"
                style={{ width: `${avgScore}%` }}
              />
            </div>
          </div>
          <div className="text-xs text-[#94A3B8]">
            {avgScore >= 70 ? 'Успешная сдача тестов' : 'Рекомендуется повторение'}
          </div>
        </div>

        {/* Metric 3: Current Module */}
        <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-[12px] p-5 flex flex-col justify-between gap-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-[#94A3B8]">03 / ТЕКУЩИЙ УРОК</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F4F6F8] dark:bg-slate-800 text-[#0B1F3A] dark:text-white">
              Модуль #{nextLesson.number}
            </span>
          </div>
          <div>
            <div className="font-heading font-bold text-lg text-[#0B1F3A] dark:text-white leading-snug truncate">
              {nextLesson.titleDe}
            </div>
            <p className="text-xs text-[#94A3B8] mt-1 truncate">
              {nextLesson.titleRu}
            </p>
          </div>
          <button
            id="dashboard-continue-btn"
            onClick={() => onStartLesson(nextLesson.id)}
            className="w-full py-2.5 px-4 bg-[#0B1F3A] hover:bg-[#152e54] text-white rounded-lg text-xs md:text-sm font-medium transition-colors cursor-pointer text-center"
          >
            Открыть модуль #{nextLesson.number} →
          </button>
        </div>
      </div>

      {/* Relocation Programs Widgets */}
      <div className="flex flex-col gap-4">
        <div className="font-heading font-bold text-xs uppercase tracking-wider text-[#94A3B8]">
          Программы переезда в Германию
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {/* Au-Pair */}
          <div
            id="dashboard-au-pair-widget"
            onClick={() => onNavigateTab('au-pair')}
            className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-[12px] p-5 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between gap-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono font-semibold text-[#94A3B8]">ПРОГРАММА 01</span>
                <h3 className="font-heading font-bold text-lg text-[#0B1F3A] dark:text-white mt-0.5">
                  Au-Pair в Германии
                </h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F4F6F8] dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                {auPairStatusInfo.label}
              </span>
            </div>
            <div className="p-3 bg-[#F4F6F8] dark:bg-[#111C2E] rounded-lg text-xs">
              <div className="font-semibold text-[#0B1F3A] dark:text-white mb-0.5">
                Этап {currentAuPairStage.number}/8: {currentAuPairStage.titleRu}
              </div>
              <p className="text-[#94A3B8] text-[11px] line-clamp-1">
                {profile?.auPairNotes || currentAuPairStage.description}
              </p>
            </div>
            <div className="text-xs font-semibold text-[#3B82F6] flex items-center gap-1">
              Перейти к трекеру Au-Pair <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Ausbildung */}
          <div
            id="dashboard-ausbildung-widget"
            onClick={() => onNavigateTab('ausbildung')}
            className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-[12px] p-5 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between gap-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono font-semibold text-[#94A3B8]">ПРОГРАММА 02</span>
                <h3 className="font-heading font-bold text-lg text-[#0B1F3A] dark:text-white mt-0.5">
                  Ausbildung (Дуальное обучение)
                </h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F4F6F8] dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                {PROGRAM_STATUS_MAP[profile?.ausbildungStatus || 'not_started'].label}
              </span>
            </div>
            <div className="p-3 bg-[#F4F6F8] dark:bg-[#111C2E] rounded-lg text-xs">
              <div className="font-semibold text-[#0B1F3A] dark:text-white mb-0.5">
                Этап {profile?.ausbildungStageId || 1}/9:{' '}
                {AUSBILDUNG_STAGES[(profile?.ausbildungStageId || 1) - 1]?.titleRu}
              </div>
              <p className="text-[#94A3B8] text-[11px] line-clamp-1">
                {profile?.ausbildungNotes || 'Подготовьте резюме (Lebenslauf) и нотариальный перевод аттестата.'}
              </p>
            </div>
            <div className="text-xs font-semibold text-[#3B82F6] flex items-center gap-1">
              Перейти к трекеру Ausbildung <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Module Catalog Section with 5-Block Card structure */}
      <div className="flex flex-col gap-6 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-semibold text-[#94A3B8]">04 / КАТАЛОГ ЗАДАНИЙ</span>
            <h2 className="font-heading font-bold text-xl md:text-2xl text-[#0B1F3A] dark:text-white mt-0.5">
              Учебные модули Goethe A1
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="bg-white dark:bg-[#111C2E] text-xs text-[#0B1F3A] dark:text-white border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg focus:outline-none cursor-pointer"
            >
              <option value="all">Уровень: Все</option>
              <option value="A1.1">A1.1</option>
              <option value="A1.2">A1.2</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white dark:bg-[#111C2E] text-xs text-[#0B1F3A] dark:text-white border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg focus:outline-none cursor-pointer"
            >
              <option value="all">Статус: Все</option>
              <option value="completed">Пройденные</option>
              <option value="not_completed">Не пройденные</option>
            </select>
          </div>
        </div>

        {/* 3-Column Cards Grid matching the 5-Block Card standard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {filteredLessons.slice(0, 6).map((lesson) => {
            const userProgress = progress[lesson.id];
            const isPassed = userProgress?.passed;
            const score = userProgress?.scorePercent ?? 0;
            const isExam = lesson.tags.includes('Экзамен') || lesson.titleRu.toLowerCase().includes('экзамен');

            const prevLesson = LESSONS_DATA.find((l) => l.number === lesson.number - 1);
            const isUnlocked = isAdmin || lesson.number === 1 || (prevLesson && progress[prevLesson.id]?.passed);

            const matchingHandbookTopic =
              HANDBOOK_DATA.find(
                (h) => h.relatedLessonId === lesson.id || h.topicNumber === lesson.number
              ) || HANDBOOK_DATA[0];

            const formattedNumber = lesson.number < 10 ? `0${lesson.number}` : `${lesson.number}`;

            return (
              <div
                key={lesson.id}
                id={`lesson-card-${lesson.id}`}
                className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-[12px] p-5 flex flex-col justify-between gap-4 shadow-xs hover:shadow-md transition-shadow"
              >
                {/* 1. Number + Handbook icon link, 2. Titles, 3. Tag */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#94A3B8]">
                      {formattedNumber}
                    </span>
                    <button
                      onClick={() => onOpenHandbook?.(matchingHandbookTopic.id)}
                      className="p-1.5 text-slate-400 hover:text-[#3B82F6] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                      title={`Открыть в справочнике: ${matchingHandbookTopic.title}`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-base md:text-lg text-[#0B1F3A] dark:text-white leading-snug">
                      {lesson.titleDe}
                    </h3>
                    <div className="text-xs text-[#94A3B8] font-normal mt-1 leading-normal">
                      {lesson.titleRu}
                    </div>
                  </div>

                  <div className="pt-1">
                    <span
                      className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                        isExam
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                          : 'bg-[#F4F6F8] dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {isExam ? 'Экзамен A1' : lesson.difficulty}
                    </span>
                  </div>
                </div>

                {/* 4. Progress + 5. Main Button */}
                <div className="flex flex-col gap-3.5 pt-2">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                      <span>Результат</span>
                      <span className={isPassed ? 'text-[#3B82F6] font-bold' : ''}>
                        {isPassed ? `${score}%` : userProgress ? `${score}%` : '0%'}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isPassed || score > 0 ? 'bg-[#3B82F6]' : 'bg-slate-200 dark:bg-slate-700'
                        }`}
                        style={{ width: isPassed ? `${score}%` : score > 0 ? `${score}%` : '0%' }}
                      />
                    </div>
                  </div>

                  {lesson.isComingSoon ? (
                    <button
                      disabled
                      className="w-full py-2.5 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 font-medium text-xs text-center cursor-not-allowed"
                    >
                      В разработке
                    </button>
                  ) : !isUnlocked ? (
                    <button
                      disabled
                      className="w-full py-2.5 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 font-medium text-xs text-center cursor-not-allowed"
                    >
                      Заблокирован
                    </button>
                  ) : (
                    <button
                      onClick={() => onStartLesson(lesson.id)}
                      className="w-full py-2.5 px-4 rounded-lg bg-[#0B1F3A] hover:bg-[#152e54] text-white font-medium text-xs md:text-sm text-center transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
                    >
                      {isPassed ? 'Повторить модуль' : isExam ? 'Начать экзамен' : 'Начать модуль'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigateTab('lessons')}
            className="text-xs font-semibold text-[#3B82F6] hover:underline cursor-pointer"
          >
            Смотреть все {LESSONS_DATA.length} модулей курса A1 →
          </button>
        </div>
      </div>
    </div>
  </div>
);
};
