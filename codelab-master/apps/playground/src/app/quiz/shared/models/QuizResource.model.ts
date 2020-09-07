import { Resource } from '@codelab-quiz/shared/models/Resource.model';

export interface QuizResource {
  quizId: string;
  milestone: string;
  resources: Resource[];
}
