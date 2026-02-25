"use strict";

/**
 * Tests for no-native-reassign
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

describe("no-native-reassign", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "let Array = 1;",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "no-native-reassign");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "no-native-reassign", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "Array = 1;",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "no-native-reassign");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "no-native-reassign", but got ${relevantMessages.length}`
            );
        });
    });
});
