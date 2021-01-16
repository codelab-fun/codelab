function assertPositive(number, error) {
  if (number < 0) {
    throw new Error(error);
  }
  return number;
}

export function differ(file, commits) {
  return ['initial']
    .concat(commits)
    .concat('neverShow')
    .reduce((result, commit) => {
      result.push(commit + 'Pre');
      result.push(commit);
      result.push(commit + 'Solved');
      return result;
    }, [])
    .reduce((result, commit, index, arr) => {
      // tslint:disable-next-line:max-line-length TODO: Can this regex be shortened and this comment removed?
      result[commit] = file.replace(
        /\/\*[\r\n\s]*d:([a-z]+)(:[a-z]+)?(?:\/(trimBoth|trimLeading|trimTrailing))?[\r\n\s]*\*\/([\n\s]*)((?:.|\n|\r)*?)([\r\n\s]*)\/\*\/d\*\//gi,
        function(
          match,
          from,
          to,
          trim: 'trimBoth' | 'trimLeading' | 'trimTrailing',
          spaceLeading,
          value,
          spaceTrailing
        ) {
          if (trim === 'trimBoth' || trim === 'trimLeading') {
            spaceLeading = '';
          }
          if (trim === 'trimBoth' || trim === 'trimTrailing') {
            spaceTrailing = '';
          }
          const fromIndex = assertPositive(
            arr.indexOf(from),
            `[Differ] Invalid commit: ${from}`
          );
          const toIndex = to
            ? assertPositive(
                arr.indexOf(to.substr(1)),
                `[Differ] Invalid commit: ${to.substr(1)}`
              )
            : arr.length;
          return index >= fromIndex && index <= toIndex
            ? spaceLeading + value + spaceTrailing
            : '';
        }
      );
      return result;
    }, {});
}
