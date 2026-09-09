import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { WORTSCHATZ_DATA } from '../data/wortschatzData';
import { useAuth } from '../context/AuthContext';
import { WortschatzQuizQuestion } from '../types';
import { notifyWortschatzUpdated } from '../utils/modulePrerequisites';
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
  HelpCircle,
  ArrowRight,
  RotateCw,
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

  // Practical Test (Quiz) State
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
      notifyWortschatzUpdated();
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
      .map((item, i) => `${(i + 1).toString().padStart(2, '0')}. ${item.de} — ${item.ru}`)
      .join('\n')}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadTXT = () => {
    const text = `DELFI A1 WORTSCHATZ — ТЕМА #${currentSection.section_id}: ${currentSection.title_de}\nПеревод: ${currentSection.title_ru}\nВсего слов: ${currentSection.word_count}\n\n${currentSection.vocabulary
      .map((item, i) => `${(i + 1).toString().padStart(2, '0')}. ${item.de} — ${item.ru}`)
      .join('\n')}`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Delfi_Wortschatz_Thema_${currentSection.section_id}_${currentSection.title_de}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleStartQuiz = (sectionIdToQuiz?: number) => {
    if (sectionIdToQuiz) {
      setSelectedSectionId(sectionIdToQuiz);
    }
    setQuizQuestionIndex(0);
    setSelectedQuizOption(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setCorrectAnswersCount(0);
    setIsQuizFinished(false);
    setFinalScorePercent(0);
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
          colors: ['#3B82F6', '#0B1F3A', '#EF1B2D'],
        });
      }
    }
  };

  const currentSectionProgress = quizProgress[currentSection.section_id];

  // ----------------------------------------------------
  // RENDER 1: Quiz Finished / Results View
  // ----------------------------------------------------
  if (isQuizActive && isQuizFinished) {
    const isPassed = finalScorePercent >= 70;

    return (
      <div id="wortschatz-result-view" className="min-h-screen bg-[#F4F6F8] dark:bg-[#071120] flex items-center justify-center p-4 sm:p-6 font-sans transition-colors">
        <div className="border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0E1A2D] p-6 sm:p-8 md:p-10 rounded-2xl max-w-lg w-full flex flex-col gap-6 shadow-xl">
          {/* Top Status Header */}
          <div className="text-center flex flex-col items-center gap-2 pb-5 border-b border-slate-200 dark:border-slate-800">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-1 ${isPassed ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600' : 'bg-amber-50 dark:bg-amber-950/50 text-amber-600'}`}>
              {isPassed ? <CheckCircle2 className="w-8 h-8" /> : <RotateCw className="w-8 h-8" />}
            </div>
            <span className="font-heading font-bold text-xs uppercase tracking-widest text-[#3B82F6]">
              Тема #{currentSection.section_id}: {currentSection.title_de}
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A] dark:text-white">
              {isPassed ? 'Тема успешно сдана!' : 'Требуется повторение'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] font-medium mt-0.5">
              {isPassed
                ? `Вы набрали ${finalScorePercent}% и подтвердили порог 70%. Лексика темы усвоена!`
                : `Текущий результат ${finalScorePercent}%. Необходимый порог для зачета — 70%.`}
            </p>
          </div>

          {/* Score Grid: 3 Rounded Metric Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 dark:bg-[#111C2E] border border-slate-200/80 dark:border-slate-700/60 p-4 rounded-xl text-center">
              <div className="text-[10px] uppercase tracking-wider text-[#94A3B8] font-bold">Результат</div>
              <div className={`font-heading font-extrabold text-2xl mt-1 ${isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#0B1F3A] dark:text-white'}`}>
                {finalScorePercent}%
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-[#111C2E] border border-slate-200/80 dark:border-slate-700/60 p-4 rounded-xl text-center">
              <div className="text-[10px] uppercase tracking-wider text-[#94A3B8] font-bold">Правильно</div>
              <div className="font-heading font-extrabold text-2xl text-[#0B1F3A] dark:text-white mt-1">
                {correctAnswersCount}/{currentSection.quiz.length}
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-[#111C2E] border border-slate-200/80 dark:border-slate-700/60 p-4 rounded-xl text-center">
              <div className="text-[10px] uppercase tracking-wider text-[#94A3B8] font-bold">Порог</div>
              <div className="font-heading font-extrabold text-2xl text-[#3B82F6] mt-1">
                70%
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex flex-col gap-2.5 pt-2">
            {isPassed && nextSection ? (
              <button
                id="result-next-theme-btn"
                type="button"
                onClick={() => {
                  setSelectedSectionId(nextSection.section_id);
                  handleStartQuiz(nextSection.section_id);
                }}
                className="w-full py-3 px-4 bg-[#3B82F6] hover:bg-blue-600 text-white font-semibold text-xs rounded-xl transition-colors text-center cursor-pointer shadow-xs"
              >
                Следующая тема (#{nextSection.section_id}: {nextSection.title_de}) →
              </button>
            ) : (
              <button
                id="result-retry-btn"
                type="button"
                onClick={() => handleStartQuiz()}
                className="w-full py-3 px-4 bg-[#0B1F3A] hover:bg-[#111C2E] dark:bg-[#3B82F6] dark:hover:bg-blue-600 text-white font-semibold text-xs rounded-xl transition-colors text-center cursor-pointer shadow-xs"
              >
                Повторить тестирование ↺
              </button>
            )}

            <div className="grid grid-cols-2 gap-2">
              {isPassed && (
                <button
                  type="button"
                  onClick={() => handleStartQuiz()}
                  className="py-2.5 px-3 bg-white dark:bg-[#111C2E] hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl border border-slate-200 dark:border-slate-700 transition-colors text-center cursor-pointer"
                >
                  Повторить тест
                </button>
              )}

              <button
                id="result-catalog-btn"
                type="button"
                onClick={handleExitQuiz}
                className={`py-2.5 px-3 bg-white dark:bg-[#111C2E] hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl border border-slate-200 dark:border-slate-700 transition-colors text-center cursor-pointer ${
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
  // RENDER 2: Active Practical Test UI
  // ----------------------------------------------------
  if (isQuizActive && currentQuizQuestion) {
    const quizProgressPercent = Math.round((quizQuestionIndex / currentSection.quiz.length) * 100);

    return (
      <div id="lesson-player-view" className="min-h-screen bg-[#F4F6F8] dark:bg-[#071120] text-[#0B1F3A] dark:text-slate-100 flex flex-col justify-between p-4 md:p-8 max-w-4xl mx-auto font-sans transition-colors gap-6">
        {/* Top Header & Progress */}
        <div className="flex flex-col gap-4 bg-white dark:bg-[#0E1A2D] p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs">
          {/* Curator Banner */}
          {isAdmin && (
            <div
              id="curator-mode-banner"
              className="bg-slate-50 dark:bg-[#111C2E] rounded-xl border border-slate-200 dark:border-slate-700 p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs"
            >
              <span className="font-heading font-bold text-xs text-[#3B82F6] uppercase tracking-wider">
                Режим куратора курса
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowCuratorAnswer(!showCuratorAnswer)}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-[#0E1A2D] border border-slate-200 dark:border-slate-700 text-[#0B1F3A] dark:text-white"
                >
                  {showCuratorAnswer ? 'Ключи: Вкл' : 'Ключи: Выкл'}
                </button>
                <button
                  type="button"
                  onClick={handleCuratorAutoPick}
                  disabled={isAnswerChecked}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#3B82F6] text-white disabled:opacity-50"
                >
                  Подставить ключ
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#3B82F6]">
                Тест по словарю • Тема #{currentSection.section_id}
              </div>
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-[#0B1F3A] dark:text-white mt-0.5">
                {currentSection.title_de}
              </h1>
            </div>

            <button
              type="button"
              onClick={handleExitQuiz}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              Выйти из теста
            </button>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#94A3B8] font-medium mb-1.5">
              <span>Вопрос {quizQuestionIndex + 1} из {currentSection.quiz.length}</span>
              <span>{quizProgressPercent}% пройдено</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-[#3B82F6] transition-all duration-300 rounded-full"
                style={{ width: `${quizProgressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Area */}
        <div className="bg-white dark:bg-[#0E1A2D] p-6 sm:p-8 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col gap-6 flex-1 justify-center">
          <div className="text-center flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-[#94A3B8] font-semibold">Выберите правильный перевод</span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#0B1F3A] dark:text-white">
              {currentQuizQuestion.prompt}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto w-full">
            {currentQuizQuestion.options.map((option, oIdx) => {
              const isSelected = selectedQuizOption === option;
              const isOptionCorrect = option.trim() === currentQuizQuestion.correct_answer.trim();
              const isCuratorHighlighted = isAdmin && showCuratorAnswer && isOptionCorrect && !isAnswerChecked;

              let optionClasses = 'bg-slate-50 dark:bg-[#111C2E] border-slate-200 dark:border-slate-700/80 text-[#0B1F3A] dark:text-white hover:border-[#3B82F6]';

              if (isAnswerChecked) {
                if (isOptionCorrect) {
                  optionClasses = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                } else if (isSelected && !isCorrect) {
                  optionClasses = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200 font-bold';
                } else {
                  optionClasses = 'opacity-50 border-slate-200 dark:border-slate-800';
                }
              } else if (isSelected) {
                optionClasses = 'bg-blue-50 dark:bg-blue-950/40 border-[#3B82F6] text-[#3B82F6] font-bold shadow-xs';
              } else if (isCuratorHighlighted) {
                optionClasses = 'border-amber-400 dark:border-amber-500 bg-amber-50/50 dark:bg-amber-950/20';
              }

              return (
                <button
                  key={oIdx}
                  type="button"
                  disabled={isAnswerChecked}
                  onClick={() => handleSelectQuizOption(option)}
                  className={`p-4 rounded-xl border-2 text-left font-medium text-sm sm:text-base transition-all cursor-pointer flex items-center justify-between ${optionClasses}`}
                >
                  <span>{option}</span>
                  {isAnswerChecked && isOptionCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswerChecked && (
            <div className={`p-4 rounded-xl border max-w-2xl mx-auto w-full text-xs sm:text-sm font-medium ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200' : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200'}`}>
              <div className="font-heading font-bold text-xs uppercase tracking-wider mb-0.5">
                {isCorrect ? 'Верный ответ (Richtig)!' : `Ошибка! Правильный ответ: ${currentQuizQuestion.correct_answer}`}
              </div>
              <div>{currentQuizQuestion.prompt} ➔ {currentQuizQuestion.correct_answer}</div>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="bg-white dark:bg-[#0E1A2D] p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-medium">
            {!isAnswerChecked ? 'Выберите вариант ответа' : isCorrect ? 'Отлично! Переходите к следующему' : 'Изучите правильный ответ'}
          </div>

          <div>
            {!isAnswerChecked ? (
              <button
                type="button"
                disabled={!selectedQuizOption}
                onClick={handleCheckQuizAnswer}
                className="px-6 py-2.5 bg-[#0B1F3A] hover:bg-[#111C2E] dark:bg-[#3B82F6] dark:hover:bg-blue-600 disabled:opacity-40 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Проверить ответ
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuizQuestion}
                className="px-6 py-2.5 bg-[#3B82F6] hover:bg-blue-600 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                {quizQuestionIndex + 1 < currentSection.quiz.length ? 'Следующий вопрос →' : 'Завершить тест →'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // RENDER 3: Main Dictionary & Flashcard View
  // ----------------------------------------------------
  return (
    <div id="wortschatz-view" className="flex flex-col font-sans transition-colors text-[#0B1F3A] dark:text-slate-100">
      {/* Hero Banner with Rothenburg ob der Tauber - Scrollable, Rectangular Without Rounded Borders */}
      <div
        id="wortschatz-hero-banner"
        className="w-full bg-white dark:bg-[#0B1526] shrink-0 box-border border-b border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden"
      >
        {/* Rothenburg High-Resolution Image on the right with smooth fade */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 pointer-events-none overflow-hidden">
          <img
            src="/images/rothenburg.jpg"
            alt="Rothenburg ob der Tauber, Deutschland"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-85 dark:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent dark:from-[#0B1526] dark:via-[#0B1526]/85 dark:to-transparent" />
        </div>

        {/* Banner Content Container */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 md:py-6 relative z-10">
          <div className="max-w-2xl flex flex-col gap-2">
            <div className="font-heading font-bold text-[11px] uppercase tracking-widest text-[#3B82F6]">
              ИНТЕРАКТИВНЫЙ СЛОВАРЬ • WORTSCHATZ A1
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A] dark:text-white leading-tight tracking-tight">
              Словарный запас: <span className="text-[#3B82F6]">550 слов</span> Goethe-Zertifikat.
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              Артикли с цветовой кодировкой, нативная немецкая озвучка, режим флэш-карт и проверочные тесты.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2.5 mt-0.5 border-t border-slate-200/70 dark:border-slate-800/70 text-xs font-medium text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                <span>11 тематических разделов</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>der</span>
                <span className="w-2 h-2 rounded-full bg-rose-500 ml-1"></span>
                <span>die</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 ml-1"></span>
                <span>das</span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={handleCopyVocabulary}
                  className="px-2.5 py-1 bg-white/90 dark:bg-[#111C2E] hover:bg-slate-100 text-[#0B1F3A] dark:text-slate-100 text-[11px] font-semibold rounded-lg border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Скопировать словарь темы"
                >
                  {copiedNotification ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                  <span>{copiedNotification ? 'Скопировано' : 'Копировать'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadTXT}
                  className="px-2.5 py-1 bg-[#0B1F3A] hover:bg-[#152e54] dark:bg-[#3B82F6] text-white text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  title="Скачать словарь темы в TXT"
                >
                  <Download size={12} />
                  <span>.TXT</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">

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
            title="Открыть/скрыть оглавление словаря"
          >
            <List size={15} />
            <span>Оглавление</span>
            <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${isTocOpen ? 'bg-white/20 text-white' : 'bg-white dark:bg-[#0E1A2D] text-slate-700 dark:text-slate-300'}`}>
              {WORTSCHATZ_DATA.sections.length}
            </span>
          </button>

          {/* Direct Topic Select Dropdown */}
          <div className="relative flex-1 min-w-0">
            <select
              id="wortschatz-quick-select"
              value={currentSection.section_id}
              onChange={(e) => handleSelectSection(Number(e.target.value))}
              className="w-full bg-slate-50 dark:bg-[#111C2E] hover:bg-white dark:hover:bg-[#111C2E] focus:bg-white border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-medium text-[#0B1F3A] dark:text-slate-100 truncate focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#3B82F6] cursor-pointer transition-colors"
            >
              {WORTSCHATZ_DATA.sections.map((sec) => {
                const passed = !!quizProgress[sec.section_id]?.passed;
                return (
                  <option key={sec.section_id} value={sec.section_id} className="bg-white dark:bg-[#0E1A2D] text-[#0B1F3A] dark:text-slate-100">
                    №{sec.section_id < 10 ? `0${sec.section_id}` : sec.section_id}: {sec.title_de} ({sec.title_ru}) — 50 слов {passed ? '✓' : ''}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Right: Step Navigation & Topic Count */}
        <div className="flex items-center justify-between md:justify-end gap-2 shrink-0">
          <div className="text-xs text-slate-500 dark:text-[#94A3B8] hidden sm:block font-medium">
            Тема <span className="font-bold text-[#0B1F3A] dark:text-white">{currentSection.section_id}</span> из <span className="font-bold text-[#0B1F3A] dark:text-white">{WORTSCHATZ_DATA.sections.length}</span>
            {currentSectionProgress?.passed && (
              <span className="ml-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                (Сдано: {currentSectionProgress.scorePercent}%)
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id="wortschatz-top-prev-btn"
              type="button"
              disabled={!prevSection}
              onClick={() => prevSection && handleSelectSection(prevSection.section_id)}
              className={`p-2 rounded-xl border transition-colors flex items-center gap-1 text-xs font-semibold ${
                prevSection
                  ? 'bg-white dark:bg-[#111C2E] hover:bg-slate-50 dark:hover:bg-slate-700 text-[#0B1F3A] dark:text-slate-100 border-slate-200 dark:border-slate-700 cursor-pointer shadow-xs'
                  : 'bg-slate-100 dark:bg-[#0E1A2D] text-slate-300 dark:text-slate-700 border-slate-200 dark:border-slate-800 cursor-not-allowed'
              }`}
              title={prevSection ? `Предыдущая: ${prevSection.title_de}` : 'Это первая тема'}
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline text-xs">Пред.</span>
            </button>

            <button
              id="wortschatz-top-next-btn"
              type="button"
              disabled={!nextSection}
              onClick={() => nextSection && handleSelectSection(nextSection.section_id)}
              className={`p-2 rounded-xl border transition-colors flex items-center gap-1 text-xs font-semibold ${
                nextSection
                  ? 'bg-[#0B1F3A] hover:bg-[#111C2E] dark:bg-[#3B82F6] dark:hover:bg-blue-600 text-white border-transparent cursor-pointer shadow-xs'
                  : 'bg-slate-100 dark:bg-[#0E1A2D] text-slate-300 dark:text-slate-700 border-slate-200 dark:border-slate-800 cursor-not-allowed'
              }`}
              title={nextSection ? `Следующая: ${nextSection.title_de}` : 'Это последняя тема'}
            >
              <span className="hidden sm:inline text-xs">След.</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating TOC Drawer */}
      {isTocOpen && (
        <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm text-[#0B1F3A] dark:text-white">
                Все темы словаря A1
              </span>
              <span className="text-xs text-[#3B82F6] font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40">
                {filteredTocSections.length} тем
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

          {/* Search & Filter inside TOC */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setTocCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  tocCategoryFilter === 'all'
                    ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#111C2E] text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Все темы ({WORTSCHATZ_DATA.sections.length})
              </button>

              <button
                type="button"
                onClick={() => setTocCategoryFilter('A1.1')}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  tocCategoryFilter === 'A1.1'
                    ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#111C2E] text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                A1.1 (6 тем)
              </button>

              <button
                type="button"
                onClick={() => setTocCategoryFilter('A1.2')}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  tocCategoryFilter === 'A1.2'
                    ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#111C2E] text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                A1.2 (5 тем)
              </button>

              <button
                type="button"
                onClick={() => setTocCategoryFilter('passed')}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  tocCategoryFilter === 'passed'
                    ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-[#111C2E] text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Сданные тесты
              </button>
            </div>

            <div className="relative min-w-[240px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="wortschatz-toc-search-input"
                type="text"
                placeholder="Поиск по темам и словам..."
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
            {filteredTocSections.length === 0 ? (
              <div className="col-span-full p-8 text-center text-slate-500 dark:text-[#94A3B8] text-xs bg-slate-50 dark:bg-[#111C2E]/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
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
                    className={`text-left p-3.5 rounded-xl transition-all flex flex-col justify-between gap-2 border cursor-pointer shadow-xs ${
                      isActive
                        ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white border-transparent'
                        : 'bg-slate-50 dark:bg-[#111C2E]/70 hover:bg-white dark:hover:bg-[#111C2E] text-[#0B1F3A] dark:text-slate-100 border-slate-200/90 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] uppercase w-full font-semibold">
                      <span className={`px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-white dark:bg-[#0E1A2D] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}>
                        Тема №{numStr} • {levelStr}
                      </span>
                      <span className={isActive ? 'text-blue-100' : 'text-slate-500'}>
                        50 слов
                      </span>
                    </div>

                    <div>
                      <div className="font-heading font-bold text-sm leading-snug line-clamp-1">
                        {section.title_de}
                      </div>
                      <div className={`text-xs mt-0.5 line-clamp-1 ${isActive ? 'text-blue-100' : 'text-slate-500 dark:text-[#94A3B8]'}`}>
                        {section.title_ru}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-[10px] uppercase font-semibold">
                      {progressRecord?.passed ? (
                        <span className={`flex items-center gap-1 ${isActive ? 'text-emerald-300' : 'text-emerald-600 dark:text-emerald-400'}`}>
                          <CheckCircle2 size={12} />
                          <span>Сдано ({progressRecord.scorePercent}%)</span>
                        </span>
                      ) : (
                        <span className={isActive ? 'text-blue-200' : 'text-slate-400 dark:text-slate-500'}>
                          Тест не пройден
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

      {/* Main Section Content Card */}
      <div className="border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0E1A2D] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/90 dark:border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#3B82F6] font-bold mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/40">
                Тема #{currentSection.section_id < 10 ? `0${currentSection.section_id}` : currentSection.section_id}
              </span>
              <span>•</span>
              <span className="text-slate-500 dark:text-[#94A3B8]">{currentSection.section_id <= 6 ? 'Уровень A1.1' : 'Уровень A1.2'}</span>
              <span>•</span>
              <span className="text-slate-500 dark:text-[#94A3B8]">{currentSection.word_count} слов</span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A] dark:text-white tracking-tight">
              {currentSection.title_de}
            </h2>
            <div className="text-sm text-slate-600 dark:text-[#94A3B8] font-medium mt-0.5">
              {currentSection.title_ru}
            </div>
          </div>

          {/* Mode Switcher + Test Button */}
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-[#111C2E] border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#0B1F3A]'
                }`}
              >
                <List size={14} />
                <span>Список ({currentSection.word_count})</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('flashcards')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
                  viewMode === 'flashcards'
                    ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#0B1F3A]'
                }`}
              >
                <Layers size={14} />
                <span>Карточки</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleStartQuiz()}
              className="px-4 py-2 bg-[#3B82F6] hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <HelpCircle size={15} />
              <span>Тест темы (15 вопр.)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Search & Word Type Filters Toolbar */}
        <div className="bg-slate-50 dark:bg-[#111C2E] rounded-xl border border-slate-200/90 dark:border-slate-700/80 p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs font-semibold">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              type="button"
              onClick={() => setWordTypeFilter('all')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                wordTypeFilter === 'all'
                  ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white shadow-xs'
                  : 'bg-white dark:bg-[#0E1A2D] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              Все ({currentSection.word_count})
            </button>

            <button
              type="button"
              onClick={() => setWordTypeFilter('der')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                wordTypeFilter === 'der'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>der (м.р.)</span>
            </button>

            <button
              type="button"
              onClick={() => setWordTypeFilter('die')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                wordTypeFilter === 'die'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>die (ж.р.)</span>
            </button>

            <button
              type="button"
              onClick={() => setWordTypeFilter('das')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                wordTypeFilter === 'das'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>das (ср.р.)</span>
            </button>

            <button
              type="button"
              onClick={() => setWordTypeFilter('verbs')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                wordTypeFilter === 'verbs'
                  ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white shadow-xs'
                  : 'bg-white dark:bg-[#0E1A2D] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              Глаголы
            </button>

            <button
              type="button"
              onClick={() => setWordTypeFilter('other')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                wordTypeFilter === 'other'
                  ? 'bg-[#0B1F3A] dark:bg-[#3B82F6] text-white shadow-xs'
                  : 'bg-white dark:bg-[#0E1A2D] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              Фразы / Наречия
            </button>
          </div>

          {/* Quick Search inside Section */}
          <div className="relative min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              id="wortschatz-word-search"
              placeholder="Поиск по теме..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-7 py-1.5 bg-white dark:bg-[#0E1A2D] border border-slate-200 dark:border-slate-700 text-xs rounded-xl text-[#0B1F3A] dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#3B82F6]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-[#0B1F3A] cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* VIEW MODE 1: VOCABULARY LIST GRID */}
        {viewMode === 'list' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#94A3B8] font-medium px-1">
              <span>Слов в подборке: {filteredVocabulary.length}</span>
              <span className="hidden sm:inline">Нажмите на значок динамика для немецкой озвучки</span>
            </div>

            {filteredVocabulary.length === 0 ? (
              <div className="p-12 text-center text-slate-500 dark:text-[#94A3B8] text-xs bg-slate-50 dark:bg-[#111C2E]/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
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
                      <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-md text-[10px] font-bold">
                        DER
                      </span>
                    );
                  } else if (isDie) {
                    articleTag = (
                      <span className="px-2 py-0.5 bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-md text-[10px] font-bold">
                        DIE
                      </span>
                    );
                  } else if (isDas) {
                    articleTag = (
                      <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-md text-[10px] font-bold">
                        DAS
                      </span>
                    );
                  }

                  return (
                    <div
                      key={idx}
                      className="border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0E1A2D] hover:border-[#3B82F6] dark:hover:border-[#3B82F6] rounded-xl p-4 transition-all flex items-center justify-between gap-3 shadow-xs group"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="text-xs text-slate-400 dark:text-slate-600 mt-0.5 select-none shrink-0 w-6 font-mono font-semibold">
                          {(idx + 1).toString().padStart(2, '0')}.
                        </span>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-heading font-bold text-base text-[#0B1F3A] dark:text-white leading-snug">
                              {item.de}
                            </span>
                            {articleTag}
                          </div>
                          <div className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] font-medium mt-0.5">
                            {item.ru}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => speakGerman(item.de)}
                        className="p-2 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-[#111C2E] hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-200 transition-colors cursor-pointer shrink-0 shadow-xs"
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

        {/* VIEW MODE 2: INTERACTIVE FLASHCARDS */}
        {viewMode === 'flashcards' && (
          <div className="flex flex-col items-center gap-6 py-6">
            {filteredVocabulary.length === 0 ? (
              <div className="p-12 text-center text-slate-500 font-medium text-xs">
                Нет слов для отображения карточек.
              </div>
            ) : (
              <div className="w-full max-w-lg flex flex-col gap-5">
                {/* Flashcard Header Indicator */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#94A3B8] font-medium">
                  <span>Карточка {currentFlashcardIndex + 1} из {filteredVocabulary.length}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentFlashcardIndex(0);
                      setIsCardFlipped(false);
                    }}
                    className="hover:text-[#0B1F3A] dark:hover:text-white flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <RotateCcw size={13} />
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
                  className="w-full min-h-[260px] p-8 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0E1A2D] flex flex-col justify-between items-center text-center cursor-pointer transition-all shadow-md hover:border-[#3B82F6]"
                >
                  <div className="text-xs uppercase tracking-widest text-[#3B82F6] font-bold">
                    {!isCardFlipped ? 'DEUTSCH • Нажмите чтобы перевернуть' : 'RUSSIAN • Перевод'}
                  </div>

                  <div className="my-auto">
                    {!isCardFlipped ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="font-heading font-extrabold text-3xl md:text-4xl text-[#0B1F3A] dark:text-white">
                          {filteredVocabulary[currentFlashcardIndex]?.de}
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakGerman(filteredVocabulary[currentFlashcardIndex]?.de || '');
                          }}
                          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C2E] hover:bg-slate-50 dark:hover:bg-slate-700 text-[#0B1F3A] dark:text-white transition-colors shadow-xs"
                        >
                          <Volume2 size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="font-heading font-extrabold text-2xl md:text-3xl text-[#0B1F3A] dark:text-white">
                        {filteredVocabulary[currentFlashcardIndex]?.ru}
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-slate-400 font-medium">
                    {!isCardFlipped ? 'Кликните для просмотра перевода' : 'Кликните чтобы вернуться к немецкому'}
                  </div>
                </div>

                {/* Flashcard Navigation */}
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    disabled={currentFlashcardIndex === 0}
                    onClick={() => {
                      setCurrentFlashcardIndex((prev) => Math.max(0, prev - 1));
                      setIsCardFlipped(false);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-white dark:bg-[#111C2E] hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-[#0B1F3A] dark:text-slate-100 border border-slate-200 dark:border-slate-700 font-semibold text-xs transition-colors text-center cursor-pointer shadow-xs"
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
                    className="flex-1 py-2.5 rounded-xl bg-[#0B1F3A] dark:bg-[#3B82F6] hover:bg-[#111C2E] dark:hover:bg-blue-600 disabled:opacity-40 disabled:pointer-events-none text-white font-semibold text-xs transition-colors text-center cursor-pointer shadow-xs"
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
      <div className="border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0E1A2D] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3 text-xs">
          <div className="text-slate-600 dark:text-[#94A3B8] font-medium">
            Изучено слов в теме: <strong className="text-[#0B1F3A] dark:text-white">{currentSection.word_count}</strong>
          </div>
          {currentSectionProgress?.passed && (
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <Check size={14} /> Тест сдан ({currentSectionProgress.scorePercent}%)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {prevSection && (
            <button
              type="button"
              onClick={() => handleSelectSection(prevSection.section_id)}
              className="py-2 px-3.5 rounded-xl bg-white dark:bg-[#111C2E] hover:bg-slate-50 dark:hover:bg-slate-700 text-[#0B1F3A] dark:text-slate-100 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              ← Тема #{prevSection.section_id}
            </button>
          )}

          {nextSection ? (
            <button
              type="button"
              onClick={() => handleSelectSection(nextSection.section_id)}
              className="py-2 px-3.5 rounded-xl bg-[#0B1F3A] hover:bg-[#111C2E] dark:bg-[#3B82F6] dark:hover:bg-blue-600 text-white border-transparent text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              Тема #{nextSection.section_id}: {nextSection.title_de} →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSelectSection(1)}
              className="py-2 px-3.5 rounded-xl bg-[#0B1F3A] hover:bg-[#111C2E] dark:bg-[#3B82F6] dark:hover:bg-blue-600 text-white border-transparent text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              Вернуться к теме #01 ↺
            </button>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};
