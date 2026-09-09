import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { AuPairView } from './AuPairView';
import { AusbildungView } from './AusbildungView';

export type ProgramType = 'au-pair' | 'ausbildung';

interface ProgramsViewProps {
  initialProgram?: ProgramType;
}

export const ProgramsView: React.FC<ProgramsViewProps> = ({ initialProgram = 'au-pair' }) => {
  const { profile } = useAuth();
  const [activeProgram, setActiveProgram] = useState<ProgramType>(initialProgram);

  useEffect(() => {
    if (initialProgram) {
      setActiveProgram(initialProgram);
    }
  }, [initialProgram]);

  const currentAuPairStage = profile?.auPairStageId || 1;
  const currentAusbildungStage = profile?.ausbildungStageId || 1;

  return (
    <div id="programs-unified-view" className="flex flex-col min-h-full font-sans bg-[#F4F6F8] dark:bg-[#070D18] text-[#0B1F3A] dark:text-[#F4F6F8] transition-colors">
      {/* Program Switcher Bar */}
      <div className="bg-white dark:bg-[#0B1526] border-b border-slate-200/90 dark:border-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-heading font-bold text-[11px] uppercase tracking-wider text-[#3B82F6]">
              Визовые программы
            </span>
            <div className="text-sm font-semibold text-[#0B1F3A] dark:text-white">
              Официальное сопровождение переезда в ФРГ
            </div>
          </div>

          {/* Clean Segmented Control */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-[#0E1A2D] rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
            <button
              id="program-select-au-pair-btn"
              type="button"
              onClick={() => setActiveProgram('au-pair')}
              className={`px-4 py-2 rounded-lg font-heading text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeProgram === 'au-pair'
                  ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#0B1F3A] dark:hover:text-white'
              }`}
            >
              <span>Au-Pair в Германии</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-sans font-medium ${
                  activeProgram === 'au-pair'
                    ? 'bg-white/20 text-white'
                    : 'bg-white dark:bg-[#111C2E] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Этап {currentAuPairStage}/8
              </span>
            </button>

            <button
              id="program-select-ausbildung-btn"
              type="button"
              onClick={() => setActiveProgram('ausbildung')}
              className={`px-4 py-2 rounded-lg font-heading text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeProgram === 'ausbildung'
                  ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#0B1F3A] dark:hover:text-white'
              }`}
            >
              <span>Ausbildung (Дуальное)</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-sans font-medium ${
                  activeProgram === 'ausbildung'
                    ? 'bg-white/20 text-white'
                    : 'bg-white dark:bg-[#111C2E] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Этап {currentAusbildungStage}/9
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Program View Content Area */}
      <div className="flex-1">
        {activeProgram === 'au-pair' ? <AuPairView /> : <AusbildungView />}
      </div>
    </div>
  );
};
