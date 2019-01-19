function findConsoleLog(code) {
  return code
    .replace(/\/\/.*|'.*?[^\\]'|".*?"|`[\s\S]*`|\/\*[\s\S]*\*\//)
    .match(/\bconsole\s*.log\(/);
}
