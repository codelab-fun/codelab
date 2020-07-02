import { Option } from '@shared/models/Option.model';

export interface QuizQuestion {
  questionText: string;
  options: Option[];
  explanation: string;
}
type Questions = QuizQuestion[];
