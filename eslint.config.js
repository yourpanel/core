const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  gitignore: {
    files: ['.gitignore', '.eslintignore'],
  },
  unocss: true,
  formatters: true,
  rules: {
    'no-console': 'off',
  },
})
