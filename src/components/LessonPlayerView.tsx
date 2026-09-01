import React, { useState } from 'react';
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

        {/* Curator Inspector Dropdown */}
        {isAdmin && showCuratorInspector && (
          <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 p-4 font-mono text-xs text-zinc-800 dark:text-zinc-200 flex flex-col gap-2">
            <div className="font-bold text-zinc-950 dark:text-white uppercase text-[10px] tracking-wider border-b border-zinc-300 dark:border-zinc-800 pb-1">
              [Методический анализ вопроса #{currentIndex + 1}]
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-zinc-500 dark:text-zinc-400 font-sans">Правильный ответ (ключ): </span>
                <strong className="text-zinc-950 dark:text-white font-mono font-bold bg-white dark:bg-zinc-800 px-1.5 py-0.5 border border-zinc-300 dark:border-zinc-700">
                  {currentQuestion.correctAnswer}
                </strong>
              </div>
              <div>
                <span className="text-zinc-500 dark:text-zinc-400 font-sans">Тип вопроса: </span>
                <span className="font-mono text-zinc-700 dark:text-zinc-300">{currentQuestion.type}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-xs font-sans text-zinc-700 dark:text-zinc-300">
              <div><strong>DE:</strong> {currentQuestion.explanationDe}</div>
              <div className="text-zinc-500 dark:text-zinc-400 mt-0.5"><strong>RU:</strong> {currentQuestion.explanationRu}</div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            id="lesson-exit-btn"
            onClick={onExit}
            className="font-mono text-xs uppercase tracking-wider px-3.5 py-2 bg-white dark:bg-zinc-900 hover:bg-black dark:hover:bg-white text-zinc-900 dark:text-zinc-100 hover:text-white dark:hover:text-zinc-950 border border-zinc-300 dark:border-zinc-800 transition-colors cursor-pointer"
          >
            [Выйти]
          </button>

          <div className="text-center font-mono text-xs">
            <span className="text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block text-[10px]">
              Модуль #{lesson.number}: {lesson.titleDe}
            </span>
            <span className="font-bold text-zinc-950 dark:text-white">
              Вопрос {currentIndex + 1} / {lesson.questions.length}
            </span>
          </div>

          <div className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
            Порог: {lesson.passThreshold}%
          </div>
        </div>

        {/* Minimalist 2px Progress Line */}
        <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          <div
            className="h-full bg-black dark:bg-blue-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Box */}
      <div className="my-6">
        <div className="border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-6 md:p-10 flex flex-col gap-8">
          {/* Question Meta & Prompt */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-6 font-mono text-[10px] uppercase text-zinc-400 dark:text-zinc-500">
              <span>
                {currentQuestion.type === 'single-choice'
                  ? 'Выбор ответа'
                  : currentQuestion.type === 'fill-gap'
                  ? 'Пропущенное слово'
                  : 'Перевод'}
              </span>
            </div>

            <h2 className="font-serif text-2xl md:text-4xl font-normal text-zinc-950 dark:text-white leading-tight">
              {currentQuestion.promptDe}
            </h2>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              {currentQuestion.promptRu}
            </p>
          </div>

          {/* Options Grid */}
          <div className="flex flex-col gap-2.5 font-mono text-xs">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isOptionCorrect = option.trim() === currentQuestion.correctAnswer.trim();
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
                  disabled={isAnswerChecked}
                  onClick={() => handleSelectOption(option)}
                  className={`w-full text-left p-4 md:p-5 border flex items-center justify-between transition-colors rounded-none cursor-pointer ${optionClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="opacity-50">[{String.fromCharCode(65 + idx)}]</span>
                    <span className="font-sans text-sm md:text-base">{option}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Curator preview indicator */}
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
                  : `[Ошибка] Правильно: ${currentQuestion.correctAnswer}`}
              </div>
              <div className="text-zinc-600 dark:text-zinc-400 font-sans text-xs mt-2">
                <div className="font-medium text-zinc-800 dark:text-zinc-200">{currentQuestion.explanationDe}</div>
                <div className="text-zinc-500 dark:text-zinc-400 mt-0.5">{currentQuestion.explanationRu}</div>
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
              disabled={!selectedOption}
              onClick={handleCheck}
              className="px-8 py-3 bg-black dark:bg-zinc-100 hover:bg-[#0033CC] dark:hover:bg-blue-600 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-600 text-white dark:text-zinc-950 dark:hover:text-white uppercase tracking-wider font-bold transition-colors border border-black dark:border-zinc-100 disabled:border-zinc-300 dark:disabled:border-zinc-800 cursor-pointer"
            >
              Проверить ответ
            </button>
          ) : (
            <button
              id="lesson-next-btn"
              onClick={handleNext}
              className="px-8 py-3 bg-[#0033CC] dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-500 text-white uppercase tracking-wider font-bold transition-colors border border-[#0033CC] dark:border-blue-600 cursor-pointer"
            >
              {currentIndex + 1 < lesson.questions.length ? 'Следующий вопрос ->' : 'Завершить модуль ->'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
