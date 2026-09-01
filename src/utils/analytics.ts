import { UserProfile, LessonProgress, Lesson } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';

export interface ModuleDataPoint {
  moduleId: string;
  moduleNum: number;
  moduleShort: string;
  moduleTitle: string;
  moduleFull: string;
  difficulty: Lesson['difficulty'];
  scorePercent: number;
  isPassed: boolean;
  passThreshold: number;
  questionsCount: number;
  correctAnswers: number;
  newWords: number;
  attemptsCount: number;
  status: 'passed' | 'failed' | 'not_started';
}

export interface LessonAttemptDetail {
  lesson: Lesson;
  progress: LessonProgress | null;
  status: 'passed' | 'failed' | 'not_started';
}

export interface RealAnalyticsSummary {
  passedLessonsCount: number;
  totalLessonsCount: number;
  totalAttempts: number;
  totalQuestionsSolved: number;
  totalQuestionsAttempted: number;
  avgScore: number;
  totalWordsLearned: number;
  accuracyGrowth: number;
  moduleData: ModuleDataPoint[];
  lessonDetails: LessonAttemptDetail[];
  hasAnyAttempt: boolean;
}

/**
 * Extracts unique German words from a lesson's questions
 */
export function extractGermanWordsFromLesson(lesson: Lesson): Set<string> {
  const words = new Set<string>();
  lesson.questions.forEach((q) => {
    const text = `${q.promptDe} ${q.correctAnswer} ${q.options.join(' ')} ${q.audioHintText || ''}`;
    const cleanText = text.replace(/[^a-zA-ZäöüÄÖÜß]/g, ' ');
    cleanText.split(/\s+/).forEach((w) => {
      if (w.length >= 3) {
        words.add(w.toLowerCase());
      }
    });
  });
  return words;
}

/**
 * Computes 100% REAL analytics based on actual lesson progress and catalog data by modules.
 */
export function calculateRealAnalytics(
  profile: UserProfile | null,
  progress: Record<string, LessonProgress>
): RealAnalyticsSummary {
  const activeLessons = LESSONS_DATA.filter((l) => !l.isComingSoon);
  const totalLessonsCount = activeLessons.length;

  // Build detail for every active lesson
  const lessonDetails: LessonAttemptDetail[] = activeLessons.map((lesson) => {
    const prog = progress[lesson.id] || null;
    let status: 'passed' | 'failed' | 'not_started' = 'not_started';
    if (prog) {
      status = prog.passed ? 'passed' : 'failed';
    }
    return {
      lesson,
      progress: prog,
      status,
    };
  });

  const attemptedDetails = lessonDetails.filter((d) => d.progress !== null);
  const hasAnyAttempt = attemptedDetails.length > 0;

  const passedLessonsCount = lessonDetails.filter((d) => d.status === 'passed').length;

  const totalQuestionsSolved = attemptedDetails.reduce(
    (sum, d) => sum + (d.progress?.correctAnswers || 0),
    0
  );

  const totalQuestionsAttempted = attemptedDetails.reduce(
    (sum, d) => sum + (d.progress?.totalQuestions || d.lesson.questionsCount),
    0
  );

  const totalAttempts = profile?.totalAttempts || attemptedDetails.reduce(
    (sum, d) => sum + (d.progress?.attemptsCount || 1),
    0
  );

  const scores = attemptedDetails.map((d) => d.progress?.scorePercent || 0);
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  // Calculate real words learned from attempted/passed lessons
  const uniqueWords = new Set<string>();
  attemptedDetails.forEach((d) => {
    const wordsInLesson = extractGermanWordsFromLesson(d.lesson);
    wordsInLesson.forEach((w) => uniqueWords.add(w));
  });
  const totalWordsLearned = uniqueWords.size;

  // Build per-module analytics for chart
  const moduleData: ModuleDataPoint[] = activeLessons.map((lesson) => {
    const prog = progress[lesson.id];
    const isPassed = Boolean(prog?.passed);
    const scorePercent = prog ? prog.scorePercent : 0;
    const correctAnswers = prog ? prog.correctAnswers : 0;
    const attemptsCount = prog ? (prog.attemptsCount || 1) : 0;
    let status: 'passed' | 'failed' | 'not_started' = 'not_started';
    if (prog) {
      status = prog.passed ? 'passed' : 'failed';
    }

    const wordsSet = extractGermanWordsFromLesson(lesson);

    return {
      moduleId: lesson.id,
      moduleNum: lesson.number,
      moduleShort: `M${lesson.number < 10 ? `0${lesson.number}` : lesson.number}`,
      moduleTitle: lesson.titleDe,
      moduleFull: `#${lesson.number < 10 ? `0${lesson.number}` : lesson.number} ${lesson.titleDe}`,
      difficulty: lesson.difficulty,
      scorePercent,
      isPassed,
      passThreshold: lesson.passThreshold || 70,
      questionsCount: lesson.questionsCount,
      correctAnswers,
      newWords: wordsSet.size,
      attemptsCount: prog ? attemptsCount : 0,
      status,
    };
  });

  // Accuracy growth between earliest passed and latest passed
  const passedModules = moduleData.filter((m) => m.isPassed);
  const accuracyGrowth =
    passedModules.length >= 2
      ? passedModules[passedModules.length - 1].scorePercent - passedModules[0].scorePercent
      : 0;

  return {
    passedLessonsCount,
    totalLessonsCount,
    totalAttempts,
    totalQuestionsSolved,
    totalQuestionsAttempted,
    avgScore,
    totalWordsLearned,
    accuracyGrowth,
    moduleData,
    lessonDetails,
    hasAnyAttempt,
  };
}

