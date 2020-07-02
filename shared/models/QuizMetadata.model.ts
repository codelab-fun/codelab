import { Observable } from 'rxjs';

export interface QuizMetadata {
  totalQuestions: number;
  correctAnswersCount$: Observable<number>;
  percentage: number;
  completionTime: number;
}
