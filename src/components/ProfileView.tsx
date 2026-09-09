import React, { useState, useMemo } from 'react';
import { Lock, Flame, CheckCircle2, Award, HelpCircle, Mail, ShieldCheck, Calendar, ArrowRight, BookOpen, BarChart3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { WeeklyProgressCharts } from './WeeklyProgressCharts';
import { calculateRealAnalytics, RealAnalyticsSummary } from '../utils/analytics';
import { LESSONS_DATA } from '../data/lessonsData';
import { WORTSCHATZ_DATA } from '../data/wortschatzData';

interface ProfileViewProps {
  onStartLesson?: (lessonId: string) => void;
  onOpenWortschatz?: (sectionId?: number) => void;
}

interface WortschatzProgressRecord {
  scorePercent: number;
  correctAnswers: number;
  totalQuestions: number;
  passed: boolean;
  completedAt: string;
  attemptsCount: number;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onStartLesson, onOpenWortschatz }) => {
  const { profile, progress, isAdmin, isEmailVerified, sendVerificationEmail, checkEmailVerification } = useAuth();
  const [resending, setResending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);
  const [journalTab, setJournalTab] = useState<'a1' | 'wortschatz'>('a1');

  const wortschatzProgress: Record<number, WortschatzProgressRecord> = useMemo(() => {
    try {
      const saved = localStorage.getItem('delfi_wortschatz_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  }, []);

  const wortschatzPassedCount = useMemo(() => {
    return Object.values(wortschatzProgress).filter((p) => p?.passed).length;
  }, [wortschatzProgress]);

  const totalWordsLearned = wortschatzPassedCount * 50;

  const analytics: RealAnalyticsSummary = useMemo(() => {
    return calculateRealAnalytics(profile, progress);
  }, [profile, progress]);

  const {
    passedLessonsCount,
    totalLessonsCount,
    avgScore,
    totalQuestionsSolved,
    totalAttempts,
    lessonDetails,
    hasAnyAttempt,
  } = analytics;

  // Generate 30 days activity grid
  const today = new Date();
  const past30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (29 - i));
    const dateStr = d.toISOString().split('T')[0];
    const isToday = i === 29;
    const hasActivity = (profile?.activityDates || []).includes(dateStr) || (isToday && hasAnyAttempt);
    return {
      date: dateStr,
      dayNumber: d.getDate(),
      month: d.toLocaleDateString('ru-RU', { month: 'short' }),
      active: hasActivity,
    };
  });

  const handleResend = async () => {
    setStatusNotice(null);
    setResending(true);
    try {
      await sendVerificationEmail();
      setStatusNotice('Письмо с подтверждением отправлено повторно. Проверьте вкладку «Спам».');
    } catch (e: any) {
      setStatusNotice(e.message || 'Ошибка отправки');
    } finally {
      setResending(false);
    }
  };

  const handleCheck = async () => {
    setStatusNotice(null);
    setChecking(true);
    try {
      const verified = await checkEmailVerification();
      if (verified) {
        setStatusNotice('Адрес электронной почты успешно подтвержден.');
      } else {
        setStatusNotice('Почта еще не подтверждена. Перейдите по ссылке из отправленного письма.');
      }
    } catch (e: any) {
      setStatusNotice(e.message || 'Ошибка проверки');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div id="profile-view" className="flex flex-col font-sans transition-colors text-[#0B1F3A] dark:text-[#F4F6F8]">
      {/* Hero Banner with Bavarian Alps - Scrollable, Rectangular Without Rounded Borders */}
      <div
        id="profile-hero-banner"
        className="w-full bg-white dark:bg-[#0B1526] shrink-0 box-border border-b border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden"
      >
        {/* Bavarian Alps High-Resolution Image on the right with smooth fade */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 pointer-events-none overflow-hidden">
          <img
            src="/images/alps.jpg"
            alt="Bayerische Alpen & Königssee, Deutschland"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-85 dark:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent dark:from-[#0B1526] dark:via-[#0B1526]/85 dark:to-transparent" />
        </div>

        {/* Banner Content Container */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 md:py-6 relative z-10">
          <div className="max-w-2xl flex flex-col gap-2">
            <div className="font-heading font-bold text-[11px] uppercase tracking-widest text-[#3B82F6]">
              ЛИЧНЫЙ КАБИНЕТ • УЧЕТНАЯ ЗАПИСЬ
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A] dark:text-white leading-tight tracking-tight flex items-center gap-3">
              <span>{profile?.displayName || 'Студент Delfi'}</span>
              {profile?.role === 'admin' && (
                <span className="text-[10px] uppercase tracking-wider bg-[#3B82F6] text-white px-2.5 py-0.5 rounded-full font-bold shadow-xs">
                  Куратор
                </span>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              Персональный мониторинг успеваемости, сданные модули, визовые программы и статистика активности.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2.5 mt-0.5 border-t border-slate-200/70 dark:border-slate-800/70 text-xs font-medium text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                <span>Сдано: {passedLessonsCount} из {totalLessonsCount} модулей</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                <span>Средний балл: {avgScore}%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                <span>Слов в запасе: {totalWordsLearned}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
        {/* Editorial Profile Header Card */}
        <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="font-heading font-bold text-xs uppercase tracking-widest text-[#3B82F6] mb-1.5 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Личный кабинет слушателя курса</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0B1F3A] dark:text-white tracking-tight flex flex-wrap items-center gap-3">
            <span>{profile?.displayName || 'Студент Delfi'}</span>
            {profile?.role === 'admin' && (
              <span className="text-xs uppercase tracking-wider bg-[#3B82F6] text-white px-3 py-1 rounded-full font-bold shadow-xs">
                Куратор
              </span>
            )}
          </h1>

          <div className="text-xs text-slate-500 dark:text-[#94A3B8] mt-3 flex flex-wrap items-center gap-3 font-medium">
            <span className="flex items-center gap-2">
              <span>{profile?.email || 'email не указан'}</span>
              {isEmailVerified ? (
                <span className="text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                  Подтвержден
                </span>
              ) : (
                <span className="text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                  Требует подтверждения
                </span>
              )}
            </span>
            <span>•</span>
            <span>Статус: <strong className="text-slate-800 dark:text-slate-200">{profile?.role === 'admin' ? 'Куратор' : 'Студент'}</strong></span>
            <span>•</span>
            <span>Регистрация: {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('ru-RU') : '2026'}</span>
          </div>

          {!isEmailVerified && (
            <div className="mt-4 p-4 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 rounded-xl max-w-xl text-xs text-[#0B1F3A] dark:text-zinc-100 flex flex-col gap-2">
              <div className="font-heading font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>Обязательная верификация Email</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Для сохранения визового прогресса подтвердите адрес почты. Если письма нет во входящих, обязательно проверьте папку Спам.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCheck}
                  disabled={checking}
                  className="px-3.5 py-1.5 bg-[#0B1F3A] hover:bg-[#111C2E] dark:bg-[#3B82F6] dark:hover:bg-blue-600 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  {checking ? 'Проверка...' : 'Проверить статус'}
                </button>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="px-3.5 py-1.5 bg-white dark:bg-[#111C2E] border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-[#0B1F3A] dark:text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  {resending ? 'Отправка...' : 'Отправить письмо повторно'}
                </button>
              </div>
              {statusNotice && (
                <div className="text-xs text-slate-700 dark:text-slate-200 mt-1 font-semibold">{statusNotice}</div>
              )}
            </div>
          )}
        </div>

        {/* Read-only status block */}
        <div className="bg-slate-50 dark:bg-[#111C2E] border border-slate-200 dark:border-slate-700/80 rounded-xl p-4 shrink-0 flex flex-col gap-1 min-w-[180px]">
          <span className="text-[11px] text-[#94A3B8] font-bold uppercase tracking-wider">Уровень доступа</span>
          <span className="font-heading font-extrabold text-base text-[#0B1F3A] dark:text-white uppercase">
            {profile?.role === 'admin' ? 'Администратор' : 'Студент курса'}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-[#94A3B8]">ID: #{profile?.uid ? profile.uid.slice(0, 8) : '0000'}</span>
        </div>
      </div>

      {/* 4 Real Metrics Architectural Grid - 4 Rounded Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 flex items-center justify-center mb-3">
            <Flame className="w-5 h-5" />
          </div>
          <div className="text-[11px] uppercase tracking-wider text-[#94A3B8] font-semibold">Стрик занятий</div>
          <div className="font-heading font-extrabold text-3xl text-[#0B1F3A] dark:text-white mt-1">
            {profile?.streakDays || 0} дн.
          </div>
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1 font-medium">Непрерывная серия активности</div>
        </div>

        <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-[11px] uppercase tracking-wider text-[#94A3B8] font-semibold">Сдано модулей</div>
          <div className="font-heading font-extrabold text-3xl text-[#0B1F3A] dark:text-white mt-1">
            {passedLessonsCount} <span className="text-[#94A3B8] dark:text-slate-500 text-lg">/ {totalLessonsCount}</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1 font-medium">Порог Goethe A1: 70%</div>
        </div>

        <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#3B82F6] flex items-center justify-center mb-3">
            <Award className="w-5 h-5" />
          </div>
          <div className="text-[11px] uppercase tracking-wider text-[#94A3B8] font-semibold">Средний балл</div>
          <div className="font-heading font-extrabold text-3xl text-[#3B82F6] mt-1">
            {avgScore > 0 ? `${avgScore}%` : '—'}
          </div>
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1 font-medium">
            {hasAnyAttempt ? `По ${analytics.lessonDetails.filter(d => d.progress !== null).length} тестам` : 'Нет данных'}
          </div>
        </div>

        <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="text-[11px] uppercase tracking-wider text-[#94A3B8] font-semibold">Всего вопросов</div>
          <div className="font-heading font-extrabold text-3xl text-[#0B1F3A] dark:text-white mt-1">
            {totalQuestionsSolved}
          </div>
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1 font-medium">
            {totalAttempts} попыток тестирования
          </div>
        </div>
      </div>

      {/* Weekly Progress Analytics with Recharts */}
      <WeeklyProgressCharts profile={profile} progress={progress} />

      {/* Detailed Journal of Completed & Available Modules */}
      <div className="border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0E1A2D] rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-xs transition-colors">
        <div>
          <div className="font-heading font-bold text-xs uppercase tracking-widest text-[#3B82F6] mb-1">
            Журнал результатов
          </div>
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0B1F3A] dark:text-white">
            {journalTab === 'a1' ? 'Анализ прохождения модулей A1' : 'Анализ прохождения модулей словаря'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#94A3B8] mt-1">
            {journalTab === 'a1'
              ? `Детальный отчет по всем ${LESSONS_DATA.length} урокам курса Goethe A1 с реальными результатами и количеством попыток.`
              : `Детальный отчет по всем ${WORTSCHATZ_DATA.sections.length} тематическим секциям словаря (550 слов) с результатами проверочных тестов.`}
          </p>
        </div>

        {/* Journal Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-[#111C2E] rounded-xl border border-slate-200 dark:border-slate-800 self-start">
          <button
            id="journal-tab-a1"
            type="button"
            onClick={() => setJournalTab('a1')}
            className={`px-4 py-2 rounded-lg font-heading text-xs font-semibold transition-all cursor-pointer ${
              journalTab === 'a1'
                ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#0B1F3A] dark:hover:text-white'
            }`}
          >
            Уроки А1 ({passedLessonsCount}/{totalLessonsCount})
          </button>

          <button
            id="journal-tab-wortschatz"
            type="button"
            onClick={() => setJournalTab('wortschatz')}
            className={`px-4 py-2 rounded-lg font-heading text-xs font-semibold transition-all cursor-pointer ${
              journalTab === 'wortschatz'
                ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#0B1F3A] dark:hover:text-white'
            }`}
          >
            Словарь ({wortschatzPassedCount}/{WORTSCHATZ_DATA.sections.length})
          </button>
        </div>

        {/* Tab 1: A1 Course Modules Table */}
        {journalTab === 'a1' && (
          <div className="overflow-x-auto rounded-xl border border-slate-200/90 dark:border-slate-800">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-[#111C2E] text-[11px] uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] border-b border-slate-200 dark:border-slate-700 font-heading font-semibold">
                <tr>
                  <th className="p-3.5">Модуль</th>
                  <th className="p-3.5">Тема урока</th>
                  <th className="p-3.5">Статус</th>
                  <th className="p-3.5 text-center">Точность</th>
                  <th className="p-3.5 text-center">Попытки</th>
                  <th className="p-3.5 text-right">Дата сдачи</th>
                  {onStartLesson && <th className="p-3.5 text-right">Действие</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800">
                {lessonDetails.map(({ lesson, progress: prog, status }) => {
                  const prevLesson = LESSONS_DATA.find((l) => l.number === lesson.number - 1);
                  const isUnlocked = isAdmin || lesson.number === 1 || (prevLesson && progress[prevLesson.id]?.passed);

                  return (
                    <tr key={lesson.id} className="hover:bg-slate-50 dark:hover:bg-[#111C2E]/60 transition-colors">
                      <td className="p-3.5 font-heading font-bold text-[#0B1F3A] dark:text-white shrink-0">
                        №{lesson.number.toString().padStart(2, '0')}
                      </td>
                      <td className="p-3.5">
                        <div className="font-heading font-semibold text-sm text-[#0B1F3A] dark:text-white">{lesson.titleRu}</div>
                        <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">{lesson.titleDe}</div>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        {status === 'passed' ? (
                          <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold text-xs rounded-full border border-emerald-200 dark:border-emerald-800">
                            Сдано
                          </span>
                        ) : status === 'failed' ? (
                          <span className="px-2.5 py-1 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-semibold rounded-full">
                            Не сдано
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 bg-slate-100 dark:bg-[#111C2E] text-slate-500 dark:text-[#94A3B8] border border-slate-200 dark:border-slate-700 text-xs rounded-full font-medium">
                            Не начат
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-center font-bold">
                        {prog ? (
                          <span className={prog.scorePercent >= lesson.passThreshold ? 'text-[#3B82F6]' : 'text-slate-800 dark:text-slate-300'}>
                            {prog.scorePercent}%
                          </span>
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600">—</span>
                        )}
                      </td>
                      <td className="p-3.5 text-center text-slate-600 dark:text-[#94A3B8]">
                        {prog?.attemptsCount || 0}
                      </td>
                      <td className="p-3.5 text-right text-slate-500 dark:text-[#94A3B8] whitespace-nowrap text-xs">
                        {prog?.completedAt ? new Date(prog.completedAt).toLocaleDateString('ru-RU') : '—'}
                      </td>
                      {onStartLesson && (
                        <td className="p-3.5 text-right whitespace-nowrap">
                          {lesson.isComingSoon ? (
                            <span className="px-3 py-1 bg-slate-100 dark:bg-[#111C2E] text-slate-400 dark:text-slate-500 rounded-lg text-xs font-medium">
                              Скоро
                            </span>
                          ) : !isUnlocked ? (
                            <span
                              title={`Модуль #${lesson.number} заблокирован. Для доступа сначала пройдите Модуль #${lesson.number - 1}`}
                              className="px-3 py-1 bg-slate-100 dark:bg-[#111C2E] text-slate-400 dark:text-slate-500 rounded-lg text-xs font-medium inline-flex items-center gap-1.5"
                            >
                              <Lock size={12} className="shrink-0" />
                              <span>Заблокирован</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => onStartLesson(lesson.id)}
                              className="px-3.5 py-1.5 rounded-lg bg-[#0B1F3A] hover:bg-[#111C2E] dark:bg-[#3B82F6] dark:hover:bg-blue-600 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                            >
                              {prog ? 'Повторить' : 'Пройти'}
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Wortschatz (Vocabulary) Modules Table */}
        {journalTab === 'wortschatz' && (
          <div className="overflow-x-auto rounded-xl border border-slate-200/90 dark:border-slate-800">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-[#111C2E] text-[11px] uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] border-b border-slate-200 dark:border-slate-700 font-heading font-semibold">
                <tr>
                  <th className="p-3.5">Тема</th>
                  <th className="p-3.5">Лексическая тема</th>
                  <th className="p-3.5">Уровень</th>
                  <th className="p-3.5">Статус</th>
                  <th className="p-3.5 text-center">Точность</th>
                  <th className="p-3.5 text-center">Правильно</th>
                  <th className="p-3.5 text-center">Попытки</th>
                  <th className="p-3.5 text-right">Дата сдачи</th>
                  {onOpenWortschatz && <th className="p-3.5 text-right">Действие</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800">
                {WORTSCHATZ_DATA.sections.map((section) => {
                  const prog = wortschatzProgress[section.section_id];
                  const isPassed = prog?.passed;
                  const isFailed = !isPassed && (prog?.attemptsCount || 0) > 0;
                  const levelTag = section.section_id <= 6 ? 'A1.1' : 'A1.2';

                  return (
                    <tr key={section.section_id} className="hover:bg-slate-50 dark:hover:bg-[#111C2E]/60 transition-colors">
                      <td className="p-3.5 font-heading font-bold text-[#0B1F3A] dark:text-white shrink-0">
                        №{section.section_id.toString().padStart(2, '0')}
                      </td>
                      <td className="p-3.5">
                        <div className="font-heading font-semibold text-sm text-[#0B1F3A] dark:text-white">{section.title_ru}</div>
                        <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">
                          {section.title_de} • {section.word_count} слов
                        </div>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#111C2E] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
                          {levelTag}
                        </span>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        {isPassed ? (
                          <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold text-xs rounded-full border border-emerald-200 dark:border-emerald-800">
                            Сдано
                          </span>
                        ) : isFailed ? (
                          <span className="px-2.5 py-1 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-semibold rounded-full">
                            Не сдано
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 bg-slate-100 dark:bg-[#111C2E] text-slate-500 dark:text-[#94A3B8] border border-slate-200 dark:border-slate-700 text-xs rounded-full font-medium">
                            Не начат
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-center font-bold">
                        {prog ? (
                          <span className={prog.scorePercent >= 70 ? 'text-[#3B82F6]' : 'text-slate-800 dark:text-slate-300'}>
                            {prog.scorePercent}%
                          </span>
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600">—</span>
                        )}
                      </td>
                      <td className="p-3.5 text-center text-slate-600 dark:text-[#94A3B8]">
                        {prog ? `${prog.correctAnswers} / ${prog.totalQuestions}` : `—`}
                      </td>
                      <td className="p-3.5 text-center text-slate-600 dark:text-[#94A3B8]">
                        {prog?.attemptsCount || 0}
                      </td>
                      <td className="p-3.5 text-right text-slate-500 dark:text-[#94A3B8] whitespace-nowrap text-xs">
                        {prog?.completedAt ? new Date(prog.completedAt).toLocaleDateString('ru-RU') : '—'}
                      </td>
                      {onOpenWortschatz && (
                        <td className="p-3.5 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => onOpenWortschatz(section.section_id)}
                            className="px-3.5 py-1.5 rounded-lg bg-[#0B1F3A] hover:bg-[#111C2E] dark:bg-[#3B82F6] dark:hover:bg-blue-600 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                          >
                            {prog ? 'Повторить' : 'Пройти'}
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Activity Matrix (30 Days) */}
      <div className="border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0E1A2D] rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-xs transition-colors">
        <div>
          <div className="font-heading font-bold text-xs uppercase tracking-widest text-[#3B82F6] mb-1">
            Журнал активности за 30 дней
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-[#0B1F3A] dark:text-white">
            История ежедневных занятий
          </h2>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-0.5">
            Каждый активный день тренировок приближает вас к успешной сдаче языкового экзамена Start Deutsch 1.
          </p>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
          {past30Days.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-center flex flex-col items-center justify-between gap-1.5 transition-all shadow-xs ${
                item.active
                  ? 'bg-[#3B82F6] text-white border-[#3B82F6] font-bold shadow-blue-500/20'
                  : 'bg-slate-50 dark:bg-[#111C2E]/80 border-slate-200 dark:border-slate-700/60 text-[#94A3B8] dark:text-slate-500'
              }`}
              title={`${item.date}: ${item.active ? 'Занятие выполнено' : 'Нет активности'}`}
            >
              <span className="text-[10px] uppercase opacity-75">{item.month}</span>
              <span className="font-heading font-bold text-lg leading-none">{item.dayNumber}</span>
              <span className="text-[10px] uppercase font-semibold">{item.active ? 'Активен' : '—'}</span>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};
