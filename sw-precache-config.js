module.exports = {
  navigateFallback: '/index.html',
  maximumFileSizeToCacheInBytes: 20000000,
  stripPrefix: 'dist',
  root: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/**/*.js',
    'dist/**/*.css',
    'dist/**/*.svg',
    'dist/**/*.jpg',
    'dist/**/*.png'
  ]
};
// created with help from: https://coryrylan.com/blog/fast-offline-angular-apps-with-service-workers
