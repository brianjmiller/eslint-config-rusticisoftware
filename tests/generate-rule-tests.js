#!/usr/bin/env node

"use strict";

/**
 * Generate Linter.verify()-based tests for all rules in the ESLint config
 * Tests code against the actual config exported from index.js
 * This ensures that changes to index.js will be caught by tests
 */

const fs = require("fs"),
    path = require("path"),
    { categoriseRule, getAllRules } = require("./categorise-rules.js"),
    RULE_TEST_CASES = require("./rule-test-cases");

/**
 * Serialise an object to JavaScript code without quotes on keys (single line)
 */
const serialiseObject = function (obj) {
    if (obj === null || obj === undefined) {
        return String(obj);
    }

    if (typeof obj !== "object") {
        return JSON.stringify(obj);
    }

    if (Array.isArray(obj)) {
        return `[${obj.map((item) => serialiseObject(item)).join(", ")}]`;
    }

    const entries = Object.entries(obj),
        serialized = entries
            .map(([key, val]) => `${key}: ${serialiseObject(val)}`)
            .join(", ");

    return `{${serialized}}`;
};

/**
 * Generate a test file for a single rule using Linter.verify()
 */
const generateTestFile = function (ruleName, category) {
    const config = require("../index.js"),
        ruleConfig = config.rules[ruleName],
        // Check if rule is "off"
        isOff =
            ruleConfig === "off" ||
            (Array.isArray(ruleConfig) && ruleConfig[0] === "off"),
        testCases = RULE_TEST_CASES[ruleName] || {
            valid: ['"use strict";\n\nconst validTest = 1;\n'],
            invalid: [{ code: "const invalidTest = 1;", errors: 1 }],
        },
        // Generate valid test cases
        validTestsCode = testCases.valid
            .map((test, index) => {
                const code = typeof test === "string" ? test : test.code,
                    hasCustomParser =
                        typeof test === "object" && test.parserOptions,
                    configVar = hasCustomParser ? "testConfig" : "config",
                    // Serialise parserOptions without quotes on keys
                    parserOptionsStr = hasCustomParser
                        ? Object.entries(test.parserOptions)
                              .map(
                                  ([key, val]) =>
                                      `${key}: ${serialiseObject(val)}`,
                              )
                              .join(", ")
                        : "",
                    testSetup = hasCustomParser
                        ? `const testConfig = {
                    ...config,
                    parserOptions: {
                        ...config.parserOptions,
                        ${parserOptionsStr}
                    }
                },
                code = ${JSON.stringify(code)},`
                        : `const code = ${JSON.stringify(code)},`;

                return `        it("valid case ${index + 1}", function () {
            ${testSetup}
                messages = linter.verify(code, ${configVar}),
                relevantMessages = messages.filter((msg) => msg.ruleId === "${ruleName}");

            assert.strictEqual(
                relevantMessages.length,
                0,
                \`Expected no errors for "${ruleName}", but got: \${relevantMessages.map((m) => m.message).join(", ")}\`
            );
        });`;
            })
            .join("\n\n");

    // Generate invalid test cases (skip for "off" rules)
    let invalidTestsCode = "";

    if (!isOff && testCases.invalid.length > 0) {
        invalidTestsCode = testCases.invalid
            .map((test, index) => {
                if (test === null) {
                    return "";
                }

                const code = typeof test === "string" ? test : test.code,
                    expectedErrors = typeof test === "object" ? test.errors : 1,
                    hasCustomParser =
                        typeof test === "object" && test.parserOptions,
                    configVar = hasCustomParser ? "testConfig" : "config",
                    // Serialise parserOptions without quotes on keys
                    parserOptionsStr = hasCustomParser
                        ? Object.entries(test.parserOptions)
                              .map(
                                  ([key, val]) =>
                                      `${key}: ${serialiseObject(val)}`,
                              )
                              .join(", ")
                        : "",
                    testSetup = hasCustomParser
                        ? `const testConfig = {
                    ...config,
                    parserOptions: {
                        ...config.parserOptions,
                        ${parserOptionsStr}
                    }
                },
                code = ${JSON.stringify(code)},`
                        : `const code = ${JSON.stringify(code)},`;

                return `        it("invalid case ${index + 1}", function () {
            ${testSetup}
                messages = linter.verify(code, ${configVar}),
                relevantMessages = messages.filter((msg) => msg.ruleId === "${ruleName}");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= ${expectedErrors},
                \`Expected at least ${expectedErrors} error(s) for "${ruleName}", but got \${relevantMessages.length}\`
            );
        });`;
            })
            .filter((test) => test !== "")
            .join("\n\n");
    }

    // For "off" rules, test that code which would violate them still passes
    const offTestCode = isOff
            ? `
    describe("rule is disabled", function () {
        it("should not report errors (rule is off)", function () {
            // This rule is set to "off" in index.js
            // Test that potentially violating code still passes
            const testCode = ${JSON.stringify(testCases.invalid[0]?.code || "const test = 1;")},
                messages = linter.verify(testCode, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "${ruleName}");

            assert.strictEqual(
                relevantMessages.length,
                0,
                "Rule is off, should not report errors"
            );
        });
    });`
            : "",
        content = `"use strict";

/**
 * Tests for ${ruleName}
 * This file tests the rule against the actual config from index.js
 * using Linter.verify() to ensure the configuration is correct.
 */

const {Linter} = require("eslint"),
    assert = require("assert"),
    baseConfig = require("../../../index.js"),

    // Enhance config with necessary parserOptions for Linter.verify()
    config = {
        ...baseConfig,
        parserOptions: {
            ecmaVersion: 2021,
            sourceType: "script"
        }
    };

describe("${ruleName}", function () {
    const linter = new Linter();

    describe("valid code", function () {
${validTestsCode}
    });${
        isOff || invalidTestsCode === ""
            ? ""
            : `

    describe("invalid code", function () {
${invalidTestsCode}
    });`
    }${offTestCode}
});
`,
        filePath = path.join(__dirname, "lib", category, `${ruleName}.js`);

    fs.writeFileSync(filePath, content);
    console.log(`Generated: ${category}/${ruleName}.js`);
};

/**
 * Generate test files for all rules
 */
const generateAllTests = function () {
    const allRules = getAllRules();

    let styleCount = 0,
        lintCount = 0,
        withCustomTests = 0;

    console.log(
        `Generating Linter.verify() tests for ${allRules.length} rules...\n`,
    );

    allRules.forEach((ruleName) => {
        const category = categoriseRule(ruleName);

        try {
            generateTestFile(ruleName, category);

            if (RULE_TEST_CASES[ruleName]) {
                withCustomTests += 1;
            }

            if (category === "style") {
                styleCount += 1;
            } else {
                lintCount += 1;
            }
        } catch (error) {
            console.error(
                `Error generating test for ${ruleName}:`,
                error.message,
            );
        }
    });

    console.log("\nGeneration complete!");
    console.log(`Style tests: ${styleCount}`);
    console.log(`Lint tests:  ${lintCount}`);
    console.log(`Total tests: ${styleCount + lintCount}`);
    console.log(`Rules with custom test cases: ${withCustomTests}`);
    console.log(
        `Rules with default test cases: ${allRules.length - withCustomTests}`,
    );
};

if (require.main === module) {
    generateAllTests();
}

module.exports = { generateTestFile, generateAllTests };
