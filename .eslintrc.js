module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  plugins: [
    'react',
  ],
  rules: {
    "no-underscore-dangle":0,
    "arrow-body-style":0,
    "no-shadow":0,
    "consistent-return":0,
    "no-nested-ternary":0,
    "no-console":1,
    "no-case-declarations":0,
    "import/prefer-default-export":0
  },
};
