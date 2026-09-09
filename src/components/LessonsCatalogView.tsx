import React, { useState } from 'react';
import { BookOpen, BarChart3, Users, Target } from 'lucide-react';
import { LESSONS_DATA } from '../data/lessonsData';
import { HANDBOOK_DATA } from '../data/handbookData';
import { useAuth } from '../context/AuthContext';

interface LessonsCatalogViewProps {
  onStartLesson: (lessonId: string) => void;
  onOpenHandbook?: (topicId: string) => void;
  externalSearch?: string;
}

export const LessonsCatalogView: React.FC<LessonsCatalogViewProps> = ({
  onStartLesson,
  onOpenHandbook,
  externalSearch = '',
}) => {
  const { progress, isAdmin } = useAuth();
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
    <div id="lessons-catalog-view" className="p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="font-heading font-bold text-xs uppercase tracking-widest text-[#3B82F6]">
            КАТАЛОГ УРОКОВ
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A] dark:text-white mt-1">
            Модули Goethe-Zertifikat A1
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-medium mt-0.5">
            24 интерактивных модуля от начального уровня до экзаменационных симуляций.
          </p>
        </div>

        {/* Quick progress indicator */}
        <div className="hidden sm:flex items-center gap-3 bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 px-4 py-2.5 rounded-xl shadow-xs shrink-0">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#94A3B8]">Пройдено модулей</div>
            <div className="font-heading font-bold text-sm text-[#0B1F3A] dark:text-white">
              {Object.values(progress).filter((p: any) => p.passed).length} / {LESSONS_DATA.length}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6] font-heading font-bold text-xs">
            {Math.round((Object.values(progress).filter((p: any) => p.passed).length / LESSONS_DATA.length) * 100)}%
          </div>
        </div>
      </div>

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

          const prevLesson = LESSONS_DATA.find((l) => l.number === lesson.number - 1);
          const isUnlocked = isAdmin || lesson.number === 1 || (prevLesson && progress[prevLesson.id]?.passed);

          const matchingHandbookTopic = HANDBOOK_DATA.find(
            (h) => h.relatedLessonId === lesson.id || h.topicNumber === lesson.number
          ) || HANDBOOK_DATA[0];

          const formattedNumber = lesson.number < 10 ? `0${lesson.number}` : `${lesson.number}`;

          return (
            <div
              key={lesson.id}
              id={`module-card-${lesson.id}`}
              className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-xs hover:shadow-md transition-shadow"
            >
              {/* Top part: 1. Number + Handbook link, 2. Titles, 3. Single Tag */}
              <div className="flex flex-col gap-2.5">
                {/* 1. Module Number (gray, unobtrusive) + Handbook icon-link */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#94A3B8]">
                    {formattedNumber}
                  </span>

                  {/* Icon-link to Handbook: secondary action, does not compete with main button */}
                  <button
                    onClick={() => onOpenHandbook?.(matchingHandbookTopic.id)}
                    className="p-1.5 text-slate-400 hover:text-[#3B82F6] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                    title={`Открыть в справочнике: ${matchingHandbookTopic.title}`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                  </button>
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

                {/* 3. Single Tag: only level (e.g. A1.1 / A1.2) or Exam, not four tags */}
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

              {/* Bottom part: 4. Progress bar + 5. Main Action Button */}
              <div className="flex flex-col gap-3.5 pt-2">
                {/* 4. Progress: thin progress bar + percentage, status shown only via progress bar color */}
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

                {/* 5. One Main Action Button: dark navy background with white text */}
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
                    Заблокирован (пройдите #{lesson.number - 1})
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
  );
};
