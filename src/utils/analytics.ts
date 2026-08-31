import { UserProfile, LessonProgress, Lesson } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';

export interface CompetenceDetail {
  id: string;
  title: string;
  category: string;
  accuracy: number;
  correct: number;
  total: number;
  description: string;
  hasData: boolean;
}

export interface WeeklyDataPoint {
  weekLabel: string;
  weekShort: string;
  accuracy: number;
  exercises: number;
  newWords: number;
  studyMinutes: number;
  passThreshold: number;
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
  totalStudyMinutes: number;
  totalStudyHours: string;
  totalWordsLearned: number;
  accuracyGrowth: number;
  weeklyData: WeeklyDataPoint[];
  competences: CompetenceDetail[];
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
 * Computes 100% REAL analytics based on actual lesson progress and catalog data.
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

  // Calculate study minutes
  const totalStudyMinutes = attemptedDetails.reduce(
    (sum, d) => sum + d.lesson.estimatedMinutes * (d.progress?.attemptsCount || 1),
    0
  );
  const totalStudyHours = (totalStudyMinutes / 60).toFixed(1);

  // Categorize Competences based on real question types & tags
  const categoriesMap: Record<string, { correct: number; total: number; count: number; title: string; desc: string }> = {
    grammatik: {
      title: 'Grammatik (Грамматика)',
      desc: 'Спряжение глаголов, падежи, порядок слов',
      correct: 0,
      total: 0,
      count: 0,
    },
    wortschatz: {
      title: 'Wortschatz (Словарь)',
      desc: 'Словарный запас, темы семьи, города, еды',
      correct: 0,
      total: 0,
      count: 0,
    },
    hoeren: {
      title: 'Hören (Аудирование)',
      desc: 'Восприятие немецких фраз на слух',
      correct: 0,
      total: 0,
      count: 0,
    },
    lesen: {
      title: 'Lesen / Schreiben (Чтение и письмо)',
      desc: 'Понимание текстов и заполнение пропусков',
      correct: 0,
      total: 0,
      count: 0,
    },
  };

  attemptedDetails.forEach((d) => {
    const prog = d.progress;
    if (!prog) return;

    const lesson = d.lesson;
    lesson.questions.forEach((q) => {
      let catKey = 'grammatik';
      if (q.audioHintText || q.type === 'audio-phrase') {
        catKey = 'hoeren';
      } else if (q.type === 'translate' || lesson.tags.some((t) => t.includes('Словарь') || t.includes('Числа') || t.includes('Семья'))) {
        catKey = 'wortschatz';
      } else if (q.type === 'fill-gap' && lesson.tags.some((t) => t.includes('Письмо') || t.includes('Чтение'))) {
        catKey = 'lesen';
      }

      const ratio = prog.totalQuestions > 0 ? prog.correctAnswers / prog.totalQuestions : 0;
      categoriesMap[catKey].correct += ratio;
      categoriesMap[catKey].total += 1;
      categoriesMap[catKey].count += 1;
    });
  });

  const competences: CompetenceDetail[] = Object.entries(categoriesMap).map(([key, item]) => {
    const hasData = item.total > 0;
    const accuracy = hasData ? Math.round((item.correct / item.total) * 100) : 0;
    return {
      id: key,
      title: item.title,
      category: key,
      accuracy,
      correct: Math.round(item.correct),
      total: item.total,
      description: hasData ? `${item.desc} (${item.total} вопр.)` : `${item.desc} (Нет пройденных тестов)`,
      hasData,
    };
  });

  // Generate 8-week real trend data
  const weeklyData: WeeklyDataPoint[] = [];
  const now = new Date();

  // Sort attempted progress by completedAt timestamp
  const sortedProgressList = attemptedDetails
    .map((d) => d.progress!)
    .filter((p) => p.completedAt)
    .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime());

  for (let i = 7; i >= 0; i--) {
    const weekEndDate = new Date(now);
    weekEndDate.setDate(now.getDate() - i * 7);

    const weekIndex = 7 - i;
    const weekNum = weekIndex + 1;
    const dateStr = `${weekEndDate.getDate().toString().padStart(2, '0')}.${(weekEndDate.getMonth() + 1).toString().padStart(2, '0')}`;

    // Filter tests completed on or before weekEndDate
    const progressUpToWeek = sortedProgressList.filter(
      (p) => new Date(p.completedAt).getTime() <= weekEndDate.getTime()
    );

    if (progressUpToWeek.length === 0) {
      weeklyData.push({
        weekLabel: `Неделя ${weekNum} (${dateStr})`,
        weekShort: `Нед. ${weekNum}`,
        accuracy: 0,
        exercises: 0,
        newWords: 0,
        studyMinutes: 0,
        passThreshold: 70,
      });
    } else {
      const weekScores = progressUpToWeek.map((p) => p.scorePercent);
      const wAvgScore = Math.round(weekScores.reduce((a, b) => a + b, 0) / weekScores.length);
      const wExercises = progressUpToWeek.reduce((sum, p) => sum + p.correctAnswers, 0);

      // Unique words up to this week
      const weekLessons = activeLessons.filter((l) =>
        progressUpToWeek.some((p) => p.lessonId === l.id)
      );
      const weekWordsSet = new Set<string>();
      weekLessons.forEach((l) => {
        extractGermanWordsFromLesson(l).forEach((w) => weekWordsSet.add(w));
      });

      const wMinutes = weekLessons.reduce((sum, l) => {
        const p = progressUpToWeek.find((item) => item.lessonId === l.id);
        return sum + l.estimatedMinutes * (p?.attemptsCount || 1);
      }, 0);

      weeklyData.push({
        weekLabel: `Неделя ${weekNum} (${dateStr})`,
        weekShort: `Нед. ${weekNum}`,
        accuracy: wAvgScore,
        exercises: wExercises,
        newWords: weekWordsSet.size,
        studyMinutes: wMinutes,
        passThreshold: 70,
      });
    }
  }

  // Calculate real accuracy growth
  const nonZeroWeeks = weeklyData.filter((w) => w.accuracy > 0);
  const accuracyGrowth =
    nonZeroWeeks.length >= 2
      ? nonZeroWeeks[nonZeroWeeks.length - 1].accuracy - nonZeroWeeks[0].accuracy
      : 0;

  return {
    passedLessonsCount,
    totalLessonsCount,
    totalAttempts,
    totalQuestionsSolved,
    totalQuestionsAttempted,
    avgScore,
    totalStudyMinutes,
    totalStudyHours,
    totalWordsLearned,
    accuracyGrowth,
    weeklyData,
    competences,
    lessonDetails,
    hasAnyAttempt,
  };
}
