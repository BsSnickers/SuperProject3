import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  LayoutDashboard,
  BookOpen,
  Briefcase,
  BookMarked,
  User,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';

export type NavTab = 'dashboard' | 'lessons' | 'programs' | 'handbook' | 'profile' | 'admin' | 'au-pair' | 'ausbildung';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenLesson?: (lessonId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  const { profile, progress, signOut, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const progressList = Object.values(progress) as { passed?: boolean }[];
  const passedLessonsCount = progressList.filter((p) => p.passed).length;

  const navItems = [
    {
      id: 'dashboard' as NavTab,
      index: '01',
      label: 'Дашборд',
      icon: LayoutDashboard,
    },
    {
      id: 'lessons' as NavTab,
      index: '02',
      label: 'Уроки A1',
      meta: `${passedLessonsCount}/23`,
      icon: BookOpen,
    },
    {
      id: 'programs' as NavTab,
      index: '03',
      label: 'Au-Pair / Ausbildung',
      meta: 'Трекер',
      icon: Briefcase,
    },
    {
      id: 'handbook' as NavTab,
      index: '04',
      label: 'Справочник A1',
      meta: '24 темы',
      icon: BookMarked,
    },
    {
      id: 'profile' as NavTab,
      index: '05',
      label: 'Профиль',
      icon: User,
    },
  ];

  if (isAdmin) {
    navItems.push({
      id: 'admin' as NavTab,
      index: '06',
      label: 'Панель куратора',
      meta: 'ADMIN',
      icon: ShieldCheck,
    });
  }

  const isTabActive = (itemId: NavTab) => {
    if (itemId === 'programs') {
      return activeTab === 'programs' || activeTab === 'au-pair' || activeTab === 'ausbildung';
    }
    return activeTab === itemId;
  };

  const userInitial = (profile?.displayName || profile?.email || 'S').charAt(0).toUpperCase();

  const handleMobileSelectTab = (tab: NavTab) => {
    onSelectTab(tab);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* 1. Mobile Top Sticky Header Bar */}
      <header id="mobile-sidebar-header" className="md:hidden sticky top-0 z-30 bg-white dark:bg-zinc-950 border-b border-zinc-300 dark:border-zinc-800 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <span className="font-serif italic font-bold text-xl tracking-tight text-zinc-950 dark:text-white">
            Delfi
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 border-l border-zinc-300 dark:border-zinc-800 pl-2">
            DE 2026
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            id="mobile-theme-toggle-btn"
            onClick={toggleTheme}
            className="p-1.5 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            title={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
          <button
            id="mobile-sidebar-header-toggle-btn"
            onClick={() => setIsMobileOpen(true)}
            className="px-3 py-1.5 border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer text-zinc-900 dark:text-white active:scale-95 transition-transform"
          >
            <Menu className="w-4 h-4" />
            <span>Меню</span>
          </button>
        </div>
      </header>

      {/* 2. Mobile Floating Corner Action Button (Bottom-Right) */}
      <button
        id="mobile-sidebar-corner-btn"
        onClick={() => setIsMobileOpen((prev) => !prev)}
        title="Открыть меню"
        className="fixed bottom-5 right-5 z-40 md:hidden bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 px-4 py-3 shadow-2xl border border-zinc-800 dark:border-zinc-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 rounded-full cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95"
      >
        {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        <span>{isMobileOpen ? 'Закрыть' : 'Меню'}</span>
      </button>

      {/* 3. Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          id="mobile-sidebar-backdrop"
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* 4. Mobile Slide-Over Drawer */}
      {isMobileOpen && (
        <aside
          id="mobile-sidebar-drawer"
          className="fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-zinc-950 border-r border-zinc-300 dark:border-zinc-800 flex flex-col justify-between h-full shadow-2xl md:hidden font-sans select-none overflow-y-auto"
        >
          <div className="flex flex-col">
            {/* Mobile Drawer Header */}
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif italic font-bold text-2xl tracking-tight text-zinc-950 dark:text-white">
                    Delfi
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                    [DE 2026]
                  </span>
                </div>
                <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">
                  German Language & Relocation
                </p>
              </div>
              <button
                id="mobile-sidebar-close-btn"
                onClick={() => setIsMobileOpen(false)}
                className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors border border-zinc-200 dark:border-zinc-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Metrics Strip */}
            <div className="grid grid-cols-2 border-b border-zinc-200 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-zinc-900 font-mono text-xs">
              <div className="p-3 border-r border-zinc-200 dark:border-zinc-800">
                <div className="text-[9px] uppercase tracking-wider text-zinc-400">Уровень</div>
                <div className="font-bold text-zinc-900 dark:text-white mt-0.5">A1 Goethe</div>
              </div>
              <div className="p-3">
                <div className="text-[9px] uppercase tracking-wider text-zinc-400">Стрик</div>
                <div className="font-bold text-zinc-900 dark:text-white mt-0.5">{profile?.streakDays || 0} дн.</div>
              </div>
            </div>

            {/* Mobile Nav Items */}
            <nav className="flex flex-col py-2">
              {navItems.map((item) => {
                const isActive = isTabActive(item.id);
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    id={`mobile-sidebar-nav-${item.id}`}
                    onClick={() => handleMobileSelectTab(item.id)}
                    className={`flex items-center justify-between px-5 py-3.5 text-xs font-semibold uppercase tracking-wider transition-colors border-l-2 text-left rounded-none cursor-pointer ${
                      isActive
                        ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-900 dark:border-zinc-100'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="font-mono text-[10px] text-zinc-400">
                        {item.index}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.meta && (
                      <span
                        className={`font-mono text-[9px] px-1.5 py-0.5 border shrink-0 ${
                          isActive
                            ? 'border-zinc-700 dark:border-zinc-300 bg-zinc-800 dark:bg-zinc-200 text-zinc-300 dark:text-zinc-800'
                            : 'border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
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

          {/* Mobile Bottom User Info & Theme */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 p-3 bg-[#FAFAFA] dark:bg-zinc-900 flex flex-col gap-3 font-mono text-xs">
            <button
              id="mobile-drawer-theme-toggle"
              onClick={toggleTheme}
              className="w-full py-2 px-3 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
                <span>Тема оформления</span>
              </div>
              <span className="font-bold uppercase text-[#0033CC] dark:text-blue-400">
                {theme === 'dark' ? 'Темная' : 'Светлая'}
              </span>
            </button>

            <div className="flex items-center justify-between pt-1">
              <div className="min-w-0 pr-2">
                <div className="font-bold text-zinc-900 dark:text-white text-xs truncate">
                  {profile?.displayName || 'Студент Delfi'}
                </div>
                <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">
                  {profile?.role === 'admin' ? 'Куратор' : 'Студент'}
                </div>
              </div>
              <button
                id="mobile-sidebar-logout-btn"
                onClick={() => {
                  setIsMobileOpen(false);
                  signOut();
                }}
                className="px-2.5 py-1.5 bg-white dark:bg-zinc-950 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 border border-zinc-300 dark:border-zinc-700 text-[10px] text-zinc-900 dark:text-zinc-100 uppercase font-bold tracking-wider transition-colors cursor-pointer"
              >
                [Выход]
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* 5. Desktop Sidebar */}
      <aside
        id="main-sidebar"
        className={`hidden md:flex ${
          isCollapsed ? 'w-16 md:w-20' : 'w-64 md:w-72'
        } bg-[#FFFFFF] dark:bg-zinc-950 border-r border-zinc-300 dark:border-zinc-800 flex-col justify-between h-screen sticky top-0 shrink-0 select-none z-30 font-sans rounded-none transition-all duration-200 ease-in-out`}
      >
        {/* Top Header & Brand */}
        <div className="flex flex-col">
          {/* Brand Block */}
          <div className={`p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center ${isCollapsed ? 'justify-between flex-col gap-3' : 'justify-between'}`}>
            {!isCollapsed ? (
              <>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif italic font-bold text-2xl tracking-tight text-zinc-950 dark:text-white">
                      Delfi
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                      [DE 2026]
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">
                    German Language & Relocation
                  </p>
                </div>
                <button
                  id="sidebar-toggle-btn-expanded"
                  onClick={() => setIsCollapsed(true)}
                  title="Свернуть боковое меню"
                  className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors border border-zinc-200 dark:border-zinc-800 cursor-pointer"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <span className="font-serif italic font-bold text-xl tracking-tight text-zinc-950 dark:text-white">
                  D
                </span>
                <button
                  id="sidebar-toggle-btn-collapsed"
                  onClick={() => setIsCollapsed(false)}
                  title="Раскрыть боковое меню"
                  className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors border border-zinc-200 dark:border-zinc-800 cursor-pointer"
                >
                  <PanelLeftOpen className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Metrics Strip (Only shown when expanded) */}
          {!isCollapsed && (
            <div className="grid grid-cols-2 border-b border-zinc-200 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-zinc-900/60 font-mono text-xs">
              <div className="p-3 border-r border-zinc-200 dark:border-zinc-800">
                <div className="text-[9px] uppercase tracking-wider text-zinc-400">Уровень</div>
                <div className="font-bold text-zinc-900 dark:text-white mt-0.5">A1 Goethe</div>
              </div>
              <div className="p-3">
                <div className="text-[9px] uppercase tracking-wider text-zinc-400">Стрик</div>
                <div className="font-bold text-zinc-900 dark:text-white mt-0.5">{profile?.streakDays || 0} дн.</div>
              </div>
            </div>
          )}

          {/* Navigation List */}
          <nav className="flex flex-col py-2">
            {navItems.map((item) => {
              const isActive = isTabActive(item.id);
              const Icon = item.icon;

              if (isCollapsed) {
                return (
                  <button
                    key={item.id}
                    id={`sidebar-nav-${item.id}`}
                    onClick={() => onSelectTab(item.id)}
                    title={item.label}
                    className={`relative flex items-center justify-center py-3.5 transition-colors text-left rounded-none cursor-pointer ${
                      isActive
                        ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-zinc-950 dark:bg-white" />
                    )}
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  id={`sidebar-nav-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center justify-between px-5 py-3.5 text-xs font-semibold uppercase tracking-wider transition-colors border-l-2 text-left rounded-none cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-900 dark:border-zinc-100'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="font-mono text-[10px] text-zinc-400">
                      {item.index}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.meta && (
                    <span
                      className={`font-mono text-[9px] px-1.5 py-0.5 border shrink-0 ${
                        isActive
                          ? 'border-zinc-700 dark:border-zinc-300 bg-zinc-800 dark:bg-zinc-200 text-zinc-300 dark:text-zinc-800'
                          : 'border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
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

        {/* Bottom User Area & Theme Switcher */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-3 bg-[#FAFAFA] dark:bg-zinc-900/60 flex flex-col gap-3 font-mono text-xs">
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-2">
              <button
                id="sidebar-theme-toggle-collapsed"
                onClick={toggleTheme}
                title={theme === 'dark' ? 'Тема: Темная (нажмите для светлой)' : 'Тема: Светлая (нажмите для темной)'}
                className="p-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                {theme === 'dark' ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              </button>
              <div
                title={`${profile?.displayName || 'Студент Delfi'} (${profile?.role === 'admin' ? 'Куратор' : 'Студент'})`}
                className="w-8 h-8 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-bold text-xs uppercase"
              >
                {userInitial}
              </div>
              <button
                id="sidebar-logout-btn-collapsed"
                onClick={signOut}
                title="Выйти из аккаунта"
                className="p-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <button
                id="sidebar-theme-toggle-expanded"
                onClick={toggleTheme}
                className="w-full py-2 px-3 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
                  <span>Тема</span>
                </div>
                <span className="font-bold uppercase text-[#0033CC] dark:text-blue-400">
                  {theme === 'dark' ? 'Темная' : 'Светлая'}
                </span>
              </button>

              <div className="flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <div className="font-bold text-zinc-900 dark:text-white text-xs truncate">
                    {profile?.displayName || 'Студент Delfi'}
                  </div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">
                    {profile?.role === 'admin' ? 'Куратор' : 'Студент'}
                  </div>
                </div>
                <button
                  id="sidebar-logout-btn"
                  onClick={signOut}
                  title="Выйти"
                  className="px-2.5 py-1.5 bg-white dark:bg-zinc-950 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 border border-zinc-300 dark:border-zinc-800 text-[10px] text-zinc-900 dark:text-zinc-100 uppercase font-bold tracking-wider transition-colors cursor-pointer"
                >
                  [Выход]
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
