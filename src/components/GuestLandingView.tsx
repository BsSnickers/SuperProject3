import React, { useState } from 'react';
import logoImg from '../assets/logo.png';

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
    <div
      className="min-h-screen text-white flex flex-col justify-between font-sans selection:bg-[#0033CC] selection:text-white bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: "url('/philippe-oursel-g6znCjYuOgg-unsplash.jpg')" }}
    >
      {/* Dark Overlay for optimal readability */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] z-0" />

      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        {/* Top Editorial Nav Header */}
        <header className="border-b border-white/15 bg-zinc-950/80 sticky top-0 z-40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logoImg} alt="DELFI" className="h-9 w-auto max-w-[160px] object-contain brightness-0 invert" />
              <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-widest text-zinc-300 border-l border-white/20 pl-4">
                A1 Goethe • Au-Pair • Ausbildung
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                id="landing-signin-nav-btn"
                onClick={() => onOpenAuth('signin')}
                className="font-mono text-xs uppercase tracking-wider px-4 py-2 text-white hover:bg-white/10 border border-white/30 transition-colors"
              >
                Вход
              </button>
              <button
                id="landing-signup-nav-btn"
                onClick={() => onOpenAuth('signup')}
                className="font-mono text-xs uppercase tracking-wider px-5 py-2 bg-[#0033CC] text-white hover:bg-blue-600 border border-blue-500 transition-colors font-bold"
              >
                Регистрация
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section: Asymmetric Swiss Layout */}
        <section className="border-b border-white/15 bg-transparent">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Big Editorial Typography */}
            <div className="lg:col-span-7 p-8 md:p-14 lg:p-20 border-b lg:border-b-0 lg:border-r border-white/15 bg-zinc-900/70 backdrop-blur-md flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <div className="inline-flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 bg-white/10 text-white border border-white/20">
                    § Курс A1 & Релокация
                  </span>
                  <span className="font-mono text-[10px] text-zinc-300 uppercase tracking-wider">
                    Goethe-Zertifikat A1
                  </span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] text-white tracking-tight">
                  Немецкий язык с нуля до экзамена и переезда по <span className="italic font-semibold text-blue-400">Au-Pair</span> & <span className="italic font-semibold text-zinc-200">Ausbildung</span>.
                </h1>

                <p className="text-base sm:text-lg text-zinc-200 font-normal leading-relaxed max-w-xl">
                  Интерактивный тренажер A1 и кураторский трекер визовых документов для Германии.
                </p>
              </div>

              <div className="pt-10 flex flex-wrap items-center gap-4">
                <button
                  id="hero-start-learning-btn"
                  onClick={() => onOpenAuth('signup')}
                  className="font-mono text-xs uppercase tracking-widest px-8 py-4 bg-[#0033CC] hover:bg-blue-600 text-white transition-colors border border-blue-500 font-bold"
                >
                  Начать подготовку →
                </button>

                <button
                  onClick={() => onOpenAuth('signin')}
                  className="font-mono text-xs uppercase tracking-widest px-6 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 transition-colors"
                >
                  Войти в кабинет
                </button>
              </div>
            </div>

            {/* Right Column: Academic Curriculum & Exam Standards Overview */}
            <div className="lg:col-span-5 bg-zinc-950/90 backdrop-blur-md flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/15">
              <div className="p-6 md:p-8 flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                      Учебный план курса
                    </div>
                    <div className="font-serif text-lg text-white font-normal mt-0.5">
                      Lehrplan Goethe-Zertifikat A1
                    </div>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-1 bg-white/10 text-zinc-200 border border-white/20">
                    A1.1 — A1.2
                  </span>
                </div>

                <div className="flex flex-col gap-4 font-sans text-xs">
                  {/* Step 1 */}
                  <div className="border border-white/10 p-4 bg-white/[0.03] flex flex-col gap-1.5">
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-blue-400 font-bold uppercase tracking-wider">Ступень I</span>
                      <span className="text-zinc-400">A1.1</span>
                    </div>
                    <div className="font-medium text-white text-sm">
                      Основы языка и базовая коммуникация
                    </div>
                    <p className="text-zinc-300 leading-relaxed text-[11px]">
                      Алфавит, правила чтения, спряжение глаголов, артикли, падеж Akkusativ, покупки, ориентация во времени и диалоги знакомства.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="border border-white/10 p-4 bg-white/[0.03] flex flex-col gap-1.5">
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-blue-400 font-bold uppercase tracking-wider">Ступень II</span>
                      <span className="text-zinc-400">A1.2</span>
                    </div>
                    <div className="font-medium text-white text-sm">
                      Сложная грамматика и аудирование
                    </div>
                    <p className="text-zinc-300 leading-relaxed text-[11px]">
                      Прошедшее время Perfekt, модальные глаголы, дательный падеж Dativ, предлоги с двойным управлением, составление писем и формуляров.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="border border-white/10 p-4 bg-white/[0.03] flex flex-col gap-1.5">
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-emerald-400 font-bold uppercase tracking-wider">Визовый трек & Документы</span>
                      <span className="text-zinc-400">Au-Pair / Ausbildung</span>
                    </div>
                    <div className="font-medium text-white text-sm">
                      Подготовка к собеседованию и отъезду
                    </div>
                    <p className="text-zinc-300 leading-relaxed text-[11px]">
                      Адаптированные материалы для программ Au-Pair и Ausbildung: пакет документов, мотивационные письма, подготовка к посольству.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom bar with exact parameters */}
              <div className="p-4 md:px-8 md:py-4 bg-zinc-900/90 border-t border-white/15 grid grid-cols-3 gap-2 font-mono text-[10px] text-center text-zinc-300">
                <div className="border-r border-white/10 pr-2">
                  <span className="text-white font-bold block text-xs">24</span>
                  <span>модуля</span>
                </div>
                <div className="border-r border-white/10 pr-2">
                  <span className="text-white font-bold block text-xs">250+</span>
                  <span>упражнений</span>
                </div>
                <div>
                  <span className="text-emerald-400 font-bold block text-xs">&ge; 70%</span>
                  <span>порог сдачи</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demonstration Section */}
        <section className="border-b border-white/15 py-16 px-6 bg-transparent">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-2 mb-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-blue-400">
                § 02 — Демонстрационный тренажер
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-white">
                Попробуйте интерактивное задание
              </h2>
              <p className="text-zinc-300 text-sm">
                Тестовое задание из первого урока курса Goethe-Zertifikat A1.
              </p>
            </div>

            <div className="border border-white/20 bg-zinc-900/85 backdrop-blur-md p-6 md:p-10 flex flex-col gap-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  Задание #1 • Знакомство (A1)
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-white font-normal">
                  Как переводится: <span className="italic">«Добрый день! Меня зовут Анна»</span>?
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {demoOptions.map((opt, idx) => {
                  const isSelected = demoSelected === idx;
                  let btnState = 'bg-zinc-800/80 border-white/20 text-white hover:bg-zinc-700';

                  if (demoChecked) {
                    if (opt.isCorrect) {
                      btnState = 'bg-emerald-600 text-white border-emerald-400 font-bold';
                    } else if (isSelected && !opt.isCorrect) {
                      btnState = 'bg-red-950/80 text-zinc-400 border-red-500/30 line-through';
                    } else {
                      btnState = 'bg-zinc-900/60 text-zinc-400 border-white/10 opacity-60';
                    }
                  } else if (isSelected) {
                    btnState = 'bg-blue-600 text-white border-blue-400 font-bold';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={demoChecked}
                      onClick={() => setDemoSelected(idx)}
                      className={`text-left p-4 border text-sm font-sans flex items-center justify-between transition-colors rounded-none ${btnState}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs opacity-75">[{String.fromCharCode(65 + idx)}]</span>
                        <span>{opt.text}</span>
                      </div>
                      {demoChecked && opt.isCorrect && (
                        <span className="font-mono text-xs uppercase tracking-widest text-emerald-300">
                          [Верно]
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {demoChecked && (
                <div className="p-4 bg-zinc-950/90 border border-white/20 font-mono text-xs text-zinc-200">
                  <div className="font-bold text-white uppercase tracking-wider mb-1">
                    [OK] Ответ правильный
                  </div>
                  <div className="text-zinc-300">
                    В полной платформе доступны 21 урок, конспекты грамматики, словарь и сохранение личного прогресса.
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-white/15">
                <span className="font-mono text-[11px] text-zinc-400 uppercase">
                  {demoChecked ? 'Готовы к полному курсу?' : 'Выберите вариант'}
                </span>

                {!demoChecked ? (
                  <button
                    disabled={demoSelected === null}
                    onClick={() => setDemoChecked(true)}
                    className="font-mono text-xs uppercase tracking-wider px-6 py-3 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 transition-colors font-bold"
                  >
                    Проверить ответ
                  </button>
                ) : (
                  <button
                    onClick={() => onOpenAuth('signup')}
                    className="font-mono text-xs uppercase tracking-wider px-6 py-3 bg-[#0033CC] hover:bg-blue-600 text-white transition-colors font-bold"
                  >
                    Начать полный курс →
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Two Relocation Tracks: Minimalist Split */}
        <section className="border-b border-white/15 bg-transparent">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
            {/* Au-Pair */}
            <div className="p-8 md:p-14 border-b md:border-b-0 md:border-r border-white/15 bg-zinc-900/75 backdrop-blur-md flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                    [Направление 01]
                  </span>
                  <span className="font-mono text-xs border border-white/20 px-2 py-0.5 bg-white/10 text-white">
                    A1 Goethe
                  </span>
                </div>
                <h3 className="font-serif text-3xl text-white font-normal">
                  Программа Au-Pair
                </h3>
                <p className="text-zinc-200 text-sm leading-relaxed">
                  Проживание в семье в Германии для молодежи 18–26 лет. Бесплатное жилье, питание, карманные деньги (~280€/мес + 70€ на языковые курсы) и погружение в немецкую культуру на 12 месяцев.
                </p>
              </div>

              <div className="border-t border-white/15 pt-6 flex flex-col gap-4">
                <div className="font-mono text-xs text-zinc-300 grid grid-cols-2 gap-2">
                  <div>Срок: 12 мес.</div>
                  <div>Виза: Au-Pair Visum</div>
                </div>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="font-mono text-xs uppercase tracking-wider py-3 px-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 transition-colors font-bold text-center"
                >
                  Подробнее об Au-Pair →
                </button>
              </div>
            </div>

            {/* Ausbildung */}
            <div className="p-8 md:p-14 flex flex-col justify-between gap-8 bg-zinc-950/80 backdrop-blur-md">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                    [Направление 02]
                  </span>
                  <span className="font-mono text-xs border border-white/20 px-2 py-0.5 bg-white/10 text-white">
                    B1 / B2
                  </span>
                </div>
                <h3 className="font-serif text-3xl text-white font-normal">
                  Программа Ausbildung
                </h3>
                <p className="text-zinc-200 text-sm leading-relaxed">
                  Дуальное профессиональное образование в Германии. 3–3.5 года обучения по контракту с официальной ежемесячной зарплатой (1 050€ – 1 450€) и европейским государственным дипломом.
                </p>
              </div>

              <div className="border-t border-white/15 pt-6 flex flex-col gap-4">
                <div className="font-mono text-xs text-zinc-300 grid grid-cols-2 gap-2">
                  <div>Зарплата: 1 100€+</div>
                  <div>Диплом: EU / IHK</div>
                </div>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="font-mono text-xs uppercase tracking-wider py-3 px-4 bg-[#0033CC] hover:bg-blue-600 text-white border border-blue-500 transition-colors font-bold text-center"
                >
                  Подробнее об Ausbildung →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer: Editorial Colophon */}
        <footer className="bg-zinc-950/90 py-12 px-6 backdrop-blur-md border-t border-white/15">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="DELFI" className="h-7 w-auto max-w-[130px] object-contain brightness-0 invert" />
              <span>© 2026. Образовательная платформа и трекер релокации.</span>
            </div>

            <div className="flex flex-wrap items-center gap-6 uppercase text-[10px] tracking-widest text-zinc-400">
              <span>Goethe-Institut A1</span>
              <span>Au-Pair Agentur</span>
              <span>IHK Ausbildung</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

