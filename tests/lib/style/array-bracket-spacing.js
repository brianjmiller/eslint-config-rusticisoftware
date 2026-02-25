"use strict";

/**
 * Tests for array-bracket-spacing
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

describe("array-bracket-spacing", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "const arr = [1, 2, 3];",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "array-bracket-spacing");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "array-bracket-spacing", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });

        it("valid case 2", function () {
            const code = "const item = arr[0];",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "array-bracket-spacing");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "array-bracket-spacing", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "const arr = [ 1, 2, 3 ];",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "array-bracket-spacing");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 2,
                `Expected at least 2 error(s) for "array-bracket-spacing", but got ${relevantMessages.length}`
            );
        });
    });
});
