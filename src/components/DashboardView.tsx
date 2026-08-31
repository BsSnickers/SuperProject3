import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LESSONS_DATA } from '../data/lessonsData';
import { AU_PAIR_STAGES, AUSBILDUNG_STAGES, PROGRAM_STATUS_MAP } from '../data/programsData';
import { NavTab } from './Sidebar';

interface DashboardViewProps {
  onStartLesson: (lessonId: string) => void;
  onNavigateTab: (tab: NavTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onStartLesson, onNavigateTab }) => {
  const { profile, progress } = useAuth();
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
  const auPairStatusInfo = PROGRAM_STATUS_MAP[profile?.auPairStatus || 'in_progress'] || PROGRAM_STATUS_MAP.in_progress;

  return (
    <div id="dashboard-view" className="p-6 md:p-10 max-w-7xl mx-auto flex flex-col gap-10 font-sans">
      {/* Top Editorial Header */}
      <div className="border-b border-zinc-300 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
            <span>Delfi System</span>
            <span>/</span>
            <span>Панель студента</span>
            <span>/</span>
            <span className="text-[#0033CC]">Goethe A1</span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-normal text-zinc-950 tracking-tight">
            {profile?.displayName ? `Willkommen, ${profile.displayName}.` : 'Willkommen bei Delfi.'}
          </h1>
          <p className="text-sm text-zinc-600 font-normal mt-2 max-w-2xl">
            Подготовка к экзамену Goethe-Zertifikat A1 и синхронизированный трекинг документов для Au-Pair и Ausbildung.
          </p>
        </div>

        {/* Minimalist Streak Widget */}
        <div className="border border-zinc-300 bg-white p-4 shrink-0 font-mono text-xs flex items-center gap-6">
          <div>
            <div className="text-[9px] uppercase tracking-wider text-zinc-400">Дней подряд</div>
            <div className="text-xl font-bold text-zinc-950 font-serif">
              {profile?.streakDays || 1} дн.
            </div>
          </div>
          <div className="border-l border-zinc-200 pl-4">
            <div className="text-[9px] uppercase tracking-wider text-zinc-400">Тест A1</div>
            <div className="text-xs font-bold text-[#0033CC] uppercase mt-0.5">В процессе</div>
          </div>
        </div>
      </div>

      {/* 3-Column Metrics Hero: Crisp Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-300 border border-zinc-300">
        {/* Metric 1 */}
        <div className="bg-white p-8 flex flex-col justify-between gap-6">
          <div className="flex items-start justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              § 01 / Прогресс A1
            </span>
            <span className="font-mono text-xs text-zinc-900 border border-zinc-200 px-2 py-0.5 bg-[#FAFAFA]">
              {passedLessonsCount} из {totalActiveLessons}
            </span>
          </div>
          <div>
            <div className="font-serif text-5xl text-zinc-950 font-normal">
              {coursePercent}%
            </div>
            <div className="w-full bg-zinc-200 h-1 mt-4 overflow-hidden">
              <div
                className="bg-black h-1 transition-all duration-300"
                style={{ width: `${coursePercent}%` }}
              />
            </div>
          </div>
          <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
            {passedLessonsCount === totalActiveLessons ? 'Все модули курса завершены' : `Осталось ${totalActiveLessons - passedLessonsCount} модулей`}
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-8 flex flex-col justify-between gap-6">
          <div className="flex items-start justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              § 02 / Средний балл
            </span>
            <span className="font-mono text-xs text-[#0033CC] border border-zinc-200 px-2 py-0.5 bg-[#FAFAFA]">
              Порог 70%
            </span>
          </div>
          <div>
            <div className="font-serif text-5xl text-zinc-950 font-normal">
              {avgScore > 0 ? `${avgScore}%` : '—'}
            </div>
          </div>
          <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
            {avgScore >= 70 ? 'Готовность к сдаче экзамена: подтверждена' : 'Требуется тренировка тестов'}
          </div>
        </div>

        {/* Metric 3: Next Lesson */}
        <div className="bg-zinc-950 text-white p-8 flex flex-col justify-between gap-6">
          <div className="flex items-start justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              § 03 / Текущий урок
            </span>
            <span className="font-mono text-[10px] uppercase text-zinc-300 border border-zinc-700 px-2 py-0.5">
              Модуль #{nextLesson.number}
            </span>
          </div>
          <div>
            <div className="font-serif text-2xl font-normal text-white">
              {nextLesson.titleDe}
            </div>
            <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
              {nextLesson.titleRu}
            </p>
          </div>
          <button
            id="dashboard-continue-btn"
            onClick={() => onStartLesson(nextLesson.id)}
            className="w-full py-3 px-4 bg-white hover:bg-[#0033CC] text-zinc-950 hover:text-white transition-colors font-mono text-xs uppercase tracking-wider font-bold text-center"
          >
            Открыть урок #{nextLesson.number} →
          </button>
        </div>
      </div>

      {/* Relocation Trackers Row */}
      <div className="flex flex-col gap-4">
        <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
          [Программы переезда в Германию]
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Au-Pair Tracker Box */}
          <div
            id="dashboard-au-pair-widget"
            onClick={() => onNavigateTab('au-pair')}
            className="border border-zinc-300 bg-white p-6 hover:border-black transition-colors cursor-pointer flex flex-col justify-between gap-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  Программа 01
                </span>
                <h3 className="font-serif text-2xl text-zinc-950 font-normal mt-1">
                  Au-Pair в Германии
                </h3>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 border border-zinc-300 bg-[#FAFAFA] text-zinc-800">
                {auPairStatusInfo.label}
              </span>
            </div>

            <div className="border border-zinc-200 bg-[#FAFAFA] p-4 font-mono text-xs">
              <div className="font-bold text-zinc-900 mb-1">
                Этап {currentAuPairStage.number}/8: {currentAuPairStage.titleRu}
              </div>
              <p className="text-zinc-600 line-clamp-2 text-[11px]">
                {profile?.auPairNotes || currentAuPairStage.description}
              </p>
            </div>

            <div className="font-mono text-xs uppercase tracking-wider text-zinc-950 font-bold">
              Перейти к чек-листу Au-Pair →
            </div>
          </div>

          {/* Ausbildung Tracker Box */}
          <div
            id="dashboard-ausbildung-widget"
            onClick={() => onNavigateTab('ausbildung')}
            className="border border-zinc-300 bg-white p-6 hover:border-black transition-colors cursor-pointer flex flex-col justify-between gap-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  Программа 02
                </span>
                <h3 className="font-serif text-2xl text-zinc-950 font-normal mt-1">
                  Ausbildung (Дуальное обучение)
                </h3>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 border border-zinc-300 bg-[#FAFAFA] text-zinc-800">
                {PROGRAM_STATUS_MAP[profile?.ausbildungStatus || 'not_started'].label}
              </span>
            </div>

            <div className="border border-zinc-200 bg-[#FAFAFA] p-4 font-mono text-xs">
              <div className="font-bold text-zinc-900 mb-1">
                Этап {profile?.ausbildungStageId || 1}/9: {AUSBILDUNG_STAGES[(profile?.ausbildungStageId || 1) - 1]?.titleRu}
              </div>
              <p className="text-zinc-600 line-clamp-2 text-[11px]">
                {profile?.ausbildungNotes || 'Подготовьте резюме (Lebenslauf) и нотариальный перевод аттестата.'}
              </p>
            </div>

            <div className="font-mono text-xs uppercase tracking-wider text-zinc-950 font-bold">
              Перейти к трекеру Ausbildung →
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Catalog Section */}
      <div className="flex flex-col gap-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-300 pb-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              § 04 / Каталог заданий
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-zinc-950 font-normal mt-1">
              Учебные модули Goethe A1
            </h2>
          </div>

          {/* Minimalist Filter Form */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="bg-white text-zinc-900 border border-zinc-300 px-3 py-2 uppercase tracking-wider rounded-none focus:outline-none focus:border-black"
            >
              <option value="all">Уровень: Все</option>
              <option value="A1.1">A1.1</option>
              <option value="A1.2">A1.2</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white text-zinc-900 border border-zinc-300 px-3 py-2 uppercase tracking-wider rounded-none focus:outline-none focus:border-black"
            >
              <option value="all">Статус: Все</option>
              <option value="completed">Пройденные</option>
              <option value="not_completed">Не пройденные</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white text-zinc-900 border border-zinc-300 px-3 py-2 uppercase tracking-wider rounded-none focus:outline-none focus:border-black"
            >
              <option value="number">По номеру</option>
              <option value="learners">По популярности</option>
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
            const isUnlocked = lesson.number === 1 || (prevLesson && progress[prevLesson.id]?.passed);

            return (
              <div
                key={lesson.id}
                id={`lesson-card-${lesson.id}`}
                className="border border-zinc-300 bg-white p-6 flex flex-col justify-between gap-6 hover:border-black transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="font-mono text-xs text-zinc-400">
                      [Paper #{lesson.number < 10 ? `0${lesson.number}` : lesson.number}]
                    </span>
                    <span className="font-mono text-[10px] border border-zinc-300 px-1.5 py-0.5 text-zinc-600 bg-[#FAFAFA]">
                      {lesson.estimatedMinutes} мин
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-normal text-zinc-950 mb-1">
                    {lesson.titleDe}
                  </h3>
                  <p className="text-xs text-zinc-500 mb-4">
                    {lesson.titleRu}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4 font-mono text-[9px] uppercase">
                    {lesson.tags.map((tag) => (
                      <span key={tag} className="border border-zinc-200 px-1.5 py-0.5 text-zinc-500 bg-[#FAFAFA]">
                        {tag}
                      </span>
                    ))}
                    {lesson.isComingSoon && (
                      <span className="border border-amber-300 text-amber-800 px-1.5 py-0.5 bg-amber-50">
                        Скоро
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 font-mono text-xs">
                    <div className="bg-[#FAFAFA] p-2.5">
                      <div className="text-[9px] uppercase text-zinc-400">Студентов</div>
                      <div className="font-bold text-zinc-900 mt-0.5">
                        {lesson.isComingSoon ? '—' : lesson.totalLearners}
                      </div>
                    </div>
                    <div className="bg-[#FAFAFA] p-2.5">
                      <div className="text-[9px] uppercase text-zinc-400">Результат</div>
                      <div className="font-bold mt-0.5">
                        {score !== undefined ? (
                          <span className={isPassed ? 'text-zinc-950' : 'text-zinc-600'}>
                            {score}%
                          </span>
                        ) : (
                          <span className="text-zinc-400">—</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  {lesson.isComingSoon ? (
                    <button
                      disabled
                      className="w-full py-2.5 px-3 bg-zinc-100 text-zinc-400 font-mono text-xs uppercase cursor-not-allowed border border-zinc-200"
                    >
                      [В разработке]
                    </button>
                  ) : !isUnlocked ? (
                    <button
                      disabled
                      className="w-full py-2.5 px-3 bg-zinc-100 text-zinc-400 font-mono text-xs uppercase cursor-not-allowed border border-zinc-200"
                      title="Пройдите предыдущий урок на 70%+"
                    >
                      [Требуется Урок #{lesson.number - 1}]
                    </button>
                  ) : (
                    <button
                      id={`start-lesson-btn-${lesson.id}`}
                      onClick={() => onStartLesson(lesson.id)}
                      className="w-full py-2.5 px-3 bg-zinc-950 hover:bg-zinc-800 text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors border border-zinc-950"
                    >
                      {isPassed ? 'Повторить модуль →' : 'Начать модуль →'}
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
            className="font-mono text-xs uppercase tracking-widest text-zinc-950 hover:text-zinc-600 border-b border-zinc-950 pb-0.5 transition-colors font-bold"
          >
            Все 23 урока курса A1 →
          </button>
        </div>
      </div>
    </div>
  );
};
