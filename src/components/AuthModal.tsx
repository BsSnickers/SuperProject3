import React, { useState } from 'react';
import { X, Mail, Lock, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
}) => {
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        if (!name.trim()) {
          setError('Пожалуйста, укажите имя пользователя');
          setLoading(false);
          return;
        }
        await signUp(email.trim(), password, name.trim());
        onClose();
      } else {
        await signIn(email.trim(), password);
        onClose();
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found'
      ) {
        setError('Неверный адрес электронной почты или пароль.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Данный email уже зарегистрирован в системе.');
      } else if (err.code === 'auth/weak-password') {
        setError('Пароль должен содержать не менее 6 символов.');
      } else {
        setError(err.message || 'Ошибка авторизации');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Окно авторизации Google было закрыто.');
      } else {
        setError(err.message || 'Ошибка входа через Google.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 font-sans animate-fade-in">
      <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 md:p-8 relative flex flex-col gap-6 max-h-[92vh] overflow-y-auto shadow-2xl transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200/80 dark:border-slate-800">
          <img
            src="/delfi-logo-circle.svg"
            alt="DELFI"
            className="w-12 h-12 rounded-full shadow-xs shrink-0 object-contain"
          />
          <div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#3B82F6] font-bold">
              DELFI TRAINING PLATFORM
            </div>
            <h2 className="font-heading font-extrabold text-2xl text-[#0B1F3A] dark:text-white mt-0.5">
              {isSignUp ? 'Создать аккаунт' : 'Вход в аккаунт'}
            </h2>
            <p className="text-xs text-[#94A3B8] font-medium mt-0.5">
              {isSignUp
                ? 'Пройдите регистрацию для доступа к урокам и программам.'
                : 'Войдите для продолжения обучения и сохранения прогресса.'}
            </p>
          </div>
        </div>

        {/* Google Sign-In */}
        <button
          type="button"
          id="google-signin-btn"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-[#F4F6F8] dark:bg-[#111C2E] hover:bg-slate-200/70 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0B1F3A] dark:text-white font-semibold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Продолжить через Google</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
          <span className="text-[11px] text-[#94A3B8] font-medium uppercase">или по email</span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl flex items-start gap-2.5 text-xs text-red-700 dark:text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          {isSignUp && (
            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                Ваше имя
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  id="auth-name-input"
                  type="text"
                  required
                  placeholder="Анна Смирнова"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#F4F6F8] dark:bg-[#111C2E] border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-[#0B1F3A] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 focus:border-[#3B82F6] transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
              Адрес электронной почты
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                id="auth-email-input"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#F4F6F8] dark:bg-[#111C2E] border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-[#0B1F3A] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 focus:border-[#3B82F6] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
              Пароль
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                id="auth-password-input"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#F4F6F8] dark:bg-[#111C2E] border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-[#0B1F3A] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 focus:border-[#3B82F6] transition-all"
              />
            </div>
          </div>

          {isSignUp && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 rounded-xl text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              После регистрации вам будет отправлено письмо для подтверждения email. Если письмо не пришло, проверьте папку Спам.
            </div>
          )}

          <button
            id="auth-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full bg-[#0B1F3A] hover:bg-[#152e54] text-white text-xs font-semibold py-3 rounded-xl shadow-xs transition-colors mt-1 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Обработка...' : isSignUp ? 'Зарегистрироваться →' : 'Войти в личный кабинет →'}
          </button>
        </form>

        {/* Switch mode */}
        <div className="text-center text-xs text-[#94A3B8] pt-2 border-t border-slate-200/80 dark:border-slate-800">
          {isSignUp ? 'Уже есть аккаунт?' : 'Впервые на платформе?'}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="text-[#3B82F6] font-semibold hover:underline ml-1.5 cursor-pointer"
          >
            {isSignUp ? 'Войти' : 'Создать аккаунт'}
          </button>
        </div>
      </div>
    </div>
  );
};
