export interface TestResult {
  pass: boolean;
  name: string;
  error?: string;
  featured?: boolean;
}

export interface TestRunResult {
  tests: TestResult[];
  error?: Error;
}
