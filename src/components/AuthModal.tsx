import React, { useState } from 'react';
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
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 font-sans">
      <div className="bg-white dark:bg-zinc-900 border border-black dark:border-zinc-700 max-w-md w-full p-8 relative flex flex-col gap-6 max-h-[92vh] overflow-y-auto shadow-2xl transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 font-mono text-sm p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer"
        >
          [X]
        </button>

        {/* Brand Header */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
            [DELFI PLATFORM] • Аутентификация
          </div>
          <h2 className="font-serif text-3xl font-normal text-zinc-950 dark:text-white">
            {isSignUp ? 'Регистрация' : 'Вход в аккаунт'}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans mt-1">
            {isSignUp
              ? 'Создайте учетную запись. Сразу после регистрации потребуется подтверждение email.'
              : 'Введите учетные данные для доступа к учебным материалам.'}
          </p>
        </div>

        {/* Google Sign-In */}
        <button
          type="button"
          id="google-signin-btn"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-750 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-mono text-xs uppercase tracking-wider py-3 px-4 transition-colors flex items-center justify-center gap-3 cursor-pointer"
        >
          <span>Войти через Google Account</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800"></div>
          <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase">или по email</span>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800"></div>
        </div>

        {error && (
          <div className="border border-zinc-400 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 p-4 font-mono text-xs text-zinc-900 dark:text-zinc-100 flex flex-col gap-1">
            <div className="font-bold uppercase text-[10px]">[Сообщение системы]</div>
            <div className="font-sans text-xs">{error}</div>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-mono text-xs">
          {isSignUp && (
            <div>
              <label className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1">
                Имя и фамилия
              </label>
              <input
                id="auth-name-input"
                type="text"
                required
                placeholder="Наталья Чернова"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 font-mono text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-black dark:focus:border-white rounded-none"
              />
            </div>
          )}

          <div>
            <label className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1">
              Адрес Email (требуется подтверждение)
            </label>
            <input
              id="auth-email-input"
              type="email"
              required
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 font-mono text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-black dark:focus:border-white rounded-none"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1">
              Пароль
            </label>
            <input
              id="auth-password-input"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 font-mono text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-black dark:focus:border-white rounded-none"
            />
          </div>

          {isSignUp && (
            <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-750 text-[10px] text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
              [Информация] После отправки формы вам будет направлено письмо для верификации адреса. Если письма нет во входящих, проверьте вкладку Спам.
            </div>
          )}

          <button
            id="auth-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full bg-black dark:bg-blue-600 hover:bg-[#0033CC] dark:hover:bg-blue-500 text-white font-mono text-xs uppercase tracking-wider py-3.5 border border-black dark:border-blue-500 font-bold transition-colors mt-2 cursor-pointer"
          >
            {loading ? 'Обработка...' : isSignUp ? 'Зарегистрироваться ->' : 'Войти в личный кабинет ->'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center font-mono text-xs text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-200 dark:border-zinc-800">
          {isSignUp ? 'Уже есть аккаунт?' : 'Впервые на платформе?'}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="text-black dark:text-blue-400 font-bold underline ml-1.5 cursor-pointer"
          >
            {isSignUp ? 'Войти' : 'Создать аккаунт'}
          </button>
        </div>
      </div>
    </div>
  );
};
