import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const EmailVerificationScreen: React.FC = () => {
  const { user, checkEmailVerification, sendVerificationEmail, signOut } = useAuth();
  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCheck = async () => {
    setInfoMessage(null);
    setErrorMessage(null);
    setChecking(true);
    try {
      const isVerified = await checkEmailVerification();
      if (isVerified) {
        setInfoMessage('[OK] Адрес электронной почты успешно подтвержден.');
      } else {
        setErrorMessage('Почтовый адрес еще не подтвержден. Пожалуйста, откройте письмо и перейдите по ссылке активации.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Ошибка проверки статуса верификации.');
    } finally {
      setChecking(false);
    }
  };

  const handleResend = async () => {
    setInfoMessage(null);
    setErrorMessage(null);
    setResending(true);
    try {
      await sendVerificationEmail();
      setInfoMessage('[OK] Письмо со ссылкой отправлено повторно. Обязательно проверьте вкладку Спам.');
    } catch (err: any) {
      if (err.code === 'auth/too-many-requests') {
        setErrorMessage('Слишком много запросов. Пожалуйста, подождите 1-2 минуты перед повторной отправкой.');
      } else {
        setErrorMessage(err.message || 'Не удалось отправить письмо повторно.');
      }
    } finally {
      setResending(false);
    }
  };

  return (
    <div id="email-verification-gate" className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 font-sans">
      <div className="bg-white dark:bg-zinc-900 border border-black dark:border-zinc-700 max-w-md w-full p-8 relative flex flex-col gap-6 max-h-[92vh] overflow-y-auto shadow-2xl transition-colors">
        {/* Sign out button at top right */}
        <button
          onClick={() => signOut()}
          title="Выйти из аккаунта"
          className="absolute right-4 top-4 font-mono text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 cursor-pointer"
        >
          [Выход]
        </button>

        {/* Brand Header matching AuthModal */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
            [DELFI PLATFORM] • Верификация
          </div>
          <h2 className="font-serif text-3xl font-normal text-zinc-950 dark:text-white">
            Подтверждение Email
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans mt-1">
            Для доступа к материалам и сохранения результатов подтвердите ваш почтовый адрес.
          </p>
        </div>

        {/* Target Email Box */}
        <div className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 p-3.5 font-mono text-xs flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Адрес получателя:
          </span>
          <span className="font-bold text-zinc-950 dark:text-white break-all text-sm">
            {user?.email || 'Ваш email'}
          </span>
        </div>

        {/* Spam instruction box matching AuthModal prompt style */}
        <div className="p-3 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 font-sans text-xs text-zinc-800 dark:text-zinc-300 flex flex-col gap-1.5">
          <div className="font-mono font-bold text-[10px] uppercase tracking-wider text-zinc-950 dark:text-white">
            [Инструкция по активации]
          </div>
          <p className="leading-relaxed">
            Мы отправили ссылку для активации. Откройте сообщение и нажмите на ссылку в письме.
          </p>
          <div className="p-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 font-mono text-[11px] text-zinc-900 dark:text-zinc-200 leading-snug">
            Внимание: если письмо не пришло во входящие в течение 1–2 минут, обязательно проверьте папку Спам или Рассылки.
          </div>
        </div>

        {/* Status / Error Alerts matching AuthModal */}
        {infoMessage && (
          <div className="border border-black dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 p-3 font-mono text-xs text-zinc-950 dark:text-white flex flex-col gap-1">
            <div className="font-bold uppercase text-[10px]">[Статус системы]</div>
            <div className="font-sans text-xs">{infoMessage}</div>
          </div>
        )}

        {errorMessage && (
          <div className="border border-zinc-400 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 p-3 font-mono text-xs text-zinc-900 dark:text-zinc-100 flex flex-col gap-1">
            <div className="font-bold uppercase text-[10px]">[Сообщение системы]</div>
            <div className="font-sans text-xs">{errorMessage}</div>
          </div>
        )}

        {/* Main Action Buttons */}
        <div className="flex flex-col gap-3 font-mono text-xs">
          <button
            id="gate-check-verification-btn"
            type="button"
            onClick={handleCheck}
            disabled={checking}
            className="w-full bg-black dark:bg-blue-600 hover:bg-[#0033CC] dark:hover:bg-blue-500 text-white font-mono text-xs uppercase tracking-wider py-3.5 border border-black dark:border-blue-500 font-bold transition-colors cursor-pointer"
          >
            {checking ? 'Проверка статуса...' : 'Проверить подтверждение'}
          </button>

          <button
            id="gate-resend-verification-btn"
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="w-full bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-750 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-mono text-xs uppercase tracking-wider py-3 px-4 transition-colors cursor-pointer"
          >
            {resending ? 'Отправка...' : 'Отправить письмо повторно'}
          </button>
        </div>

        {/* Bottom Switch/Exit Line matching AuthModal */}
        <div className="text-center font-mono text-xs text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-1.5">
          <span>Указали другой email?</span>
          <button
            type="button"
            onClick={() => signOut()}
            className="text-black dark:text-blue-400 font-bold underline cursor-pointer"
          >
            Войти с другого аккаунта
          </button>
        </div>
      </div>
    </div>
  );
};
