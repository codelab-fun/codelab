function findDebugger(code) {
  return code
    .replace(/\/\/.*|'.*?[^\\]'|".*?"|`[\s\S]*`|\/\*[\s\S]*\*\//)
    .match(/\bdebugger\b/);
}
