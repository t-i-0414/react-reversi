module.exports = {
  root: true,
  extends: ['../../.eslintrc.js', 'plugin:cypress/recommended', 'prettier'],
  plugins: ['cypress'],
  rules: {
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-force': 'warn',
    'cypress/no-async-tests': 'error',
    'cypress/no-pause': 'error',
    'no-unused-expressions': 'off',
  },
};
