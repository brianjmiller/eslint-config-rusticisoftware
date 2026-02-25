"use strict";

/**
 * Tests for prefer-numeric-literals
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

describe("prefer-numeric-literals", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "const x = 0b111;",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "prefer-numeric-literals");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "prefer-numeric-literals", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "const x = parseInt(\"111\", 2);",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "prefer-numeric-literals");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "prefer-numeric-literals", but got ${relevantMessages.length}`
            );
        });
    });
});
