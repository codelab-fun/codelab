import { FileConfig } from './file-config';
import { TestInfo } from './test-info';

export interface ExerciseConfig {
  name: string;
  description: string;
  runner?: string;
  files: Array<FileConfig>;
  skipTests?: boolean;
  tests?: Array<TestInfo>;
}
