import { Resource } from './Resource.model';

export interface QuizResource {
  quizId: string;
  milestone: string;
  resources: Resource[];
}
