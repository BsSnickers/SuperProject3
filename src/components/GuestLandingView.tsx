import React, { useState } from 'react';
import { BookOpen, BarChart3, Users, CheckCircle2, Award, ArrowRight, Sparkles, Flame } from 'lucide-react';

interface GuestLandingViewProps {
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onOpenDemoLesson: () => void;
}

export const GuestLandingView: React.FC<GuestLandingViewProps> = ({
  onOpenAuth,
}) => {
  const [demoSelected, setDemoSelected] = useState<number | null>(null);
  const [demoChecked, setDemoChecked] = useState(false);

  const demoOptions = [
    { text: 'Guten Tag! Ich heiße Anna.', isCorrect: true },
    { text: 'Gute Nacht! Ich habe Anna.', isCorrect: false },
    { text: 'Auf Wiedersehen! Du bist Anna.', isCorrect: false },
    { text: 'Bitte schön! Mein Name ist nicht.', isCorrect: false },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F8] dark:bg-[#070D18] text-[#0B1F3A] dark:text-[#F4F6F8] font-sans flex flex-col justify-between selection:bg-[#3B82F6] selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0B1526]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/delfi-logo-circle.svg"
              alt="DELFI"
              className="w-10 h-10 rounded-full shrink-0 shadow-xs object-contain"
            />
            <div>
              <div className="font-heading font-extrabold text-lg text-[#0B1F3A] dark:text-white tracking-tight leading-none">
                DELFI
              </div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-[#94A3B8] mt-0.5">
                Training Platform
              </div>
            </div>
            <span className="hidden sm:inline-block font-mono text-[11px] uppercase tracking-wider text-slate-400 border-l border-slate-200 dark:border-slate-700 pl-4 ml-1">
              Goethe A1 • Au-Pair • Ausbildung
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              id="landing-signin-nav-btn"
              onClick={() => onOpenAuth('signin')}
              className="text-xs font-semibold px-4 py-2 text-[#0B1F3A] dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              Войти
            </button>
            <button
              id="landing-signup-nav-btn"
              onClick={() => onOpenAuth('signup')}
              className="text-xs font-semibold px-4 py-2 bg-[#EF1B2D] hover:bg-[#d41424] text-white rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Регистрация
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-[#0B1526] border-b border-slate-200/80 dark:border-slate-800">
        {/* Subtle background city image on right */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 pointer-events-none opacity-20 dark:opacity-10 overflow-hidden">
          <img
            src="/roman-kraft-g_gwdpsCVAY-unsplash.jpg"
            alt="Germany"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#0B1526] dark:via-[#0B1526]/80 dark:to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Text */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 self-start bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/60 px-3 py-1 rounded-full text-xs font-semibold text-[#3B82F6]">
              <Sparkles className="w-3.5 h-3.5 text-[#EF1B2D]" />
              <span>Курс Goethe A1 & Программы релокации в Германию</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[44px] text-[#0B1F3A] dark:text-white leading-[1.15] tracking-tight">
              Немецкий язык с нуля до сертификата и переезда по{' '}
              <span className="text-[#3B82F6]">Au-Pair</span> &amp;{' '}
              <span className="text-[#EF1B2D]">Ausbildung</span>.
            </h1>

            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl">
              Интерактивный тренажер A1 из 24 модулей, грамматический справочник, словарь с аудио и персональный кураторский трекер визовых документов для Германии.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-start-learning-btn"
                onClick={() => onOpenAuth('signup')}
                className="px-6 py-3.5 bg-[#EF1B2D] hover:bg-[#d41424] text-white font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Начать подготовку бесплатно</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenAuth('signin')}
                className="px-5 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#0B1F3A] dark:text-white font-medium text-sm rounded-lg transition-colors cursor-pointer"
              >
                Войти в личный кабинет
              </button>
            </div>

            {/* 3 functional points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0" />
                <span>Структурированное обучение</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#3B82F6] shrink-0" />
                <span>Реальный прогресс</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#3B82F6] shrink-0" />
                <span>Поддержка на каждом этапе</span>
              </div>
            </div>
          </div>

          {/* Right Curriculum Card */}
          <div className="lg:col-span-5 bg-[#F4F6F8] dark:bg-[#070D18] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col gap-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-[#94A3B8]">
                  Учебный план курса
                </div>
                <div className="font-heading font-bold text-base text-[#0B1F3A] dark:text-white mt-0.5">
                  Goethe-Zertifikat A1
                </div>
              </div>
              <span className="px-2.5 py-1 bg-white dark:bg-[#0E1A2D] border border-slate-200 dark:border-slate-700 rounded-md text-xs font-semibold text-[#3B82F6]">
                A1.1 — A1.2
              </span>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div className="p-3.5 bg-white dark:bg-[#0E1A2D] rounded-xl border border-slate-200/80 dark:border-slate-800/80">
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-[#3B82F6]">Ступень I • A1.1</span>
                  <span className="text-[#94A3B8] font-mono text-[11px]">Модули 1–10</span>
                </div>
                <div className="font-medium text-[#0B1F3A] dark:text-white text-xs mt-1">
                  Основы языка и базовая коммуникация
                </div>
                <p className="text-[#94A3B8] text-[11px] mt-0.5 leading-relaxed">
                  Алфавит, правила чтения, спряжение глаголов, артикли, падеж Akkusativ, покупки и диалоги знакомства.
                </p>
              </div>

              <div className="p-3.5 bg-white dark:bg-[#0E1A2D] rounded-xl border border-slate-200/80 dark:border-slate-800/80">
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-[#3B82F6]">Ступень II • A1.2</span>
                  <span className="text-[#94A3B8] font-mono text-[11px]">Модули 11–20</span>
                </div>
                <div className="font-medium text-[#0B1F3A] dark:text-white text-xs mt-1">
                  Сложная грамматика и аудирование
                </div>
                <p className="text-[#94A3B8] text-[11px] mt-0.5 leading-relaxed">
                  Прошедшее время Perfekt, модальные глаголы, дательный падеж Dativ, написание писем и формуляров.
                </p>
              </div>

              <div className="p-3.5 bg-white dark:bg-[#0E1A2D] rounded-xl border border-slate-200/80 dark:border-slate-800/80">
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-[#EF1B2D]">Визовый трек &amp; Документы</span>
                  <span className="text-[#94A3B8] font-mono text-[11px]">Au-Pair / Ausbildung</span>
                </div>
                <div className="font-medium text-[#0B1F3A] dark:text-white text-xs mt-1">
                  Подготовка к собеседованию и отъезду
                </div>
                <p className="text-[#94A3B8] text-[11px] mt-0.5 leading-relaxed">
                  Пошаговые чек-листы визовых документов, мотивационные письма, поиск семьи и подготовка к собеседованию в посольстве.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-center font-mono">
              <div className="p-2 bg-white dark:bg-[#0E1A2D] rounded-lg border border-slate-200/60 dark:border-slate-800">
                <div className="font-heading font-extrabold text-sm text-[#0B1F3A] dark:text-white">24</div>
                <div className="text-[10px] text-[#94A3B8]">модуля</div>
              </div>
              <div className="p-2 bg-white dark:bg-[#0E1A2D] rounded-lg border border-slate-200/60 dark:border-slate-800">
                <div className="font-heading font-extrabold text-sm text-[#0B1F3A] dark:text-white">250+</div>
                <div className="text-[10px] text-[#94A3B8]">заданий</div>
              </div>
              <div className="p-2 bg-white dark:bg-[#0E1A2D] rounded-lg border border-slate-200/60 dark:border-slate-800">
                <div className="font-heading font-extrabold text-sm text-[#3B82F6]">≥ 70%</div>
                <div className="text-[10px] text-[#94A3B8]">порог сдачи</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demonstration Section */}
      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <div className="text-center flex flex-col gap-1.5">
            <div className="font-heading font-bold text-xs uppercase tracking-widest text-[#3B82F6]">
              ИНТЕРАКТИВНЫЙ ТРЕНАЖЕР
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A] dark:text-white">
              Попробуйте пробное задание
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-medium">
              Пример вопроса из первого вводного модуля курса A1.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#94A3B8]">
                Задание #1 • Знакомство (Begrüßung)
              </span>
              <span className="text-xs font-semibold text-[#3B82F6]">Модуль 01</span>
            </div>

            <div>
              <h3 className="font-heading font-bold text-xl md:text-2xl text-[#0B1F3A] dark:text-white">
                Как переводится: <span className="text-[#3B82F6]">«Добрый день! Меня зовут Анна»</span>?
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {demoOptions.map((opt, idx) => {
                const isSelected = demoSelected === idx;
                let btnStyle = 'bg-[#F4F6F8] dark:bg-[#111C2E] border-slate-200 dark:border-slate-700/80 text-[#0B1F3A] dark:text-white hover:border-[#3B82F6]';

                if (demoChecked) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'bg-red-50 dark:bg-red-950/40 border-red-400 text-red-700 dark:text-red-400 line-through';
                  } else {
                    btnStyle = 'bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-blue-50 dark:bg-blue-950/50 border-[#3B82F6] text-[#0B1F3A] dark:text-white font-semibold ring-1 ring-[#3B82F6]';
                }

                return (
                  <button
                    key={idx}
                    disabled={demoChecked}
                    onClick={() => setDemoSelected(idx)}
                    className={`text-left p-4 rounded-xl border text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs opacity-60">[{String.fromCharCode(65 + idx)}]</span>
                      <span>{opt.text}</span>
                    </div>
                    {demoChecked && opt.isCorrect && (
                      <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        Правильно! ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {demoChecked && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl text-xs text-emerald-900 dark:text-emerald-200">
                <div className="font-bold mb-0.5">Ответ верный!</div>
                <div className="text-emerald-800 dark:text-emerald-300">
                  В полной платформе вас ждут 24 модуля с аудио, грамматический справочник и персональная статистика подготовки к экзамену.
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs text-[#94A3B8]">
                {demoChecked ? 'Готовы продолжить обучение?' : 'Выберите вариант ответа'}
              </span>

              {!demoChecked ? (
                <button
                  disabled={demoSelected === null}
                  onClick={() => setDemoChecked(true)}
                  className="px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#152e54] text-white text-xs font-semibold rounded-lg disabled:opacity-40 transition-colors cursor-pointer"
                >
                  Проверить ответ
                </button>
              ) : (
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-5 py-2.5 bg-[#EF1B2D] hover:bg-[#d41424] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Начать полный курс →
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Two Relocation Tracks */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-white dark:bg-[#0B1526] border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="text-center flex flex-col gap-1.5 max-w-2xl mx-auto">
            <div className="font-heading font-bold text-xs uppercase tracking-widest text-[#3B82F6]">
              ПРОГРАММЫ РЕЛОКАЦИИ
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A] dark:text-white">
              Выберите свою траекторию в Германию
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-medium">
              Официальные программы для молодежи с визовой поддержкой и контрактом.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Au-Pair */}
            <div className="bg-[#F4F6F8] dark:bg-[#070D18] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-6 shadow-xs">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">
                    [Направление 01]
                  </span>
                  <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-[#3B82F6] border border-blue-200 dark:border-blue-800 text-[11px] font-semibold rounded-md">
                    Сертификат A1
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-[#0B1F3A] dark:text-white">
                  Программа Au-Pair
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  Проживание в принимающей семье в Германии для молодежи 18–26 лет. Бесплатное комфортное жилье, полноценное питание, карманные деньги (~280€/мес + 70€ на языковые курсы) и погружение в немецкую культуру на 12 месяцев.
                </p>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-5 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 font-mono">
                  <div>Срок: 12 месяцев</div>
                  <div>Виза: Au-Pair Visum</div>
                </div>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="w-full py-3 bg-[#0B1F3A] hover:bg-[#152e54] text-white font-semibold text-xs rounded-lg transition-colors text-center cursor-pointer"
                >
                  Подробнее об Au-Pair →
                </button>
              </div>
            </div>

            {/* Ausbildung */}
            <div className="bg-[#F4F6F8] dark:bg-[#070D18] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-6 shadow-xs">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">
                    [Направление 02]
                  </span>
                  <span className="px-2 py-0.5 bg-red-50 dark:bg-red-950/40 text-[#EF1B2D] border border-red-200 dark:border-red-800 text-[11px] font-semibold rounded-md">
                    Уровень B1 / B2
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-[#0B1F3A] dark:text-white">
                  Программа Ausbildung
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  Дуальное профессиональное образование в Германии. 3–3.5 года обучения по контракту с официальной ежемесячной зарплатой (1 050€ – 1 450€) и европейским государственным дипломом IHK/EU.
                </p>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-5 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 font-mono">
                  <div>Стипендия: 1 100€+ / мес</div>
                  <div>Диплом: EU / IHK</div>
                </div>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="w-full py-3 bg-[#EF1B2D] hover:bg-[#d41424] text-white font-semibold text-xs rounded-lg transition-colors text-center cursor-pointer"
                >
                  Подробнее об Ausbildung →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#0B1526] py-8 px-4 md:px-8 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-3">
            <img
              src="/delfi-logo-circle.svg"
              alt="DELFI"
              className="w-7 h-7 rounded-full shadow-xs object-contain"
            />
            <span>© 2026 Delfi Training Platform. Все права защищены.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <span>Goethe-Institut A1</span>
            <span>•</span>
            <span>Au-Pair Agentur</span>
            <span>•</span>
            <span>IHK Ausbildung</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
