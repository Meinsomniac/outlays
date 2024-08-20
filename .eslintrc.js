module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    //  'airbnb',
    'prettier',
    'eslint-config-prettier',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/display-name': 'off',
    'import/no-unresolved': 'off',
    'import/no-undef': 0,
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-native/no-unused-styles': 'error',
    'react-native/no-inline-styles': 'error',
    'react-native/no-color-literals': 'off',
    'react-native/no-raw-text': 'error',
    'react-native/no-single-element-style-arrays': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    // 'no-param-reassign': [
    //   'error',
    //   {
    //     props: true,
    //     ignorePropertyModificationsFor: ['state', 'request'],
    //   },
    // ],
    // 'no-use-before-define': [
    //   'off',
    //   {functions: true, classes: true, variables: false},
    // ],
    // 'prettier/prettier': ['error', {singleQuote: true, parser: 'flow'}],
    // 'react/function-component-definition': [
    //   'error',
    //   {
    //     namedComponents: 'arrow-function',
    //     unnamedComponents: 'arrow-function',
    //   },
    // ],
    'react/no-array-index-key': 0,
    // 'no-console': ['warn', {allow: ['info', 'error', 'warn']}],
    // 'no-unsafe-optional-chaining': 'error',
    // 'import/no-cycle': 'error',
    // 'no-plusplus': 'error',
    // 'no-useless-escape': 'error',
    // // to be updated
    // 'react-native/split-platform-components': 'off',
    // 'react/prop-types': 'off',
    // 'no-nested-ternary': 'off',
    // 'react-hooks/exhaustive-deps': 'off',
  },
  plugins: ['prettier', 'react-hooks', 'react', 'react-native'],
};
