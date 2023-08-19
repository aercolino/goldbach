module.exports = {
    root: true,
    // https://stackoverflow.com/a/65063702/250838
    ignorePatterns: ['*.html', '.eslintrc.cjs', 'vite.config.js', 'vite-env.d.ts'],
    plugins: [
        '@typescript-eslint',
        'solid'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:solid/typescript'
    ],
    rules: {
    },
}
