import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './config';
import { UserProfile, LessonProgress, ApplicationStatus, UserRole } from '../types';

export const USERS_COLLECTION = 'users';

// Helper to format today's date YYYY-MM-DD
export function getTodayDateString(): string {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

// Calculate streak based on lastActiveDate and activityDates
export function calculateNewStreak(lastActiveDate: string | undefined, currentStreak: number = 0): { streak: number; today: string } {
  const today = getTodayDateString();
  if (!lastActiveDate) {
    return { streak: 1, today };
  }
  
  if (lastActiveDate === today) {
    return { streak: currentStreak || 1, today };
  }

  const lastDate = new Date(lastActiveDate);
  const nowDate = new Date(today);
  const diffTime = nowDate.getTime() - lastDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

  if (diffDays === 1) {
    return { streak: (currentStreak || 0) + 1, today };
  } else if (diffDays > 1) {
    return { streak: 1, today };
  }

  return { streak: currentStreak || 1, today };
}

// Default profile for new user
export function createDefaultUserProfile(uid: string, email: string, displayName?: string, role: UserRole = 'user', emailVerified: boolean = false): UserProfile {
  const today = getTodayDateString();
  return {
    uid,
    email: email || 'student@delfi.de',
    displayName: displayName || (email ? email.split('@')[0] : 'Студент'),
    photoURL: '',
    role,
    emailVerified,
    createdAt: new Date().toISOString(),
    streakDays: 1,
    lastActiveDate: today,
    completedLessonsCount: 0,
    totalScoreSum: 0,
    totalAttempts: 0,
    auPairStageId: 1,
    auPairStatus: 'in_progress',
    auPairNotes: 'Документы на проверке координатором. Пожалуйста, завершите базовый уровень немецкого языка A1.',
    auPairUpdatedAt: new Date().toISOString(),
    ausbildungStageId: 1,
    ausbildungStatus: 'not_started',
    ausbildungNotes: 'Выберите желаемое направление (Pflegefachkraft / IT / Hotelfach) и подготовьте перевод школьного аттестата.',
    ausbildungUpdatedAt: new Date().toISOString(),
    activityDates: [today],
  };
}

// Ensure user document exists in Firestore
export async function syncUserProfile(uid: string, email: string, displayName?: string, emailVerified?: boolean): Promise<UserProfile> {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    const data = snap.data() as UserProfile;
    // Update streak if active today
    const { streak, today } = calculateNewStreak(data.lastActiveDate, data.streakDays);
    const activityDates = data.activityDates || [];
    if (!activityDates.includes(today)) {
      activityDates.push(today);
    }

    const updates: Partial<UserProfile> = {};
    let hasChanges = false;

    if (streak !== data.streakDays || data.lastActiveDate !== today) {
      updates.streakDays = streak;
      updates.lastActiveDate = today;
      updates.activityDates = activityDates;
      hasChanges = true;
    }

    if (emailVerified !== undefined && data.emailVerified !== emailVerified) {
      updates.emailVerified = emailVerified;
      hasChanges = true;
    }

    if (hasChanges) {
      await updateDoc(userRef, updates);
      return { ...data, ...updates };
    }
    return data;
  } else {
    // All newly registered users strictly get 'user' role. Admin permissions are granted only server-side/in Firestore
    const initialRole: UserRole = 'user';
    const newProfile = createDefaultUserProfile(uid, email, displayName, initialRole, emailVerified ?? false);
    await setDoc(userRef, newProfile);
    return newProfile;
  }
}

// Update emailVerified in profile
export async function updateUserEmailVerified(uid: string, emailVerified: boolean) {
  const userRef = doc(db, USERS_COLLECTION, uid);
  await updateDoc(userRef, { emailVerified });
}

// Subscribe to a specific user's profile
export function subscribeToUser(uid: string, onUpdate: (profile: UserProfile | null) => void) {
  const userRef = doc(db, USERS_COLLECTION, uid);
  return onSnapshot(
    userRef,
    (snap) => {
      if (snap.exists()) {
        onUpdate(snap.data() as UserProfile);
      } else {
        onUpdate(null);
      }
    },
    (err) => {
      console.error('Error listening to user profile:', err);
    }
  );
}

// Subscribe to a user's lesson progress subcollection
export function subscribeToUserProgress(uid: string, onUpdate: (progressList: Record<string, LessonProgress>) => void) {
  const progressCol = collection(db, USERS_COLLECTION, uid, 'progress');
  return onSnapshot(
    progressCol,
    (snap) => {
      const result: Record<string, LessonProgress> = {};
      snap.docs.forEach((d) => {
        result[d.id] = d.data() as LessonProgress;
      });
      onUpdate(result);
    },
    (err) => {
      console.error('Error listening to user progress:', err);
    }
  );
}

// Save lesson progress result
export async function saveLessonScore(
  uid: string,
  lessonId: string,
  scorePercent: number,
  correctAnswers: number,
  totalQuestions: number,
  passThreshold: number = 70
) {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const progressRef = doc(db, USERS_COLLECTION, uid, 'progress', lessonId);

  const prevSnap = await getDoc(progressRef);
  const prevData = prevSnap.exists() ? (prevSnap.data() as LessonProgress) : null;

  const passed = scorePercent >= passThreshold;
  const attemptsCount = (prevData?.attemptsCount || 0) + 1;

  const progressData: LessonProgress = {
    lessonId,
    scorePercent: Math.max(scorePercent, prevData?.scorePercent || 0),
    correctAnswers,
    totalQuestions,
    passed: passed || Boolean(prevData?.passed),
    completedAt: new Date().toISOString(),
    attemptsCount,
  };

  await setDoc(progressRef, progressData, { merge: true });

  // Update user stats
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const userData = userSnap.data() as UserProfile;
    const isNewPassed = passed && !prevData?.passed;
    const completedCount = (userData.completedLessonsCount || 0) + (isNewPassed ? 1 : 0);
    const totalScore = (userData.totalScoreSum || 0) + scorePercent;
    const totalAttempts = (userData.totalAttempts || 0) + 1;

    const { streak, today } = calculateNewStreak(userData.lastActiveDate, userData.streakDays);
    const activityDates = userData.activityDates || [];
    if (!activityDates.includes(today)) {
      activityDates.push(today);
    }

    await updateDoc(userRef, {
      completedLessonsCount: completedCount,
      totalScoreSum: totalScore,
      totalAttempts: totalAttempts,
      streakDays: streak,
      lastActiveDate: today,
      activityDates,
    });
  }
}

// Subscribe to all users (for Admin dashboard)
export function subscribeToAllUsers(onUpdate: (users: UserProfile[]) => void) {
  const usersCol = collection(db, USERS_COLLECTION);
  return onSnapshot(
    usersCol,
    (snap) => {
      const list: UserProfile[] = [];
      snap.forEach((d) => {
        list.push(d.data() as UserProfile);
      });
      // Sort by newest activity or createdAt
      list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      onUpdate(list);
    },
    (err) => {
      console.error('Error fetching users:', err);
    }
  );
}

// Admin: Update Au-Pair / Ausbildung status of any student
export async function updateStudentApplication(
  targetUid: string,
  program: 'auPair' | 'ausbildung',
  stageId: number,
  status: ApplicationStatus,
  notes: string
) {
  const userRef = doc(db, USERS_COLLECTION, targetUid);
  const now = new Date().toISOString();

  if (program === 'auPair') {
    await updateDoc(userRef, {
      auPairStageId: stageId,
      auPairStatus: status,
      auPairNotes: notes,
      auPairUpdatedAt: now,
    });
  } else {
    await updateDoc(userRef, {
      ausbildungStageId: stageId,
      ausbildungStatus: status,
      ausbildungNotes: notes,
      ausbildungUpdatedAt: now,
    });
  }
}

// Switch role (Admin / User)
export async function setUserRole(uid: string, role: UserRole) {
  const userRef = doc(db, USERS_COLLECTION, uid);
  await updateDoc(userRef, { role });
}

// Seed demo users if list is empty (useful for Admin view testing)
export async function seedDemoStudentsIfEmpty() {
  try {
    const usersCol = collection(db, USERS_COLLECTION);
    const snap = await getDocs(usersCol);
    if (snap.size <= 1) {
      const demoStudents: UserProfile[] = [
        {
          uid: 'demo-student-1',
          email: 'anna.smirnova@gmail.com',
          displayName: 'Анна Смирнова',
          photoURL: '',
          role: 'user',
          createdAt: new Date(Date.now() - 1000 * 3600 * 24 * 14).toISOString(),
          streakDays: 7,
          lastActiveDate: getTodayDateString(),
          completedLessonsCount: 3,
          totalScoreSum: 275,
          totalAttempts: 4,
          auPairStageId: 4,
          auPairStatus: 'in_progress',
          auPairNotes: 'Интервью с семьёй Familie Weber (Мюнхен) назначено на четверг 18:00.',
          auPairUpdatedAt: new Date().toISOString(),
          ausbildungStageId: 1,
          ausbildungStatus: 'not_started',
          ausbildungNotes: 'Рассматривает как запасной вариант после Au-Pair.',
          activityDates: [getTodayDateString()],
        },
        {
          uid: 'demo-student-2',
          email: 'dmitriy.petrov@yandex.ru',
          displayName: 'Дмитрий Петров',
          photoURL: '',
          role: 'user',
          createdAt: new Date(Date.now() - 1000 * 3600 * 24 * 28).toISOString(),
          streakDays: 14,
          lastActiveDate: getTodayDateString(),
          completedLessonsCount: 5,
          totalScoreSum: 480,
          totalAttempts: 6,
          auPairStageId: 1,
          auPairStatus: 'not_started',
          auPairNotes: 'Выбрал программу Ausbildung.',
          ausbildungStageId: 5,
          ausbildungStatus: 'in_progress',
          ausbildungNotes: 'Отправлены заявки в 4 клиники (Pflegefachkraft, Франкфурт). Ожидаем ответа.',
          ausbildungUpdatedAt: new Date().toISOString(),
          activityDates: [getTodayDateString()],
        },
        {
          uid: 'demo-student-3',
          email: 'elena.volkova@mail.ru',
          displayName: 'Елена Волкова',
          photoURL: '',
          role: 'user',
          createdAt: new Date(Date.now() - 1000 * 3600 * 24 * 5).toISOString(),
          streakDays: 3,
          lastActiveDate: getTodayDateString(),
          completedLessonsCount: 1,
          totalScoreSum: 85,
          totalAttempts: 1,
          auPairStageId: 2,
          auPairStatus: 'changes_requested',
          auPairNotes: 'Необходимо обновить перевод справки о несудимости с апостилем.',
          auPairUpdatedAt: new Date().toISOString(),
          ausbildungStageId: 1,
          ausbildungStatus: 'not_started',
          ausbildungNotes: 'Не подавала.',
          activityDates: [getTodayDateString()],
        }
      ];

      for (const student of demoStudents) {
        await setDoc(doc(db, USERS_COLLECTION, student.uid), student, { merge: true });
      }
    }
  } catch (err) {
    console.warn('Demo students seed skipped or error:', err);
  }
}
