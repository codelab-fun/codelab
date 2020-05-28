export type Highlight = RegExp | string | Array<string | RegExp>;

export interface CodeDemo {
  code: Record<string, string>;
  files?: string[];
  highlights?: Record<string, Highlight>;
}

export type CodeDemos = Record<string, CodeDemo>;

export interface MilestoneWithDemos {
  code: CodeDemos;
}
