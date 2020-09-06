import { FileConfig } from './file-config';

export interface TestInfo {
  title: string;
  file: FileConfig;
  pass?: boolean;
  result?: string;
  filename?: string;
}
