import { useState, useEffect, useCallback } from 'react';
import { Lesson, LessonProgress, HandbookSection, WortschatzSection } from '../types';
import { HANDBOOK_DATA } from '../data/handbookData';
import { WORTSCHATZ_DATA } from '../data/wortschatzData';
import { LESSONS_DATA } from '../data/lessonsData';

export const VIEWED_HANDBOOK_TOPICS_KEY = 'delfi_viewed_handbook_topics';
export const WORTSCHATZ_PROGRESS_KEY = 'delfi_wortschatz_progress';
export const PREREQUISITES_EVENT = 'delfi_prerequisites_updated';

export interface ModuleAccessStatus {
  isUnlocked: boolean;
  prevLessonPassed: boolean;
  handbookTopic?: HandbookSection;
  isHandbookViewed: boolean;
  wortschatzSection?: WortschatzSection;
  isWortschatzPassed: boolean;
  wortschatzScore?: number;
  lockReason?: string;
}

/**
 * Get the set of topic IDs that the user has viewed in the Handbook
 */
export function getViewedHandbookTopics(): Set<string> {
  try {
    const raw = localStorage.getItem(VIEWED_HANDBOOK_TOPICS_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

/**
 * Mark a handbook topic as viewed and notify all listening components
 */
export function markHandbookTopicViewed(topicId: string): void {
  if (!topicId) return;
  try {
    const current = getViewedHandbookTopics();
    if (!current.has(topicId)) {
      current.add(topicId);
      localStorage.setItem(VIEWED_HANDBOOK_TOPICS_KEY, JSON.stringify(Array.from(current)));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(PREREQUISITES_EVENT, { detail: { topicId } }));
      }
    }
  } catch (e) {
    console.error('Error saving viewed handbook topic:', e);
  }
}

/**
 * Get Wortschatz quiz progress from localStorage
 */
export function getWortschatzProgress(): Record<number, { passed: boolean; scorePercent: number; attemptsCount?: number }> {
  try {
    const raw = localStorage.getItem(WORTSCHATZ_PROGRESS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
}

/**
 * Save Wortschatz quiz progress and notify listeners
 */
export function notifyWortschatzUpdated(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(PREREQUISITES_EVENT));
  }
}

/**
 * Finds the corresponding Handbook section for a lesson
 */
export function getHandbookTopicForLesson(lesson: Lesson): HandbookSection | undefined {
  return (
    HANDBOOK_DATA.find(
      (h) => h.relatedLessonId === lesson.id || h.topicNumber === lesson.number
    ) || HANDBOOK_DATA[0]
  );
}

/**
 * Finds the corresponding Wortschatz section for odd lesson numbers in ascending order:
 * Lesson 1 -> Section 1
 * Lesson 3 -> Section 2
 * Lesson 5 -> Section 3
 * ...
 * Lesson 21 -> Section 11
 * Even lessons return undefined (no dictionary topic)
 */
export function getWortschatzSectionForLesson(lesson: Lesson): WortschatzSection | undefined {
  if (lesson.number % 2 === 0) {
    return undefined;
  }
  const sectionId = Math.floor((lesson.number - 1) / 2) + 1;
  return WORTSCHATZ_DATA.sections.find((s) => s.section_id === sectionId);
}

/**
 * Calculates whether a module is unlocked based on:
 * 1. Previous module completion (or lesson 1 / admin)
 * 2. Handbook topic opened & viewed
 * 3. Wortschatz quiz passed (if section exists for this odd module)
 */
export function checkModuleAccess(
  lesson: Lesson,
  progress: Record<string, LessonProgress>,
  isAdmin: boolean,
  viewedHandbookTopics: Set<string> = getViewedHandbookTopics(),
  wortschatzProg: Record<number, { passed: boolean; scorePercent: number }> = getWortschatzProgress()
): ModuleAccessStatus {
  const prevLesson = LESSONS_DATA.find((l) => l.number === lesson.number - 1);
  const prevLessonPassed = lesson.number === 1 || (prevLesson ? !!progress[prevLesson.id]?.passed : true);

  const handbookTopic = getHandbookTopicForLesson(lesson);
  const isHandbookViewed = handbookTopic ? viewedHandbookTopics.has(handbookTopic.id) : true;

  const wortschatzSection = getWortschatzSectionForLesson(lesson);
  const wortschatzRecord = wortschatzSection ? wortschatzProg[wortschatzSection.section_id] : undefined;
  const isWortschatzPassed = wortschatzSection ? !!wortschatzRecord?.passed : true;
  const wortschatzScore = wortschatzRecord?.scorePercent;

  let isUnlocked = false;
  let lockReason: string | undefined;

  if (isAdmin) {
    isUnlocked = true;
  } else if (!prevLessonPassed) {
    isUnlocked = false;
    lockReason = `Завершите Модуль #${lesson.number - 1}`;
  } else if (!isHandbookViewed) {
    isUnlocked = false;
    lockReason = 'Откройте тему в Справочнике';
  } else if (!isWortschatzPassed) {
    isUnlocked = false;
    lockReason = `Сдайте тест словаря (№${wortschatzSection?.section_id})`;
  } else {
    isUnlocked = true;
  }

  return {
    isUnlocked,
    prevLessonPassed,
    handbookTopic,
    isHandbookViewed,
    wortschatzSection,
    isWortschatzPassed,
    wortschatzScore,
    lockReason,
  };
}

/**
 * React hook to reactively track handbook views and vocabulary progress
 */
export function useModulePrerequisites() {
  const [viewedHandbookTopics, setViewedHandbookTopics] = useState<Set<string>>(getViewedHandbookTopics);
  const [wortschatzProgressState, setWortschatzProgressState] = useState(getWortschatzProgress);

  const refresh = useCallback(() => {
    setViewedHandbookTopics(getViewedHandbookTopics());
    setWortschatzProgressState(getWortschatzProgress());
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      refresh();
    };

    window.addEventListener(PREREQUISITES_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(PREREQUISITES_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [refresh]);

  const recordHandbookView = useCallback((topicId: string) => {
    markHandbookTopicViewed(topicId);
    refresh();
  }, [refresh]);

  return {
    viewedHandbookTopics,
    wortschatzProgress: wortschatzProgressState,
    recordHandbookView,
    refresh,
  };
}
