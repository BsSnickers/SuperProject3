import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Sparkles, HelpCircle, ShieldCheck, ChevronRight } from 'lucide-react';
import { Lesson } from '../types';
import { useAuth } from '../context/AuthContext';

interface LessonPlayerViewProps {
  lesson: Lesson;
  onFinish: (scorePercent: number, correctAnswers: number, totalQuestions: number) => void;
  onExit: () => void;
}

export const LessonPlayerView: React.FC<LessonPlayerViewProps> = ({
  lesson,
  onFinish,
  onExit,
}) => {
  const { isAdmin } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  // Curator mode state
  const [showCuratorAnswer, setShowCuratorAnswer] = useState(true);
  const [showCuratorInspector, setShowCuratorInspector] = useState(false);

  const currentQuestion = lesson.questions[currentIndex];
  const progressPercent = Math.round(((currentIndex) / lesson.questions.length) * 100);

  if (!currentQuestion) {
    return null;
  }

  const handleSelectOption = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
  };

  const handleCuratorAutoPick = () => {
    if (isAnswerChecked) return;
    setSelectedOption(currentQuestion.correctAnswer);
  };

  const handleCheck = () => {
    if (!selectedOption || isAnswerChecked) return;

    const correct = selectedOption.trim() === currentQuestion.correctAnswer.trim();
    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < lesson.questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
    } else {
      const finalScore = Math.round((correctAnswersCount / lesson.questions.length) * 100);
      onFinish(finalScore, correctAnswersCount, lesson.questions.length);
    }
  };

  return (
    <div
      id="lesson-player-view"
      className="min-h-screen bg-[#F4F6F8] dark:bg-[#070D18] text-[#0B1F3A] dark:text-[#F4F6F8] flex flex-col justify-between p-4 md:p-8 max-w-4xl mx-auto font-sans transition-colors"
    >
      {/* Top Header & Progress */}
      <div className="flex flex-col gap-4 pb-4">
        {/* Curator Privilege Banner */}
        {isAdmin && (
          <div
            id="curator-mode-banner"
            className="bg-white dark:bg-[#0E1A2D] text-[#0B1F3A] dark:text-white border border-blue-200 dark:border-blue-900/50 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs shadow-xs"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
              <span className="font-heading font-bold text-xs">
                Режим куратора курса
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                id="toggle-curator-answers-btn"
                onClick={() => setShowCuratorAnswer(!showCuratorAnswer)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  showCuratorAnswer
                    ? 'bg-[#3B82F6] text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {showCuratorAnswer ? 'Подсказка: Вкл' : 'Подсказка: Выкл'}
              </button>

              <button
                type="button"
                id="curator-autopick-btn"
                onClick={handleCuratorAutoPick}
                disabled={isAnswerChecked}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 disabled:opacity-40 transition-colors cursor-pointer"
                title="Автоматически выбрать правильный ответ"
              >
                Подставить ответ
              </button>

              <button
                type="button"
                id="curator-inspect-btn"
                onClick={() => setShowCuratorInspector(!showCuratorInspector)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {showCuratorInspector ? 'Скрыть методичку' : 'Методичка'}
              </button>
            </div>
          </div>
        )}

        {/* Curator Inspector Dropdown */}
        {isAdmin && showCuratorInspector && (
          <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-xs flex flex-col gap-2 shadow-xs">
            <div className="font-semibold text-[#0B1F3A] dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1.5 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#3B82F6]" />
              <span>Методический анализ вопроса #{currentIndex + 1}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[#94A3B8]">Правильный ответ (ключ): </span>
                <strong className="text-[#3B82F6] font-semibold">{currentQuestion.correctAnswer}</strong>
              </div>
              <div>
                <span className="text-[#94A3B8]">Тип вопроса: </span>
                <span className="font-mono">{currentQuestion.type}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="font-medium"><strong>DE:</strong> {currentQuestion.explanationDe}</div>
              <div className="text-slate-500 dark:text-slate-400 mt-0.5"><strong>RU:</strong> {currentQuestion.explanationRu}</div>
            </div>
          </div>
        )}

        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            id="lesson-exit-btn"
            onClick={onExit}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-[#0E1A2D] hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0B1F3A] dark:text-white rounded-xl border border-slate-200/90 dark:border-slate-800 text-xs font-semibold transition-colors cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Выйти</span>
          </button>

          <div className="text-center">
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#94A3B8]">
              Модуль #{lesson.number}: {lesson.titleDe}
            </div>
            <div className="font-heading font-bold text-sm text-[#0B1F3A] dark:text-white">
              Вопрос {currentIndex + 1} из {lesson.questions.length}
            </div>
          </div>

          <div className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 rounded-xl text-xs font-semibold text-[#3B82F6]">
            Порог: {lesson.passThreshold}%
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#3B82F6] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Box */}
      <div className="my-auto py-4">
        <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 md:p-10 flex flex-col gap-6 shadow-xs">
          {/* Question Meta */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-800 text-[11px] font-mono uppercase tracking-wider text-[#3B82F6] font-semibold">
              <span>
                {currentQuestion.type === 'single-choice'
                  ? 'Выбор правильного ответа'
                  : currentQuestion.type === 'fill-gap'
                  ? 'Вставьте пропущенное слово'
                  : 'Перевод предложения'}
              </span>
              <span className="text-[#94A3B8]">
                {lesson.difficulty}
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-[#0B1F3A] dark:text-white leading-tight mt-4">
              {currentQuestion.promptDe}
            </h2>

            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium mt-2">
              {currentQuestion.promptRu}
            </p>
          </div>

          {/* Options Grid */}
          <div className="flex flex-col gap-2.5">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isOptionCorrect = option.trim() === currentQuestion.correctAnswer.trim();
              const isCuratorHighlight = isAdmin && showCuratorAnswer && isOptionCorrect && !isAnswerChecked;

              let optionStyle = 'bg-[#F4F6F8] dark:bg-[#111C2E] border-slate-200 dark:border-slate-700/80 text-[#0B1F3A] dark:text-white hover:border-[#3B82F6]';

              if (isAnswerChecked) {
                if (isOptionCorrect) {
                  optionStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-semibold';
                } else if (isSelected && !isOptionCorrect) {
                  optionStyle = 'bg-red-50 dark:bg-red-950/40 border-red-400 text-red-800 dark:text-red-300 line-through';
                } else {
                  optionStyle = 'bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'bg-blue-50 dark:bg-blue-950/50 border-[#3B82F6] text-[#0B1F3A] dark:text-white font-semibold ring-2 ring-[#3B82F6]/40';
              } else if (isCuratorHighlight) {
                optionStyle = 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-700 text-[#0B1F3A] dark:text-white';
              }

              return (
                <button
                  key={idx}
                  id={`lesson-option-${idx}`}
                  disabled={isAnswerChecked}
                  onClick={() => handleSelectOption(option)}
                  className={`w-full text-left p-4 md:p-5 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs opacity-50 font-bold">
                      [{String.fromCharCode(65 + idx)}]
                    </span>
                    <span className="text-sm md:text-base font-medium">{option}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Curator preview indicator */}
                    {isCuratorHighlight && (
                      <span className="text-[10px] font-semibold text-[#3B82F6] bg-blue-100 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                        Ключ
                      </span>
                    )}

                    {isAnswerChecked && isOptionCorrect && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Верно</span>
                      </span>
                    )}
                    {isAnswerChecked && isSelected && !isOptionCorrect && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-red-600 dark:text-red-400">
                        <XCircle className="w-4 h-4" />
                        <span>Ошибка</span>
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswerChecked && (
            <div className="p-4 md:p-5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 rounded-xl text-xs flex flex-col gap-1.5">
              <div className="font-bold text-[#0B1F3A] dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#3B82F6]" />
                <span>
                  {isCorrect
                    ? 'Верно! (Richtig)'
                    : `Правильный ответ: ${currentQuestion.correctAnswer}`}
                </span>
              </div>
              <div className="text-slate-600 dark:text-slate-300 font-medium">
                <div>{currentQuestion.explanationDe}</div>
                <div className="text-slate-500 dark:text-slate-400 mt-0.5">{currentQuestion.explanationRu}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="bg-white dark:bg-[#0E1A2D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="text-xs text-[#94A3B8] font-medium text-center sm:text-left">
          {!isAnswerChecked
            ? 'Выберите ответ и нажмите кнопку «Проверить»'
            : isCorrect
            ? 'Отлично! Переходите к следующему вопросу'
            : 'Ознакомьтесь с объяснением и продолжайте'}
        </div>

        <div className="w-full sm:w-auto">
          {!isAnswerChecked ? (
            <button
              id="lesson-check-btn"
              disabled={!selectedOption}
              onClick={handleCheck}
              className="w-full sm:w-auto px-8 py-3 bg-[#0B1F3A] hover:bg-[#152e54] disabled:opacity-40 text-white text-xs md:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Проверить ответ
            </button>
          ) : (
            <button
              id="lesson-next-btn"
              onClick={handleNext}
              className="w-full sm:w-auto px-8 py-3 bg-[#3B82F6] hover:bg-blue-600 text-white text-xs md:text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{currentIndex + 1 < lesson.questions.length ? 'Следующий вопрос' : 'Завершить модуль'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
