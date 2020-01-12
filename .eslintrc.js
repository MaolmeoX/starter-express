module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'testing' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'testing' ? 2 : 0,
    'linebreak-style': 0,
    'prettier/prettier': 'error',
  },
};
