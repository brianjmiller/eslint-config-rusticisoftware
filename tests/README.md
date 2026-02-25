# ESLint Config Tests

This directory contains integration tests that verify the ESLint configuration exported from `index.js`.

## Overview

These tests use `Linter.verify()` to test sample code against the rules define in **index.js**. It is specifically testing that the current configuration applies rules as expected by the original [Rustici ESLint package](https://www.npmjs.com/package/@rusticisoftware/eslint-config/v/3.0.0) published to NPM.

## Structure

```
tests/
├── lib/
│   ├── style/       # Tests for stylistic/formatting rules (62 rules)
│   └── lint/        # Tests for linting/logic rules (135 rules)
├── categorise-rules.js         # Categorises rules into style vs lint
├── rule-test-cases.js          # Comprehensive test cases for rules
├── generate-rule-tests.js      # Generates test files using Linter.verify()
└── run-rule-tests.js           # Test runner script
```

## Test Organization

- **Style Rules (62 total)**: Formatting and stylistic rules (spacing, brackets, quotes, etc.)
    - Located in `tests/lib/style/`
    - These are rules that were deprecated from ESLint core and moved to @stylistic/eslint-plugin

- **Lint Rules (135 total)**: Logic, best practices, and code quality rules
    - Located in `tests/lib/lint/`
    - These enforce code correctness and best practices

## Running Tests

```bash
# Run all tests
npm test

# Run with verbose output
npm run test:verbose

# Run only style rule tests
npm run test:style

# Run only lint rule tests
npm run test:lint

# Generate/regenerate test files
npm run test:generate
```

## Test Format

Each rule has its own test file that loads your config from `index.js` and uses `Linter.verify()`:

```javascript
const { Linter } = require("eslint");
const assert = require("assert");
const config = require("../../../index.js");

describe("quotes", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = 'const str = "hello";';
            const messages = linter.verify(code, config);
            const relevantMessages = messages.filter(
                (msg) => msg.ruleId === "quotes",
            );

            assert.strictEqual(
                relevantMessages.length,
                0,
                "Should not have errors",
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "const str = 'hello';";
            const messages = linter.verify(code, config);
            const relevantMessages = messages.filter(
                (msg) => msg.ruleId === "quotes",
            );

            assert.ok(
                relevantMessages.length >= 1,
                "Should have at least 1 error",
            );
        });
    });
});
```

### Why Test?

**ESLint** introduced two substantial changes in **v8.21.0** (August 2022) and again in **v8.53.0** (November 2023):

- [Configuration file format](https://eslint.org/blog/2022/08/new-config-system-part-1/)
- [Removal of formatting rules](https://eslint.org/blog/2023/10/deprecating-formatting-rules/)

The most recent [ESLint rules published by Rustici](https://www.npmjs.com/package/@rusticisoftware/eslint-config/v/3.0.0) (at the time of writing) relies on ESLint version prior to v9. In order to modernise these rules, first the config format must be updated; this is quite straightforward, but issues could be introduced if rules are missed or the format is incorrect. The next stages are a little more error-prone because a substantial number of rules have been deprecated, this includes all of the style rules, but also some non-stylistic rules that are just not relevant in modern JS. The recommended approach is to migrate styling to [Prettier or similar as per ESLint guidance](https://typescript-eslint.io/users/what-about-formatting/).

After discussion regarding the adoption of Prettier, it has been stated that maintaining existing rules would be preferred. To achieve this, there is an unofficial [ESLint Stylistic](https://eslint.style/) project that maintains the ESLint style rules. Testing is an essential part of ensuring the original styles are still in place. For any test that fails, a decision can be made on whether the configuration needs changing or to adopt a suitable alternative.
