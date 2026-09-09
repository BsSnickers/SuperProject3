import React, { useState } from 'react';
import { BookOpen, BarChart3, Users, Target, Languages, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import { LESSONS_DATA } from '../data/lessonsData';
import { HANDBOOK_DATA } from '../data/handbookData';
import { useAuth } from '../context/AuthContext';
import { useModulePrerequisites, checkModuleAccess } from '../utils/modulePrerequisites';

interface LessonsCatalogViewProps {
  onStartLesson: (lessonId: string) => void;
  onOpenHandbook?: (topicId: string) => void;
  onOpenWortschatz?: (sectionId: number) => void;
  externalSearch?: string;
}

export const LessonsCatalogView: React.FC<LessonsCatalogViewProps> = ({
  onStartLesson,
  onOpenHandbook,
  onOpenWortschatz,
  externalSearch = '',
}) => {
  const { progress, isAdmin } = useAuth();
  const { viewedHandbookTopics, wortschatzProgress } = useModulePrerequisites();
  const [localSearch, setLocalSearch] = useState('');
  const [tabFilter, setTabFilter] = useState<'all' | 'a1_1' | 'a1_2' | 'completed' | 'exams'>('all');

  const searchTerm = externalSearch || localSearch;

  const filteredLessons = LESSONS_DATA.filter((lesson) => {
    const userProgress = progress[lesson.id];
    const isPassed = userProgress?.passed;
    const isExam = lesson.tags.includes('Экзамен') || lesson.titleRu.toLowerCase().includes('экзамен');

    if (tabFilter === 'completed' && !isPassed) return false;
    if (tabFilter === 'a1_1' && lesson.difficulty !== 'A1.1') return false;
    if (tabFilter === 'a1_2' && lesson.difficulty !== 'A1.2') return false;
    if (tabFilter === 'exams' && !isExam) return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        lesson.titleDe.toLowerCase().includes(q) ||
        lesson.titleRu.toLowerCase().includes(q) ||
        lesson.description.toLowerCase().includes(q) ||
        lesson.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Find next recommended lesson to continue learning
  const nextLessonToContinue = LESSONS_DATA.find((lesson) => {
    const p = progress[lesson.id];
    return !p?.passed && !lesson.isComingSoon;
  }) || LESSONS_DATA[0];

  return (
    <div id="lessons-catalog-view" className="flex flex-col font-sans text-[#0B1F3A] dark:text-[#F4F6F8]">
      {/* Hero Banner with Cologne Cathedral - Scrollable, Rectangular Without Rounded Borders */}
      <div
        id="lessons-hero-banner"
        className="w-full bg-white dark:bg-[#0B1526] shrink-0 box-border border-b border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden"
      >
        {/* Cologne Cathedral High-Resolution Image on the right with smooth fade */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 pointer-events-none overflow-hidden">
          <img
            src="/images/cologne.jpg"
            alt="Kölner Dom, Deutschland"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-85 dark:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent dark:from-[#0B1526] dark:via-[#0B1526]/85 dark:to-transparent" />
        </div>

        {/* Banner Content Container */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 md:py-6 relative z-10">
          <div className="max-w-2xl flex flex-col gap-2">
            <div className="font-heading font-bold text-[11px] uppercase tracking-widest text-[#3B82F6]">
              КАТАЛОГ ОБУЧЕНИЯ • GOETHE-ZERTIFIKAT A1
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A] dark:text-white leading-tight tracking-tight">
              24 модуля к <span className="text-[#3B82F6]">сертификату</span> и уровню <span className="text-[#EF1B2D]">A1</span>.
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              Пошаговые интерактивные уроки от начальных диалогов до комплексных экзаменационных тестов.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2.5 mt-0.5 border-t border-slate-200/70 dark:border-slate-800/70 text-xs font-medium text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                <span>Пройдено: {Object.values(progress).filter((p: any) => p.passed).length} из {LESSONS_DATA.length} модулей</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                <span>Проходной балл ≥ 70%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                <span>A1.1 и A1.2 ступени</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
        {/* Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: `Все модули (${LESSONS_DATA.length})` },
            { id: 'a1_1', label: 'Ступень A1.1' },
            { id: 'a1_2', label: 'Ступень A1.2' },
            { id: 'exams', label: 'Экзамены' },
            { id: 'completed', label: 'Сданные' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTabFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                tabFilter === tab.id
                  ? 'bg-[#0B1F3A] text-white dark:bg-white dark:text-[#0B1F3A] font-semibold'
                  : 'bg-white dark:bg-[#111C2E] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Local Search Input on small screens or fallback */}
        {!externalSearch && (
          <div className="sm:hidden w-full">
            <input
              type="text"
              placeholder="Поиск по модулям..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#111C2E] border border-slate-200 dark:border-slate-700 rounded-full"
            />
          </div>
        )}
      </div>

      {/* 2.4 Grid of Module Cards: 3 columns, spacing 20-24px, 5 blocks per card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {filteredLessons.map((lesson) => {
          const userProgress = progress[lesson.id];
          const isPassed = userProgress?.passed;
          const score = userProgress?.scorePercent ?? 0;
          const isExam = lesson.tags.includes('Экзамен') || lesson.titleRu.toLowerCase().includes('экзамен');

          const access = checkModuleAccess(
            lesson,
            progress,
            isAdmin,
            viewedHandbookTopics,
            wortschatzProgress
          );

          const formattedNumber = lesson.number < 10 ? `0${lesson.number}` : `${lesson.number}`;

          return (
            <div
              key={lesson.id}
              id={`module-card-${lesson.id}`}
              className={`bg-white dark:bg-[#0E1A2D] border ${
                !access.isUnlocked && !lesson.isComingSoon
                  ? 'border-slate-200/80 dark:border-slate-800/80 opacity-95'
                  : 'border-slate-200/90 dark:border-slate-800'
              } rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-xs hover:shadow-md transition-shadow`}
            >
              {/* Top part: 1. Number + Handbook link, 2. Titles, 3. Tags & Prerequisites */}
              <div className="flex flex-col gap-3">
                {/* 1. Module Number */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#94A3B8]">
                    Модуль {formattedNumber}
                  </span>
                </div>

                {/* 2. Title in German (bold Montserrat) + Subtitle in Russian (gray Manrope) */}
                <div>
                  <h3 className="font-heading font-bold text-base md:text-lg text-[#0B1F3A] dark:text-white leading-snug">
                    {lesson.titleDe}
                  </h3>
                  <div className="text-xs text-[#94A3B8] font-normal mt-1 leading-normal">
                    {lesson.titleRu}
                  </div>
                </div>

                {/* 3. Single Tag: Level or Exam */}
                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <span
                    className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                      isExam
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                        : 'bg-[#F4F6F8] dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {isExam ? 'Экзамен A1' : lesson.difficulty}
                  </span>

                  {!access.isUnlocked && !lesson.isComingSoon && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-md border border-amber-200/60 dark:border-amber-900/40">
                      <Lock className="w-3 h-3" />
                      <span>Нужна подготовка</span>
                    </span>
                  )}
                </div>

                {/* Preparation Links Section */}
                <div className="bg-slate-50 dark:bg-[#111C2E] border border-slate-200/70 dark:border-slate-800 rounded-xl p-2.5 flex flex-col gap-1.5">
                  <div className="text-[10px] font-heading font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Подготовка к модулю
                  </div>

                  {/* 1. Handbook Topic Link */}
                  {access.handbookTopic && (
                    <button
                      type="button"
                      onClick={() => onOpenHandbook?.(access.handbookTopic!.id)}
                      className={`w-full flex items-center justify-between p-1.5 px-2 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                        access.isHandbookViewed
                          ? 'bg-white dark:bg-[#0B1526] hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200'
                          : 'bg-blue-50/70 dark:bg-blue-950/30 hover:bg-blue-100/70 dark:hover:bg-blue-900/40 text-[#1E40AF] dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <BookOpen className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                        <span className="truncate font-medium">
                          Справочник: Тема #{access.handbookTopic.topicNumber || lesson.number}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${
                          access.isHandbookViewed
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : 'bg-[#3B82F6] text-white'
                        }`}
                      >
                        {access.isHandbookViewed ? 'Изучено ✓' : 'Открыть'}
                      </span>
                    </button>
                  )}

                  {/* 2. Wortschatz (Vocabulary) Topic Link - For odd lessons */}
                  {access.wortschatzSection ? (
                    <button
                      type="button"
                      onClick={() => onOpenWortschatz?.(access.wortschatzSection!.section_id)}
                      className={`w-full flex items-center justify-between p-1.5 px-2 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                        access.isWortschatzPassed
                          ? 'bg-white dark:bg-[#0B1526] hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200'
                          : 'bg-amber-50/70 dark:bg-amber-950/30 hover:bg-amber-100/70 dark:hover:bg-amber-900/40 text-amber-900 dark:text-amber-200 border border-amber-200/60 dark:border-amber-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <Languages className="w-3.5 h-3.5 text-[#EF1B2D] shrink-0" />
                        <span className="truncate font-medium">
                          Словарь: #{access.wortschatzSection.section_id} {access.wortschatzSection.title_ru}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${
                          access.isWortschatzPassed
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : 'bg-[#EF1B2D] text-white'
                        }`}
                      >
                        {access.isWortschatzPassed ? `Сдан (${access.wortschatzScore}%) ✓` : 'Сдать тест'}
                      </span>
                    </button>
                  ) : (
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 italic px-2 py-0.5">
                      Словарь: закрепление пройденной лексики
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom part: 4. Progress bar + 5. Main Action Button */}
              <div className="flex flex-col gap-3 pt-2">
                {/* 4. Progress */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                    <span>Результат модуля</span>
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

                {/* 5. Main Action Button */}
                {lesson.isComingSoon ? (
                  <button
                    disabled
                    className="w-full py-2.5 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 font-medium text-xs text-center cursor-not-allowed"
                  >
                    В разработке
                  </button>
                ) : !access.isUnlocked ? (
                  <button
                    disabled
                    title={`Для открытия модуля: ${access.lockReason}`}
                    className="w-full py-2.5 px-4 rounded-lg bg-slate-100 dark:bg-[#111C2E] border border-slate-200 dark:border-slate-700/60 text-slate-400 dark:text-slate-500 font-medium text-xs text-center cursor-not-allowed flex items-center justify-center gap-2 shadow-2xs"
                  >
                    <Lock className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span className="truncate">Заблокирован: {access.lockReason}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onStartLesson(lesson.id)}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#0B1F3A] hover:bg-[#152e54] text-white font-medium text-xs md:text-sm text-center transition-colors cursor-pointer shadow-xs active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <span>{isPassed ? 'Повторить модуль' : isExam ? 'Начать экзамен' : 'Начать модуль'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 2.5 Bottom CTA Banner: Target icon, Title, Subtitle, Red CTA Button */}
      <div
        id="bottom-cta-banner"
        className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/50 flex items-center justify-center shrink-0 text-[#EF1B2D]">
            <Target className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-heading font-bold text-base md:text-lg text-[#0B1F3A] dark:text-white">
              Маленькие шаги к большим возможностям.
            </h3>
            <p className="text-xs md:text-sm text-[#94A3B8] font-normal mt-0.5">
              Изучай немецкий. Открывай мир. Строй своё будущее вместе с Delfi.
            </p>
          </div>
        </div>

        <button
          onClick={() => onStartLesson(nextLessonToContinue.id)}
          className="w-full md:w-auto bg-[#EF1B2D] hover:bg-[#d81424] text-white font-semibold text-xs md:text-sm px-6 py-3 rounded-lg shadow-sm transition-colors cursor-pointer shrink-0 text-center active:scale-95"
        >
          Продолжить обучение →
        </button>
      </div>
      </div>
    </div>
  );
};
