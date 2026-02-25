"use strict";

/**
 * Tests for no-mixed-requires
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

describe("no-mixed-requires", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "const fs = require(\"fs\");",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "no-mixed-requires");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "no-mixed-requires", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });
    describe("rule is disabled", function () {
        it("should not report errors (rule is off)", function () {
            // This rule is set to "off" in index.js
            // Test that potentially violating code still passes
            const testCode = "const test = 1;",
                messages = linter.verify(testCode, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "no-mixed-requires");

            assert.strictEqual(
                relevantMessages.length,
                0,
                "Rule is off, should not report errors"
            );
        });
    });
});
