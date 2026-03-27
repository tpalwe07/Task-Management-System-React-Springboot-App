import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import hooksPlugin from 'eslint-plugin-react-hooks';
import pluginReact from 'eslint-plugin-react';
import stylisticJs from '@stylistic/eslint-plugin-js';
import tseslint from 'typescript-eslint';
import functionPlugin from 'eslint-plugin-react-func';

const eslintRules = {
  'array-callback-return': ['error', { checkForEach: true }],
  'no-await-in-loop': 'error',
  'no-constant-condition': 'error',
  'no-constructor-return': 'error',
  'no-duplicate-imports': 'error',
  'no-promise-executor-return': 'error',
  'no-template-curly-in-string': 'error',
  'block-scoped-var': 'error',
  camelcase: 'error',
  // Complexity threshold set to 3, so that if we have more than 3 path, it is better to use switch statement.
  complexity: ['error', 3],
  'default-case': 'error',
  'default-case-last': 'error',
  'default-param-last': 'error',
  'dot-notation': 'error',
  eqeqeq: 'error',
  'func-style': ['error', 'expression'],
  'guard-for-in': 'error',
  'max-depth': 'error',
  'no-nested-ternary': 'error',
  'no-return-assign': 'error',
  'prefer-const': 'error',
  'prefer-destructuring': 'error',
  'prefer-template': 'error',
  'require-await': 'error',
  'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
  'sort-imports': [
    'error',
    {
      memberSyntaxSortOrder: ['single', 'multiple', 'all', 'none'],
      ignoreCase: false,
      ignoreDeclarationSort: true
    }
  ],
  '@typescript-eslint/no-non-null-assertion': 'warn'
};
const reactRules = {
  'react/react-in-jsx-scope': [0],
  'react/jsx-indent': [2, 2],
  'react/jsx-fragments': 'error',
  'react/jsx-no-undef': 'error',
  'react/display-name': [2, { ignoreTranspilerName: true }],
  'react/self-closing-comp': 'error',
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
  'react-func/max-lines-per-function': [
    'error',
    {
      max: 30,
      skipBlankLines: true,
      skipComments: true
    }
  ]
};

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Link for eslint rules: https://eslint.org/docs/latest/rules/
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  eslintConfigPrettier,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
        ...globals.jest,
        myCustomGlobal: 'readonly'
      }
    },
    ignores: ['.vite/*', 'dist/*'],
    plugins: {
      react: pluginReact,
      '@stylistic/js': stylisticJs,
      'react-hooks': hooksPlugin,
      'react-func': functionPlugin
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
      ...eslintRules,
      ...reactRules,
      '@stylistic/js/semi': 'error',
      '@stylistic/js/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }]
    }
  }
];
