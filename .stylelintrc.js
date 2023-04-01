module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  customSyntax: 'postcss-styled-syntax',
  ignoreFiles: ['node_modules/**/*', 'build/**/*', 'dist/**/*'],
};
