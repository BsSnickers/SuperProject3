import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
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
      setMessage('Письмо с подтверждением отправлено повторно. Проверьте ваш почтовый ящик.');
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
        setMessage('Почта успешно подтверждена!');
      } else {
        setError('Ссылка в письме еще не активирована. Пожалуйста, откройте письмо и подтвердите адрес.');
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
      setMessage('Email подтвержден в тестовом режиме.');
    } catch (err: any) {
      setError(err.message || 'Ошибка подтверждения');
    }
  };

  return (
    <div id="email-verification-banner" className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-100 px-4 py-2.5 font-sans transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0"></span>
          <div>
            <span className="font-semibold text-amber-900 dark:text-amber-300">
              Подтверждение Email:
            </span>
            <span className="ml-1.5 text-amber-800 dark:text-amber-200">
              Подтвердите адрес <strong className="font-medium">{user.email}</strong> для доступа ко всем материалам.
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            type="button"
            id="banner-check-verification-btn"
            onClick={handleCheck}
            disabled={checking}
            className="px-3 py-1 bg-[#0B1F3A] hover:bg-[#152e54] text-white font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            {checking ? 'Проверка...' : 'Проверить статус'}
          </button>

          <button
            type="button"
            id="banner-resend-verification-btn"
            onClick={handleResend}
            disabled={resending}
            className="px-3 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700/80 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            {resending ? 'Отправка...' : 'Отправить повторно'}
          </button>

          <button
            type="button"
            onClick={handleSimulate}
            className="px-2 py-1 bg-amber-200/60 dark:bg-amber-900/40 hover:bg-amber-200 text-amber-900 dark:text-amber-300 text-[11px] rounded-md transition-colors cursor-pointer"
            title="Быстрое подтверждение для тестирования"
          >
            Демо-активация
          </button>
        </div>
      </div>

      {(message || error) && (
        <div className="max-w-7xl mx-auto mt-2 text-xs">
          {message && <div className="text-emerald-700 dark:text-emerald-400 font-medium">{message}</div>}
          {error && <div className="text-rose-700 dark:text-rose-400 font-medium">{error}</div>}
        </div>
      )}
    </div>
  );
};
