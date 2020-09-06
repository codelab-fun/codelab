import { Option } from '@codelab-quiz/shared/models/Option.model';

export interface QuizQuestion {
  questionText: string;
  options: Option[];
  explanation: string;
}
type Questions = QuizQuestion[];
