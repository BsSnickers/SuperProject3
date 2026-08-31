import React from 'react';
import { useAuth } from '../context/AuthContext';

export type NavTab = 'dashboard' | 'lessons' | 'programs' | 'handbook' | 'profile' | 'admin' | 'au-pair' | 'ausbildung';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenLesson?: (lessonId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  const { profile, progress, signOut, isAdmin } = useAuth();

  const progressList = Object.values(progress) as { passed?: boolean }[];
  const passedLessonsCount = progressList.filter((p) => p.passed).length;

  const navItems = [
    { id: 'dashboard' as NavTab, index: '01', label: 'Дашборд' },
    { id: 'lessons' as NavTab, index: '02', label: 'Уроки A1', meta: `${passedLessonsCount}/23` },
    { id: 'programs' as NavTab, index: '03', label: 'Au-Pair / Ausbildung', meta: 'Трекер' },
    { id: 'handbook' as NavTab, index: '04', label: 'Справочник A1', meta: '24 темы' },
    { id: 'profile' as NavTab, index: '05', label: 'Профиль' },
  ];

  if (isAdmin) {
    navItems.push({
      id: 'admin' as NavTab,
      index: '06',
      label: 'Панель куратора',
      meta: 'ADMIN',
    });
  }

  const isTabActive = (itemId: NavTab) => {
    if (itemId === 'programs') {
      return activeTab === 'programs' || activeTab === 'au-pair' || activeTab === 'ausbildung';
    }
    return activeTab === itemId;
  };

  return (
    <aside
      id="main-sidebar"
      className="w-64 md:w-72 bg-[#FFFFFF] border-r border-zinc-300 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none z-30 font-sans rounded-none"
    >
      {/* Top Header & Brand */}
      <div className="flex flex-col">
        {/* Brand Block */}
        <div className="p-6 border-b border-zinc-200">
          <div className="flex items-baseline justify-between">
            <span className="font-serif italic font-bold text-2xl tracking-tight text-zinc-950">
              Delfi
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              [DE 2026]
            </span>
          </div>
          <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-1">
            German Language & Relocation
          </p>
        </div>

        {/* Metrics Strip */}
        <div className="grid grid-cols-2 border-b border-zinc-200 bg-[#FAFAFA] font-mono text-xs">
          <div className="p-3 border-r border-zinc-200">
            <div className="text-[9px] uppercase tracking-wider text-zinc-400">Уровень</div>
            <div className="font-bold text-zinc-900 mt-0.5">A1 Goethe</div>
          </div>
          <div className="p-3">
            <div className="text-[9px] uppercase tracking-wider text-zinc-400">Стрик</div>
            <div className="font-bold text-zinc-900 mt-0.5">{profile?.streakDays || 1} дн.</div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex flex-col py-2">
          {navItems.map((item) => {
            const isActive = isTabActive(item.id);
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center justify-between px-6 py-3.5 text-xs font-semibold uppercase tracking-wider transition-colors border-l-2 text-left rounded-none cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-zinc-400">
                    {item.index}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.meta && (
                  <span
                    className={`font-mono text-[9px] px-1.5 py-0.5 border ${
                      isActive
                        ? 'border-zinc-700 bg-zinc-800 text-zinc-300'
                        : 'border-zinc-300 bg-zinc-50 text-zinc-600'
                    }`}
                  >
                    {item.meta}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Area */}
      <div className="border-t border-zinc-200 p-4 bg-[#FAFAFA] flex flex-col gap-3 font-mono text-xs">
        <div className="flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <div className="font-bold text-zinc-900 text-xs truncate">
              {profile?.displayName || 'Студент Delfi'}
            </div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">
              {profile?.role === 'admin' ? 'Куратор' : 'Слушатель курса'}
            </div>
          </div>
          <button
            id="sidebar-logout-btn"
            onClick={signOut}
            title="Выйти"
            className="px-2.5 py-1.5 bg-white hover:bg-black hover:text-white border border-zinc-300 text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer"
          >
            [Выход]
          </button>
        </div>
      </div>
    </aside>
  );
};
