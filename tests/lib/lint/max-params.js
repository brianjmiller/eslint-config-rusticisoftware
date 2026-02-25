"use strict";

/**
 * Tests for max-params
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

describe("max-params", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "function foo(a, b, c, d, e) {}",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "max-params");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "max-params", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "function foo(a, b, c, d, e, f) {}",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "max-params");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "max-params", but got ${relevantMessages.length}`
            );
        });
    });
});
