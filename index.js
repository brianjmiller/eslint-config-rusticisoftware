const os = require("os"),
    js = require("@eslint/js"),
    stylistic = require("@stylistic/eslint-plugin"),
    nodePlugin = require("eslint-plugin-n"),
    jsdoc = require("eslint-plugin-jsdoc"),
    tseslint = require("typescript-eslint");

module.exports = [
    js.configs.recommended,
    {
        plugins: {
            "@stylistic": stylistic,
            n: nodePlugin,
            jsdoc
        },
        languageOptions: {
            globals: {
                __dirname: "readonly",
                __filename: "readonly",
                exports: "readonly",
                module: "readonly",
                require: "readonly",
                process: "readonly",
                setTimeout: "readonly",
                setInterval: "readonly",
                setImmediate: "readonly",
                clearTimeout: "readonly",
                clearInterval: "readonly",
                clearImmediate: "readonly"
            }
        },
        rules: {
            // ── ESLint core rules ────────────────────────────────────────────

            "accessor-pairs": "error",
            "array-callback-return": "error",
            "arrow-body-style": ["error", "as-needed"],
            "block-scoped-var": "error",
            camelcase: "error",
            "capitalized-comments": "off",
            "class-methods-use-this": "error",
            complexity: "error",
            "consistent-return": "off",
            "consistent-this": ["error", "self"],
            curly: "error",
            "default-case": "error",
            "dot-notation": "error",
            eqeqeq: "error",
            "func-name-matching": "error",
            "func-names": ["error", "never"],
            "func-style": "error",
            "guard-for-in": "error",
            "id-denylist": "error",
            "id-length": "off",
            "id-match": "error",
            "init-declarations": "off",
            "line-comment-position": "error",
            "max-depth": "error",
            "max-len": "off",
            "max-lines": "off",
            "max-nested-callbacks": "error",
            "max-params": ["warn", 5],
            "max-statements": "off",
            "new-cap": "error",
            "no-alert": "error",
            "no-array-constructor": "error",
            "no-await-in-loop": "error",
            "no-bitwise": "error",
            "no-caller": "error",
            "no-constant-condition": "error",
            "no-continue": "error",
            "no-div-regex": "error",
            "no-duplicate-imports": "error",
            "no-else-return": "error",
            "no-empty-function": "error",
            "no-eq-null": "error",
            "no-eval": "error",
            "no-extend-native": "error",
            "no-extra-bind": "error",
            "no-extra-label": "error",
            "no-implicit-globals": "error",
            "no-implied-eval": "error",
            "no-inline-comments": "error",
            "no-invalid-this": "error",
            "no-iterator": "error",
            "no-label-var": "error",
            "no-labels": "error",
            "no-lone-blocks": "error",
            "no-lonely-if": "error",
            "no-loop-func": "error",
            "no-magic-numbers": [
                "error",
                {
                    ignore: [
                        // These are numbers that it's reasonable we would want to ignore
                        -1, 0, 1,
                        // These are HTTP statuses. Ideally we would make these constants, but that's a
                        // job for a more thorough eslint unification task.
                        200,
                        204, 302, 400, 403, 404, 500
                    ],
                    ignoreArrayIndexes: true
                }
            ],
            "no-multi-assign": "off",
            "no-multi-str": "error",
            "no-global-assign": "error",
            "no-negated-condition": "off",
            "no-nested-ternary": "off",
            "no-new": "error",
            "no-new-func": "error",
            "no-new-object": "error",
            "no-new-wrappers": "error",
            "no-octal-escape": "error",
            "no-param-reassign": "error",
            "no-plusplus": "error",
            "no-proto": "error",
            "no-prototype-builtins": "off",
            "no-restricted-globals": "error",
            "no-restricted-imports": "error",
            "no-restricted-properties": "error",
            "no-restricted-syntax": "error",
            "no-return-assign": "error",
            "no-return-await": "error",
            "no-script-url": "error",
            "no-self-compare": "error",
            "no-sequences": "error",
            "no-shadow": "off",
            "no-shadow-restricted-names": "error",
            "no-template-curly-in-string": "error",
            "no-ternary": "off",
            "no-throw-literal": "error",
            "no-undef-init": "error",
            "no-unsafe-negation": "error",
            "no-undefined": "error",
            "no-underscore-dangle": "off",
            "no-unmodified-loop-condition": "error",
            "no-unneeded-ternary": "error",
            "no-unused-expressions": "error",
            "no-use-before-define": "error",
            "no-useless-call": "error",
            "no-useless-computed-key": "error",
            "no-useless-concat": "error",
            "no-useless-constructor": "error",
            "no-useless-escape": "error",
            "no-useless-rename": "error",
            "no-useless-return": "error",
            "no-var": "error",
            "no-void": "error",
            "no-warning-comments": "off",
            "no-with": "error",
            "object-shorthand": "off",
            "one-var": [
                "error",
                {
                    var: "always",
                    let: "consecutive",
                    const: "consecutive"
                }
            ],
            "operator-assignment": ["error", "always"],
            "prefer-arrow-callback": "off",
            "prefer-const": "error",
            "prefer-numeric-literals": "error",
            "prefer-promise-reject-errors": "error",
            "prefer-rest-params": "off",
            "prefer-spread": "off",
            "prefer-template": "off",
            radix: "error",
            "require-await": "error",
            "sort-imports": "error",
            "sort-keys": "off",
            "sort-vars": "off",
            strict: "error",
            "symbol-description": "error",
            "unicode-bom": ["error", "never"],
            "vars-on-top": "error",
            "wrap-regex": "off",
            yoda: ["error", "never"],

            // ── eslint-plugin-n rules (moved from ESLint core) ───────────────

            "n/callback-return": "off",
            "n/global-require": "error",
            "n/handle-callback-err": "error",
            "n/no-mixed-requires": "off",
            "n/no-new-require": "error",
            "n/no-path-concat": "error",
            "n/no-process-env": "error",
            "n/no-process-exit": "error",
            "n/no-restricted-require": "error",
            "n/no-sync": "error",

            // ── eslint-plugin-jsdoc rules (replacements for removed core rules) ─

            "jsdoc/require-jsdoc": "off",
            "jsdoc/check-tag-names": "off",
            "jsdoc/require-param-description": "off",
            "jsdoc/require-returns-description": "off",

            // ── @stylistic rules (moved from ESLint core in v8.53.0) ─────────

            "@stylistic/array-bracket-spacing": "error",
            "@stylistic/arrow-parens": "error",
            "@stylistic/arrow-spacing": "error",
            "@stylistic/block-spacing": "error",
            "@stylistic/brace-style": ["error", "stroustrup"],
            "@stylistic/comma-dangle": "error",
            "@stylistic/comma-spacing": [
                "error",
                {
                    after: true,
                    before: false
                }
            ],
            "@stylistic/comma-style": ["error", "last"],
            "@stylistic/computed-property-spacing": ["error", "never"],
            "@stylistic/dot-location": ["error", "property"],
            "@stylistic/eol-last": "error",
            "@stylistic/function-call-spacing": "error",
            "@stylistic/generator-star-spacing": "error",
            "@stylistic/indent": [
                "error",
                4,
                {
                    SwitchCase: 1
                }
            ],
            "@stylistic/jsx-quotes": "error",
            "@stylistic/key-spacing": "error",
            "@stylistic/keyword-spacing": "error",
            "@stylistic/linebreak-style": [
                // this is a warning because our build system checks out on Linux
                // then copies to Windows causing the line endings to be mismatched
                "warn",
                os.EOL === "\r\n" ? "windows" : "unix"
            ],
            "@stylistic/max-statements-per-line": "error",
            "@stylistic/new-parens": "error",
            "@stylistic/no-confusing-arrow": [
                "error",
                {
                    allowParens: true
                }
            ],
            "@stylistic/no-extra-parens": [
                "error",
                "all",
                {nestedBinaryExpressions: false}
            ],
            "@stylistic/no-floating-decimal": "error",
            "@stylistic/no-mixed-operators": "error",
            "@stylistic/no-multi-spaces": "error",
            "@stylistic/no-multiple-empty-lines": [
                "error",
                {
                    max: 1,
                    maxBOF: 0,
                    maxEOF: 0
                }
            ],
            "@stylistic/no-tabs": "error",
            "@stylistic/no-trailing-spaces": "error",
            "@stylistic/no-whitespace-before-property": "error",
            "@stylistic/object-curly-newline": [
                "error",
                {
                    multiline: true,
                    consistent: true
                }
            ],
            "@stylistic/object-curly-spacing": "error",
            "@stylistic/object-property-newline": [
                "error",
                {
                    allowAllPropertiesOnSameLine: true
                }
            ],
            "@stylistic/one-var-declaration-per-line": "error",
            "@stylistic/operator-linebreak": ["error", "before"],
            "@stylistic/padded-blocks": ["error", "never"],
            "@stylistic/padding-line-between-statements": [
                "error",
                {blankLine: "always", prev: "*", next: "return"},
                {blankLine: "always", prev: ["const", "let", "var"], next: "*"},
                {
                    blankLine: "any",
                    prev: ["const", "let", "var"],
                    next: ["const", "let", "var"]
                }
            ],
            "@stylistic/quote-props": ["error", "as-needed"],
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/rest-spread-spacing": "error",
            "@stylistic/semi": "error",
            "@stylistic/semi-spacing": [
                "error",
                {
                    after: true,
                    before: false
                }
            ],
            "@stylistic/space-before-blocks": "error",
            "@stylistic/space-before-function-paren": "error",
            "@stylistic/space-in-parens": ["error", "never"],
            "@stylistic/space-infix-ops": "error",
            "@stylistic/space-unary-ops": [
                2,
                {
                    words: true,
                    nonwords: false,
                    overrides: {
                        "!": true,
                        "!!": true
                    }
                }
            ],
            "@stylistic/spaced-comment": ["error", "always"],
            "@stylistic/template-curly-spacing": "error",
            "@stylistic/template-tag-spacing": "error",
            "@stylistic/wrap-iife": "error",
            "@stylistic/yield-star-spacing": "error"
        }
    },

    // ── TypeScript-specific rules (*.ts, *.tsx only)

    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true
            }
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin
        },
        rules: {
            // ── Core rules disabled in favour of @typescript-eslint extensions
            //
            // Each pair disables the core rule (which cannot parse TS syntax
            // correctly) and enables its type-aware replacement with the same
            // options that the base config uses.

            "class-methods-use-this": "off",
            "@typescript-eslint/class-methods-use-this": "error",

            "dot-notation": "off",
            "@typescript-eslint/dot-notation": "error",

            "init-declarations": "off",
            "@typescript-eslint/init-declarations": "off",

            "no-array-constructor": "off",
            "@typescript-eslint/no-array-constructor": "error",

            "no-empty-function": "off",
            "@typescript-eslint/no-empty-function": "error",

            "no-implied-eval": "off",
            "@typescript-eslint/no-implied-eval": "error",

            "no-invalid-this": "off",
            "@typescript-eslint/no-invalid-this": "error",

            "no-loop-func": "off",
            "@typescript-eslint/no-loop-func": "error",

            "no-magic-numbers": "off",
            "@typescript-eslint/no-magic-numbers": [
                "error",
                {
                    ignore: [
                        -1, 0, 1,
                        200,
                        204, 302, 400, 403, 404, 500
                    ],
                    ignoreArrayIndexes: true,
                    ignoreEnums: true,
                    ignoreNumericLiteralTypes: true,
                    ignoreReadonlyClassProperties: true,
                    ignoreTypeIndexes: true
                }
            ],

            "no-shadow": "off",
            "@typescript-eslint/no-shadow": "off",

            "no-throw-literal": "off",
            "@typescript-eslint/only-throw-error": "error",

            "no-unused-expressions": "off",
            "@typescript-eslint/no-unused-expressions": "error",

            "no-use-before-define": "off",
            "@typescript-eslint/no-use-before-define": "error",

            "no-useless-constructor": "off",
            "@typescript-eslint/no-useless-constructor": "error",

            "no-return-await": "off",
            "@typescript-eslint/return-await": "error",

            "require-await": "off",
            "@typescript-eslint/require-await": "error",

            "prefer-promise-reject-errors": "off",
            "@typescript-eslint/prefer-promise-reject-errors": "error",


            // Rules that don't play nicely with TypeScript
            
            "func-style": "off",
            "sort-imports": "off",

            // TypeScript's own compiler handles these checks natively.

            "no-undef": "off",
            strict: "off",
            "no-duplicate-imports": "off",
            "no-undefined": "off",

            // JSDoc rules that don't understand TypeScript syntax.

            "jsdoc/require-jsdoc": "off",
            "jsdoc/require-param-description": "off",
            "jsdoc/require-returns-description": "off",
            "jsdoc/require-param-type": "off",
            "jsdoc/require-returns-type": "off"
        }
    }
];
