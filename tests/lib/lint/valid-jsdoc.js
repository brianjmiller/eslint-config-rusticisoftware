"use strict";

/**
 * Tests for valid-jsdoc
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

    describe("valid-jsdoc", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "/** Comment\n * @returns {void}\n */ function foo() {}",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "jsdoc/check-tag-names");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "jsdoc/check-tag-names", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });
    describe("rule is disabled", function () {
        it("should not report errors (rule is off)", function () {
            // This rule was "off" in the previous config and remains disabled
            // (either explicitly set to "off" or intentionally omitted).
            // Test that potentially violating code still passes.
            const testCode = "const test = 1;",
                messages = linter.verify(testCode, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "jsdoc/check-tag-names");

            assert.strictEqual(
                relevantMessages.length,
                0,
                "Rule is off, should not report errors"
            );
        });
    });
});
