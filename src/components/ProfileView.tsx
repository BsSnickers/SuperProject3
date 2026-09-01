import React, { useState, useMemo } from 'react';
import { Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { WeeklyProgressCharts } from './WeeklyProgressCharts';
import { calculateRealAnalytics, RealAnalyticsSummary } from '../utils/analytics';
import { LESSONS_DATA } from '../data/lessonsData';

interface ProfileViewProps {
  onStartLesson?: (lessonId: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onStartLesson }) => {
  const { profile, progress, isAdmin, isEmailVerified, sendVerificationEmail, checkEmailVerification } = useAuth();
  const [resending, setResending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

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
      setStatusNotice('[OK] Письмо с подтверждением отправлено повторно. Проверьте вкладку Спам.');
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
        setStatusNotice('[OK] Адрес электронной почты подтвержден.');
      } else {
        setStatusNotice('Почта еще не подтверждена. Перейдите по ссылке из письма.');
      }
    } catch (e: any) {
      setStatusNotice(e.message || 'Ошибка проверки');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div id="profile-view" className="p-6 md:p-10 max-w-7xl mx-auto flex flex-col gap-10 font-sans">
      {/* Editorial Profile Header */}
      <div className="border-b border-zinc-300 dark:border-zinc-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
            [DELFI] • Профиль слушателя курса • #{profile?.uid ? profile.uid.slice(0, 8) : '0000'}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-normal text-zinc-950 dark:text-white tracking-tight flex items-center gap-3">
            <span>{profile?.displayName || 'Студент Delfi'}</span>
            {profile?.role === 'admin' && (
              <span className="font-mono text-[11px] uppercase tracking-wider bg-black dark:bg-zinc-800 text-white px-2.5 py-1 font-bold border border-zinc-700">
                [Куратор]
              </span>
            )}
          </h1>

          <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400 mt-3 flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2">
              <span>Email: {profile?.email || 'не указан'}</span>
              {isEmailVerified ? (
                <span className="text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 px-2 py-0.5 text-[10px] font-bold uppercase">
                  [Подтвержден]
                </span>
              ) : (
                <span className="text-zinc-900 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-700 px-2 py-0.5 text-[10px] font-bold uppercase">
                  [Требует подтверждения]
                </span>
              )}
            </span>
            <span>•</span>
            <span>Статус: <strong className="text-zinc-800 dark:text-zinc-200">{profile?.role === 'admin' ? 'Куратор' : 'Студент'}</strong></span>
            <span>•</span>
            <span>Регистрация: {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('ru-RU') : '2026'}</span>
          </div>

          {!isEmailVerified && (
            <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 max-w-xl font-mono text-xs text-zinc-900 dark:text-zinc-100 flex flex-col gap-2">
              <div className="font-bold text-[11px] uppercase text-zinc-950 dark:text-white">
                [Обязательная верификация Email]
              </div>
              <p className="font-sans text-xs text-zinc-700 dark:text-zinc-300">
                Для сохранения визового прогресса подтвердите адрес почты. Если письма нет во входящих, обязательно проверьте папку Спам.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCheck}
                  disabled={checking}
                  className="px-3 py-1.5 bg-black dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-bold uppercase text-[10px] cursor-pointer"
                >
                  {checking ? 'Проверка...' : 'Проверить статус'}
                </button>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-950 dark:text-white uppercase text-[10px] cursor-pointer"
                >
                  {resending ? 'Отправка...' : 'Отправить письмо повторно'}
                </button>
              </div>
              {statusNotice && (
                <div className="text-xs font-sans text-zinc-900 dark:text-zinc-200 mt-1 font-medium">{statusNotice}</div>
              )}
            </div>
          )}
        </div>

        {/* Read-only status block */}
        <div className="font-mono text-xs shrink-0 flex flex-col gap-1 text-right">
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase">Уровень доступа:</span>
          <span className="font-bold text-zinc-950 dark:text-white uppercase">
            {profile?.role === 'admin' ? '[Администратор курса]' : '[Студент]'}
          </span>
        </div>
      </div>

      {/* 4 Real Metrics Architectural Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-300 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-800 font-mono text-xs">
        <div className="bg-white dark:bg-zinc-900 p-6">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Стрик занятий</div>
          <div className="font-serif text-3xl text-zinc-950 dark:text-white font-normal mt-2">
            {profile?.streakDays || 0} дн.
          </div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">Непрерывная серия</div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Сдано модулей</div>
          <div className="font-serif text-3xl text-zinc-950 dark:text-white font-normal mt-2">
            {passedLessonsCount} <span className="text-zinc-400 dark:text-zinc-500 text-lg">/ {totalLessonsCount}</span>
          </div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">Порог Goethe A1: 70%</div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Средний балл</div>
          <div className="font-serif text-3xl text-[#0033CC] dark:text-blue-400 font-normal mt-2">
            {avgScore > 0 ? `${avgScore}%` : '—'}
          </div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
            {hasAnyAttempt ? `По ${analytics.lessonDetails.filter(d => d.progress !== null).length} тестам` : 'Нет данных'}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Всего вопросов</div>
          <div className="font-serif text-3xl text-zinc-950 dark:text-white font-normal mt-2">
            {totalQuestionsSolved}
          </div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
            {totalAttempts} попыток тестирования
          </div>
        </div>
      </div>

      {/* Weekly Progress Analytics with Recharts */}
      <WeeklyProgressCharts profile={profile} progress={progress} />

      {/* Detailed Journal of Completed & Available Modules */}
      <div className="border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8 flex flex-col gap-6 transition-colors">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
            [Журнал результатов • Реальный прогресс по модулям]
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-zinc-950 dark:text-white font-normal">
            Анализ прохождения модулей A1
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans mt-1">
            Детальный отчет по всем 21 уроку курса Goethe A1 с реальными результатами и количеством попыток.
          </p>
        </div>

        <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800">
          <table className="w-full font-mono text-xs text-left border-collapse">
            <thead className="bg-[#F4F4F5] dark:bg-zinc-800 text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-300 dark:border-zinc-700">
              <tr>
                <th className="p-3">Модуль</th>
                <th className="p-3">Тема урока</th>
                <th className="p-3">Статус</th>
                <th className="p-3 text-center">Точность</th>
                <th className="p-3 text-center">Попытки</th>
                <th className="p-3 text-right">Дата сдачи</th>
                {onStartLesson && <th className="p-3 text-right">Действие</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {lessonDetails.map(({ lesson, progress: prog, status }) => {
                const prevLesson = LESSONS_DATA.find((l) => l.number === lesson.number - 1);
                const isUnlocked = isAdmin || lesson.number === 1 || (prevLesson && progress[prevLesson.id]?.passed);

                return (
                  <tr key={lesson.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors">
                    <td className="p-3 font-bold text-zinc-950 dark:text-white shrink-0">
                      №{lesson.number.toString().padStart(2, '0')}
                    </td>
                    <td className="p-3 font-sans">
                      <div className="font-bold text-zinc-950 dark:text-white">{lesson.titleRu}</div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">{lesson.titleDe}</div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {status === 'passed' ? (
                        <span className="px-2 py-0.5 bg-zinc-950 dark:bg-emerald-950 text-white dark:text-emerald-300 font-bold text-[10px] uppercase border border-zinc-950 dark:border-emerald-800">
                          [Сдано]
                        </span>
                      ) : status === 'failed' ? (
                        <span className="px-2 py-0.5 bg-zinc-100 dark:bg-rose-950/50 text-zinc-900 dark:text-rose-300 border border-zinc-400 dark:border-rose-800 text-[10px] font-bold uppercase">
                          [Не сдано]
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-700 text-[10px] uppercase">
                          [Не начат]
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-center font-bold">
                      {prog ? (
                        <span className={prog.scorePercent >= lesson.passThreshold ? 'text-[#0033CC] dark:text-blue-400' : 'text-zinc-800 dark:text-zinc-300'}>
                          {prog.scorePercent}%
                        </span>
                      ) : (
                        <span className="text-zinc-300 dark:text-zinc-600">—</span>
                      )}
                    </td>
                    <td className="p-3 text-center text-zinc-600 dark:text-zinc-400">
                      {prog?.attemptsCount || 0}
                    </td>
                    <td className="p-3 text-right text-zinc-500 dark:text-zinc-400 whitespace-nowrap text-[11px]">
                      {prog?.completedAt ? new Date(prog.completedAt).toLocaleDateString('ru-RU') : '—'}
                    </td>
                    {onStartLesson && (
                      <td className="p-3 text-right whitespace-nowrap">
                        {lesson.isComingSoon ? (
                          <button
                            disabled
                            className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono uppercase cursor-not-allowed"
                          >
                            Скоро
                          </button>
                        ) : !isUnlocked ? (
                          <button
                            disabled
                            title={`Модуль #${lesson.number} заблокирован. Для доступа сначала пройдите Модуль #${lesson.number - 1}`}
                            className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono uppercase cursor-not-allowed flex items-center gap-1.5 ml-auto"
                          >
                            <Lock size={11} className="shrink-0 text-zinc-400 dark:text-zinc-500" />
                            <span>Заблокирован</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onStartLesson(lesson.id)}
                            className="px-2.5 py-1 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white text-[10px] uppercase font-bold tracking-wider cursor-pointer font-mono"
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
      </div>

      {/* Activity Matrix (30 Days) */}
      <div className="border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8 flex flex-col gap-6 transition-colors">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
            [Журнал активности за 30 дней]
          </div>
          <h2 className="font-serif text-2xl text-zinc-950 dark:text-white font-normal">
            История ежедневных занятий
          </h2>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-1 font-mono text-xs">
          {past30Days.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 border text-center flex flex-col items-center justify-between gap-2 transition-colors ${
                item.active
                  ? 'bg-zinc-950 dark:bg-blue-600 text-white border-zinc-950 dark:border-blue-500 font-bold'
                  : 'bg-[#FAFAFA] dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-750 text-zinc-400 dark:text-zinc-500'
              }`}
              title={`${item.date}: ${item.active ? 'Занятие выполнено' : 'Нет активности'}`}
            >
              <span className="text-[9px] uppercase opacity-60">{item.month}</span>
              <span className="font-serif text-lg leading-none">{item.dayNumber}</span>
              <span className="text-[9px] uppercase">{item.active ? '[x]' : '[-]'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
