import eslintPlugin from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser'; // Importa el parser directamente

export default [
  {
    files: ['**/*.ts', '**/*.tsx'], // Procesar archivos TypeScript
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        process: 'readonly', // Marca `process` como global de solo lectura
        console: 'readonly', // Marca `console` como global de solo lectura
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...eslintPlugin.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
      'prettier/prettier': 'error', // Integra Prettier con ESLint
      'no-console': 'off', // Permitir console.log
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off'
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      'no-unused-vars': 'warn',
    },
  },
];
