function assertPositive(number, error) {
  if (number < 0) {
    throw new Error(error);
  }
  return number;
}

export function differ(file, commits) {
  return ['initial'].concat(commits).concat('neverShow').reduce((commits, commit) => {
    commits.push(commit);
    commits.push(commit + 'Solved');
    return commits;
  }, []).reduce((result, commit, index, commits) => {
    result[commit] = file.replace(/\/\*[\n\s]*d:([a-z]+)(:[a-z]+)?(?:\/(trimBoth|trimLeading|trimTrailing))?[\n\s]*\*\/([\n\s]*)((?:.|\n)*?)([\n\s]*)\/\*\/d\*\//gi,
      function (match, from, to, trim: 'trimBoth'|'trimLeading'|'trimTrailing', spaceLeading, value, spaceTrailing) {
        if (trim === 'trimBoth' || trim === 'trimLeading') {
          spaceLeading = '';
        }
        if (trim === 'trimBoth' || trim === 'trimTrailing') {
          spaceTrailing = '';
        }
        const fromIndex = assertPositive(commits.indexOf(from), `[Differ] Invalid commit: ${from}`);
        const toIndex = to ? assertPositive(commits.indexOf(to.substr(1)), `[Differ] Invalid commit: ${to.substr(1)}`) : commits.length;
        return (index >= fromIndex && index <= toIndex) ? (spaceLeading + value + spaceTrailing) : '';
      });
    return result;
  }, {});
}
