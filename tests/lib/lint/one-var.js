"use strict";

/**
 * Tests for one-var
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

describe("one-var", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "const a = 1,\n    b = 2;",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "one-var");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "one-var", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });
});
