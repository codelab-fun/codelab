import { Observable } from 'rxjs';

export interface QuizMetadata {
  totalQuestions: number;
<<<<<<< HEAD
=======
  totalQuestionsAttempted: number;
>>>>>>> quiz-holder
  correctAnswersCount$: Observable<number>;
  percentage: number;
  completionTime: number;
}
