import { Observable } from 'rxjs';

export interface QuizMetadata {
  totalQuestions: number;
  totalQuestionsAttempted: number;
  correctAnswersCount$: Observable<number>;
  percentage: number;
  completionTime: number;
}
