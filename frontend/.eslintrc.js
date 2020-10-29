module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react-hooks', '@typescript-eslint', 'import'],
  rules: {
    'prettier/prettier': ['error'],
    'space-in-parens': [0, 'always'],
    'object-curly-spacing': [2, 'always'],
    'computed-property-spacing': [2, 'always'],
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'import/order': 0,
    'import/extensions': 0,
    'no-multiple-empty-lines': [2, { max: 1, maxEOF: 0, maxBOF: 0 }],
    quotes: [1, 'single', 'avoid-escape'],
    semi: [0, 'never'],
    'prefer-const': 1,
    'class-methods-use-this': [1],
    'no-undef': [1],
    'spaced-comment': 'off',
    'func-names': [0],
    'no-case-declarations': [1],
    'no-return-assign': [1],
    'no-param-reassign': [1],
    'no-shadow': [0],
    camelcase: [0],
    'no-underscore-dangle': [0, 'always'],
    'no-param-reassign': ['warn', { props: false }],

    /**
     * typescript rules
     */
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/camelcase': [0],
    '@typescript-eslint/no-var-requires': [0],

    /**
     * react rules
     */
    'react/jsx-wrap-multilines': [2, { declaration: false, assignment: false }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/prefer-es6-class': 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': [1],
    'react/no-array-index-key': [1],
    'react/static-property-placement': 'off',
    'react/sort-comp': 0,
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['warn'],
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src', 'src/*'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
};
