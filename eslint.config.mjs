import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylisticEslint from '@stylistic/eslint-plugin';
import reactEslint from 'eslint-plugin-react';
import reactHooksEslint from 'eslint-plugin-react-hooks';
import importEslint from 'eslint-plugin-import';
import jsxa11yEslint from 'eslint-plugin-jsx-a11y';


export default tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  extends: [
		eslint.configs.recommended,
		tseslint.configs.recommended,
    jsxa11yEslint.flatConfigs.recommended,
    importEslint.flatConfigs.recommended,
    stylisticEslint.configs.recommended,
    reactEslint.configs.flat['jsx-runtime'],
		reactHooksEslint.configs['recommended-latest'],
  ],
  settings: {
    project: true,
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  rules: {
    '@stylistic/brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    '@stylistic/max-statements-per-line': ['error', { max: 2 }],
    '@typescript-eslint/no-namespace': 'off',
    'no-restricted-imports': ['error', { 'patterns': ['@mui/*/*/*'] }],
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    // '@typescript-eslint/quotes': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'arrow-body-style': 'off',
    '@stylistic/arrow-parens': 'off',
    'no-implicit-coercion': ['error', {
      boolean: true,
      number: true,
      string: true,
      allow: [],
    }],
    '@typescript-eslint/no-empty-object-type': 'error',
    '@stylistic/object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'class-methods-use-this': 'off',
    '@stylistic/comma-dangle': ['error', 'always-multiline'],
    curly: ['error', 'all'],
    'import/extensions': 'error',
    'import/first': 'error',
    'import/newline-after-import': ['error', { 'count': 2 }],
    'import/no-extraneous-dependencies': 'error',
    'import/no-named-as-default': 'error',
    'import/no-unresolved': 'off',
    'import/no-webpack-loader-syntax': 'error',
    'import/order': ['error', {
      'groups': [['builtin', 'external'], ['internal'], ['index', 'sibling', 'parent']],
      'newlines-between': 'always',
    }],
    'import/prefer-default-export': 'off',
    '@stylistic/indent': ['error', 2, { 'SwitchCase': 1 }],
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/label-has-associated-control': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
    'jsx-a11y/label-has-for': ['error', { required: { some: ['nesting', 'id'] }}],
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'max-len': ['error', { 'code': 120, 'ignoreStrings': true, 'ignoreComments': true }],
    'max-classes-per-file': 'error',
    'newline-per-chained-call': 'error',
    'no-console': 'warn',
    'no-lonely-if': 'error',
    '@stylistic/no-multiple-empty-lines': ['error', { 'max': 2, 'maxBOF': 0 }],
    'no-plusplus': 'error',
    '@stylistic/semi': ['error', 'always'],
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            target: ['./src/widgets', './src/features', './src/entities', './src/shared'],
            from: './src/pages',
            message: 'Interaction with layers above from the layer below is forbidden',
          },
          {
            target: ['./src/features', './src.entities', './src/shared'],
            from: './src/widgets',
            message: 'Interaction with layers above from the layer below is forbidden',
          },
          {
            target: ['./src/entities', './src/shared'],
            from: './src/features',
            message: 'Interaction with layers above from the layer below is forbidden',
          },
          {
            target: ['./src/shared'],
            from: ['./src/app', './src/entities'],
            message: 'Interaction with layers above from the layer below is forbidden',
          },
        ],
      },
    ],
    'no-restricted-syntax': 'error',
    'no-use-before-define': 'error',
    'no-useless-escape': 'error',
    'no-negated-condition': 'error',
    'object-curly-newline': ['error', { 'multiline': true, 'minProperties': 5, 'consistent': true }],
    'object-property-newline': ['error', { 'allowAllPropertiesOnSameLine': true }],
    'prefer-const': 'error',
    'prefer-template': 'error',
    'react/forbid-prop-types': 'error',
    'react/jsx-fragments': 'error',
    'react/jsx-key': 'error',
    'react/jsx-filename-extension': ['error', { 'extensions': ['.tsx'] }],
    'react/jsx-indent': ['error', 2],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-props-no-spreading': ['off', {
      html: 'enforce',
      custom: 'enforce',
      exceptions: [],
    }],
    'react/state-in-constructor': ['error', 'always'],
    'react/prop-types': 'off',
    'react/static-property-placement': ['error', 'static public field'],
    'react/no-array-index-key': 'off',
    'react/prefer-stateless-function': 'error',
    'react/require-default-props': 'off',
    // 'react/require-extension': 'error',
    'react/self-closing-comp': 'error',
    '@stylistic/padded-blocks': 'off',
    // 'valid-jsdoc': 'error',
    yoda: ['error', 'always', { 'onlyEquality': true }],
    // 'import/no-cycle': ['error', { 'maxDepth': 1 }],
    'no-underscore-dangle': 'error',
    '@stylistic/type-annotation-spacing': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-unused-expressions': 'off',
    // 'unused-imports/no-unused-imports': 'error',
    '@stylistic/lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true }],
    '@stylistic/member-delimiter-style': ['error', {
      'multiline': { 'delimiter': 'comma', 'requireLast': true },
      'singleline': { 'delimiter': 'comma', 'requireLast': false },
    }],
    '@typescript-eslint/naming-convention': ['error',
      {
        'selector': ['default', 'property', 'parameter'],
        'format': ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],
      },
      { 'selector': 'typeLike', 'format': ['PascalCase'] },
      { 'selector': 'enum', 'format': ['PascalCase'] },
      { 'selector': 'enumMember', 'format': ['UPPER_CASE'] },
      { 'selector': 'property', 'filter': { 'regex': '^__overlayScrollbars__$', 'match': true }, 'format': null },
      { 'selector': 'parameter', 'filter': { 'regex': '^_$', 'match': true }, 'format': null },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
  },
});