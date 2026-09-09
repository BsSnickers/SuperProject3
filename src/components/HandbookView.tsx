import React, { useState, useMemo, useEffect } from 'react';
import { HANDBOOK_DATA } from '../data/handbookData';
import { LESSONS_DATA } from '../data/lessonsData';
import { useAuth } from '../context/AuthContext';
import { HandbookSection } from '../types';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  List,
  Search,
  X,
  Copy,
  Check,
  Download,
  Printer,
  Sparkles,
  ArrowUpRight,
  Lock,
} from 'lucide-react';

interface HandbookViewProps {
  onStartLesson?: (lessonId: string) => void;
  initialSectionId?: string;
}

type FilterCategory = 'all' | 'grammar' | 'vocabulary' | 'visa-tips' | 'A1.1' | 'A1.2';

export const HandbookView: React.FC<HandbookViewProps> = ({ onStartLesson, initialSectionId }) => {
  const { progress, isAdmin } = useAuth();
  const [selectedSectionId, setSelectedSectionId] = useState<string>(initialSectionId || HANDBOOK_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);

  useEffect(() => {
    if (initialSectionId) {
      setSelectedSectionId(initialSectionId);
    }
  }, [initialSectionId]);

  // Filtered list based on search and category tab
  const filteredSections = useMemo(() => {
    return HANDBOOK_DATA.filter((section) => {
      // Category filter
      if (activeCategory === 'grammar' && section.category !== 'grammar') return false;
      if (activeCategory === 'vocabulary' && section.category !== 'vocabulary') return false;
      if (activeCategory === 'visa-tips' && section.category !== 'visa-tips') return false;
      if (activeCategory === 'A1.1' && !section.level.includes('A1.1')) return false;
      if (activeCategory === 'A1.2' && !section.level.includes('A1.2')) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = section.title.toLowerCase().includes(q);
        const matchesTitleDe = section.titleDe.toLowerCase().includes(q);
        const matchesContent = section.content.toLowerCase().includes(q);
        const matchesTips = section.ruleTips?.some((tip) => tip.toLowerCase().includes(q));
        const matchesExamples = section.examples?.some(
          (ex) => ex.de.toLowerCase().includes(q) || ex.ru.toLowerCase().includes(q)
        );
        return matchesTitle || matchesTitleDe || matchesContent || matchesTips || matchesExamples;
      }
      return true;
    });
  }, [searchQuery, activeCategory]);

  // Current active section
  const currentSection: HandbookSection =
    HANDBOOK_DATA.find((s) => s.id === selectedSectionId) ||
    filteredSections[0] ||
    HANDBOOK_DATA[0];

  // Index for Prev/Next navigation
  const currentIndex = HANDBOOK_DATA.findIndex((s) => s.id === currentSection.id);
  const prevSection = currentIndex > 0 ? HANDBOOK_DATA[currentIndex - 1] : null;
  const nextSection = currentIndex < HANDBOOK_DATA.length - 1 ? HANDBOOK_DATA[currentIndex + 1] : null;

  // Auto scroll to top on section change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedSectionId]);

  const handleSelectSection = (id: string) => {
    setSelectedSectionId(id);
    setIsTocOpen(false);
  };

  const handleCopySummary = async () => {
    const textToCopy = `=== ${currentSection.title.toUpperCase()} (${currentSection.titleDe}) ===\nУровень: ${currentSection.level}\nКатегория: ${currentSection.category}\n\n${currentSection.content}\n\n${
      currentSection.ruleTips?.length
        ? `Правила и лайфхаки:\n${currentSection.ruleTips.map((t) => `• ${t}`).join('\n')}\n\n`
        : ''
    }Примеры:\n${currentSection.examples?.map((e) => `• ${e.de} — ${e.ru}`).join('\n') || ''}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadTXT = () => {
    const content = `DELFI TRAINING PLATFORM — СПРАВОЧНИК НЕМЕЦКОГО ЯЗЫКА A1–A2\n\nРаздел: ${currentSection.title}\nНемецкое название: ${currentSection.titleDe}\nУровень: ${currentSection.level}\n\n${currentSection.content}\n\n${
      currentSection.ruleTips?.length
        ? `ПРАВИЛА И ЛАЙФХАКИ:\n${currentSection.ruleTips.map((t) => `* ${t}`).join('\n')}\n\n`
        : ''
    }ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ:\n${currentSection.examples?.map((e) => `* ${e.de} — ${e.ru}`).join('\n') || ''}`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Delfi_A1_Spravochnik_${currentSection.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="handbook-spravochnik-view" className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto flex flex-col gap-6 font-sans transition-colors text-[#0B1F3A] dark:text-[#F4F6F8]">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="font-heading font-bold text-xs uppercase tracking-widest text-[#3B82F6] mb-1.5 flex items-center gap-1.5">
            <BookOpen size={14} />
            <span>Официальный академический свод • 24 темы курса A1</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0B1F3A] dark:text-white tracking-tight">
            Справочник и База знаний A1
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] font-medium mt-1.5 max-w-3xl leading-relaxed">
            Полный структурированный свод всех грамматических правил, таблиц спряжения, предлогов и профильного словарного запаса.
          </p>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            id="handbook-copy-btn"
            type="button"
            onClick={handleCopySummary}
            className="px-3.5 py-2 bg-white dark:bg-[#111C2E] hover:bg-slate-50 dark:hover:bg-slate-700 text-[#0B1F3A] dark:text-slate-100 font-semibold text-xs rounded-xl border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Скопировать текущий раздел в буфер"
          >
            {copiedNotification ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            <span>{copiedNotification ? 'Скопировано' : 'Копировать'}</span>
          </button>

          <button
            id="handbook-download-btn"
            type="button"
            onClick={handleDownloadTXT}
            className="px-3.5 py-2 bg-[#0B1F3A] hover:bg-[#111C2E] dark:bg-[#3B82F6] dark:hover:bg-blue-600 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Скачать конспект темы"
          >
            <Download size={14} />
            <span>.TXT ↓</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            title="Распечатать пособие"
            className="px-3.5 py-2 bg-white dark:bg-[#111C2E] hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer size={14} />
            <span>Печать</span>
          </button>
        </div>
      </div>

      {/* Quick Navigation Control Strip (Sticky at top-16 below TopHeader) */}
      <div className="sticky top-16 z-20 bg-white/95 dark:bg-[#0E1A2D]/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-2xl p-2.5 sm:p-3 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
        {/* Left: TOC Toggle Button + Topic Quick Dropdown Selector */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button
            id="toggle-toc-btn"
            type="button"
            onClick={() => setIsTocOpen(!isTocOpen)}
            className={`px-3.5 py-2 rounded-xl font-heading text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0 shadow-xs ${
              isTocOpen
                ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white'
                : 'bg-slate-100 dark:bg-[#111C2E] hover:bg-slate-200 dark:hover:bg-slate-700 text-[#0B1F3A] dark:text-white border border-slate-200 dark:border-slate-700'
            }`}
            title="Открыть/скрыть полное оглавление"
          >
            <List size={15} />
            <span>Оглавление</span>
            <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${isTocOpen ? 'bg-white/20 text-white' : 'bg-white dark:bg-[#0E1A2D] text-slate-700 dark:text-slate-300'}`}>
              {HANDBOOK_DATA.length}
            </span>
          </button>

          {/* Direct Topic Select Dropdown */}
          <div className="relative flex-1 min-w-0">
            <select
              id="handbook-quick-select"
              value={currentSection.id}
              onChange={(e) => handleSelectSection(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#111C2E] hover:bg-white dark:hover:bg-[#111C2E] focus:bg-white border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-medium text-[#0B1F3A] dark:text-slate-100 truncate focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#3B82F6] cursor-pointer transition-colors"
            >
              {HANDBOOK_DATA.map((section) => (
                <option key={section.id} value={section.id} className="bg-white dark:bg-[#0E1A2D] text-[#0B1F3A] dark:text-slate-100">
                  {section.topicNumber ? `№${section.topicNumber < 10 ? '0' + section.topicNumber : section.topicNumber}: ` : ''}
                  {section.title} ({section.level})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Step navigation (Prev / Next) + Topic Count Indicator */}
        <div className="flex items-center justify-between md:justify-end gap-2 shrink-0">
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] hidden sm:block font-medium">
            Тема <span className="font-bold text-[#0B1F3A] dark:text-white">{currentSection.topicNumber || currentIndex + 1}</span> из <span className="font-bold text-[#0B1F3A] dark:text-white">{HANDBOOK_DATA.length}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id="handbook-top-prev-btn"
              type="button"
              disabled={!prevSection}
              onClick={() => prevSection && handleSelectSection(prevSection.id)}
              className={`p-2 rounded-xl border transition-colors flex items-center gap-1 text-xs font-semibold ${
                prevSection
                  ? 'bg-white dark:bg-[#111C2E] hover:bg-slate-50 dark:hover:bg-slate-700 text-[#0B1F3A] dark:text-slate-100 border-slate-200 dark:border-slate-700 cursor-pointer shadow-xs'
                  : 'bg-slate-100 dark:bg-[#0E1A2D] text-slate-300 dark:text-slate-700 border-slate-200 dark:border-slate-800 cursor-not-allowed'
              }`}
              title={prevSection ? `Предыдущая: ${prevSection.title}` : 'Это первая тема'}
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline text-xs">Пред.</span>
            </button>

            <button
              id="handbook-top-next-btn"
              type="button"
              disabled={!nextSection}
              onClick={() => nextSection && handleSelectSection(nextSection.id)}
              className={`p-2 rounded-xl border transition-colors flex items-center gap-1 text-xs font-semibold ${
                nextSection
                  ? 'bg-[#0B1F3A] hover:bg-[#111C2E] dark:bg-[#3B82F6] dark:hover:bg-blue-600 text-white border-transparent cursor-pointer shadow-xs'
                  : 'bg-slate-100 dark:bg-[#0E1A2D] text-slate-300 dark:text-slate-700 border-slate-200 dark:border-slate-800 cursor-not-allowed'
              }`}
              title={nextSection ? `Следующая: ${nextSection.title}` : 'Это последняя тема'}
            >
              <span className="hidden sm:inline text-xs">След.</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Collapsible TOC Modal / Drawer */}
      {isTocOpen && (
        <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm text-[#0B1F3A] dark:text-white">
                Полное оглавление справочника
              </span>
              <span className="text-xs text-[#3B82F6] font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40">
                {filteredSections.length} тем
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsTocOpen(false)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-[#0B1F3A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
              title="Закрыть оглавление"
            >
              <X size={16} />
            </button>
          </div>

          {/* Search & Filter within TOC */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#111C2E] text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Все ({HANDBOOK_DATA.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('grammar')}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === 'grammar'
                    ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#111C2E] text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Грамматика ({HANDBOOK_DATA.filter((s) => s.category === 'grammar').length})
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('vocabulary')}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === 'vocabulary'
                    ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#111C2E] text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Словарь ({HANDBOOK_DATA.filter((s) => s.category === 'vocabulary').length})
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('A1.1')}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === 'A1.1'
                    ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#111C2E] text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                A1.1 (12)
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('A1.2')}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === 'A1.2'
                    ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#111C2E] text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                A1.2 (11)
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('visa-tips')}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === 'visa-tips'
                    ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#111C2E] text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Виза & Посольство (1)
              </button>
            </div>

            {/* Live Search */}
            <div className="relative min-w-[240px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="handbook-search-input"
                type="text"
                placeholder="Поиск по правилам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-[#111C2E] border border-slate-200 dark:border-slate-700 text-xs text-[#0B1F3A] dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-[#111C2E] focus:border-[#3B82F6] rounded-xl transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-[#0B1F3A] cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Grid of Topics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pr-1">
            {filteredSections.length === 0 ? (
              <div className="col-span-full p-8 text-center text-slate-500 dark:text-[#94A3B8] text-xs bg-slate-50 dark:bg-[#111C2E]/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                Ничего не найдено по фильтрам или запросу «{searchQuery}».
              </div>
            ) : (
              filteredSections.map((section) => {
                const isActive = section.id === currentSection.id;
                const numStr = section.topicNumber
                  ? section.topicNumber < 10
                    ? `0${section.topicNumber}`
                    : `${section.topicNumber}`
                  : '01';

                return (
                  <button
                    key={section.id}
                    id={`handbook-toc-item-${section.id}`}
                    type="button"
                    onClick={() => handleSelectSection(section.id)}
                    className={`text-left p-3.5 rounded-xl transition-all flex flex-col justify-between gap-2 border cursor-pointer shadow-xs ${
                      isActive
                        ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white border-transparent'
                        : 'bg-slate-50 dark:bg-[#111C2E]/70 hover:bg-white dark:hover:bg-[#111C2E] text-[#0B1F3A] dark:text-slate-100 border-slate-200/90 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] uppercase w-full font-semibold">
                      <span className={`px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-white dark:bg-[#0E1A2D] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}>
                        Тема №{numStr}
                      </span>
                      <span className={isActive ? 'text-blue-100' : 'text-slate-500'}>
                        {section.level}
                      </span>
                    </div>

                    <div>
                      <div className="font-heading font-bold text-sm leading-snug line-clamp-1">
                        {section.title}
                      </div>
                      <div className={`text-xs mt-0.5 line-clamp-1 ${isActive ? 'text-blue-100' : 'text-slate-500 dark:text-[#94A3B8]'}`}>
                        {section.titleDe}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Main Content Reader (Centrally framed, pristine reading experience) */}
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
        <article className="border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0E1A2D] rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col gap-8 shadow-xs">
          {/* Topic Header */}
          <div className="border-b border-slate-200/90 dark:border-slate-800 pb-6 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#3B82F6] text-white font-bold text-xs rounded-full shadow-xs">
                  Тема {currentSection.topicNumber || 1}
                </span>
                <span className="px-3 py-1 bg-slate-100 dark:bg-[#111C2E] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full font-medium">
                  Уровень {currentSection.level}
                </span>
                <span className="text-slate-400 dark:text-slate-600">/</span>
                <span className="text-slate-500 dark:text-[#94A3B8] uppercase text-[11px] font-semibold tracking-wider">
                  {currentSection.category === 'grammar'
                    ? 'Грамматический канон'
                    : currentSection.category === 'vocabulary'
                    ? 'Лексический минимум'
                    : 'Инструкция для визы'}
                </span>
              </div>

              {/* Practical lesson link if available */}
              {currentSection.relatedLessonId && onStartLesson && (() => {
                const relatedLesson = LESSONS_DATA.find((l) => l.id === currentSection.relatedLessonId);
                if (!relatedLesson) return null;

                const prevLesson = LESSONS_DATA.find((l) => l.number === relatedLesson.number - 1);
                const isUnlocked = isAdmin || relatedLesson.number === 1 || (prevLesson && progress[prevLesson.id]?.passed);

                if (relatedLesson.isComingSoon) {
                  return (
                    <span className="text-xs font-semibold px-3 py-1.5 bg-slate-100 dark:bg-[#111C2E] text-slate-400 dark:text-slate-500 rounded-xl border border-slate-200 dark:border-slate-700">
                      Тест в разработке
                    </span>
                  );
                }

                if (!isUnlocked) {
                  return (
                    <button
                      disabled
                      type="button"
                      title={`Тест заблокирован. Для доступа сначала пройдите Модуль #${relatedLesson.number - 1}`}
                      className="text-xs font-semibold px-3 py-1.5 bg-slate-100 dark:bg-[#111C2E] text-slate-400 dark:text-slate-500 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 cursor-not-allowed"
                    >
                      <Lock size={12} className="shrink-0 text-slate-400" />
                      <span>Тест заблокирован (Модуль #{relatedLesson.number})</span>
                    </button>
                  );
                }

                return (
                  <button
                    id={`handbook-practice-link-${currentSection.relatedLessonId}`}
                    type="button"
                    onClick={() => onStartLesson(currentSection.relatedLessonId!)}
                    className="text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-[#0B1F3A] dark:bg-[#3B82F6] hover:bg-[#111C2E] dark:hover:bg-blue-600 text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Практический тест к теме</span>
                    <ArrowUpRight size={13} />
                  </button>
                );
              })()}
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0B1F3A] dark:text-white tracking-tight mt-1 leading-tight">
              {currentSection.title}
            </h2>

            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#111C2E]/70 p-3.5 rounded-xl border-l-4 border-[#3B82F6]">
              DE: <span className="font-bold text-[#0B1F3A] dark:text-white">{currentSection.titleDe}</span>
            </div>
          </div>

          {/* Main Explanation Text */}
          <div className="flex flex-col gap-3">
            <div className="font-heading font-bold text-xs uppercase tracking-wider text-[#3B82F6]">
              Теоретическое обоснование и суть правила
            </div>
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-sans font-medium">
              {currentSection.content}
            </p>
          </div>

          {/* Grammar / Vocabulary Tables */}
          {currentSection.tables && currentSection.tables.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="font-heading font-bold text-xs uppercase tracking-wider text-[#3B82F6]">
                Сводная таблица форм и окончаний
              </div>
              {currentSection.tables.map((table, tIdx) => (
                <div key={tIdx} className="rounded-xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-[#111C2E] text-[#0B1F3A] dark:text-white border-b border-slate-200 dark:border-slate-700">
                        {table.headers.map((h, hIdx) => (
                          <th
                            key={hIdx}
                            className="p-3.5 font-heading font-semibold uppercase tracking-wider text-[11px] whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800">
                      {table.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className={`hover:bg-slate-50 dark:hover:bg-[#111C2E]/50 transition-colors ${
                            rIdx % 2 === 0 ? 'bg-white dark:bg-[#0E1A2D]' : 'bg-slate-50/50 dark:bg-[#0E1A2D]/60'
                          }`}
                        >
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`p-3.5 leading-relaxed ${
                                cIdx === 0
                                  ? 'font-bold text-[#0B1F3A] dark:text-white whitespace-nowrap'
                                  : 'text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}

          {/* Rules & Lifehacks Box */}
          {currentSection.ruleTips && currentSection.ruleTips.length > 0 && (
            <div className="rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/60 dark:bg-blue-950/20 p-6 flex flex-col gap-3 shadow-xs">
              <div className="flex items-center gap-2 font-heading font-bold text-xs text-[#3B82F6] uppercase tracking-wider">
                <Sparkles size={15} />
                <span>Лайфхаки запоминания и частые ошибки</span>
              </div>
              <ul className="flex flex-col gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc pl-5 font-medium">
                {currentSection.ruleTips.map((tip, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Real Context Examples */}
          {currentSection.examples && currentSection.examples.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="font-heading font-bold text-xs uppercase tracking-wider text-[#3B82F6]">
                Примеры в живой речи
              </div>
              <div className="flex flex-col gap-2.5">
                {currentSection.examples.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="p-4 bg-slate-50 dark:bg-[#111C2E]/60 rounded-xl border border-slate-200/90 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="font-heading font-bold text-sm sm:text-base text-[#0B1F3A] dark:text-white">
                        {ex.de}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-[#94A3B8]">
                        {ex.ru}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Next / Prev Navigation */}
          <div className="border-t border-slate-200/90 dark:border-slate-800 pt-6 flex items-center justify-between gap-4">
            {prevSection ? (
              <button
                type="button"
                onClick={() => handleSelectSection(prevSection.id)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C2E] hover:bg-slate-50 dark:hover:bg-slate-700 text-[#0B1F3A] dark:text-slate-200 transition-colors flex items-center gap-2 cursor-pointer shadow-xs text-xs font-semibold"
              >
                <ChevronLeft size={15} />
                <span className="hidden sm:inline">Предыдущая:</span>
                <span className="font-bold truncate max-w-[150px]">
                  {prevSection.topicNumber ? `№${prevSection.topicNumber}` : ''} {prevSection.title.slice(0, 18)}...
                </span>
              </button>
            ) : (
              <div />
            )}

            {nextSection ? (
              <button
                type="button"
                onClick={() => handleSelectSection(nextSection.id)}
                className="px-4 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#111C2E] dark:bg-[#3B82F6] dark:hover:bg-blue-600 text-white transition-colors flex items-center gap-2 font-semibold cursor-pointer shadow-xs text-xs"
              >
                <span className="hidden sm:inline">Следующая:</span>
                <span className="truncate max-w-[150px]">
                  {nextSection.topicNumber ? `№${nextSection.topicNumber}` : ''} {nextSection.title.slice(0, 18)}...
                </span>
                <ChevronRight size={15} />
              </button>
            ) : (
              <div />
            )}
          </div>
        </article>
      </div>
    </div>
  );
};
