import React, { useState, useMemo, useEffect } from 'react';
import { HANDBOOK_DATA } from '../data/handbookData';
import { AudioButton } from './AudioButton';
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
  SlidersHorizontal,
} from 'lucide-react';

interface HandbookViewProps {
  onStartLesson?: (lessonId: string) => void;
}

type FilterCategory = 'all' | 'grammar' | 'vocabulary' | 'visa-tips' | 'A1.1' | 'A1.2';

export const HandbookView: React.FC<HandbookViewProps> = ({ onStartLesson }) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>(HANDBOOK_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);

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
    <div id="handbook-spravochnik-view" className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto flex flex-col gap-6 font-sans">
      {/* Top Header */}
      <div className="border-b border-zinc-300 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-1 flex items-center gap-1.5">
            <BookOpen size={13} className="text-zinc-950" />
            <span>Официальный академический свод • 24 темы курса A1</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-zinc-950 tracking-tight">
            Справочник и База знаний A1
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 font-normal mt-1 max-w-3xl leading-relaxed">
            Полный структурированный свод всех грамматических правил, таблиц спряжения, предлогов и профильного словарного запаса.
          </p>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-2 font-mono text-xs shrink-0 flex-wrap">
          <button
            id="handbook-copy-btn"
            type="button"
            onClick={handleCopySummary}
            className="px-3 py-2 bg-white hover:bg-zinc-100 text-zinc-900 uppercase tracking-wider border border-zinc-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Скопировать текущий раздел в буфер"
          >
            {copiedNotification ? <Check size={13} className="text-zinc-950" /> : <Copy size={13} />}
            <span>{copiedNotification ? 'Скопировано' : 'Копировать'}</span>
          </button>

          <button
            id="handbook-download-btn"
            type="button"
            onClick={handleDownloadTXT}
            className="px-3 py-2 bg-zinc-950 hover:bg-zinc-800 text-white uppercase tracking-wider font-bold transition-colors border border-zinc-950 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Скачать конспект темы"
          >
            <Download size={13} />
            <span>.TXT ↓</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            title="Распечатать пособие"
            className="px-3 py-2 bg-white hover:bg-zinc-100 text-zinc-800 uppercase tracking-wider border border-zinc-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Printer size={13} />
            <span>Печать</span>
          </button>
        </div>
      </div>

      {/* Quick Navigation Control Strip (Compact & Vertical-Space-Efficient) */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border border-zinc-300 p-2.5 sm:p-3 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
        {/* Left: TOC Toggle Button + Topic Quick Dropdown Selector */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button
            id="toggle-toc-btn"
            type="button"
            onClick={() => setIsTocOpen(!isTocOpen)}
            className={`px-3 py-2 border font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
              isTocOpen
                ? 'bg-zinc-950 text-white border-zinc-950'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border-zinc-300'
            }`}
            title="Открыть/скрыть полное оглавление"
          >
            <List size={14} />
            <span>Оглавление</span>
            <span className={`px-1.5 py-0.2 text-[10px] rounded-none ${isTocOpen ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-200 text-zinc-700'}`}>
              {HANDBOOK_DATA.length}
            </span>
          </button>

          {/* Direct Topic Select Dropdown (Instant 1-click jump without taking vertical space) */}
          <div className="relative flex-1 min-w-0">
            <select
              id="handbook-quick-select"
              value={currentSection.id}
              onChange={(e) => handleSelectSection(e.target.value)}
              className="w-full bg-zinc-50 hover:bg-white focus:bg-white border border-zinc-300 px-3 py-2 font-mono text-xs text-zinc-900 truncate focus:outline-none focus:border-zinc-950 cursor-pointer transition-colors"
            >
              {HANDBOOK_DATA.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.topicNumber ? `№${section.topicNumber < 10 ? '0' + section.topicNumber : section.topicNumber}: ` : ''}
                  {section.title} ({section.level})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Step navigation (Prev / Next) + Topic Count Indicator */}
        <div className="flex items-center justify-between md:justify-end gap-2 font-mono text-xs shrink-0">
          <div className="text-[11px] text-zinc-500 hidden sm:block">
            Тема <span className="font-bold text-zinc-900">{currentSection.topicNumber || currentIndex + 1}</span> из <span className="font-bold text-zinc-900">{HANDBOOK_DATA.length}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              id="handbook-top-prev-btn"
              type="button"
              disabled={!prevSection}
              onClick={() => prevSection && handleSelectSection(prevSection.id)}
              className={`p-2 border transition-colors flex items-center gap-1 ${
                prevSection
                  ? 'bg-white hover:bg-zinc-100 text-zinc-900 border-zinc-300 cursor-pointer'
                  : 'bg-zinc-50 text-zinc-300 border-zinc-200 cursor-not-allowed'
              }`}
              title={prevSection ? `Предыдущая: ${prevSection.title}` : 'Это первая тема'}
            >
              <ChevronLeft size={15} />
              <span className="hidden sm:inline text-[11px] uppercase">Пред.</span>
            </button>

            <button
              id="handbook-top-next-btn"
              type="button"
              disabled={!nextSection}
              onClick={() => nextSection && handleSelectSection(nextSection.id)}
              className={`p-2 border transition-colors flex items-center gap-1 font-bold ${
                nextSection
                  ? 'bg-zinc-950 hover:bg-zinc-800 text-white border-zinc-950 cursor-pointer'
                  : 'bg-zinc-50 text-zinc-300 border-zinc-200 cursor-not-allowed'
              }`}
              title={nextSection ? `Следующая: ${nextSection.title}` : 'Это последняя тема'}
            >
              <span className="hidden sm:inline text-[11px] uppercase">След.</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible / Drawer TOC (Opens on demand so it does NOT take permanent vertical space) */}
      {isTocOpen && (
        <div className="bg-white border-2 border-zinc-950 p-4 sm:p-5 shadow-lg flex flex-col gap-4 animate-in fade-in duration-200">
          {/* Header of TOC panel */}
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-normal text-zinc-950">
                Оглавление справочника
              </span>
              <span className="font-mono text-xs text-zinc-500">
                ({filteredSections.length} тем)
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsTocOpen(false)}
              className="p-1.5 hover:bg-zinc-100 border border-zinc-300 text-zinc-700 transition-colors font-mono text-xs flex items-center gap-1 cursor-pointer"
              title="Закрыть оглавление"
            >
              <X size={14} />
              <span>Скрыть</span>
            </button>
          </div>

          {/* Search & Filter within TOC */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 font-mono text-[11px]">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-2.5 py-1 border transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-zinc-950 text-white border-zinc-950 font-bold'
                    : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50'
                }`}
              >
                Все ({HANDBOOK_DATA.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('grammar')}
                className={`px-2.5 py-1 border transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === 'grammar'
                    ? 'bg-zinc-950 text-white border-zinc-950 font-bold'
                    : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50'
                }`}
              >
                Грамматика ({HANDBOOK_DATA.filter((s) => s.category === 'grammar').length})
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('vocabulary')}
                className={`px-2.5 py-1 border transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === 'vocabulary'
                    ? 'bg-zinc-950 text-white border-zinc-950 font-bold'
                    : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50'
                }`}
              >
                Словарь ({HANDBOOK_DATA.filter((s) => s.category === 'vocabulary').length})
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('A1.1')}
                className={`px-2.5 py-1 border transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === 'A1.1'
                    ? 'bg-zinc-950 text-white border-zinc-950 font-bold'
                    : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50'
                }`}
              >
                A1.1 (12)
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('A1.2')}
                className={`px-2.5 py-1 border transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === 'A1.2'
                    ? 'bg-zinc-950 text-white border-zinc-950 font-bold'
                    : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50'
                }`}
              >
                A1.2 (11)
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('visa-tips')}
                className={`px-2.5 py-1 border transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === 'visa-tips'
                    ? 'bg-zinc-950 text-white border-zinc-950 font-bold'
                    : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50'
                }`}
              >
                Виза & Посольство (1)
              </button>
            </div>

            {/* Live Search */}
            <div className="relative min-w-[220px]">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                id="handbook-search-input"
                type="text"
                placeholder="Поиск по правилам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-8 py-1.5 bg-zinc-50 border border-zinc-300 font-mono text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-950 rounded-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-xs text-zinc-400 hover:text-zinc-900 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Grid of Topics (Clean multi-column cards for fast overview) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
            {filteredSections.length === 0 ? (
              <div className="col-span-full p-8 text-center text-zinc-500 font-mono text-xs bg-zinc-50 border border-dashed border-zinc-300">
                Ничего не найдено по запросу «{searchQuery}».
              </div>
            ) : (
              filteredSections.map((section) => {
                const isActive = section.id === currentSection.id;
                const numStr = section.topicNumber
                  ? section.topicNumber < 10
                    ? `0${section.topicNumber}`
                    : `${section.topicNumber}`
                  : '•';

                return (
                  <button
                    key={section.id}
                    id={`handbook-toc-item-${section.id}`}
                    type="button"
                    onClick={() => handleSelectSection(section.id)}
                    className={`text-left p-3 transition-all flex flex-col justify-between gap-2 border cursor-pointer ${
                      isActive
                        ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                        : 'bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-400 text-zinc-900 border-zinc-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase w-full">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-bold px-1.5 py-0.5 border ${
                            isActive
                              ? 'border-zinc-700 bg-zinc-800 text-zinc-200'
                              : 'border-zinc-200 bg-white text-zinc-800'
                          }`}
                        >
                          {numStr}
                        </span>
                        <span className={isActive ? 'text-zinc-300' : 'text-zinc-500'}>
                          {section.level}
                        </span>
                      </div>

                      <span
                        className={`text-[9px] px-1.5 py-0.5 border ${
                          isActive
                            ? 'border-zinc-800 bg-zinc-900 text-zinc-400'
                            : 'border-zinc-200 bg-white text-zinc-600'
                        }`}
                      >
                        {section.category === 'grammar'
                          ? 'Грамматика'
                          : section.category === 'vocabulary'
                          ? 'Словарь'
                          : 'Виза'}
                      </span>
                    </div>

                    <div>
                      <div className="font-serif text-sm font-normal leading-snug line-clamp-1">
                        {section.title}
                      </div>
                      <div className={`font-mono text-[10px] truncate mt-0.5 ${isActive ? 'text-zinc-400' : 'text-zinc-500'}`}>
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
        <article className="border border-zinc-300 bg-white p-6 sm:p-8 md:p-10 flex flex-col gap-8 shadow-sm">
          {/* Topic Header */}
          <div className="border-b border-zinc-200 pb-6 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-zinc-950 text-white font-bold text-[11px]">
                  Тема {currentSection.topicNumber || 1}
                </span>
                <span className="px-2 py-0.5 bg-zinc-100 border border-zinc-300 text-zinc-800 text-[11px]">
                  Уровень {currentSection.level}
                </span>
                <span className="text-zinc-400 text-[11px]">/</span>
                <span className="text-zinc-500 uppercase text-[10px] tracking-wider">
                  {currentSection.category === 'grammar'
                    ? 'Грамматический канон'
                    : currentSection.category === 'vocabulary'
                    ? 'Лексический минимум'
                    : 'Инструкция для визы'}
                </span>
              </div>

              {/* Practical lesson link if available */}
              {currentSection.relatedLessonId && onStartLesson && (
                <button
                  id={`handbook-practice-link-${currentSection.relatedLessonId}`}
                  type="button"
                  onClick={() => onStartLesson(currentSection.relatedLessonId!)}
                  className="font-mono text-[11px] font-bold px-3 py-1.5 bg-zinc-950 hover:bg-zinc-800 text-white transition-colors flex items-center gap-1.5 border border-zinc-950 cursor-pointer shadow-2xs"
                >
                  <span>Практический тест к теме</span>
                  <ArrowUpRight size={13} />
                </button>
              )}
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-zinc-950 tracking-tight mt-1 leading-tight">
              {currentSection.title}
            </h2>

            <div className="font-mono text-xs sm:text-sm text-zinc-700 italic bg-zinc-50 p-3 border-l-2 border-zinc-950">
              DE: <span className="font-bold text-zinc-900 not-italic">{currentSection.titleDe}</span>
            </div>
          </div>

          {/* Main Explanation Text */}
          <div className="flex flex-col gap-3">
            <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
              § Теоретическое обоснование и суть правила
            </div>
            <p className="text-sm sm:text-base text-zinc-800 leading-relaxed font-sans">
              {currentSection.content}
            </p>
          </div>

          {/* Grammar / Vocabulary Tables */}
          {currentSection.tables && currentSection.tables.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                § Сводная таблица форм и окончаний
              </div>
              {currentSection.tables.map((table, tIdx) => (
                <div key={tIdx} className="border border-zinc-300 overflow-x-auto shadow-2xs">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-900 text-white border-b border-zinc-800">
                        {table.headers.map((h, hIdx) => (
                          <th
                            key={hIdx}
                            className="p-3 font-semibold uppercase tracking-wider text-[10px] border-r border-zinc-800 last:border-r-0 whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      {table.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className={`hover:bg-zinc-50 transition-colors ${
                            rIdx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                          }`}
                        >
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`p-3 border-r border-zinc-200 last:border-r-0 leading-relaxed ${
                                cIdx === 0
                                  ? 'font-bold text-zinc-900 bg-zinc-50/50 whitespace-nowrap'
                                  : 'text-zinc-700'
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
            <div className="border border-zinc-300 bg-zinc-50 p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-950 uppercase tracking-wider">
                <Sparkles size={14} className="text-zinc-950" />
                <span>Лайфхаки запоминания и частые ошибки</span>
              </div>
              <ul className="flex flex-col gap-2 font-sans text-xs sm:text-sm text-zinc-700 list-disc pl-5">
                {currentSection.ruleTips.map((tip, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Real Context Examples with Audio Voiceover */}
          {currentSection.examples && currentSection.examples.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                § Примеры в живой речи (с правильным произношением)
              </div>
              <div className="flex flex-col gap-2.5">
                {currentSection.examples.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="p-4 bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-zinc-300 transition-colors"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="font-serif text-base text-zinc-950 font-normal">
                        {ex.de}
                      </div>
                      <div className="font-sans text-xs text-zinc-600">
                        {ex.ru}
                      </div>
                    </div>

                    <AudioButton
                      text={ex.de}
                      label="Слушать"
                      className="self-start sm:self-center shrink-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Next / Prev Navigation */}
          <div className="border-t border-zinc-200 pt-6 flex items-center justify-between gap-4 font-mono text-xs">
            {prevSection ? (
              <button
                type="button"
                onClick={() => handleSelectSection(prevSection.id)}
                className="px-4 py-2.5 border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800 transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <ChevronLeft size={14} />
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
                className="px-4 py-2.5 border border-zinc-950 bg-zinc-950 hover:bg-zinc-800 text-white transition-colors flex items-center gap-2 font-bold cursor-pointer shadow-2xs"
              >
                <span className="hidden sm:inline">Следующая:</span>
                <span className="truncate max-w-[150px]">
                  {nextSection.topicNumber ? `№${nextSection.topicNumber}` : ''} {nextSection.title.slice(0, 18)}...
                </span>
                <ChevronRight size={14} />
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
