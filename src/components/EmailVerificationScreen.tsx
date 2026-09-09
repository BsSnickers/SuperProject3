import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, RefreshCw, LogOut } from 'lucide-react';
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
        setInfoMessage('Адрес электронной почты успешно подтвержден! Перенаправляем...');
      } else {
        setErrorMessage('Почтовый адрес еще не подтвержден. Пожалуйста, откройте письмо и перейдите по ссылке.');
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
      setInfoMessage('Письмо со ссылкой отправлено повторно. Обязательно проверьте вкладку Спам.');
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
    <div id="email-verification-gate" className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 font-sans">
      <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 md:p-8 relative flex flex-col gap-6 max-h-[92vh] overflow-y-auto shadow-2xl transition-colors">
        {/* Sign out button at top right */}
        <button
          onClick={() => signOut()}
          title="Выйти из аккаунта"
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Выйти</span>
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200/80 dark:border-slate-800">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#3B82F6] flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#3B82F6] font-bold">
              DELFI PLATFORM
            </div>
            <h2 className="font-heading font-extrabold text-2xl text-[#0B1F3A] dark:text-white mt-0.5">
              Подтвердите Email
            </h2>
            <p className="text-xs text-[#94A3B8] font-medium mt-0.5">
              Для доступа к материалам подтвердите ваш адрес.
            </p>
          </div>
        </div>

        {/* Target Email Box */}
        <div className="bg-[#F4F6F8] dark:bg-[#111C2E] border border-slate-200 dark:border-slate-700/80 rounded-xl p-4 flex flex-col gap-1 text-xs">
          <span className="text-[11px] text-[#94A3B8] font-semibold">Адрес получателя:</span>
          <span className="font-bold text-[#0B1F3A] dark:text-white break-all text-sm">
            {user?.email || 'Ваш email'}
          </span>
        </div>

        {/* Spam instruction box */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 rounded-xl text-xs text-slate-700 dark:text-slate-300 flex flex-col gap-2">
          <div className="font-semibold text-[#0B1F3A] dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
            <span>Инструкция по активации</span>
          </div>
          <p className="leading-relaxed text-[11px] text-slate-600 dark:text-slate-400">
            Мы отправили ссылку для активации. Откройте сообщение в почтовом ящике и нажмите на ссылку в письме.
          </p>
          <div className="p-2.5 bg-white dark:bg-[#0E1A2D] rounded-lg border border-blue-200/70 dark:border-blue-900/60 text-[11px] font-medium text-[#EF1B2D]">
            Важно: если письма нет во входящих в течение 1–2 минут, обязательно проверьте папку Спам или Промоакции.
          </div>
        </div>

        {/* Alerts */}
        {infoMessage && (
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-start gap-2.5 text-xs text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{infoMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-3.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl flex items-start gap-2.5 text-xs text-red-700 dark:text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Main Actions */}
        <div className="flex flex-col gap-2.5">
          <button
            id="gate-check-verification-btn"
            type="button"
            onClick={handleCheck}
            disabled={checking}
            className="w-full bg-[#0B1F3A] hover:bg-[#152e54] text-white text-xs font-semibold py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
            <span>{checking ? 'Проверка...' : 'Я подтвердил почту (Проверить)'}</span>
          </button>

          <button
            id="gate-resend-verification-btn"
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="w-full bg-[#F4F6F8] dark:bg-[#111C2E] hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            {resending ? 'Отправка...' : 'Отправить письмо повторно'}
          </button>
        </div>

        <div className="text-center text-xs text-[#94A3B8] pt-2 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-center gap-1.5">
          <span>Указали не тот адрес?</span>
          <button
            type="button"
            onClick={() => signOut()}
            className="text-[#3B82F6] font-semibold hover:underline cursor-pointer"
          >
            Войти с другого аккаунта
          </button>
        </div>
      </div>
    </div>
  );
};
