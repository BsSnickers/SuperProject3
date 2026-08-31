import React, { useState } from 'react';
import { Lesson } from '../types';
import { AudioButton } from './AudioButton';
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
    <div id="lesson-player-view" className="min-h-screen bg-[#F8F9FA] text-[#09090B] flex flex-col justify-between p-4 md:p-10 max-w-4xl mx-auto font-sans">
      {/* Top Header & Progress */}
      <div className="flex flex-col gap-4 border-b border-zinc-300 pb-6">
        {/* Curator Privilege Banner */}
        {isAdmin && (
          <div
            id="curator-mode-banner"
            className="bg-zinc-900 text-white border border-zinc-950 p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs shadow-sm"
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
                className={`px-2.5 py-1 text-[11px] uppercase tracking-wider border transition-colors ${
                  showCuratorAnswer
                    ? 'bg-zinc-100 border-white text-zinc-950 font-bold'
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
                className="px-2.5 py-1 text-[11px] uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                title="Автоматически выбрать правильный вариант"
              >
                [Подставить ключ]
              </button>

              <button
                type="button"
                id="curator-inspect-btn"
                onClick={() => setShowCuratorInspector(!showCuratorInspector)}
                className="px-2.5 py-1 text-[11px] uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 transition-colors"
              >
                {showCuratorInspector ? '[Скрыть детали]' : '[Методичка]'}
              </button>
            </div>
          </div>
        )}

        {/* Curator Inspector Dropdown */}
        {isAdmin && showCuratorInspector && (
          <div className="bg-zinc-100 border border-zinc-300 p-4 font-mono text-xs text-zinc-800 flex flex-col gap-2">
            <div className="font-bold text-zinc-950 uppercase text-[10px] tracking-wider border-b border-zinc-300 pb-1">
              [Методический анализ вопроса #{currentIndex + 1}]
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-zinc-500 font-sans">Правильный ответ (ключ): </span>
                <strong className="text-zinc-950 font-mono font-bold bg-white px-1.5 py-0.5 border border-zinc-300">
                  {currentQuestion.correctAnswer}
                </strong>
              </div>
              <div>
                <span className="text-zinc-500 font-sans">Тип вопроса: </span>
                <span className="font-mono text-zinc-700">{currentQuestion.type}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-zinc-200 text-xs font-sans text-zinc-700">
              <div><strong>DE:</strong> {currentQuestion.explanationDe}</div>
              <div className="text-zinc-500 mt-0.5"><strong>RU:</strong> {currentQuestion.explanationRu}</div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            id="lesson-exit-btn"
            onClick={onExit}
            className="font-mono text-xs uppercase tracking-wider px-3.5 py-2 bg-white hover:bg-black hover:text-white border border-zinc-300 transition-colors"
          >
            [Выйти]
          </button>

          <div className="text-center font-mono text-xs">
            <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">
              Модуль #{lesson.number}: {lesson.titleDe}
            </span>
            <span className="font-bold text-zinc-950">
              Вопрос {currentIndex + 1} / {lesson.questions.length}
            </span>
          </div>

          <div className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 bg-zinc-100 border border-zinc-300 text-zinc-600">
            Порог: {lesson.passThreshold}%
          </div>
        </div>

        {/* Minimalist 2px Progress Line */}
        <div className="w-full h-1 bg-zinc-200 overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Box */}
      <div className="my-6">
        <div className="border border-zinc-300 bg-white p-6 md:p-10 flex flex-col gap-8">
          {/* Question Meta & Prompt */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-6 font-mono text-[10px] uppercase text-zinc-400">
              <span>
                {currentQuestion.type === 'single-choice'
                  ? 'Выбор ответа'
                  : currentQuestion.type === 'fill-gap'
                  ? 'Пропущенное слово'
                  : 'Перевод'}
              </span>

              {currentQuestion.audioHintText && (
                <AudioButton text={currentQuestion.audioHintText} label="Слушать фразу" />
              )}
            </div>

            <h2 className="font-serif text-2xl md:text-4xl font-normal text-zinc-950 leading-tight">
              {currentQuestion.promptDe}
            </h2>

            <p className="text-sm text-zinc-600 mt-2">
              {currentQuestion.promptRu}
            </p>
          </div>

          {/* Options Grid */}
          <div className="flex flex-col gap-2.5 font-mono text-xs">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isOptionCorrect = option.trim() === currentQuestion.correctAnswer.trim();
              const isCuratorHighlight = isAdmin && showCuratorAnswer && isOptionCorrect && !isAnswerChecked;

              let optionClass = 'bg-white border-zinc-300 text-zinc-900 hover:bg-zinc-100';

              if (isAnswerChecked) {
                if (isOptionCorrect) {
                  optionClass = 'bg-zinc-950 text-white border-zinc-950 font-bold';
                } else if (isSelected && !isOptionCorrect) {
                  optionClass = 'bg-zinc-200 text-zinc-500 border-zinc-400 line-through';
                } else {
                  optionClass = 'bg-white text-zinc-400 border-zinc-200 opacity-60';
                }
              } else if (isSelected) {
                optionClass = 'bg-zinc-900 text-white border-zinc-900 font-bold';
              } else if (isCuratorHighlight) {
                optionClass = 'bg-zinc-100 border-zinc-900 text-zinc-950';
              }

              return (
                <button
                  key={idx}
                  id={`lesson-option-${idx}`}
                  disabled={isAnswerChecked}
                  onClick={() => handleSelectOption(option)}
                  className={`w-full text-left p-4 md:p-5 border flex items-center justify-between transition-colors rounded-none ${optionClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="opacity-50">[{String.fromCharCode(65 + idx)}]</span>
                    <span className="font-sans text-sm md:text-base">{option}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Curator preview indicator */}
                    {isCuratorHighlight && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-900 bg-zinc-200 border border-zinc-400 px-2 py-0.5 font-bold">
                        [Ключ куратора]
                      </span>
                    )}

                    {isAnswerChecked && isOptionCorrect && (
                      <span className="font-mono text-xs uppercase tracking-wider text-white">
                        [Верно]
                      </span>
                    )}
                    {isAnswerChecked && isSelected && !isOptionCorrect && (
                      <span className="font-mono text-xs uppercase tracking-wider text-zinc-950">
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
            <div className="p-4 md:p-6 bg-[#FAFAFA] border border-zinc-300 font-mono text-xs">
              <div className="font-bold uppercase tracking-wider mb-1 text-zinc-950">
                {isCorrect
                  ? '[Верный ответ] (Richtig)'
                  : `[Ошибка] Правильно: ${currentQuestion.correctAnswer}`}
              </div>
              <div className="text-zinc-600 font-sans text-xs mt-2">
                <div className="font-medium text-zinc-800">{currentQuestion.explanationDe}</div>
                <div className="text-zinc-500 mt-0.5">{currentQuestion.explanationRu}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer Controls */}
      <div className="border border-zinc-300 bg-white p-4 flex items-center justify-between gap-4 font-mono text-xs">
        <div className="text-zinc-500 text-[11px] uppercase tracking-wider">
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
              className="px-8 py-3 bg-black hover:bg-[#0033CC] disabled:bg-zinc-200 disabled:text-zinc-400 text-white uppercase tracking-wider font-bold transition-colors border border-black cursor-pointer"
            >
              Проверить ответ
            </button>
          ) : (
            <button
              id="lesson-next-btn"
              onClick={handleNext}
              className="px-8 py-3 bg-[#0033CC] hover:bg-black text-white uppercase tracking-wider font-bold transition-colors border border-[#0033CC] cursor-pointer"
            >
              {currentIndex + 1 < lesson.questions.length ? 'Следующий вопрос ->' : 'Завершить модуль ->'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
