module.exports = {
    'env': {
        'browser': true,
        'es6': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'standard'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        '@typescript-eslint'
    ],
    'rules': {
        'semi': ['error', 'never'],
        'jsx-quotes': 0,
        'indent': 0,
        'space-before-function-paren': 0,
        'no-trailing-spaces': ['error', {'skipBlankLines': true}],
        'object-curly-spacing': ['error', 'never'],
        'quote-props': 0,
        'quotes': ['error', 'single'],
        'camelcase': 0, // ['error', {'properties': 'never'}],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        "react/display-name": 0
        // "@typescript-eslint/no-unused-vars-experimental": "error"
    }
}
