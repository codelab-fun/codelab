import { Observable } from 'rxjs';

export interface Score {
  quizId: string;
  score: number;
  datetime: Date;
}
