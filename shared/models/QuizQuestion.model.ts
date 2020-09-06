<<<<<<< HEAD
import { Option } from '@shared/models/Option.model';
=======
import { Option } from '@codelab-quiz/shared/models/Option.model';
>>>>>>> quiz-holder

export interface QuizQuestion {
  questionText: string;
  options: Option[];
  explanation: string;
}
type Questions = QuizQuestion[];
