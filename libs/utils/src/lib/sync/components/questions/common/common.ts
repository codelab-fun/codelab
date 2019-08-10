export enum QuestionStatus {
  NEW = 'new',
  APPROVED = 'approved',
  ARCHIVED = 'archived',
  DELETED = 'deleted',
}

export const statuses = Object.values(QuestionStatus);

export interface Question {
  question: string;
  key: string;
  score: number;
  time: number;
  status: QuestionStatus;
  myVote: 1 | 0 | -1;
  author: string;
}
