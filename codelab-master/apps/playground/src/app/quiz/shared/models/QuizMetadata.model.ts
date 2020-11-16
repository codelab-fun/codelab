import { Observable } from 'rxjs';

export interface QuizMetadata {
  totalQuestions: number;
  totalQuestionsAttempted: number;
  percentage: number;
  correctAnswersCount$: Observable<number>;
  completionTime: number;
}

