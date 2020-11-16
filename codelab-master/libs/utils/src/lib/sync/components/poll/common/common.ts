export interface SyncPollConfig {
  type: string;
  key: string;
  options?: string[];
  question: string;
  time?: number;
  answer?: string;
}

export const LETTERS = String.fromCharCode(
  ...Array.from(new Array(25), (a, i) => i + 65)
).split('');
