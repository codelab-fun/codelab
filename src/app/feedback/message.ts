export interface Message {
  comment: string;
  name: string;
  email: string;
  timestamp?: string;
  href?: string;
  header?: string;
  isDone?: boolean;
}
