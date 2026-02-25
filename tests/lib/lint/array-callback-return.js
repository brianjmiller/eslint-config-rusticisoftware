"use strict";

/**
 * Tests for array-callback-return
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

describe("array-callback-return", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "[1, 2, 3].map((x) => x * 2);",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "array-callback-return");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "array-callback-return", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "[1, 2, 3].map((x) => { x * 2; });",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "array-callback-return");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "array-callback-return", but got ${relevantMessages.length}`
            );
        });
    });
});
