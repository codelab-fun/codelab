<<<<<<< HEAD
import { QuizQuestion } from '@shared/models/QuizQuestion.model';

export interface Quiz {
  name: string;
  milestone: string;
  summary: string;
  imageUrl: string;
  questions: QuizQuestion[];
=======
import { QuizQuestion } from '@codelab-quiz/shared/models/QuizQuestion.model';

export interface Quiz {
  quizId: string;
  milestone: string;
  summary: string;
  image: string;
  questions: QuizQuestion[];
  status: 'started' | 'continue' | 'completed' | '';
>>>>>>> quiz-holder
}
