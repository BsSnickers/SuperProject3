import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AUSBILDUNG_STAGES, PROGRAM_STATUS_MAP } from '../data/programsData';

export const AusbildungView: React.FC = () => {
  const { profile } = useAuth();

  const currentStageId = profile?.ausbildungStageId || 1;
  const statusKey = profile?.ausbildungStatus || 'not_started';
  const statusInfo = PROGRAM_STATUS_MAP[statusKey] || PROGRAM_STATUS_MAP.not_started;
  const adminNotes = profile?.ausbildungNotes || 'Начните выбор направления и подготовку к признанию аттестата.';
  const updatedAt = profile?.ausbildungUpdatedAt ? new Date(profile.ausbildungUpdatedAt).toLocaleDateString('ru-RU') : 'Сегодня';

  return (
    <div id="ausbildung-view" className="p-6 md:p-10 max-w-7xl mx-auto flex flex-col gap-10 font-sans">
      {/* Editorial Header */}
      <div className="border-b border-zinc-300 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
            § Программа 02 • Дуальное профессиональное образование (18–35+ лет)
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-normal text-zinc-950 tracking-tight">
            Ausbildung в Германии
          </h1>
          <p className="text-sm text-zinc-600 font-normal mt-2 max-w-2xl">
            Государственный диплом ЕС, официальная зарплата ученика от 1 100€/мес и прямой трекер визовых этапов IHK/HWK.
          </p>
        </div>

        {/* Status Box */}
        <div className="border border-zinc-300 bg-white p-4 font-mono text-xs shrink-0 flex flex-col gap-1">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Статус заявки</div>
          <div className="font-bold text-zinc-950 uppercase">{statusInfo.label}</div>
          <div className="text-[10px] text-zinc-500">Обновлено: {updatedAt}</div>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-300 border border-zinc-300 font-mono text-xs">
        <div className="bg-white p-5">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Стипендия ученика</div>
          <div className="font-serif text-2xl text-zinc-950 font-normal mt-1">1 050–1 450€</div>
          <div className="text-[10px] text-zinc-500 mt-1">ежемесячно по контракту</div>
        </div>
        <div className="bg-white p-5">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Формат</div>
          <div className="font-serif text-2xl text-zinc-950 font-normal mt-1">Дуальный</div>
          <div className="text-[10px] text-zinc-500 mt-1">Теория + оплата труда</div>
        </div>
        <div className="bg-white p-5">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Срок обучения</div>
          <div className="font-serif text-2xl text-zinc-950 font-normal mt-1">3–3.5 года</div>
          <div className="text-[10px] text-zinc-500 mt-1">Диплом ЕС / IHK / HWK</div>
        </div>
        <div className="bg-white p-5">
          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Требуемый язык</div>
          <div className="font-serif text-2xl text-zinc-950 font-normal mt-1">B1 / B2</div>
          <div className="text-[10px] text-zinc-500 mt-1">Старт с базы A1</div>
        </div>
      </div>

      {/* Curator Memo */}
      <div className="border border-zinc-300 bg-[#FAFAFA] p-6 font-mono text-xs">
        <div className="font-bold text-zinc-950 uppercase tracking-wider mb-2">
          [Служебная записка визового координатора]
        </div>
        <p className="font-sans text-sm text-zinc-800 leading-relaxed">
          {adminNotes}
        </p>
      </div>

      {/* Stepper Checklist */}
      <div className="flex flex-col gap-4">
        <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
          [Этапы зачисления и оформления визы: 9 шагов]
        </div>

        <div className="flex flex-col gap-px bg-zinc-300 border border-zinc-300">
          {AUSBILDUNG_STAGES.map((stage) => {
            const isCompleted = stage.id < currentStageId;
            const isCurrent = stage.id === currentStageId;

            return (
              <div
                key={stage.id}
                id={`ausbildung-stage-${stage.id}`}
                className={`p-6 bg-white flex flex-col md:flex-row md:items-start justify-between gap-6 transition-colors ${
                  isCurrent ? 'bg-zinc-50' : ''
                }`}
              >
                <div className="flex items-start gap-6">
                  {/* Step Number */}
                  <div className="font-mono text-xs pt-0.5 shrink-0">
                    <span
                      className={`inline-block px-2 py-1 border font-bold ${
                        isCompleted
                          ? 'bg-zinc-950 text-white border-zinc-950'
                          : isCurrent
                          ? 'bg-zinc-950 text-white border-zinc-950 ring-2 ring-zinc-400'
                          : 'bg-zinc-100 text-zinc-500 border-zinc-300'
                      }`}
                    >
                      {isCompleted ? '[x]' : `0${stage.number}`}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col gap-2 max-w-3xl">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="font-serif text-xl font-normal text-zinc-950">
                        {stage.titleRu}
                      </h3>
                      <span className="font-mono text-xs text-zinc-400 italic">
                        / {stage.titleDe}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                      {stage.description}
                    </p>

                    <div className="mt-2 p-3 bg-[#FAFAFA] border border-zinc-200 font-mono text-[11px] text-zinc-700">
                      <span className="font-bold text-zinc-950 uppercase">Совет куратора: </span>
                      <span className="font-sans">{stage.tips}</span>
                    </div>
                  </div>
                </div>

                {/* Status Column */}
                <div className="font-mono text-xs flex md:flex-col items-end justify-between md:justify-start gap-2 shrink-0">
                  <span
                    className={`px-2.5 py-1 border text-[10px] uppercase tracking-wider font-bold ${
                      isCompleted
                        ? 'border-zinc-900 bg-zinc-900 text-white'
                        : isCurrent
                        ? 'border-zinc-950 bg-zinc-950 text-white'
                        : 'border-zinc-300 bg-zinc-100 text-zinc-500'
                    }`}
                  >
                    {isCompleted ? 'Завершено' : isCurrent ? 'Текущий этап' : 'Ожидание'}
                  </span>
                  <span className="text-[10px] text-zinc-400 uppercase">
                    Срок: {stage.estimatedDays}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
