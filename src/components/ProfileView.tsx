import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { WeeklyProgressCharts } from './WeeklyProgressCharts';
import { calculateRealAnalytics, RealAnalyticsSummary } from '../utils/analytics';

interface ProfileViewProps {
  onStartLesson?: (lessonId: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onStartLesson }) => {
  const { profile, progress, isEmailVerified, sendVerificationEmail, checkEmailVerification } = useAuth();
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
      <div className="border-b border-zinc-300 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
            [DELFI] • Профиль слушателя курса • #{profile?.uid ? profile.uid.slice(0, 8) : '0000'}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-normal text-zinc-950 tracking-tight flex items-center gap-3">
            <span>{profile?.displayName || 'Студент Delfi'}</span>
            {profile?.role === 'admin' && (
              <span className="font-mono text-[11px] uppercase tracking-wider bg-black text-white px-2.5 py-1 font-bold">
                [Куратор]
              </span>
            )}
          </h1>

          <div className="font-mono text-xs text-zinc-500 mt-3 flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2">
              <span>Email: {profile?.email || 'не указан'}</span>
              {isEmailVerified ? (
                <span className="text-zinc-950 bg-zinc-100 border border-zinc-300 px-2 py-0.5 text-[10px] font-bold uppercase">
                  [Подтвержден]
                </span>
              ) : (
                <span className="text-zinc-900 bg-zinc-100 border border-zinc-400 px-2 py-0.5 text-[10px] font-bold uppercase">
                  [Требует подтверждения]
                </span>
              )}
            </span>
            <span>•</span>
            <span>Статус: <strong>{profile?.role === 'admin' ? 'Куратор' : 'Студент'}</strong></span>
            <span>•</span>
            <span>Регистрация: {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('ru-RU') : '2026'}</span>
          </div>

          {!isEmailVerified && (
            <div className="mt-4 p-4 bg-zinc-100 border border-zinc-300 max-w-xl font-mono text-xs text-zinc-900 flex flex-col gap-2">
              <div className="font-bold text-[11px] uppercase">
                [Обязательная верификация Email]
              </div>
              <p className="font-sans text-xs text-zinc-700">
                Для сохранения визового прогресса подтвердите адрес почты. Если письма нет во входящих, обязательно проверьте папку Спам.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCheck}
                  disabled={checking}
                  className="px-3 py-1.5 bg-black text-white hover:bg-zinc-800 font-bold uppercase text-[10px] cursor-pointer"
                >
                  {checking ? 'Проверка...' : 'Проверить статус'}
                </button>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="px-3 py-1.5 bg-white border border-zinc-400 hover:bg-zinc-200 text-zinc-950 uppercase text-[10px] cursor-pointer"
                >
                  {resending ? 'Отправка...' : 'Отправить письмо повторно'}
                </button>
              </div>
              {statusNotice && (
                <div className="text-xs font-sans text-zinc-900 mt-1 font-medium">{statusNotice}</div>
              )}
            </div>
          )}
        </div>

        {/* Read-only status block */}
        <div className="font-mono text-xs shrink-0 flex flex-col gap-1 text-right">
          <span className="text-[10px] text-zinc-400 uppercase">Уровень доступа:</span>
          <span className="font-bold text-zinc-950 uppercase">
            {profile?.role === 'admin' ? '[Администратор курса]' : '[Студент]'}
          </span>
        </div>
      </div>

      {/* 4 Real Metrics Architectural Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-300 border border-zinc-300 font-mono text-xs">
        <div className="bg-white p-6">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Стрик занятий</div>
          <div className="font-serif text-3xl text-zinc-950 font-normal mt-2">
            {profile?.streakDays || 0} дн.
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">Непрерывная серия</div>
        </div>

        <div className="bg-white p-6">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Сдано модулей</div>
          <div className="font-serif text-3xl text-zinc-950 font-normal mt-2">
            {passedLessonsCount} <span className="text-zinc-400 text-lg">/ {totalLessonsCount}</span>
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">Порог Goethe A1: 70%</div>
        </div>

        <div className="bg-white p-6">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Средний балл</div>
          <div className="font-serif text-3xl text-[#0033CC] font-normal mt-2">
            {avgScore > 0 ? `${avgScore}%` : '—'}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">
            {hasAnyAttempt ? `По ${analytics.lessonDetails.filter(d => d.progress !== null).length} тестам` : 'Нет данных'}
          </div>
        </div>

        <div className="bg-white p-6">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Всего вопросов</div>
          <div className="font-serif text-3xl text-zinc-950 font-normal mt-2">
            {totalQuestionsSolved}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">
            {totalAttempts} попыток тестирования
          </div>
        </div>
      </div>

      {/* Weekly Progress Analytics with Recharts */}
      <WeeklyProgressCharts profile={profile} progress={progress} />

      {/* Detailed Journal of Completed & Available Modules */}
      <div className="border border-zinc-300 bg-white p-6 md:p-8 flex flex-col gap-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
            [Журнал результатов • Реальный прогресс по модулям]
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-zinc-950 font-normal">
            Анализ прохождения модулей A1
          </h2>
          <p className="text-xs text-zinc-500 font-sans mt-1">
            Детальный отчет по всем 21 уроку курса Goethe A1 с реальными результатами и количеством попыток.
          </p>
        </div>

        <div className="overflow-x-auto border border-zinc-200">
          <table className="w-full font-mono text-xs text-left border-collapse">
            <thead className="bg-[#F4F4F5] text-[10px] uppercase tracking-wider text-zinc-500 border-b border-zinc-300">
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
            <tbody className="divide-y divide-zinc-200">
              {lessonDetails.map(({ lesson, progress: prog, status }) => (
                <tr key={lesson.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="p-3 font-bold text-zinc-950 shrink-0">
                    №{lesson.number.toString().padStart(2, '0')}
                  </td>
                  <td className="p-3 font-sans">
                    <div className="font-bold text-zinc-950">{lesson.titleRu}</div>
                    <div className="text-[11px] text-zinc-500 font-mono">{lesson.titleDe}</div>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {status === 'passed' ? (
                      <span className="px-2 py-0.5 bg-zinc-950 text-white font-bold text-[10px] uppercase border border-zinc-950">
                        [Сдано]
                      </span>
                    ) : status === 'failed' ? (
                      <span className="px-2 py-0.5 bg-zinc-100 text-zinc-900 border border-zinc-400 text-[10px] font-bold uppercase">
                        [Не сдано]
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-zinc-100 text-zinc-400 border border-zinc-200 text-[10px] uppercase">
                        [Не начат]
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center font-bold">
                    {prog ? (
                      <span className={prog.scorePercent >= lesson.passThreshold ? 'text-[#0033CC]' : 'text-zinc-800'}>
                        {prog.scorePercent}%
                      </span>
                    ) : (
                      <span className="text-zinc-300">—</span>
                    )}
                  </td>
                  <td className="p-3 text-center text-zinc-600">
                    {prog?.attemptsCount || 0}
                  </td>
                  <td className="p-3 text-right text-zinc-500 whitespace-nowrap text-[11px]">
                    {prog?.completedAt ? new Date(prog.completedAt).toLocaleDateString('ru-RU') : '—'}
                  </td>
                  {onStartLesson && (
                    <td className="p-3 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onStartLesson(lesson.id)}
                        className="px-2.5 py-1 bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-900 text-[10px] uppercase font-bold tracking-wider cursor-pointer"
                      >
                        {prog ? 'Повторить' : 'Пройти'}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Matrix (30 Days) */}
      <div className="border border-zinc-300 bg-white p-6 md:p-8 flex flex-col gap-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
            [Журнал активности за 30 дней]
          </div>
          <h2 className="font-serif text-2xl text-zinc-950 font-normal">
            История ежедневных занятий
          </h2>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-1 font-mono text-xs">
          {past30Days.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 border text-center flex flex-col items-center justify-between gap-2 transition-colors ${
                item.active
                  ? 'bg-zinc-950 text-white border-zinc-950 font-bold'
                  : 'bg-[#FAFAFA] border-zinc-200 text-zinc-400'
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
