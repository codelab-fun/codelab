import { Option } from './Option';

export interface QuizQuestion {
  questionText: string;
  options: Option[];
  explanation: string;
}
type Questions = QuizQuestion[];
