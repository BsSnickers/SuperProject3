import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AU_PAIR_STAGES, PROGRAM_STATUS_MAP } from '../data/programsData';
import { Check, Clock, AlertCircle, Sparkles, Euro, Home, Calendar, Award } from 'lucide-react';

export const AuPairView: React.FC = () => {
  const { profile } = useAuth();

  const currentStageId = profile?.auPairStageId || 1;
  const statusKey = profile?.auPairStatus || 'not_started';
  const statusInfo = PROGRAM_STATUS_MAP[statusKey] || PROGRAM_STATUS_MAP.not_started;
  const adminNotes = profile?.auPairNotes || 'Заполните анкету и подготовьте документы для программы Au-Pair.';
  const updatedAt = profile?.auPairUpdatedAt ? new Date(profile.auPairUpdatedAt).toLocaleDateString('ru-RU') : 'Сегодня';

  return (
    <div id="au-pair-view" className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto flex flex-col gap-8 font-sans transition-colors">
      {/* Editorial Header */}
      <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="font-heading font-bold text-xs uppercase tracking-widest text-[#3B82F6] mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Программа 01 • Релокация и культурный обмен (18–26 лет)</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0B1F3A] dark:text-white tracking-tight">
            Программа Au-Pair в Германии
          </h1>
          <p className="text-sm text-slate-600 dark:text-[#94A3B8] font-medium mt-2 leading-relaxed">
            Официальный трекер подготовки визовых документов, подбора принимающей семьи (Gastfamilie) и записи на собеседование в посольство ФРГ.
          </p>
        </div>

        {/* Status indicator Card */}
        <div className="bg-slate-50 dark:bg-[#111C2E] border border-slate-200 dark:border-slate-700/80 rounded-xl p-4.5 shrink-0 flex flex-col gap-1 min-w-[200px]">
          <div className="text-[11px] uppercase tracking-wider text-[#94A3B8] font-bold">Статус дела</div>
          <div className="font-heading font-bold text-base text-[#0B1F3A] dark:text-white uppercase flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse"></span>
            {statusInfo.label}
          </div>
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] mt-0.5">Обновлено: {updatedAt}</div>
        </div>
      </div>

      {/* Program Parameters Grid - 4 Rounded Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#3B82F6] flex items-center justify-center mb-3">
            <Euro className="w-5 h-5" />
          </div>
          <div className="text-[11px] uppercase tracking-wider text-[#94A3B8] font-semibold">Карманные деньги</div>
          <div className="font-heading font-extrabold text-2xl text-[#0B1F3A] dark:text-white mt-1">280€ + 50€</div>
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1 font-medium">в месяц + языковые курсы</div>
        </div>

        <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
            <Home className="w-5 h-5" />
          </div>
          <div className="text-[11px] uppercase tracking-wider text-[#94A3B8] font-semibold">Жилье и питание</div>
          <div className="font-heading font-extrabold text-2xl text-[#0B1F3A] dark:text-white mt-1">Бесплатно</div>
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1 font-medium">Отдельная комната в семье</div>
        </div>

        <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="text-[11px] uppercase tracking-wider text-[#94A3B8] font-semibold">Длительность</div>
          <div className="font-heading font-extrabold text-2xl text-[#0B1F3A] dark:text-white mt-1">12 месяцев</div>
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1 font-medium">С правом продления/смены статуса</div>
        </div>

        <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-[#EF1B2D] flex items-center justify-center mb-3">
            <Award className="w-5 h-5" />
          </div>
          <div className="text-[11px] uppercase tracking-wider text-[#94A3B8] font-semibold">Языковой ценз</div>
          <div className="font-heading font-extrabold text-2xl text-[#0B1F3A] dark:text-white mt-1">Goethe A1</div>
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1 font-medium">Официальный сертификат</div>
        </div>
      </div>

      {/* Coordinator Note Box */}
      <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 rounded-2xl p-6 shadow-xs flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#3B82F6] text-white flex items-center justify-center shrink-0 shadow-xs">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <div className="font-heading font-bold text-xs uppercase tracking-wider text-[#3B82F6] mb-1">
            Заметка визового куратора
          </div>
          <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            {adminNotes}
          </p>
        </div>
      </div>

      {/* Stepper Checklist */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#94A3B8]">
              Пошаговый план
            </span>
            <h2 className="font-heading font-bold text-xl text-[#0B1F3A] dark:text-white mt-0.5">
              Этапы оформления документов (8 шагов)
            </h2>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-[#0E1A2D] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            Текущий этап: 0{currentStageId} из 8
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {AU_PAIR_STAGES.map((stage) => {
            const isCompleted = stage.id < currentStageId;
            const isCurrent = stage.id === currentStageId;

            return (
              <div
                key={stage.id}
                id={`aupair-stage-${stage.id}`}
                className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row md:items-start justify-between gap-6 shadow-xs ${
                  isCurrent
                    ? 'bg-white dark:bg-[#0E1A2D] border-[#3B82F6] ring-2 ring-blue-500/20 shadow-md'
                    : isCompleted
                    ? 'bg-white/70 dark:bg-[#0E1A2D]/70 border-slate-200/90 dark:border-slate-800'
                    : 'bg-white dark:bg-[#0E1A2D] border-slate-200/90 dark:border-slate-800 opacity-80'
                }`}
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  {/* Step Number Circle */}
                  <div className="shrink-0 pt-0.5">
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-xs transition-colors shadow-xs ${
                        isCompleted
                          ? 'bg-emerald-500 text-white'
                          : isCurrent
                          ? 'bg-[#3B82F6] text-white shadow-blue-500/20'
                          : 'bg-slate-100 dark:bg-[#111C2E] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : `0${stage.number}`}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col gap-2 max-w-3xl">
                    <div className="flex flex-wrap items-baseline gap-2.5">
                      <h3 className="font-heading font-bold text-lg text-[#0B1F3A] dark:text-white">
                        {stage.titleRu}
                      </h3>
                      <span className="text-xs text-[#94A3B8] font-medium">
                        / {stage.titleDe}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                      {stage.description}
                    </p>

                    <div className="mt-1 p-3 bg-slate-50 dark:bg-[#111C2E] rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                      <span className="font-bold text-[#0B1F3A] dark:text-white">Рекомендация куратора: </span>
                      <span>{stage.tips}</span>
                    </div>
                  </div>
                </div>

                {/* Status Column */}
                <div className="flex md:flex-col items-end justify-between md:justify-start gap-2 shrink-0 self-end md:self-auto">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                      isCompleted
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : isCurrent
                        ? 'bg-blue-50 dark:bg-blue-950/40 text-[#3B82F6] border border-blue-200 dark:border-blue-800'
                        : 'bg-slate-100 dark:bg-[#111C2E] text-slate-500 dark:text-[#94A3B8] border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {isCompleted ? 'Завершено' : isCurrent ? 'В процессе' : 'Ожидание'}
                  </span>
                  <div className="text-xs text-slate-500 dark:text-[#94A3B8] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Срок: {stage.estimatedDays}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
