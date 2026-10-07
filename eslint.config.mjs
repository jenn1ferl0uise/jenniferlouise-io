import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Next.js rules (core-web-vitals includes recommended). eslint-config-next's own flat
  // config is not used: its parser is not yet compatible with ESLint 10.
  nextPlugin.configs['core-web-vitals'],

  // React Hooks recommended rules (rules-of-hooks, exhaustive-deps, React Compiler rules)
  reactHooks.configs.flat.recommended,

  {
    plugins: { react },
    settings: { react: { version: '19.2' } },
    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],

      // React
      'react/self-closing-comp': 'warn',
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],

      // General
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'warn',
      'no-var': 'error',
    },
  },

  // Keep last so it turns off formatting rules that conflict with Prettier
  prettier,

  {
    ignores: ['.next/**', 'out/**', 'build/**', 'node_modules/**'],
  },
];
