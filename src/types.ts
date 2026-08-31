export type UserRole = 'user' | 'admin';

export type ApplicationStatus = 'not_started' | 'in_review' | 'in_progress' | 'changes_requested' | 'approved' | 'completed';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  emailVerified?: boolean;
  createdAt: string;
  streakDays: number;
  lastActiveDate: string;
  completedLessonsCount: number;
  totalScoreSum: number;
  totalAttempts: number;
  
  // Au-Pair status
  auPairStageId: number;
  auPairStatus: ApplicationStatus;
  auPairNotes: string;
  auPairUpdatedAt?: string;

  // Ausbildung status
  ausbildungStageId: number;
  ausbildungStatus: ApplicationStatus;
  ausbildungNotes: string;
  ausbildungUpdatedAt?: string;

  // Track activity dates for heat-map/streak
  activityDates?: string[];
}

export interface QuestionOption {
  id: string;
  text: string;
  translation?: string;
}

export interface LessonQuestion {
  id: string;
  type: 'single-choice' | 'translate' | 'fill-gap' | 'audio-phrase';
  promptDe: string;
  promptRu: string;
  options: string[];
  correctAnswer: string;
  explanationDe: string;
  explanationRu: string;
  audioHintText?: string;
}

export interface Lesson {
  id: string;
  number: number;
  titleDe: string;
  titleRu: string;
  description: string;
  difficulty: 'A1.1' | 'A1.2' | 'A2.1' | 'A2.2';
  estimatedMinutes: number;
  questionsCount: number;
  totalLearners: number;
  passThreshold: number; // e.g. 70 (%)
  tags: string[];
  isComingSoon: boolean;
  questions: LessonQuestion[];
}

export interface LessonProgress {
  lessonId: string;
  scorePercent: number;
  correctAnswers: number;
  totalQuestions: number;
  passed: boolean;
  completedAt: string;
  attemptsCount: number;
}

export interface ProgramStage {
  id: number;
  number: number;
  titleRu: string;
  titleDe: string;
  description: string;
  tips: string;
  requiredDocuments: string[];
  estimatedDays: string;
}

export interface HandbookSection {
  id: string;
  title: string;
  titleDe: string;
  level: string;
  category: 'grammar' | 'vocabulary' | 'dialogues' | 'visa-tips';
  content: string;
  topicNumber?: number;
  relatedLessonId?: string;
  ruleTips?: string[];
  tables?: {
    headers: string[];
    rows: string[][];
  }[];
  examples?: {
    de: string;
    ru: string;
  }[];
}
