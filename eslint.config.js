import antfu from '@antfu/eslint-config'

export default antfu(
  {
    gitignore: {
      files: ['.gitignore', '.eslintignore'],
    },
    unocss: true,
    formatters: true,
  },
)
