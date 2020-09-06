import { Option } from './Option';

export interface QuizQuestion {
  index: number;
  questionText: string;
  options: Option[];
  answer: number;
  explanation: string;
}
