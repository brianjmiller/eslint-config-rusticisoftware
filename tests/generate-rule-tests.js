#!/usr/bin/env node

/* global console */

/**
 * Generate Linter.verify()-based tests for all rules in the ESLint config
 * Tests code against the actual config exported from index.js
 * This ensures that changes to index.js will be caught by tests
 */

const fs = require("fs"),
    path = require("path"),
    {categoriseRule, getAllRules} = require("./categorise-rules.js"),
    {LEGACY_TO_CURRENT, INTENTIONALLY_OMITTED} = require("./rule-mapping"),
    RULE_TEST_CASES = require("./rule-test-cases");

const findRuleConfig = function (configArray, ruleName) {
        if (! Array.isArray(configArray)) {
            return null;
        }

        for (const entry of configArray) {
            if (entry && entry.rules && Object.prototype.hasOwnProperty.call(entry.rules, ruleName)) {
                return entry.rules[ruleName];
            }
        }

        return null;
    },

    getLegacyRuleEntries = function () {
        const libDir = path.join(__dirname, "lib"),
            categories = ["style", "lint"];

        // eslint-disable-next-line n/no-sync
        if (! fs.existsSync(libDir)) {
            return null;
        }

        const entries = categories.flatMap((category) => {
            const categoryDir = path.join(libDir, category);

            // eslint-disable-next-line n/no-sync
            if (! fs.existsSync(categoryDir)) {
                return [];
            }

            // eslint-disable-next-line n/no-sync
            return fs.readdirSync(categoryDir)
                .filter((file) => file.endsWith(".js"))
                .map((file) => ({
                    ruleName: file
                        .replace(/\.js$/u, "")
                        .replace(/__/gu, "/"),
                    category
                }));
        });

        return entries.length > 0 ? entries : null;
    },
    /**
     * Serialise an object to JavaScript code without quotes on keys (single line)
     */
    serialiseObject = function (obj) {
        if (obj === null || typeof obj === "undefined") {
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
    },

    /**
     * Map legacy parserOptions to flat-config languageOptions properties.
     * - sourceType / ecmaVersion map directly to languageOptions
     * - ecmaFeatures maps to languageOptions.parserOptions.ecmaFeatures
     * Returns a string of additional key: value pairs for a languageOptions object.
     */
    buildLanguageOptionsStr = function (parserOptions) {
        const parts = [];

        if ("sourceType" in parserOptions) {
            parts.push(`sourceType: ${JSON.stringify(parserOptions.sourceType)}`);
        }

        if ("ecmaVersion" in parserOptions) {
            parts.push(`ecmaVersion: ${JSON.stringify(parserOptions.ecmaVersion)}`);
        }

        if ("ecmaFeatures" in parserOptions) {
            parts.push(
                `parserOptions: { ecmaFeatures: ${serialiseObject(parserOptions.ecmaFeatures)} }`
            );
        }

        return parts.join(", ");
    },

    /**
     * Generate a test file for a single rule using Linter.verify()
     */
    generateTestFile = function (ruleName, category) {
    // index.js exports a flat-config array; rules live in the second element
        // eslint-disable-next-line n/global-require
        const config = require("../index.js"),
            mappedRuleName = LEGACY_TO_CURRENT[ruleName] || ruleName,
            ruleConfig = findRuleConfig(config, mappedRuleName),
            // Rules intentionally omitted from the new config (were "off" before)
            // are treated the same as "off" — no regression, no missing-rule failure.
            isMissing = ruleConfig === null && ! INTENTIONALLY_OMITTED.has(ruleName),
            // Check if rule is "off" (explicit entry) or intentionally omitted
            isOff
            = INTENTIONALLY_OMITTED.has(ruleName)
            || ruleConfig === "off"
            || (Array.isArray(ruleConfig) && ruleConfig[0] === "off"),
            // Look up test cases by full name, then by bare name (without plugin prefix)
            bareName = ruleName.includes("/")
                ? ruleName.slice(ruleName.indexOf("/") + 1)
                : ruleName,
            testCases = RULE_TEST_CASES[ruleName]
            || RULE_TEST_CASES[bareName] || {
                valid: ["\"use strict\";\n\nconst validTest = 1;\n"],
                invalid: [{code: "const invalidTest = 1;", errors: 1}]
            },
            // Generate valid test cases
            validTestsCode = testCases.valid
                .map((test, index) => {
                    const code = typeof test === "string" ? test : test.code,
                        hasCustomParser = typeof test === "object" && test.parserOptions,
                        configVar = hasCustomParser ? "testConfig" : "config",
                        // Map legacy parserOptions keys to flat-config languageOptions
                        languageOptionsStr = hasCustomParser
                            ? buildLanguageOptionsStr(test.parserOptions)
                            : "",
                        testSetup = hasCustomParser
                            ? `const testConfig = [
                    ...config,
                    { languageOptions: { ${languageOptionsStr} } }
                ],
                code = ${JSON.stringify(code)},`
                            : `const code = ${JSON.stringify(code)},`;

                    return `        it("valid case ${index + 1}", function () {
            ${testSetup}
                messages = linter.verify(code, ${configVar}),
                relevantMessages = messages.filter((msg) => msg.ruleId === "${mappedRuleName}");

            assert.strictEqual(
                relevantMessages.length,
                0,
                \`Expected no errors for "${mappedRuleName}", but got: \${relevantMessages.map((m) => m.message).join(", ")}\`
            );
        });`;
                })
                .join("\n\n");

        // Generate invalid test cases (skip for "off" rules)
        let invalidTestsCode = "";

        if (! isOff && testCases.invalid.length > 0) {
            invalidTestsCode = testCases.invalid
                .map((test, index) => {
                    if (test === null) {
                        return "";
                    }

                    const code = typeof test === "string" ? test : test.code,
                        expectedErrors = typeof test === "object" ? test.errors : 1,
                        hasCustomParser
                        = typeof test === "object" && test.parserOptions,
                        configVar = hasCustomParser ? "testConfig" : "config",
                        // Map legacy parserOptions keys to flat-config languageOptions
                        languageOptionsStr = hasCustomParser
                            ? buildLanguageOptionsStr(test.parserOptions)
                            : "",
                        testSetup = hasCustomParser
                            ? `const testConfig = [
                    ...config,
                    { languageOptions: { ${languageOptionsStr} } }
                ],
                code = ${JSON.stringify(code)},`
                            : `const code = ${JSON.stringify(code)},`;

                    return `        it("invalid case ${index + 1}", function () {
            ${testSetup}
                messages = linter.verify(code, ${configVar}),
                relevantMessages = messages.filter((msg) => msg.ruleId === "${mappedRuleName}");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= ${expectedErrors},
                \`Expected at least ${expectedErrors} error(s) for "${mappedRuleName}", but got \${relevantMessages.length}\`
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
            // This rule was "off" in the previous config and remains disabled
            // (either explicitly set to "off" or intentionally omitted).
            // Test that potentially violating code still passes.
            const testCode = ${JSON.stringify(testCases.invalid[0]?.code || "const test = 1;")},
                messages = linter.verify(testCode, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "${mappedRuleName}");

            assert.strictEqual(
                relevantMessages.length,
                0,
                "Rule is off, should not report errors"
            );
        });
    });`
                : "",
            missingRuleTestCode = isMissing
                ? `
    describe("missing rule", function () {
        it("should have a configured rule entry", function () {
            assert.fail(
                "Expected rule to be configured but it was missing: ${mappedRuleName}",
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

    // Extend the flat-config array with languageOptions for Linter.verify()
     config = [
         ...baseConfig,
         {
             languageOptions: {
                 ecmaVersion: 2021,
                 sourceType: "script",
             },
         }
     ];

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
    }${offTestCode}${missingRuleTestCode}
});
`,
            filePath = path.join(
                __dirname,
                "lib",
                category,
                `${ruleName.replace(/\//gu, "__")}.js`
            );

        // eslint-disable-next-line n/no-sync
        fs.writeFileSync(filePath, content);
        console.log(`Generated: ${category}/${ruleName}.js`);
    },

    /**
     * Generate test files for all rules
     */
    generateAllTests = function () {
        const legacyEntries = getLegacyRuleEntries(),
            ruleEntries = legacyEntries || getAllRules().map((ruleName) => ({
                ruleName,
                category: categoriseRule(ruleName)
            }));

        let styleCount = 0,
            lintCount = 0,
            withCustomTests = 0;

        console.log(
            `Generating Linter.verify() tests for ${ruleEntries.length} rules...\n`
        );

        ruleEntries.forEach(({ruleName, category}) => {
            try {
                generateTestFile(ruleName, category);

                if (RULE_TEST_CASES[ruleName]) {
                    withCustomTests += 1;
                }

                if (category === "style") {
                    styleCount += 1;
                }
                else {
                    lintCount += 1;
                }
            }
            catch (error) {
                console.error(
                    `Error generating test for ${ruleName}:`,
                    error.message
                );
            }
        });

        console.log("\nGeneration complete!");
        console.log(`Style tests: ${styleCount}`);
        console.log(`Lint tests:  ${lintCount}`);
        console.log(`Total tests: ${styleCount + lintCount}`);
        console.log(`Rules with custom test cases: ${withCustomTests}`);
        console.log(
            `Rules with default test cases: ${ruleEntries.length - withCustomTests}`
        );
    };

if (require.main === module) {
    generateAllTests();
}

module.exports = {generateTestFile, generateAllTests};
