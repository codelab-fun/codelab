import { Option } from './Option';

export interface QuizQuestion {
  questionId: number;
  questionText: string;
  options: Option[];
  answer: string;
  explanation: string;
  selectedOption: string;
}
