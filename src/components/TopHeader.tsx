import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, User, LogOut, Moon, Sun, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { NavTab } from './Sidebar';

interface TopHeaderProps {
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  onNavigateTab?: (tab: NavTab) => void;
  onOpenMobileMenu?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  searchTerm = '',
  onSearchChange,
  onNavigateTab,
  onOpenMobileMenu,
}) => {
  const { profile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayName = profile?.displayName || 'Sonun Akylbekova';
  const userInitials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'SA';

  return (
    <header
      id="top-main-header"
      className="sticky top-0 z-30 h-16 min-h-[64px] max-h-[64px] shrink-0 box-border bg-white dark:bg-[#0B1526] border-b border-slate-200/80 dark:border-slate-800/80 px-4 md:px-8 flex items-center justify-between gap-4 transition-colors"
    >
      {/* Left: App Title & Motto */}
      <div className="flex items-center gap-3 min-w-0">
        {onOpenMobileMenu && (
          <button
            id="header-mobile-menu-btn"
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            title="Открыть меню"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        <div className="flex flex-col">
          <span className="font-heading font-bold text-base md:text-lg text-[#0B1F3A] dark:text-white tracking-tight leading-tight">
            Delfi Training Platform
          </span>
          <span className="text-[11px] md:text-xs text-[#94A3B8] font-normal leading-tight hidden sm:block">
            Lernen. Wachsen. Neue Möglichkeiten.
          </span>
        </div>
      </div>

      {/* Right: Search, Notification, Theme, User Avatar & Menu */}
      <div className="flex items-center gap-2.5 md:gap-4 shrink-0">
        {/* Search Pill Input */}
        <div className="relative hidden sm:block w-52 md:w-80 lg:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="global-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Поиск по модулям, темам, грамматике..."
            className="w-full pl-9 pr-4 py-2 bg-[#F4F6F8] dark:bg-[#111C2E] border border-slate-200 dark:border-slate-700/60 rounded-full text-xs text-[#0B1F3A] dark:text-white placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 focus:border-[#3B82F6] transition-all"
          />
        </div>

        {/* Theme Toggle */}
        <button
          id="header-theme-toggle-btn"
          onClick={toggleTheme}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
          title={theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-[#0B1F3A]" />
          )}
        </button>

        {/* Notification Bell with indicator */}
        <div className="relative" ref={notifRef}>
          <button
            id="header-notifications-btn"
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer relative"
            title="Уведомления"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF1B2D] rounded-full ring-2 ring-white dark:ring-[#0B1526]" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#111C2E] border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-3 text-xs z-50 animate-in fade-in slide-in-from-top-2">
              <div className="font-heading font-semibold text-[#0B1F3A] dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                Уведомления
              </div>
              <div className="py-2.5 space-y-2">
                <div className="text-slate-600 dark:text-slate-300">
                  <span className="font-medium text-[#0B1F3A] dark:text-white">Новый модуль A1.2:</span> Доступны новые грамматические материалы.
                </div>
                <div className="text-[10px] text-slate-400">Сегодня, 10:00</div>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar + Name + Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            id="header-user-menu-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer group"
          >
            {/* Avatar Pill */}
            <div className="w-8 h-8 rounded-full bg-[#3B82F6] text-white flex items-center justify-center font-heading font-bold text-xs shadow-xs">
              {userInitials}
            </div>
            {/* User Name */}
            <span className="text-xs font-semibold text-[#0B1F3A] dark:text-white hidden md:block max-w-[130px] truncate">
              {displayName}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-transform" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#111C2E] border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-1.5 z-50 text-xs font-sans animate-in fade-in slide-in-from-top-2">
              <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
                <div className="font-heading font-semibold text-[#0B1F3A] dark:text-white truncate">
                  {displayName}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {profile?.email || 'student@delfi.de'}
                </div>
              </div>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  onNavigateTab?.('profile');
                }}
                className="w-full text-left px-3.5 py-2 flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Мой профиль</span>
              </button>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  onNavigateTab?.('lessons');
                }}
                className="w-full text-left px-3.5 py-2 flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Модули A1</span>
              </button>

              <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  signOut();
                }}
                className="w-full text-left px-3.5 py-2 flex items-center gap-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Выйти из системы</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
