export enum QuestionStatus {
  APPROVED = 'approved',
  NEW = 'new',
  ARCHIVED = 'archived'
}

export const statuses = Object.values(QuestionStatus);

export interface QuestionDb {
  question: string;
  score: number;
  time: number;
  status: QuestionStatus;
}

export interface Question extends QuestionDb {
  key: string;
  starred: boolean;
  public: boolean;
  myVote: 1 | 0 | -1;
  author: string;
  displayName: string;
}

export interface QuestionConfig {
  starredQuestionKey: string;
  requireApproval: boolean;
}
