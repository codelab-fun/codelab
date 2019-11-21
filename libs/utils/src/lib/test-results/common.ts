export interface TestResult {
  pass: boolean;
  name: string;
  error?: string;
}

export interface TestRunResult {
  tests: TestResult[];
  error?: Error;
}
