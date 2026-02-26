# ESLint Config Migration Notes

### Rules removed from ESLint core (moved to `@stylistic/eslint-plugin`)

The following rules were deprecated in **ESLint v8.53.0** and removed in **ESLint v10.0.0**. They are now provided by `@stylistic/eslint-plugin` with a `@stylistic/` prefix and identical options.

| Old rule (ESLint core)            | New rule (`@stylistic/eslint-plugin`)        |
| --------------------------------- | -------------------------------------------- |
| `array-bracket-spacing`           | `@stylistic/array-bracket-spacing`           |
| `arrow-parens`                    | `@stylistic/arrow-parens`                    |
| `arrow-spacing`                   | `@stylistic/arrow-spacing`                   |
| `block-spacing`                   | `@stylistic/block-spacing`                   |
| `brace-style`                     | `@stylistic/brace-style`                     |
| `comma-dangle`                    | `@stylistic/comma-dangle`                    |
| `comma-spacing`                   | `@stylistic/comma-spacing`                   |
| `comma-style`                     | `@stylistic/comma-style`                     |
| `computed-property-spacing`       | `@stylistic/computed-property-spacing`       |
| `dot-location`                    | `@stylistic/dot-location`                    |
| `eol-last`                        | `@stylistic/eol-last`                        |
| `func-call-spacing`               | `@stylistic/function-call-spacing` (renamed) |
| `generator-star-spacing`          | `@stylistic/generator-star-spacing`          |
| `indent`                          | `@stylistic/indent`                          |
| `jsx-quotes`                      | `@stylistic/jsx-quotes`                      |
| `key-spacing`                     | `@stylistic/key-spacing`                     |
| `keyword-spacing`                 | `@stylistic/keyword-spacing`                 |
| `linebreak-style`                 | `@stylistic/linebreak-style`                 |
| `max-statements-per-line`         | `@stylistic/max-statements-per-line`         |
| `new-parens`                      | `@stylistic/new-parens`                      |
| `no-confusing-arrow`              | `@stylistic/no-confusing-arrow`              |
| `no-extra-parens`                 | `@stylistic/no-extra-parens`                 |
| `no-floating-decimal`             | `@stylistic/no-floating-decimal`             |
| `no-mixed-operators`              | `@stylistic/no-mixed-operators`              |
| `no-multi-spaces`                 | `@stylistic/no-multi-spaces`                 |
| `no-multiple-empty-lines`         | `@stylistic/no-multiple-empty-lines`         |
| `no-tabs`                         | `@stylistic/no-tabs`                         |
| `no-trailing-spaces`              | `@stylistic/no-trailing-spaces`              |
| `no-whitespace-before-property`   | `@stylistic/no-whitespace-before-property`   |
| `object-curly-newline`            | `@stylistic/object-curly-newline`            |
| `object-curly-spacing`            | `@stylistic/object-curly-spacing`            |
| `object-property-newline`         | `@stylistic/object-property-newline`         |
| `one-var-declaration-per-line`    | `@stylistic/one-var-declaration-per-line`    |
| `operator-linebreak`              | `@stylistic/operator-linebreak`              |
| `padded-blocks`                   | `@stylistic/padded-blocks`                   |
| `padding-line-between-statements` | `@stylistic/padding-line-between-statements` |
| `quote-props`                     | `@stylistic/quote-props`                     |
| `quotes`                          | `@stylistic/quotes`                          |
| `rest-spread-spacing`             | `@stylistic/rest-spread-spacing`             |
| `semi`                            | `@stylistic/semi`                            |
| `semi-spacing`                    | `@stylistic/semi-spacing`                    |
| `space-before-blocks`             | `@stylistic/space-before-blocks`             |
| `space-before-function-paren`     | `@stylistic/space-before-function-paren`     |
| `space-in-parens`                 | `@stylistic/space-in-parens`                 |
| `space-infix-ops`                 | `@stylistic/space-infix-ops`                 |
| `space-unary-ops`                 | `@stylistic/space-unary-ops`                 |
| `spaced-comment`                  | `@stylistic/spaced-comment`                  |
| `template-curly-spacing`          | `@stylistic/template-curly-spacing`          |
| `template-tag-spacing`            | `@stylistic/template-tag-spacing`            |
| `wrap-iife`                       | `@stylistic/wrap-iife`                       |
| `yield-star-spacing`              | `@stylistic/yield-star-spacing`              |

> **Note:** `func-call-spacing` was renamed to `function-call-spacing` in `@stylistic/eslint-plugin`. The options are identical.

### Rules removed from ESLint core (moved to `eslint-plugin-n`)

The following rules present in the old config were removed from ESLint core into a dedicated, community supported ESLint node plugin. The new config enables these via `eslint-plugin-n` with the `n/` prefix. The legacy tests map these to their `n/` replacements.

| Old rule (ESLint core)  | New rule (`eslint-plugin-n`) |
| ----------------------- | ---------------------------- |
| `callback-return`       | `n/callback-return`          |
| `global-require`        | `n/global-require`           |
| `handle-callback-err`   | `n/handle-callback-err`      |
| `no-mixed-requires`     | `n/no-mixed-requires`        |
| `no-new-require`        | `n/no-new-require`           |
| `no-path-concat`        | `n/no-path-concat`           |
| `no-process-env`        | `n/no-process-env`           |
| `no-process-exit`       | `n/no-process-exit`          |
| `no-restricted-modules` | `n/no-restricted-require`    |
| `no-sync`               | `n/no-sync`                  |

> **Note:** `no-restricted-modules` now maps to `n/no-restricted-require` to cover `require()` usage, matching the old CommonJS intent.

### Rules removed from ESLint core (moved to `eslint-plugin-jsdoc`)

The following jsdoc rules were removed from ESLint core and are now provided by `eslint-plugin-jsdoc`. The new config keeps them `off` to mirror previous behaviour.

| Old rule (ESLint core) | New rule (`eslint-plugin-jsdoc`)                                                                |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `require-jsdoc`        | `jsdoc/require-jsdoc`                                                                           |
| `valid-jsdoc`          | `jsdoc/check-tag-names`, `jsdoc/require-param-description`, `jsdoc/require-returns-description` |

### Other rules that have been superseded

| Rule                     | Notes                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| `id-blacklist`           | Renamed to `id-denylist` in ESLint v7.4.0 (the old name was removed)                           |
| `lines-around-directive` | Removed in ESLint v4.0.0 — superseded by `padding-line-between-statements`                     |
| `newline-after-var`      | Removed in ESLint v4.0.0 — superseded by `padding-line-between-statements`                     |
| `newline-before-return`  | Removed in ESLint v4.0.0 — superseded by `padding-line-between-statements`                     |
| `no-catch-shadow`        | Deprecated in ESLint v5.1.0 — superseded by `no-shadow`                                        |
| `no-native-reassign`     | Removed in ESLint v4.0.0 — superseded by `no-global-assign`                                    |
| `no-negated-in-lhs`      | Removed in ESLint v3.3.0 — superseded by `no-unsafe-negation`                                  |
| `no-spaced-func`         | Removed in ESLint v10 — superseded by `func-call-spacing` / `@stylistic/function-call-spacing` |
| `require-jsdoc`          | Removed in ESLint v5.10.0 — superseded by `jsdoc/require-jsdoc` (kept `off`)                   |
| `valid-jsdoc`            | Removed in ESLint v5.10.0 — superseded by `jsdoc/check-tag-names` (kept `off`)                 |

## Rules that were on but have been deprecated

`prefer-reflect` - Removed in ESLint v4.0.0 — the Reflect API guidance was rescinded

### Rules that were `"off"` and remain `"off"` in the new config

These rules were set to `"off"` in the old config and are carried over explicitly as `"off"` in the new flat config — behaviour is unchanged:

`capitalized-comments`, `consistent-return`, `id-length`, `init-declarations`, `max-len`, `max-lines`, `max-statements`, `no-multi-assign`, `no-negated-condition`, `no-nested-ternary`, `no-shadow`, `no-ternary`, `no-underscore-dangle`, `no-warning-comments`, `object-shorthand`, `prefer-arrow-callback`, `prefer-rest-params`, `prefer-spread`, `prefer-template`, `sort-keys`, `sort-vars`, `wrap-regex`

### Rules that were `"off"` and are omitted from the new config entirely

These rules were `"off"` in the old config and have been deprecated in ESLint 8.53.0:

`lines-around-comment`, `multiline-ternary`, `newline-per-chained-call`

---

### Other notable ESLint v10 breaking changes

- **Old config format removed**: `.eslintrc` / `.eslintrc.json` / `.eslintrc.js` are no longer supported. Config must be in `eslint.config.js` (flat config format).
- **`eslint:recommended` updated**: Three new rules are now enabled — `no-unassigned-vars`, `no-useless-assignment`, `preserve-caught-error`.
- **`eslint-env` comments now error**: `/* eslint-env node */` style comments cause a lint error in v10. Remove them and configure globals in the config file instead.
- **Node.js requirement**: ESLint v10 requires Node.js v20.19+, v22.13+, or v24+.
- **`no-shadow-restricted-names`**: Now reports `globalThis` by default (`reportGlobalThis` defaults to `true`).
- **`radix` rule options**: The `"always"` and `"as-needed"` string options are deprecated; the rule now always enforces providing a radix.

---

### Dependency changes

| Package                    | Before    | After                                                          |
| -------------------------- | --------- | -------------------------------------------------------------- |
| `eslint` (peer)            | `>=8`     | `>=10`                                                         |
| `eslint` (dev)             | `^8.57.1` | `^10.0.0`                                                      |
| `@eslint/js`               | —         | `^10.0.0` (new, provides `eslint:recommended` for flat config) |
| `@stylistic/eslint-plugin` | —         | `^4.4.1` (new, provides all moved stylistic rules)             |
| `eslint-plugin-jsdoc`      | —         | `^62.7.0` (new, provides replacements for removed jsdoc rules) |
