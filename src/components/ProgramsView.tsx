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
    <div id="programs-unified-view" className="flex flex-col min-h-full font-sans bg-[#F8F9FA]">
      {/* Compact Program Switcher Bar (Scrolls with page, strictly monochrome / no blue) */}
      <div className="bg-white border-b border-zinc-300">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Minimal section label */}
            <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
              § Программы релокации:
            </div>

            {/* Compact Toggle Buttons */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <button
                id="program-select-au-pair-btn"
                type="button"
                onClick={() => setActiveProgram('au-pair')}
                className={`px-4 py-2 border transition-colors flex items-center gap-2 rounded-none ${
                  activeProgram === 'au-pair'
                    ? 'bg-zinc-950 text-white border-zinc-950 font-bold shadow-xs'
                    : 'bg-white text-zinc-700 border-zinc-300 hover:text-black hover:border-zinc-500 hover:bg-zinc-50'
                }`}
              >
                <span>[01] Au-Pair</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 border ${
                    activeProgram === 'au-pair'
                      ? 'border-zinc-700 bg-zinc-800 text-zinc-300'
                      : 'border-zinc-200 bg-zinc-100 text-zinc-600'
                  }`}
                >
                  Этап {currentAuPairStage}/8
                </span>
              </button>

              <button
                id="program-select-ausbildung-btn"
                type="button"
                onClick={() => setActiveProgram('ausbildung')}
                className={`px-4 py-2 border transition-colors flex items-center gap-2 rounded-none ${
                  activeProgram === 'ausbildung'
                    ? 'bg-zinc-950 text-white border-zinc-950 font-bold shadow-xs'
                    : 'bg-white text-zinc-700 border-zinc-300 hover:text-black hover:border-zinc-500 hover:bg-zinc-50'
                }`}
              >
                <span>[02] Ausbildung</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 border ${
                    activeProgram === 'ausbildung'
                      ? 'border-zinc-700 bg-zinc-800 text-zinc-300'
                      : 'border-zinc-200 bg-zinc-100 text-zinc-600'
                  }`}
                >
                  Этап {currentAusbildungStage}/9
                </span>
              </button>
            </div>
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
