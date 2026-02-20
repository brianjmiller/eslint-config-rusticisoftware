#!/usr/bin/env node

/**
 * Categorise ESLint rules into style vs lint
 * Based on: https://eslint.org/docs/latest/rules/
 * Stylistic rules moved to @stylistic/eslint-plugin in ESLint v8+
 */

// Rules that are purely stylistic (formatting)
// These have been deprecated/removed from ESLint core and moved to @stylistic
const STYLISTIC_RULES = new Set([
    // Spacing
    "array-bracket-spacing",
    "arrow-spacing",
    "block-spacing",
    "comma-spacing",
    "computed-property-spacing",
    "func-call-spacing",
    "key-spacing",
    "keyword-spacing",
    "no-multi-spaces",
    "no-trailing-spaces",
    "no-whitespace-before-property",
    "object-curly-spacing",
    "semi-spacing",
    "space-before-blocks",
    "space-before-function-paren",
    "space-in-parens",
    "space-infix-ops",
    "space-unary-ops",
    "spaced-comment",
    "template-tag-spacing",
    "rest-spread-spacing",

    // Line breaks
    "array-bracket-newline",
    "array-element-newline",
    "function-call-argument-newline",
    "function-paren-newline",
    "implicit-arrow-linebreak",
    "linebreak-style",
    "lines-around-comment",
    "lines-between-class-members",
    "max-len",
    "max-statements-per-line",
    "multiline-ternary",
    "newline-per-chained-call",
    "no-multiple-empty-lines",
    "object-curly-newline",
    "object-property-newline",
    "operator-linebreak",
    "padded-blocks",
    "padding-line-between-statements",

    // Braces and parens
    "arrow-parens",
    "brace-style",
    "curly",
    "dot-location",
    "new-parens",
    "no-confusing-arrow",
    "no-extra-parens",
    "no-floating-decimal",
    "no-mixed-operators",
    "nonblock-statement-body-position",
    "wrap-iife",
    "wrap-regex",

    // Semicolons and commas
    "comma-dangle",
    "comma-style",
    "eol-last",
    "no-extra-semi",
    "semi",
    "semi-style",

    // Quotes
    "jsx-quotes",
    "quote-props",
    "quotes",

    // Other formatting
    "indent",
    "generator-star-spacing",
    "lines-around-directive",
    "newline-after-var",
    "newline-before-return",
    "no-spaced-func",
    "no-tabs",
    "one-var-declaration-per-line",
    "template-curly-spacing",
    "unicode-bom",
    "yield-star-spacing",
]);

const { LEGACY_TO_CURRENT } = require("./rule-mapping");

// Rules that are linting (logic/best practices)
// Everything else is a linting rule
function categoriseRule(ruleName) {
    const mappedRule = LEGACY_TO_CURRENT[ruleName] || ruleName,
        // Rules from @stylistic/eslint-plugin are prefixed with "@stylistic/"
        bareName = mappedRule.startsWith("@stylistic/")
            ? mappedRule.slice("@stylistic/".length)
            : mappedRule;

    return STYLISTIC_RULES.has(bareName) ? "style" : "lint";
}

// Get all rules from config
function getAllRules() {
    // index.js exports a flat-config array; rules live in the second element
    const config = require("../index.js");

    return Object.keys(config[1].rules).sort();
}

// Categorise all rules
function categoriseAllRules() {
    const allRules = getAllRules(),
        categories = {
            style: [],
            lint: [],
        };

    allRules.forEach((rule) => {
        const category = categoriseRule(rule);

        categories[category].push(rule);
    });

    return categories;
}

// Print categorization
function printCategorization() {
    const categories = categoriseAllRules();

    console.log("Style Rules (Formatting):", categories.style.length);
    console.log("─".repeat(50));
    categories.style.forEach((rule) => console.log(`  ${rule}`));

    console.log(
        "\n\nLint Rules (Logic/Best Practices):",
        categories.lint.length,
    );
    console.log("─".repeat(50));
    categories.lint.forEach((rule) => console.log(`  ${rule}`));

    console.log(
        `\n\nTotal: ${categories.style.length + categories.lint.length} rules`,
    );
    console.log(`Style: ${categories.style.length}`);
    console.log(`Lint:  ${categories.lint.length}`);
}

if (require.main === module) {
    printCategorization();
}

module.exports = {
    STYLISTIC_RULES,
    categoriseRule,
    categoriseAllRules,
    getAllRules,
};
