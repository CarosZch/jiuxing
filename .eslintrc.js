module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['error', 4],
        'import/extensions': ['never'],
        'max-len': ['error', { code: 150 }],
        treatUndefinedAsUnspecified: true,
        camelcase: 'off',
        "no-restricted-syntax": 0,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
};
