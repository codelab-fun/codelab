// Thank you http://angularfirst.com/typescript-string-enums/
const Mode = {
  none: 'none' as 'none',
  overview: 'overview' as 'overview'
};
type Mode = (typeof Mode)[keyof typeof Mode];
export { Mode };
