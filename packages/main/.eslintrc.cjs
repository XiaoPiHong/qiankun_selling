module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:vue/vue3-strongly-recommended', 'airbnb-base', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      tsx: true,
      jsx: true,
    },
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  plugins: ['vue', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
      },
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'vue/multi-word-component-names': 0,
    'vue/attribute-hyphenation': 0,
    'vue/v-on-event-hyphenation': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'no-unused-vars': 0,
    'default-case': 0,
    'consistent-return': 0,
    'no-use-before-define': 0,
    'no-plusplus': 0,
    'no-shadow': 0,
    'import/prefer-default-export': 0,
    'class-methods-use-this': 0,
    'max-classes-per-file': 0,
    'no-underscore-dangle': 0,
    'no-multi-assign': 0,
    'no-unused-expressions': 0,
  },
}
