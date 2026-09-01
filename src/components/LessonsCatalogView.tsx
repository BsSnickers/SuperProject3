import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { LESSONS_DATA } from '../data/lessonsData';
import { HANDBOOK_DATA } from '../data/handbookData';
import { useAuth } from '../context/AuthContext';

interface LessonsCatalogViewProps {
  onStartLesson: (lessonId: string) => void;
  onOpenHandbook?: (topicId: string) => void;
}

export const LessonsCatalogView: React.FC<LessonsCatalogViewProps> = ({ onStartLesson, onOpenHandbook }) => {
  const { progress, isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [tabFilter, setTabFilter] = useState<'all' | 'a1_1' | 'a1_2' | 'completed' | 'exams'>('all');

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

  return (
    <div id="lessons-catalog-view" className="p-6 md:p-10 max-w-7xl mx-auto flex flex-col gap-8 font-sans">
      {/* Header */}
      <div className="border-b border-zinc-300 dark:border-zinc-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
            § Goethe-Zertifikat A1 • Модули A1.1 & A1.2
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-normal text-zinc-950 dark:text-white tracking-tight">
            Каталог учебных модулей
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 font-normal mt-2 max-w-2xl">
            {LESSONS_DATA.length} тематических модулей с прогрессивным количеством вопросов (6–15) и комплексными экзаменами в конце ступеней A1.1 и A1.2.
          </p>
        </div>

        {/* Search Input */}
        <div className="min-w-[280px]">
          <input
            id="lesson-search-input"
            type="text"
            placeholder="Поиск по теме, грамматике или лексике..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 font-mono text-xs text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-black dark:focus:border-blue-400 rounded-none"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1 border-b border-zinc-300 dark:border-zinc-800 pb-px font-mono text-xs">
        {[
          { id: 'all', label: `Все модули (${LESSONS_DATA.length})` },
          { id: 'a1_1', label: 'Ступень A1.1 (12)' },
          { id: 'a1_2', label: 'Ступень A1.2 (11)' },
          { id: 'exams', label: 'Экзамены (2)' },
          { id: 'completed', label: 'Сданные' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTabFilter(tab.id as any)}
            className={`px-4 py-2.5 uppercase tracking-wider transition-colors rounded-none border-t border-x ${
              tabFilter === tab.id
                ? 'bg-black dark:bg-zinc-100 text-white dark:text-zinc-950 border-black dark:border-zinc-100 font-bold'
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white border-zinc-300 dark:border-zinc-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => {
          const userProgress = progress[lesson.id];
          const isPassed = userProgress?.passed;
          const score = userProgress?.scorePercent;
          const isExam = lesson.tags.includes('Экзамен') || lesson.titleRu.toLowerCase().includes('экзамен');

          const prevLesson = LESSONS_DATA.find((l) => l.number === lesson.number - 1);
          const isUnlocked = isAdmin || lesson.number === 1 || (prevLesson && progress[prevLesson.id]?.passed);

          return (
            <div
              key={lesson.id}
              className={`border p-6 flex flex-col justify-between gap-6 transition-colors ${
                isExam
                  ? 'border-amber-400 dark:border-amber-500/60 bg-amber-50/30 dark:bg-amber-950/20'
                  : isPassed
                  ? 'border-zinc-900 dark:border-emerald-500/50 bg-white dark:bg-zinc-900'
                  : !isUnlocked || lesson.isComingSoon
                  ? 'border-zinc-200 dark:border-zinc-800/60 bg-[#FAFAFA] dark:bg-zinc-950/50'
                  : 'border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-black dark:hover:border-blue-400'
              }`}
            >
              <div>
                {/* Header: Module Number & Status */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-4 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 dark:text-zinc-400">
                      [#{lesson.number < 10 ? `0${lesson.number}` : lesson.number}]
                    </span>
                    <span className={`px-1.5 py-0.5 text-[10px] font-bold ${lesson.difficulty === 'A1.1' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200' : 'bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800'}`}>
                      {lesson.difficulty}
                    </span>
                    {isExam && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 uppercase">
                        [Экзамен]
                      </span>
                    )}
                  </div>

                  {isPassed ? (
                    <span className="font-bold text-zinc-950 dark:text-emerald-400 bg-zinc-100 dark:bg-emerald-950/80 px-2 py-0.5 border border-zinc-300 dark:border-emerald-700 uppercase text-[10px]">
                      [Сдано: {score}%]
                    </span>
                  ) : lesson.isComingSoon ? (
                    <span className="text-zinc-400 uppercase text-[10px]">
                      Скоро
                    </span>
                  ) : isUnlocked ? (
                    <span className="text-[#0033CC] dark:text-blue-400 uppercase font-bold text-[10px]">
                      Доступен
                    </span>
                  ) : (
                    <span className="text-zinc-400 dark:text-zinc-500 uppercase text-[10px]">
                      Заблокирован
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl font-normal text-zinc-950 dark:text-white mb-1 leading-tight">
                  {lesson.titleDe}
                </h3>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 font-medium">
                  {lesson.titleRu}
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-3 mb-4 leading-relaxed">
                  {lesson.description}
                </p>

                {/* Meta details */}
                <div className="grid grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 font-mono text-[10px] text-zinc-600 dark:text-zinc-400 text-center mb-4">
                  <div className="bg-[#FAFAFA] dark:bg-zinc-950 p-2 font-bold text-zinc-900 dark:text-white">{lesson.questionsCount} вопросов</div>
                  <div className="bg-[#FAFAFA] dark:bg-zinc-950 p-2">Порог {lesson.passThreshold}%</div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 font-mono text-[9px] uppercase">
                  {lesson.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 text-zinc-500 dark:text-zinc-400 bg-[#FAFAFA] dark:bg-zinc-950"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                {/* Open Handbook Button */}
                {(() => {
                  const matchingHandbookTopic = HANDBOOK_DATA.find(
                    (h) => h.relatedLessonId === lesson.id || h.topicNumber === lesson.number
                  ) || HANDBOOK_DATA[0];

                  return (
                    <button
                      id={`lesson-handbook-btn-${lesson.id}`}
                      type="button"
                      onClick={() => onOpenHandbook?.(matchingHandbookTopic.id)}
                      className="w-full py-2.5 px-3 font-mono text-xs uppercase tracking-wider font-bold transition-colors border text-center flex items-center justify-center gap-1.5 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700 cursor-pointer shadow-2xs"
                      title={`Открыть в справочнике: ${matchingHandbookTopic.title}`}
                    >
                      <BookOpen size={13} className="text-zinc-700 dark:text-zinc-300 shrink-0" />
                      <span>Открыть справочник →</span>
                    </button>
                  );
                })()}

                {/* Open Module Button */}
                {lesson.isComingSoon ? (
                  <button
                    disabled
                    className="w-full py-2.5 px-3 bg-zinc-100 dark:bg-zinc-950 text-zinc-400 dark:text-zinc-600 font-mono text-xs uppercase cursor-not-allowed border border-zinc-200 dark:border-zinc-800"
                  >
                    [В разработке]
                  </button>
                ) : !isUnlocked ? (
                  <button
                    disabled
                    className="w-full py-2.5 px-3 bg-zinc-100 dark:bg-zinc-950 text-zinc-400 dark:text-zinc-600 font-mono text-xs uppercase cursor-not-allowed border border-zinc-200 dark:border-zinc-800"
                  >
                    [Нужен Модуль #{lesson.number - 1}]
                  </button>
                ) : (
                  <button
                    onClick={() => onStartLesson(lesson.id)}
                    className={`w-full py-2.5 px-3 font-mono text-xs uppercase tracking-wider font-bold transition-colors border text-center cursor-pointer shadow-2xs ${
                      isExam
                        ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-700'
                        : isPassed
                        ? 'bg-emerald-700 hover:bg-emerald-600 text-white border-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:border-emerald-500'
                        : 'bg-zinc-950 dark:bg-[#0033CC] hover:bg-zinc-800 dark:hover:bg-blue-600 text-white border-zinc-950 dark:border-blue-500'
                    }`}
                  >
                    {isPassed ? 'Повторить модуль →' : isExam ? 'Начать экзамен →' : 'Открыть модуль →'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
