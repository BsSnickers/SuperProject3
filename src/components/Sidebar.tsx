import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  LayoutGrid,
  BookOpen,
  Briefcase,
  User,
  ShieldCheck,
  Languages,
  X,
  Sparkles,
} from 'lucide-react';

export type NavTab = 'dashboard' | 'lessons' | 'wortschatz' | 'programs' | 'handbook' | 'profile' | 'admin' | 'au-pair' | 'ausbildung';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const { profile, isAdmin } = useAuth();

  const navItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'Главная',
      icon: LayoutDashboard,
    },
    {
      id: 'lessons' as NavTab,
      label: 'Модули',
      icon: LayoutGrid,
    },
    {
      id: 'handbook' as NavTab,
      label: 'Справочник',
      icon: BookOpen,
    },
    {
      id: 'wortschatz' as NavTab,
      label: 'Словарь',
      icon: Languages,
    },
    {
      id: 'programs' as NavTab,
      label: 'Программы',
      icon: Briefcase,
    },
    {
      id: 'profile' as NavTab,
      label: 'Профиль',
      icon: User,
    },
  ];

  if (isAdmin) {
    navItems.push({
      id: 'admin' as NavTab,
      label: 'Куратор',
      icon: ShieldCheck,
    });
  }

  const isTabActive = (itemId: NavTab) => {
    if (itemId === 'programs') {
      return activeTab === 'programs' || activeTab === 'au-pair' || activeTab === 'ausbildung';
    }
    return activeTab === itemId;
  };

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-4 select-none font-sans text-white">
      {/* Top Section: Logo + Navigation */}
      <div className="flex flex-col gap-6">
        {/* Logo Section */}
        <div className="flex items-center justify-between pt-1 px-1">
          <div className="flex items-center gap-3">
            <img
              src="/delfi-logo-circle.svg"
              alt="Delfi Logo"
              className="w-10 h-10 rounded-full shadow-md shrink-0 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg text-white tracking-wider uppercase leading-none">
                DELFI
              </span>
              <span className="text-[10px] text-slate-300 font-medium tracking-wide mt-0.5">
                Training Platform
              </span>
            </div>
          </div>

          {/* Close button for mobile */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Vertical Navigation Menu */}
        <nav className="flex flex-col gap-1.5 pt-2">
          {navItems.map((item) => {
            const isActive = isTabActive(item.id);
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#3B82F6] text-white shadow-xs font-semibold'
                    : 'text-white/85 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-300'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Compact Promo Card */}
      <div className="pt-4">
        <div className="bg-[#11284A] border border-white/10 rounded-xl p-3.5 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EF1B2D]" />
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-300">
              Delfi Focus
            </span>
          </div>
          <p className="text-xs text-white/95 font-medium leading-snug">
            Heute lernen. Morgen mehr erreichen.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Left Sidebar: ~230-240px wide, dark navy background #0B1F3A */}
      <aside
        id="desktop-main-sidebar"
        className="hidden md:flex w-[230px] lg:w-[240px] bg-[#0B1F3A] flex-col h-screen sticky top-0 shrink-0 z-30 border-r border-slate-800"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <aside
            id="mobile-drawer-sidebar"
            className="fixed inset-y-0 left-0 w-72 bg-[#0B1F3A] flex flex-col h-full z-50 shadow-2xl animate-in slide-in-from-left duration-200"
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
