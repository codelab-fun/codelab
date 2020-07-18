import { QuizQuestion } from '@codelab-quiz/shared/models/QuizQuestion.model';

export interface Quiz {
  quizId: string;
  milestone: string;
  summary: string;
  imageUrl: string;
  questions: QuizQuestion[];
}
