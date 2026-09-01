import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { WORTSCHATZ_DATA } from '../data/wortschatzData';
import { useAuth } from '../context/AuthContext';
import { WortschatzSection, WortschatzItem, WortschatzQuizQuestion } from '../types';
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
  Volume2,
  RotateCcw,
  Sparkles,
  Layers,
  CheckCircle2,
  Award,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface WortschatzViewProps {
  onOpenTopic?: (sectionId: number) => void;
  initialSectionId?: number;
}

type FilterCategory = 'all' | 'A1.1' | 'A1.2' | 'passed' | 'not-passed';
type WordTypeFilter = 'all' | 'der' | 'die' | 'das' | 'verbs' | 'other';
type ViewMode = 'list' | 'flashcards';

interface QuizProgressRecord {
  scorePercent: number;
  correctAnswers: number;
  totalQuestions: number;
  passed: boolean;
  completedAt: string;
  attemptsCount: number;
}

export const WortschatzView: React.FC<WortschatzViewProps> = ({ initialSectionId }) => {
  const { isAdmin } = useAuth();
  const [selectedSectionId, setSelectedSectionId] = useState<number>(initialSectionId || 1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (initialSectionId) {
      setSelectedSectionId(initialSectionId);
    }
  }, [initialSectionId]);
  const [tocCategoryFilter, setTocCategoryFilter] = useState<FilterCategory>('all');
  const [wordTypeFilter, setWordTypeFilter] = useState<WordTypeFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);

  // Flashcards state
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Practical Test (Quiz) State - Identical to LessonPlayerView / LessonResultView
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [finalScorePercent, setFinalScorePercent] = useState(0);

  // Curator tools state inside quiz
  const [showCuratorAnswer, setShowCuratorAnswer] = useState(true);
  const [showCuratorInspector, setShowCuratorInspector] = useState(false);

  // Persistent quiz progress
  const [quizProgress, setQuizProgress] = useState<Record<number, QuizProgressRecord>>(() => {
    try {
      const saved = localStorage.getItem('delfi_wortschatz_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const saveSectionQuizResult = (sectionId: number, scorePercent: number, correctAnswers: number, totalQuestions: number) => {
    const existing = quizProgress[sectionId];
    const updated: QuizProgressRecord = {
      scorePercent: Math.max(scorePercent, existing?.scorePercent || 0),
      correctAnswers: Math.max(correctAnswers, existing?.correctAnswers || 0),
      totalQuestions,
      passed: scorePercent >= 70,
      completedAt: new Date().toISOString(),
      attemptsCount: (existing?.attemptsCount || 0) + 1,
    };

    const newProgress = { ...quizProgress, [sectionId]: updated };
    setQuizProgress(newProgress);
    try {
      localStorage.setItem('delfi_wortschatz_progress', JSON.stringify(newProgress));
    } catch {
      // Storage errors ignored
    }
  };

  // Active section
  const currentSection = useMemo(() => {
    return WORTSCHATZ_DATA.sections.find((s) => s.section_id === selectedSectionId) || WORTSCHATZ_DATA.sections[0];
  }, [selectedSectionId]);

  // Next / Prev sections
  const currentIndex = WORTSCHATZ_DATA.sections.findIndex((s) => s.section_id === currentSection.section_id);
  const prevSection = currentIndex > 0 ? WORTSCHATZ_DATA.sections[currentIndex - 1] : null;
  const nextSection = currentIndex < WORTSCHATZ_DATA.sections.length - 1 ? WORTSCHATZ_DATA.sections[currentIndex + 1] : null;

  // Filtered TOC sections based on TOC Category filter & search query
  const filteredTocSections = useMemo(() => {
    return WORTSCHATZ_DATA.sections.filter((sec) => {
      const isPassed = !!quizProgress[sec.section_id]?.passed;
      const isA1_1 = sec.section_id <= 6;
      const isA1_2 = sec.section_id > 6;

      if (tocCategoryFilter === 'A1.1' && !isA1_1) return false;
      if (tocCategoryFilter === 'A1.2' && !isA1_2) return false;
      if (tocCategoryFilter === 'passed' && !isPassed) return false;
      if (tocCategoryFilter === 'not-passed' && isPassed) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitleDe = sec.title_de.toLowerCase().includes(q);
        const matchTitleRu = sec.title_ru.toLowerCase().includes(q);
        const matchWords = sec.vocabulary.some(
          (v) => v.de.toLowerCase().includes(q) || v.ru.toLowerCase().includes(q)
        );
        return matchTitleDe || matchTitleRu || matchWords;
      }
      return true;
    });
  }, [tocCategoryFilter, searchQuery, quizProgress]);

  // Filtered vocabulary in active section
  const filteredVocabulary = useMemo(() => {
    return currentSection.vocabulary.filter((item) => {
      // Word type filter
      if (wordTypeFilter === 'der' && !item.de.startsWith('der ')) return false;
      if (wordTypeFilter === 'die' && !item.de.startsWith('die ')) return false;
      if (wordTypeFilter === 'das' && !item.de.startsWith('das ')) return false;
      if (wordTypeFilter === 'verbs') {
        const isNoun = item.de.startsWith('der ') || item.de.startsWith('die ') || item.de.startsWith('das ');
        const isVerb = !isNoun && (item.de.endsWith('en') || item.de.endsWith('eln') || item.de.endsWith('ern') || item.de === 'sein' || item.de === 'tun');
        if (!isVerb) return false;
      }
      if (wordTypeFilter === 'other') {
        const isNoun = item.de.startsWith('der ') || item.de.startsWith('die ') || item.de.startsWith('das ');
        const isVerb = !isNoun && (item.de.endsWith('en') || item.de.endsWith('eln') || item.de.endsWith('ern') || item.de === 'sein' || item.de === 'tun');
        if (isNoun || isVerb) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesDe = item.de.toLowerCase().includes(q);
        const matchesRu = item.ru.toLowerCase().includes(q);
        return matchesDe || matchesRu;
      }

      return true;
    });
  }, [currentSection, wordTypeFilter, searchQuery]);

  // Auto scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentFlashcardIndex(0);
    setIsCardFlipped(false);
  }, [selectedSectionId]);

  const handleSelectSection = (id: number) => {
    setSelectedSectionId(id);
    setIsTocOpen(false);
    setIsQuizActive(false);
    setIsQuizFinished(false);
  };

  // TTS German Pronunciation
  const speakGerman = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanWord = text.replace(/^(der|die|das)\s+/i, '');
      const utterance = new SpeechSynthesisUtterance(cleanWord);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopyVocabulary = async () => {
    const textToCopy = `=== ТЕМА #${currentSection.section_id}: ${currentSection.title_de.toUpperCase()} (${currentSection.title_ru}) ===\nКоличество слов: ${currentSection.word_count}\n\n${currentSection.vocabulary
      .map((v, i) => `${(i + 1).toString().padStart(2, '0')}. ${v.de} — ${v.ru}`)
      .join('\n')}\n\nDELFI Training Platform • Goethe-Zertifikat A1 Wortschatz`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadTXT = () => {
    const content = `DELFI TRAINING PLATFORM — СЛОВАРЬ НЕМЕЦКОГО ЯЗЫКА A1\n\nТема #${currentSection.section_id}: ${currentSection.title_de} (${currentSection.title_ru})\nУровень: ${currentSection.section_id <= 6 ? 'A1.1' : 'A1.2'}\nВсего слов: ${currentSection.word_count}\n\nСЛОВАРНЫЙ ЗАПАС ТЕМЫ:\n${currentSection.vocabulary
      .map((v, i) => `${(i + 1).toString().padStart(2, '0')}. ${v.de.padEnd(26, ' ')} — ${v.ru}`)
      .join('\n')}\n\n=================================\nDELFI Deutsch A1 Prüfungsvorbereitung`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Delfi_A1_Wortschatz_Thema_${currentSection.section_id}_${currentSection.title_de.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // --- Quiz Handlers (Identical to LessonPlayerView) ---
  const handleStartQuiz = (sectionId?: number) => {
    if (sectionId) setSelectedSectionId(sectionId);
    setQuizQuestionIndex(0);
    setSelectedQuizOption(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setCorrectAnswersCount(0);
    setIsQuizFinished(false);
    setIsQuizActive(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitQuiz = () => {
    setIsQuizActive(false);
    setIsQuizFinished(false);
  };

  const currentQuizQuestion: WortschatzQuizQuestion | undefined = currentSection.quiz[quizQuestionIndex];

  const handleSelectQuizOption = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedQuizOption(option);
  };

  const handleCuratorAutoPick = () => {
    if (isAnswerChecked || !currentQuizQuestion) return;
    setSelectedQuizOption(currentQuizQuestion.correct_answer);
  };

  const handleCheckQuizAnswer = () => {
    if (!selectedQuizOption || isAnswerChecked || !currentQuizQuestion) return;

    const correct = selectedQuizOption.trim() === currentQuizQuestion.correct_answer.trim();
    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizQuestionIndex + 1 < currentSection.quiz.length) {
      setQuizQuestionIndex((prev) => prev + 1);
      setSelectedQuizOption(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
    } else {
      // Finish Quiz
      const totalQ = currentSection.quiz.length;
      const finalCount = correctAnswersCount + (isCorrect ? 0 : 0);
      const scorePct = Math.round((finalCount / totalQ) * 100);
      setFinalScorePercent(scorePct);
      saveSectionQuizResult(currentSection.section_id, scorePct, finalCount, totalQ);
      setIsQuizFinished(true);

      if (scorePct >= 70) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#0033CC', '#000000', '#71717A'],
        });
      }
    }
  };

  const passedThemesCount = (Object.values(quizProgress) as QuizProgressRecord[]).filter((p) => p?.passed).length;
  const currentSectionProgress = quizProgress[currentSection.section_id];

  // ----------------------------------------------------
  // RENDER 1: Quiz Finished / Results View (Identical to LessonResultView)
  // ----------------------------------------------------
  if (isQuizActive && isQuizFinished) {
    const isPassed = finalScorePercent >= 70;

    return (
      <div id="wortschatz-result-view" className="min-h-screen bg-[#F8F9FA] dark:bg-[#09090B] flex items-center justify-center p-6 font-sans transition-colors">
        <div className="border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 md:p-12 max-w-lg w-full flex flex-col gap-8 shadow-2xl">
          {/* Top Status Header */}
          <div className="text-center flex flex-col gap-2 pb-6 border-b border-zinc-200 dark:border-zinc-800">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              [Протокол тестирования • Тема #{currentSection.section_id}: {currentSection.title_de}]
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-normal text-zinc-950 dark:text-white">
              {isPassed ? 'Тема успешно сдана.' : 'Требуется повторение.'}
            </h1>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans mt-1">
              {isPassed
                ? `Вы набрали ${finalScorePercent}% и подтвердили порог 70%. Лексика темы усвоена!`
                : `Текущий результат ${finalScorePercent}%. Необходимый порог для зачета — 70%.`}
            </p>
          </div>

          {/* Score Grid: Architectural Data Box */}
          <div className="grid grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 font-mono text-center">
            <div className="bg-[#FAFAFA] dark:bg-zinc-950 p-4">
              <div className="text-[9px] uppercase tracking-wider text-zinc-400">Результат</div>
              <div className="font-serif text-2xl font-normal text-zinc-950 dark:text-white mt-1">
                {finalScorePercent}%
              </div>
            </div>
            <div className="bg-[#FAFAFA] dark:bg-zinc-950 p-4">
              <div className="text-[9px] uppercase tracking-wider text-zinc-400">Правильно</div>
              <div className="font-serif text-2xl font-normal text-zinc-950 dark:text-white mt-1">
                {correctAnswersCount}/{currentSection.quiz.length}
              </div>
            </div>
            <div className="bg-[#FAFAFA] dark:bg-zinc-950 p-4">
              <div className="text-[9px] uppercase tracking-wider text-zinc-400">Порог</div>
              <div className="font-serif text-2xl font-normal text-zinc-600 dark:text-zinc-400 mt-1">
                70%
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex flex-col gap-2 font-mono text-xs">
            {isPassed && nextSection ? (
              <button
                id="result-next-theme-btn"
                type="button"
                onClick={() => {
                  setSelectedSectionId(nextSection.section_id);
                  handleStartQuiz(nextSection.section_id);
                }}
                className="w-full py-3.5 px-4 bg-black dark:bg-[#0033CC] hover:bg-[#0033CC] dark:hover:bg-blue-500 text-white uppercase tracking-wider font-bold transition-colors border border-black dark:border-blue-600 text-center cursor-pointer"
              >
                Следующая тема (#{nextSection.section_id}: {nextSection.title_de}) →
              </button>
            ) : (
              <button
                id="result-retry-btn"
                type="button"
                onClick={() => handleStartQuiz()}
                className="w-full py-3.5 px-4 bg-black dark:bg-zinc-100 hover:bg-[#0033CC] dark:hover:bg-blue-600 text-white dark:text-zinc-950 dark:hover:text-white uppercase tracking-wider font-bold transition-colors border border-black dark:border-zinc-100 text-center cursor-pointer"
              >
                Повторить тестирование ↺
              </button>
            )}

            <div className="grid grid-cols-2 gap-2 pt-2">
              {isPassed && (
                <button
                  type="button"
                  onClick={() => handleStartQuiz()}
                  className="py-2.5 px-3 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 uppercase tracking-wider border border-zinc-300 dark:border-zinc-700 transition-colors text-center cursor-pointer"
                >
                  Повторить тест
                </button>
              )}

              <button
                id="result-catalog-btn"
                type="button"
                onClick={handleExitQuiz}
                className={`py-2.5 px-3 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 uppercase tracking-wider border border-zinc-300 dark:border-zinc-700 transition-colors text-center cursor-pointer ${
                  !isPassed ? 'col-span-2' : ''
                }`}
              >
                К словарю темы →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // RENDER 2: Active Practical Test UI (Identical to LessonPlayerView)
  // ----------------------------------------------------
  if (isQuizActive && currentQuizQuestion) {
    const quizProgressPercent = Math.round((quizQuestionIndex / currentSection.quiz.length) * 100);
    const isDeToRu = currentQuizQuestion.direction === 'de_to_ru';

    return (
      <div id="lesson-player-view" className="min-h-screen bg-[#F8F9FA] dark:bg-[#09090B] text-[#09090B] dark:text-zinc-100 flex flex-col justify-between p-4 md:p-10 max-w-4xl mx-auto font-sans transition-colors">
        {/* Top Header & Progress */}
        <div className="flex flex-col gap-4 border-b border-zinc-300 dark:border-zinc-800 pb-6">
          {/* Curator Privilege Banner */}
          {isAdmin && (
            <div
              id="curator-mode-banner"
              className="bg-zinc-900 dark:bg-zinc-950 text-white border border-zinc-950 dark:border-zinc-800 p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-zinc-200"></span>
                <span className="font-bold uppercase tracking-wider text-[11px] text-zinc-100">
                  [Куратор курса • Режим инспектора]
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  id="toggle-curator-answers-btn"
                  onClick={() => setShowCuratorAnswer(!showCuratorAnswer)}
                  className={`px-2.5 py-1 text-[11px] uppercase tracking-wider border transition-colors cursor-pointer ${
                    showCuratorAnswer
                      ? 'bg-zinc-100 dark:bg-zinc-100 border-white text-zinc-950 font-bold'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                  }`}
                >
                  {showCuratorAnswer ? '[Ключи: Вкл]' : '[Ключи: Выкл]'}
                </button>

                <button
                  type="button"
                  id="curator-autopick-btn"
                  onClick={handleCuratorAutoPick}
                  disabled={isAnswerChecked}
                  className="px-2.5 py-1 text-[11px] uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                  title="Автоматически выбрать правильный вариант"
                >
                  [Подставить ключ]
                </button>

                <button
                  type="button"
                  id="curator-inspect-btn"
                  onClick={() => setShowCuratorInspector(!showCuratorInspector)}
                  className="px-2.5 py-1 text-[11px] uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 transition-colors cursor-pointer"
                >
                  {showCuratorInspector ? '[Скрыть детали]' : '[Методичка]'}
                </button>
              </div>
            </div>
          )}

          {/* Curator Inspector Details */}
          {isAdmin && showCuratorInspector && (
            <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 p-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 flex flex-col gap-2">
              <div className="font-bold text-zinc-950 dark:text-white uppercase text-[10px] tracking-wider border-b border-zinc-300 dark:border-zinc-800 pb-1">
                [Методический анализ вопроса #{quizQuestionIndex + 1}]
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-zinc-500 dark:text-zinc-400 font-sans">Правильный ответ (ключ): </span>
                  <strong className="text-zinc-950 dark:text-white font-mono font-bold bg-white dark:bg-zinc-800 px-1.5 py-0.5 border border-zinc-300 dark:border-zinc-700">
                    {currentQuizQuestion.correct_answer}
                  </strong>
                </div>
                <div>
                  <span className="text-zinc-500 dark:text-zinc-400 font-sans">Направление: </span>
                  <span className="font-mono text-zinc-700 dark:text-zinc-300">
                    {isDeToRu ? 'Немецкий → Русский' : 'Русский → Немецкий'}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              id="lesson-exit-btn"
              type="button"
              onClick={handleExitQuiz}
              className="font-mono text-xs uppercase tracking-wider px-3.5 py-2 bg-white dark:bg-zinc-900 hover:bg-black dark:hover:bg-white text-zinc-900 dark:text-zinc-100 hover:text-white dark:hover:text-zinc-950 border border-zinc-300 dark:border-zinc-800 transition-colors cursor-pointer"
            >
              [Выйти]
            </button>

            <div className="text-center font-mono text-xs">
              <span className="text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">
                Тема #{currentSection.section_id}: {currentSection.title_de}
              </span>
              <span className="font-bold text-zinc-950 dark:text-white">
                Вопрос {quizQuestionIndex + 1} / {currentSection.quiz.length}
              </span>
            </div>

            <div className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
              Порог: 70%
            </div>
          </div>

          {/* Minimalist Progress Line */}
          <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-black dark:bg-blue-500 transition-all duration-300"
              style={{ width: `${quizProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Main Question Box */}
        <div className="my-6">
          <div className="border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-6 md:p-10 flex flex-col gap-8">
            {/* Question Meta & Prompt */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-6 font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500">
                <span>{isDeToRu ? 'Выбор перевода (DE → RU)' : 'Выбор слова с артиклем (RU → DE)'}</span>
                <span>Вопрос {quizQuestionIndex + 1} из {currentSection.quiz.length}</span>
              </div>

              <div className="flex items-center gap-3">
                <h2 className="font-serif text-2xl md:text-4xl font-normal text-zinc-950 dark:text-white leading-tight">
                  {currentQuizQuestion.prompt}
                </h2>
                {isDeToRu && (
                  <button
                    type="button"
                    onClick={() => speakGerman(currentQuizQuestion.prompt)}
                    className="p-2 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer shrink-0"
                    title="Прослушать произношение"
                  >
                    <Volume2 size={16} />
                  </button>
                )}
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                {isDeToRu
                  ? 'Укажите точный перевод слова или выражения на русский язык:'
                  : 'Выберите правильное немецкое написание с грамматическим артиклем:'}
              </p>
            </div>

            {/* Options Grid */}
            <div className="flex flex-col gap-2.5 font-mono text-xs">
              {currentQuizQuestion.options.map((option, idx) => {
                const isSelected = selectedQuizOption === option;
                const isOptionCorrect = option.trim() === currentQuizQuestion.correct_answer.trim();
                const isCuratorHighlight = isAdmin && showCuratorAnswer && isOptionCorrect && !isAnswerChecked;

                let optionClass = 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800';

                if (isAnswerChecked) {
                  if (isOptionCorrect) {
                    optionClass = 'bg-zinc-950 dark:bg-emerald-950 text-white dark:text-emerald-200 border-zinc-950 dark:border-emerald-600 font-bold';
                  } else if (isSelected && !isOptionCorrect) {
                    optionClass = 'bg-zinc-200 dark:bg-rose-950/40 text-zinc-500 dark:text-rose-400 border-zinc-400 dark:border-rose-800 line-through';
                  } else {
                    optionClass = 'bg-white dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 border-zinc-200 dark:border-zinc-800 opacity-60';
                  }
                } else if (isSelected) {
                  optionClass = 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-900 dark:border-zinc-100 font-bold';
                } else if (isCuratorHighlight) {
                  optionClass = 'bg-zinc-100 dark:bg-zinc-800 border-zinc-900 dark:border-blue-400 text-zinc-950 dark:text-white';
                }

                return (
                  <button
                    key={idx}
                    id={`lesson-option-${idx}`}
                    type="button"
                    disabled={isAnswerChecked}
                    onClick={() => handleSelectQuizOption(option)}
                    className={`w-full text-left p-4 md:p-5 border flex items-center justify-between transition-colors rounded-none cursor-pointer ${optionClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="opacity-50">[{String.fromCharCode(65 + idx)}]</span>
                      <span className="font-sans text-sm md:text-base">{option}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCuratorHighlight && (
                        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-600 px-2 py-0.5 font-bold">
                          [Ключ куратора]
                        </span>
                      )}

                      {isAnswerChecked && isOptionCorrect && (
                        <span className="font-mono text-xs uppercase tracking-wider text-white dark:text-emerald-300">
                          [Верно]
                        </span>
                      )}
                      {isAnswerChecked && isSelected && !isOptionCorrect && (
                        <span className="font-mono text-xs uppercase tracking-wider text-zinc-950 dark:text-rose-400">
                          [Ошибка]
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Editorial Explanation Banner */}
            {isAnswerChecked && (
              <div className="p-4 md:p-6 bg-[#FAFAFA] dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 font-mono text-xs">
                <div className="font-bold uppercase tracking-wider mb-1 text-zinc-950 dark:text-white">
                  {isCorrect
                    ? '[Верный ответ] (Richtig)'
                    : `[Ошибка] Правильно: ${currentQuizQuestion.correct_answer}`}
                </div>
                <div className="text-zinc-600 dark:text-zinc-400 font-sans text-xs mt-2">
                  <div className="font-medium text-zinc-800 dark:text-zinc-200">
                    {currentQuizQuestion.prompt} ➔ {currentQuizQuestion.correct_answer}
                  </div>
                  <div className="text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Тема #{currentSection.section_id}: {currentSection.title_de} ({currentSection.title_ru})
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Footer Controls */}
        <div className="border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 flex items-center justify-between gap-4 font-mono text-xs">
          <div className="text-zinc-500 dark:text-zinc-400 text-[11px] uppercase tracking-wider">
            {!isAnswerChecked
              ? isAdmin && showCuratorAnswer
                ? '[Режим куратора: ключ подсвечен]'
                : 'Выберите ответ'
              : isCorrect
              ? '[Верно] Переходите к следующему вопросу'
              : 'Разберите пояснение к вопросу'}
          </div>

          <div>
            {!isAnswerChecked ? (
              <button
                id="lesson-check-btn"
                type="button"
                disabled={!selectedQuizOption}
                onClick={handleCheckQuizAnswer}
                className="px-8 py-3 bg-black dark:bg-zinc-100 hover:bg-[#0033CC] dark:hover:bg-blue-600 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-600 text-white dark:text-zinc-950 dark:hover:text-white uppercase tracking-wider font-bold transition-colors border border-black dark:border-zinc-100 disabled:border-zinc-300 dark:disabled:border-zinc-800 cursor-pointer"
              >
                Проверить ответ
              </button>
            ) : (
              <button
                id="lesson-next-btn"
                type="button"
                onClick={handleNextQuizQuestion}
                className="px-8 py-3 bg-[#0033CC] dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-500 text-white uppercase tracking-wider font-bold transition-colors border border-[#0033CC] dark:border-blue-600 cursor-pointer"
              >
                {quizQuestionIndex + 1 < currentSection.quiz.length ? 'Следующий вопрос ->' : 'Завершить тест ->'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // RENDER 3: Main Dictionary & Flashcard View (Identical to Handbook & Dashboard)
  // ----------------------------------------------------
  return (
    <div id="wortschatz-view" className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto flex flex-col gap-6 font-sans transition-colors text-zinc-950 dark:text-zinc-100">
      {/* Top Header */}
      <div className="border-b border-zinc-300 dark:border-zinc-800 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1 flex items-center gap-1.5">
            <BookOpen size={13} className="text-zinc-950 dark:text-white" />
            <span>Лексический минимум Goethe-Zertifikat A1 • 11 тем (550 слов)</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-zinc-950 dark:text-white tracking-tight">
            Словарь A1 (Wortschatz)
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-normal mt-1 max-w-3xl leading-relaxed">
            Структурированный словарный запас с цветовой кодировкой артиклей, встроенной немецкой озвучкой, флэш-картами и тестами.
          </p>
        </div>
      </div>

      {/* Quick Navigation Control Strip (Identical to HandbookView) */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-300 dark:border-zinc-800 p-2.5 sm:p-3 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
        {/* Left: TOC Toggle Button + Topic Quick Dropdown Selector */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button
            id="toggle-toc-btn"
            type="button"
            onClick={() => setIsTocOpen(!isTocOpen)}
            className={`px-3 py-2 border font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
              isTocOpen
                ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100'
                : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700'
            }`}
            title="Открыть/скрыть полное оглавление словаря"
          >
            <List size={14} />
            <span>Оглавление</span>
            <span className={`px-1.5 py-0.2 text-[10px] rounded-none ${isTocOpen ? 'bg-zinc-800 dark:bg-zinc-300 text-zinc-200 dark:text-zinc-900' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'}`}>
              {WORTSCHATZ_DATA.sections.length}
            </span>
          </button>

          {/* Direct Topic Select Dropdown */}
          <div className="relative flex-1 min-w-0">
            <select
              id="wortschatz-quick-select"
              value={currentSection.section_id}
              onChange={(e) => handleSelectSection(Number(e.target.value))}
              className="w-full bg-zinc-50 dark:bg-zinc-800 hover:bg-white dark:hover:bg-zinc-750 focus:bg-white dark:focus:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 px-3 py-2 font-mono text-xs text-zinc-900 dark:text-zinc-100 truncate focus:outline-none focus:border-zinc-950 dark:focus:border-blue-400 cursor-pointer transition-colors"
            >
              {WORTSCHATZ_DATA.sections.map((sec) => {
                const passed = !!quizProgress[sec.section_id]?.passed;
                return (
                  <option key={sec.section_id} value={sec.section_id} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                    №{sec.section_id < 10 ? `0${sec.section_id}` : sec.section_id}: {sec.title_de} ({sec.title_ru}) — 50 слов {passed ? '✓' : ''}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Right: Step Navigation & Topic Count */}
        <div className="flex items-center justify-between md:justify-end gap-2 font-mono text-xs shrink-0">
          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 hidden sm:block">
            Тема <span className="font-bold text-zinc-900 dark:text-white">{currentSection.section_id}</span> из <span className="font-bold text-zinc-900 dark:text-white">{WORTSCHATZ_DATA.sections.length}</span>
            {currentSectionProgress?.passed && (
              <span className="ml-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                [Сдано: {currentSectionProgress.scorePercent}%]
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              id="wortschatz-top-prev-btn"
              type="button"
              disabled={!prevSection}
              onClick={() => prevSection && handleSelectSection(prevSection.section_id)}
              className={`p-2 border transition-colors flex items-center gap-1 ${
                prevSection
                  ? 'bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700 cursor-pointer'
                  : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-300 dark:text-zinc-700 border-zinc-200 dark:border-zinc-800 cursor-not-allowed'
              }`}
              title={prevSection ? `Предыдущая: ${prevSection.title_de}` : 'Это первая тема'}
            >
              <ChevronLeft size={15} />
              <span className="hidden sm:inline text-[11px] uppercase">Пред.</span>
            </button>

            <button
              id="wortschatz-top-next-btn"
              type="button"
              disabled={!nextSection}
              onClick={() => nextSection && handleSelectSection(nextSection.section_id)}
              className={`p-2 border transition-colors flex items-center gap-1 font-bold ${
                nextSection
                  ? 'bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 cursor-pointer'
                  : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-300 dark:text-zinc-700 border-zinc-200 dark:border-zinc-800 cursor-not-allowed'
              }`}
              title={nextSection ? `Следующая: ${nextSection.title_de}` : 'Это последняя тема'}
            >
              <span className="hidden sm:inline text-[11px] uppercase">След.</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible / Drawer TOC (Identical Horizontal Design to HandbookView) */}
      {isTocOpen && (
        <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-zinc-700 p-4 sm:p-5 shadow-lg flex flex-col gap-4 animate-in fade-in duration-200">
          {/* Header of TOC panel */}
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-normal text-zinc-950 dark:text-white">
                Оглавление словаря A1
              </span>
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                ({filteredTocSections.length} из {WORTSCHATZ_DATA.sections.length} тем • Сдано тестов: {passedThemesCount}/11)
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsTocOpen(false)}
              className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors font-mono text-xs flex items-center gap-1 cursor-pointer"
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
                onClick={() => setTocCategoryFilter('all')}
                className={`px-2.5 py-1 border transition-colors whitespace-nowrap cursor-pointer ${
                  tocCategoryFilter === 'all'
                    ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 font-bold'
                    : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-750'
                }`}
              >
                Все темы (11)
              </button>

              <button
                type="button"
                onClick={() => setTocCategoryFilter('A1.1')}
                className={`px-2.5 py-1 border transition-colors whitespace-nowrap cursor-pointer ${
                  tocCategoryFilter === 'A1.1'
                    ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 font-bold'
                    : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-750'
                }`}
              >
                A1.1 (№1–6)
              </button>

              <button
                type="button"
                onClick={() => setTocCategoryFilter('A1.2')}
                className={`px-2.5 py-1 border transition-colors whitespace-nowrap cursor-pointer ${
                  tocCategoryFilter === 'A1.2'
                    ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 font-bold'
                    : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-750'
                }`}
              >
                A1.2 (№7–11)
              </button>

              <button
                type="button"
                onClick={() => setTocCategoryFilter('passed')}
                className={`px-2.5 py-1 border transition-colors whitespace-nowrap cursor-pointer ${
                  tocCategoryFilter === 'passed'
                    ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 font-bold'
                    : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-750'
                }`}
              >
                Сдано ({passedThemesCount})
              </button>

              <button
                type="button"
                onClick={() => setTocCategoryFilter('not-passed')}
                className={`px-2.5 py-1 border transition-colors whitespace-nowrap cursor-pointer ${
                  tocCategoryFilter === 'not-passed'
                    ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 font-bold'
                    : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-750'
                }`}
              >
                Не сдано ({11 - passedThemesCount})
              </button>
            </div>

            {/* Live Search */}
            <div className="relative min-w-[220px]">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
              <input
                id="wortschatz-toc-search-input"
                type="text"
                placeholder="Поиск по темам и словам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-8 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 font-mono text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:bg-white dark:focus:bg-zinc-800 focus:border-zinc-950 dark:focus:border-blue-400 rounded-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Grid of Topics (Horizontal Multi-Column Cards matching HandbookView) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
            {filteredTocSections.length === 0 ? (
              <div className="col-span-full p-8 text-center text-zinc-500 dark:text-zinc-400 font-mono text-xs bg-zinc-50 dark:bg-zinc-800/50 border border-dashed border-zinc-300 dark:border-zinc-700">
                Ничего не найдено по фильтрам или запросу «{searchQuery}».
              </div>
            ) : (
              filteredTocSections.map((section) => {
                const isActive = section.section_id === currentSection.section_id;
                const numStr = section.section_id < 10 ? `0${section.section_id}` : `${section.section_id}`;
                const levelStr = section.section_id <= 6 ? 'A1.1' : 'A1.2';
                const progressRecord = quizProgress[section.section_id];

                return (
                  <button
                    key={section.section_id}
                    id={`wortschatz-toc-item-${section.section_id}`}
                    type="button"
                    onClick={() => handleSelectSection(section.section_id)}
                    className={`text-left p-3 transition-all flex flex-col justify-between gap-2 border cursor-pointer ${
                      isActive
                        ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 shadow-xs'
                        : 'bg-zinc-50 dark:bg-zinc-800/70 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase w-full">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-bold px-1.5 py-0.5 border ${
                            isActive
                              ? 'border-zinc-700 dark:border-zinc-300 bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-900'
                              : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'
                          }`}
                        >
                          {numStr}
                        </span>
                        <span className={isActive ? 'text-zinc-300 dark:text-zinc-700' : 'text-zinc-500 dark:text-zinc-400'}>
                          {levelStr}
                        </span>
                      </div>

                      <span
                        className={`text-[9px] px-1.5 py-0.5 border ${
                          isActive
                            ? 'border-zinc-800 dark:border-zinc-300 bg-zinc-900 dark:bg-zinc-200 text-zinc-400 dark:text-zinc-700'
                            : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        50 слов
                      </span>
                    </div>

                    <div>
                      <div className="font-serif text-sm font-normal leading-snug line-clamp-1">
                        {section.title_de}
                      </div>
                      <div className={`text-xs mt-0.5 line-clamp-1 ${isActive ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-600 dark:text-zinc-400'}`}>
                        {section.title_ru}
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="pt-2 border-t border-zinc-200/50 dark:border-zinc-700/50 flex items-center justify-between font-mono text-[9px] uppercase">
                      {progressRecord?.passed ? (
                        <span className={`flex items-center gap-1 font-bold ${isActive ? 'text-emerald-300 dark:text-emerald-800' : 'text-emerald-600 dark:text-emerald-400'}`}>
                          <CheckCircle2 size={11} />
                          <span>Тест сдан ({progressRecord.scorePercent}%)</span>
                        </span>
                      ) : (
                        <span className={isActive ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-400 dark:text-zinc-500'}>
                          [Тест не сдан • 15 вопр.]
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Main Section Hero Box (Standard clean window matching Handbook & Dashboard) */}
      <div className="border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8 flex flex-col gap-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
              <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white px-2 py-0.5 font-bold border border-zinc-300 dark:border-zinc-700">
                Тема #{currentSection.section_id < 10 ? `0${currentSection.section_id}` : currentSection.section_id}
              </span>
              <span>•</span>
              <span>{currentSection.section_id <= 6 ? 'Уровень A1.1' : 'Уровень A1.2'}</span>
              <span>•</span>
              <span>{currentSection.word_count} слов</span>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-normal text-zinc-950 dark:text-white tracking-tight">
              {currentSection.title_de}
            </h2>
            <div className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-sans mt-0.5">
              {currentSection.title_ru}
            </div>
          </div>

          {/* Mode Switcher + Test Button */}
          <div className="flex items-center gap-2 font-mono text-xs flex-wrap">
            <div className="inline-flex border border-zinc-300 dark:border-zinc-700 p-0.5 bg-zinc-100 dark:bg-zinc-800">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-xs font-bold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <List size={13} />
                <span>Список слов ({currentSection.word_count})</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('flashcards')}
                className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'flashcards'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-xs font-bold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <Layers size={13} />
                <span>Карточки (Flashcards)</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleStartQuiz()}
              className="px-4 py-2 bg-[#0033CC] hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-500 text-white uppercase tracking-wider font-bold transition-colors border border-[#0033CC] dark:border-blue-600 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <HelpCircle size={14} />
              <span>Тест темы (15 вопр.)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Search & Word Type Filters Toolbar */}
        <div className="bg-[#FAFAFA] dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 font-mono text-xs">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              type="button"
              onClick={() => setWordTypeFilter('all')}
              className={`px-2.5 py-1 border transition-colors cursor-pointer whitespace-nowrap ${
                wordTypeFilter === 'all'
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-900 dark:border-zinc-100 font-bold'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 hover:border-zinc-500'
              }`}
            >
              Все ({currentSection.word_count})
            </button>

            <button
              type="button"
              onClick={() => setWordTypeFilter('der')}
              className={`px-2.5 py-1 border transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                wordTypeFilter === 'der'
                  ? 'bg-blue-700 text-white border-blue-700 font-bold'
                  : 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>der (м.р.)</span>
            </button>

            <button
              type="button"
              onClick={() => setWordTypeFilter('die')}
              className={`px-2.5 py-1 border transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                wordTypeFilter === 'die'
                  ? 'bg-rose-700 text-white border-rose-700 font-bold'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>die (ж.р.)</span>
            </button>

            <button
              type="button"
              onClick={() => setWordTypeFilter('das')}
              className={`px-2.5 py-1 border transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                wordTypeFilter === 'das'
                  ? 'bg-emerald-700 text-white border-emerald-700 font-bold'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>das (ср.р.)</span>
            </button>

            <button
              type="button"
              onClick={() => setWordTypeFilter('verbs')}
              className={`px-2.5 py-1 border transition-colors cursor-pointer whitespace-nowrap ${
                wordTypeFilter === 'verbs'
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-900 dark:border-zinc-100 font-bold'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 hover:border-zinc-500'
              }`}
            >
              Глаголы
            </button>

            <button
              type="button"
              onClick={() => setWordTypeFilter('other')}
              className={`px-2.5 py-1 border transition-colors cursor-pointer whitespace-nowrap ${
                wordTypeFilter === 'other'
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-900 dark:border-zinc-100 font-bold'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 hover:border-zinc-500'
              }`}
            >
              Фразы / Наречия
            </button>
          </div>

          {/* Quick Search inside Section */}
          <div className="relative min-w-[200px]">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
            <input
              type="text"
              id="wortschatz-word-search"
              placeholder="Поиск по теме..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-7 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 font-mono text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 dark:focus:border-blue-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* VIEW MODE 1: VOCABULARY LIST GRID */}
        {/* ------------------------------------------------------------------ */}
        {viewMode === 'list' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400 px-1">
              <span>Слов в выборке: {filteredVocabulary.length}</span>
              <span className="hidden sm:inline text-[11px]">Нажмите на значок динамика для немецкой озвучки</span>
            </div>

            {filteredVocabulary.length === 0 ? (
              <div className="p-12 text-center text-zinc-500 dark:text-zinc-400 font-mono text-xs bg-zinc-50 dark:bg-zinc-950 border border-dashed border-zinc-300 dark:border-zinc-800">
                Ничего не найдено по фильтрам «{wordTypeFilter}» и поисковому запросу «{searchQuery}».
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredVocabulary.map((item, idx) => {
                  const isDer = item.de.startsWith('der ');
                  const isDie = item.de.startsWith('die ');
                  const isDas = item.de.startsWith('das ');

                  let articleTag = null;
                  if (isDer) {
                    articleTag = (
                      <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-mono text-[10px] font-bold">
                        DER
                      </span>
                    );
                  } else if (isDie) {
                    articleTag = (
                      <span className="px-1.5 py-0.5 bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-mono text-[10px] font-bold">
                        DIE
                      </span>
                    );
                  } else if (isDas) {
                    articleTag = (
                      <span className="px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono text-[10px] font-bold">
                        DAS
                      </span>
                    );
                  }

                  return (
                    <div
                      key={idx}
                      className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 hover:border-zinc-400 dark:hover:border-zinc-700 p-4 transition-colors flex items-center justify-between gap-3 shadow-2xs group"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="font-mono text-xs text-zinc-400 dark:text-zinc-600 mt-0.5 select-none shrink-0 w-6">
                          {(idx + 1).toString().padStart(2, '0')}.
                        </span>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-serif text-base font-normal text-zinc-950 dark:text-white leading-snug">
                              {item.de}
                            </span>
                            {articleTag}
                          </div>
                          <div className="text-xs text-zinc-600 dark:text-zinc-400 font-sans mt-0.5">
                            {item.ru}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => speakGerman(item.de)}
                        className="p-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer shrink-0"
                        title={`Озвучить: ${item.de}`}
                      >
                        <Volume2 size={15} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* VIEW MODE 2: INTERACTIVE FLASHCARDS */}
        {/* ------------------------------------------------------------------ */}
        {viewMode === 'flashcards' && (
          <div className="flex flex-col items-center gap-6 py-6">
            {filteredVocabulary.length === 0 ? (
              <div className="p-12 text-center text-zinc-500 font-mono text-xs">
                Нет слов для отображения карточек.
              </div>
            ) : (
              <div className="w-full max-w-lg flex flex-col gap-6">
                {/* Flashcard Header Indicator */}
                <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  <span>Карточка {currentFlashcardIndex + 1} из {filteredVocabulary.length}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentFlashcardIndex(0);
                      setIsCardFlipped(false);
                    }}
                    className="hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>Сначала</span>
                  </button>
                </div>

                {/* Flip Card Stage */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      setIsCardFlipped(!isCardFlipped);
                    }
                  }}
                  className="w-full min-h-[260px] p-8 border-2 border-zinc-950 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col justify-between items-center text-center cursor-pointer transition-all shadow-md hover:border-blue-600"
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                    {!isCardFlipped ? '[DEUTSCH • Нажмите чтобы перевернуть]' : '[RUSSIAN • Перевод]'}
                  </div>

                  <div className="my-auto">
                    {!isCardFlipped ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="font-serif text-3xl md:text-4xl text-zinc-950 dark:text-white font-normal">
                          {filteredVocabulary[currentFlashcardIndex]?.de}
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakGerman(filteredVocabulary[currentFlashcardIndex]?.de || '');
                          }}
                          className="mt-2 p-2 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="font-serif text-2xl md:text-3xl text-zinc-950 dark:text-white font-normal">
                        {filteredVocabulary[currentFlashcardIndex]?.ru}
                      </div>
                    )}
                  </div>

                  <div className="font-mono text-[11px] text-zinc-400">
                    {!isCardFlipped ? 'Кликните для просмотра перевода' : 'Кликните чтобы вернуться к немецкому'}
                  </div>
                </div>

                {/* Flashcard Navigation */}
                <div className="flex items-center justify-between gap-4 font-mono text-xs">
                  <button
                    type="button"
                    disabled={currentFlashcardIndex === 0}
                    onClick={() => {
                      setCurrentFlashcardIndex((prev) => Math.max(0, prev - 1));
                      setIsCardFlipped(false);
                    }}
                    className="flex-1 py-3 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:pointer-events-none text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 uppercase tracking-wider font-bold transition-colors text-center cursor-pointer"
                  >
                    ← Предыдущая
                  </button>

                  <button
                    type="button"
                    disabled={currentFlashcardIndex >= filteredVocabulary.length - 1}
                    onClick={() => {
                      setCurrentFlashcardIndex((prev) => Math.min(filteredVocabulary.length - 1, prev + 1));
                      setIsCardFlipped(false);
                    }}
                    className="flex-1 py-3 bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white disabled:opacity-40 disabled:pointer-events-none text-white dark:text-zinc-950 uppercase tracking-wider font-bold transition-colors text-center cursor-pointer"
                  >
                    Следующая →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Sticky Footer with Quick Next Theme Transition */}
      <div className="border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="text-zinc-500 dark:text-zinc-400">
            Изучено слов в теме: <strong className="text-zinc-950 dark:text-white font-sans">{currentSection.word_count}</strong>
          </div>
          {currentSectionProgress?.passed && (
            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <Check size={14} /> Тест сдан ({currentSectionProgress.scorePercent}%)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {prevSection && (
            <button
              type="button"
              onClick={() => handleSelectSection(prevSection.section_id)}
              className="py-2.5 px-4 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 uppercase tracking-wider transition-colors cursor-pointer"
            >
              ← Тема #{prevSection.section_id}
            </button>
          )}

          {nextSection ? (
            <button
              type="button"
              onClick={() => handleSelectSection(nextSection.section_id)}
              className="py-2.5 px-4 bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 border border-zinc-950 dark:border-zinc-100 uppercase tracking-wider font-bold transition-colors cursor-pointer"
            >
              Тема #{nextSection.section_id}: {nextSection.title_de} →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSelectSection(1)}
              className="py-2.5 px-4 bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 border border-zinc-950 dark:border-zinc-100 uppercase tracking-wider font-bold transition-colors cursor-pointer"
            >
              Вернуться к теме #01 ↺
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
