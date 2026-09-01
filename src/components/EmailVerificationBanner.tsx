import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const EmailVerificationBanner: React.FC = () => {
  const { user, isEmailVerified, sendVerificationEmail, checkEmailVerification, simulateVerifyEmailForTesting } = useAuth();
  const [resending, setResending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!user || isEmailVerified) {
    return null;
  }

  const handleResend = async () => {
    setMessage(null);
    setError(null);
    setResending(true);
    try {
      await sendVerificationEmail();
      setMessage('✓ Письмо с подтверждением повторно отправлено. Проверьте почтовый ящик.');
    } catch (err: any) {
      if (err.code === 'auth/too-many-requests') {
        setError('Подождите 1 минуту перед повторным запросом.');
      } else {
        setError(err.message || 'Ошибка отправки письма');
      }
    } finally {
      setResending(false);
    }
  };

  const handleCheck = async () => {
    setMessage(null);
    setError(null);
    setChecking(true);
    try {
      const verified = await checkEmailVerification();
      if (verified) {
        setMessage('✓ Почта успешно подтверждена!');
      } else {
        setError('Ссылка в письме еще не была активирована. Пожалуйста, откройте письмо и перейдите по ссылке.');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка проверки');
    } finally {
      setChecking(false);
    }
  };

  const handleSimulate = async () => {
    try {
      await simulateVerifyEmailForTesting();
      setMessage('✓ Email подтвержден в демо-режиме.');
    } catch (err: any) {
      setError(err.message || 'Ошибка подтверждения');
    }
  };

  return (
    <div id="email-verification-banner" className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-300 dark:border-amber-700/60 text-amber-950 dark:text-amber-100 px-4 py-3 font-sans transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
          <div>
            <span className="font-bold uppercase tracking-wider text-[11px] text-amber-900 dark:text-amber-300">
              [Требуется подтверждение Email]
            </span>
            <span className="font-sans ml-2 text-xs text-amber-900 dark:text-amber-200">
              Пожалуйста, подтвердите адрес <strong className="font-mono">{user.email}</strong> для полноценного доступа к визовому трекеру и сертификатам.
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
          <button
            type="button"
            id="banner-check-verification-btn"
            onClick={handleCheck}
            disabled={checking}
            className="px-3 py-1.5 bg-amber-950 dark:bg-amber-300 hover:bg-black dark:hover:bg-amber-200 text-white dark:text-amber-950 uppercase font-bold transition-colors cursor-pointer"
          >
            {checking ? 'Проверка...' : '✓ Проверить статус'}
          </button>

          <button
            type="button"
            id="banner-resend-verification-btn"
            onClick={handleResend}
            disabled={resending}
            className="px-3 py-1.5 bg-white dark:bg-zinc-900 hover:bg-amber-100 dark:hover:bg-zinc-800 text-amber-950 dark:text-amber-200 border border-amber-400 dark:border-amber-700 uppercase transition-colors cursor-pointer"
          >
            {resending ? 'Отправка...' : '✉️ Отправить повторно'}
          </button>

          <button
            type="button"
            onClick={handleSimulate}
            className="px-2 py-1.5 bg-amber-200/70 dark:bg-amber-900/60 hover:bg-amber-300 dark:hover:bg-amber-800 text-amber-900 dark:text-amber-300 uppercase text-[10px] transition-colors cursor-pointer"
            title="Быстрое подтверждение для тестирования"
          >
            [Демо-активация]
          </button>
        </div>
      </div>

      {(message || error) && (
        <div className="max-w-7xl mx-auto mt-2 font-sans text-xs">
          {message && <div className="text-emerald-700 dark:text-emerald-400 font-medium">{message}</div>}
          {error && <div className="text-rose-700 dark:text-rose-400 font-medium">{error}</div>}
        </div>
      )}
    </div>
  );
};
