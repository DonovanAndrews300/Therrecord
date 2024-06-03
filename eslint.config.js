async function createConfig() {
  const react = await import('eslint-plugin-react');
  const reactHooks = await import('eslint-plugin-react-hooks');
  const jsxA11y = await import('eslint-plugin-jsx-a11y');
  const importPlugin = await import('eslint-plugin-import');
  const typescript = await import('@typescript-eslint/eslint-plugin');
  const typescriptParser = await import('@typescript-eslint/parser');
  const reactNative = await import('eslint-plugin-react-native');

  return [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      languageOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      plugins: {
        react: react.default,
        reactHooks: reactHooks.default,
        jsxA11y: jsxA11y.default,
        import: importPlugin.default,
        '@typescript-eslint': typescript.default,
        'react-native': reactNative.default,
      },
      settings: {
        react: {
          version: 'detect',
        },
        'import/resolver': {
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
      },
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'no-unused-vars': 'off', // Disable no-unused-vars for @typescript-eslint/no-unused-vars
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
          },
        ],
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            'newlines-between': 'always',
          },
        ],
        semi: ['error', 'always'], // Enforce semicolons
        indent: ['error', 2], // Enforce 2 spaces for indentation
        'react-native/no-unused-styles': 'error',
        'react-native/split-platform-components': 'warn',
        'react-native/no-inline-styles': 'error',
        'react-native/no-color-literals': 'error',
        'react-native/no-raw-text': 'error',
      },
    },
  ];
}

module.exports = createConfig().then((config) => config);
