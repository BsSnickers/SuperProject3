import { Lesson } from '../types';
import { LESSONS_A1_1 } from './lessonsA1_1';
import { LESSONS_A1_2 } from './lessonsA1_2';

export { LESSONS_A1_1 } from './lessonsA1_1';
export { LESSONS_A1_2 } from './lessonsA1_2';

export const LESSONS_DATA: Lesson[] = [
  ...LESSONS_A1_1,
  ...LESSONS_A1_2,
];
