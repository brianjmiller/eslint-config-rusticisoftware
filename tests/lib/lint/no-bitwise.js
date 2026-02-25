"use strict";

/**
 * Tests for no-bitwise
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

describe("no-bitwise", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "const x = a && b;",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "no-bitwise");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "no-bitwise", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "const x = a & b;",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "no-bitwise");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "no-bitwise", but got ${relevantMessages.length}`
            );
        });
    });
});
