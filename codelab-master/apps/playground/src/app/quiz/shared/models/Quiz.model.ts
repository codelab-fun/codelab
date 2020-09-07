import { QuizQuestion } from '@codelab-quiz/shared/models/QuizQuestion.model';

export interface Quiz {
  quizId: string;
  milestone: string;
  summary: string;
  image: string;
  questions: QuizQuestion[];
  status: 'started' | 'continue' | 'completed' | '';
}
