"use strict";

/**
 * Tests for space-unary-ops
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

describe("space-unary-ops", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "const x = typeof y;",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "space-unary-ops");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "space-unary-ops", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });

        it("valid case 2", function () {
            const code = "const z = ! x;",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "space-unary-ops");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "space-unary-ops", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "const x = typeof(y);",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "space-unary-ops");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "space-unary-ops", but got ${relevantMessages.length}`
            );
        });
    });
});
