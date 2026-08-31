import React, { useState } from 'react';
import { AudioButton } from './AudioButton';

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
    <div className="min-h-screen bg-[#F8F9FA] text-[#09090B] flex flex-col justify-between font-sans selection:bg-[#0033CC] selection:text-white">
      {/* Top Editorial Nav Header */}
      <header className="border-b border-zinc-300 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-baseline gap-4">
            <span className="font-serif italic font-bold text-2xl tracking-tight text-black">
              Delfi
            </span>
            <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-widest text-zinc-500 border-l border-zinc-300 pl-4">
              A1 Goethe • Au-Pair • Ausbildung
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="landing-signin-nav-btn"
              onClick={() => onOpenAuth('signin')}
              className="font-mono text-xs uppercase tracking-wider px-4 py-2 text-zinc-800 hover:bg-zinc-100 border border-zinc-300 transition-colors"
            >
              Вход
            </button>
            <button
              id="landing-signup-nav-btn"
              onClick={() => onOpenAuth('signup')}
              className="font-mono text-xs uppercase tracking-wider px-5 py-2 bg-black text-white hover:bg-[#0033CC] border border-black transition-colors font-bold"
            >
              Регистрация
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section: Asymmetric Swiss Layout */}
      <section className="border-b border-zinc-300 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Big Editorial Typography */}
          <div className="lg:col-span-7 p-8 md:p-14 lg:p-20 border-b lg:border-b-0 lg:border-r border-zinc-300 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 bg-zinc-100 text-zinc-900 border border-zinc-300">
                  § Курс A1 & Релокация
                </span>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                  Goethe-Zertifikat A1
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] text-zinc-950 tracking-tight">
                Немецкий язык с нуля до экзамена и переезда по <span className="italic font-semibold text-[#0033CC]">Au-Pair</span> & <span className="italic font-semibold">Ausbildung</span>.
              </h1>

              <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed max-w-xl">
                Интерактивный тренажер A1, пошаговая грамматическая методичка и кураторский трекер визовых документов для Германии.
              </p>
            </div>

            <div className="pt-10 flex flex-wrap items-center gap-4">
              <button
                id="hero-start-learning-btn"
                onClick={() => onOpenAuth('signup')}
                className="font-mono text-xs uppercase tracking-widest px-8 py-4 bg-[#0033CC] hover:bg-black text-white transition-colors border border-[#0033CC] font-bold"
              >
                Начать обучение бесплатно →
              </button>

              <button
                onClick={() => onOpenAuth('signin')}
                className="font-mono text-xs uppercase tracking-widest px-6 py-4 bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 transition-colors"
              >
                Войти в кабинет
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Data Grid */}
          <div className="lg:col-span-5 bg-[#FAFAFA] flex flex-col justify-between">
            <div className="p-8 md:p-12 border-b border-zinc-300">
              <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-4">
                [001 / Спецификация платформы]
              </div>
              <div className="grid grid-cols-2 gap-px bg-zinc-300 border border-zinc-300">
                <div className="bg-white p-5">
                  <div className="font-serif text-3xl text-zinc-950">21</div>
                  <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mt-1">
                    Интерактивный урок
                  </div>
                </div>
                <div className="bg-white p-5">
                  <div className="font-serif text-3xl text-[#0033CC]">100%</div>
                  <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mt-1">
                    Практика и тесты
                  </div>
                </div>
                <div className="bg-white p-5">
                  <div className="font-serif text-3xl text-zinc-950">280–1450€</div>
                  <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mt-1">
                    Выплаты в Германии
                  </div>
                </div>
                <div className="bg-white p-5">
                  <div className="font-serif text-3xl text-zinc-950">17</div>
                  <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mt-1">
                    Этапов визы
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 bg-white flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                [002 / Документы]
              </span>
              <p className="font-serif text-lg italic text-zinc-900 leading-snug">
                «Платформа объединяет подготовку к языковому тесту и непосредственное юридическое сопровождение в ФРГ.»
              </p>
              <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">
                Кураторство • Подбор семей • Договоры Ausbildung
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demonstration Section */}
      <section className="border-b border-zinc-300 py-16 px-6 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-2 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#0033CC]">
              § 02 — Демонстрационный тренажер
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-zinc-950">
              Попробуйте интерактивное задание
            </h2>
            <p className="text-zinc-600 text-sm">
              Тестовое задание из первого урока курса Goethe-Zertifikat A1.
            </p>
          </div>

          <div className="border border-zinc-300 bg-white p-6 md:p-10 flex flex-col gap-6 shadow-none">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                Задание #1 • Знакомство (A1)
              </span>
              <AudioButton text="Guten Tag! Ich heiße Anna." label="Слушать" />
            </div>

            <div>
              <h3 className="font-serif text-2xl text-zinc-950 font-normal">
                Как переводится: <span className="italic">«Добрый день! Меня зовут Анна»</span>?
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {demoOptions.map((opt, idx) => {
                const isSelected = demoSelected === idx;
                let btnState = 'bg-white border-zinc-300 text-zinc-900 hover:bg-zinc-100';

                if (demoChecked) {
                  if (opt.isCorrect) {
                    btnState = 'bg-zinc-950 text-white border-zinc-950 font-bold';
                  } else if (isSelected && !opt.isCorrect) {
                    btnState = 'bg-zinc-200 text-zinc-500 border-zinc-400 line-through';
                  } else {
                    btnState = 'bg-white text-zinc-400 border-zinc-200 opacity-60';
                  }
                } else if (isSelected) {
                  btnState = 'bg-zinc-900 text-white border-zinc-900 font-bold';
                }

                return (
                  <button
                    key={idx}
                    disabled={demoChecked}
                    onClick={() => setDemoSelected(idx)}
                    className={`text-left p-4 border text-sm font-sans flex items-center justify-between transition-colors rounded-none ${btnState}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs opacity-60">[{String.fromCharCode(65 + idx)}]</span>
                      <span>{opt.text}</span>
                    </div>
                    {demoChecked && opt.isCorrect && (
                      <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
                        [Верно]
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {demoChecked && (
              <div className="p-4 bg-[#F4F4F5] border border-zinc-300 font-mono text-xs text-zinc-800">
                <div className="font-bold text-zinc-950 uppercase tracking-wider mb-1">
                  [OK] Ответ правильный
                </div>
                <div className="text-zinc-600">
                  В полной платформе доступны 21 урок, конспекты грамматики, словарь и сохранение личного прогресса.
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
              <span className="font-mono text-[11px] text-zinc-400 uppercase">
                {demoChecked ? 'Готовы к полному курсу?' : 'Выберите вариант'}
              </span>

              {!demoChecked ? (
                <button
                  disabled={demoSelected === null}
                  onClick={() => setDemoChecked(true)}
                  className="font-mono text-xs uppercase tracking-wider px-6 py-3 bg-black text-white hover:bg-[#0033CC] disabled:bg-zinc-200 disabled:text-zinc-400 transition-colors font-bold"
                >
                  Проверить ответ
                </button>
              ) : (
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="font-mono text-xs uppercase tracking-wider px-6 py-3 bg-[#0033CC] hover:bg-black text-white transition-colors font-bold"
                >
                  Начать полный курс →
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Two Relocation Tracks: Minimalist Split */}
      <section className="border-b border-zinc-300 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
          {/* Au-Pair */}
          <div className="p-8 md:p-14 border-b md:border-b-0 md:border-r border-zinc-300 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  [Направление 01]
                </span>
                <span className="font-mono text-xs border border-zinc-300 px-2 py-0.5 bg-zinc-50">
                  A1 Goethe
                </span>
              </div>
              <h3 className="font-serif text-3xl text-zinc-950 font-normal">
                Программа Au-Pair
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Проживание в семье в Германии для молодежи 18–26 лет. Бесплатное жилье, питание, карманные деньги (~280€/мес + 50€ на языковые курсы) и погружение в немецкую культуру на 12 месяцев.
              </p>
            </div>

            <div className="border-t border-zinc-200 pt-6 flex flex-col gap-4">
              <div className="font-mono text-xs text-zinc-500 grid grid-cols-2 gap-2">
                <div>Срок: 12 мес.</div>
                <div>Виза: Au-Pair Visum</div>
              </div>
              <button
                onClick={() => onOpenAuth('signup')}
                className="font-mono text-xs uppercase tracking-wider py-3 px-4 bg-white hover:bg-black hover:text-white border border-black transition-colors font-bold text-center"
              >
                Подробнее об Au-Pair →
              </button>
            </div>
          </div>

          {/* Ausbildung */}
          <div className="p-8 md:p-14 flex flex-col justify-between gap-8 bg-[#FAFAFA]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  [Направление 02]
                </span>
                <span className="font-mono text-xs border border-zinc-300 px-2 py-0.5 bg-white">
                  B1 / B2
                </span>
              </div>
              <h3 className="font-serif text-3xl text-zinc-950 font-normal">
                Программа Ausbildung
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Дуальное профессиональное образование в Германии. 3–3.5 года обучения по контракту с официальной ежемесячной зарплатой (1 050€ – 1 450€) и европейским государственным дипломом.
              </p>
            </div>

            <div className="border-t border-zinc-200 pt-6 flex flex-col gap-4">
              <div className="font-mono text-xs text-zinc-500 grid grid-cols-2 gap-2">
                <div>Зарплата: 1 100€+</div>
                <div>Диплом: EU / IHK</div>
              </div>
              <button
                onClick={() => onOpenAuth('signup')}
                className="font-mono text-xs uppercase tracking-wider py-3 px-4 bg-[#0033CC] hover:bg-black text-white border border-[#0033CC] transition-colors font-bold text-center"
              >
                Подать заявку на Ausbildung →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer: Editorial Colophon */}
      <footer className="bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-baseline justify-between gap-6 font-mono text-xs text-zinc-500">
          <div>
            <span className="font-serif italic font-bold text-lg text-zinc-900 mr-3">Delfi</span>
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
  );
};
