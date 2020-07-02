import { QuizQuestion } from '@shared/models/QuizQuestion.model';

export interface Quiz {
  name: string;
  milestone: string;
  summary: string;
  imageUrl: string;
  questions: QuizQuestion[];
}
