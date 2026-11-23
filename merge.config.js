module.exports = {
  reporter: [
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never',
    }],
    ['junit', {
      outputFile: 'reports/junit-merged.xml',
    }],
  ],
};