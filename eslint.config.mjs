import eslintPlugin from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser'; // Importa el parser directamente

export default [
  {
    files: ['**/*.ts', '**/*.tsx'], // Procesar archivos TypeScript
    languageOptions: {
      parser: tsParser, // Usa el parser directamente
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json', // Usar el archivo tsconfig.json
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
      'semi': ['error', 'always'], // Punto y coma obligatorio
      'quotes': ['error', 'single'], // Comillas simples obligatorias
    },
  },
  {
    files: ['**/*.js'], // Configuración para archivos JavaScript
    rules: {
      'no-unused-vars': 'warn',
    },
  },
];
