import { QuizQuestion } from './QuizQuestion';

export interface Quiz {
  milestone: string;
  summary: string;
  imageUrl: string;
  questions: QuizQuestion[];
}
