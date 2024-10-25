import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '.github/pull_request_template.md',
    '.mergify.yml',
    '.pnpm-store/',
    '.vscode/settings.json',
    '*.md',
    'cdk.json',
    'package.json',
    'tsconfig.json',
  ],
  plugins: {
  },
  languageOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-new': 'off',
  },
  settings: {
  },
})
