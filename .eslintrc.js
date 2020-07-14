module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/essential'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    plugins: [
        "vue"
    ],
    rules: {
        "linebreak-style": [
            0,
            "error",
            "windows"
        ],
        quotes: [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    globals: {
      process: true
    }
};
