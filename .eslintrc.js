module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
    },
    'extends': 'google',
    'overrides': [
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
    'rules': {
        'indent': ['error', 4],
        'require-jsdoc': 'off',
        'linebreak-style': 'off',
        'max-len': ['error', {'code': 250}],
    },
};
