"use strict";

/**
 * Tests for padding-line-between-statements
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

describe("padding-line-between-statements", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "function foo() {\n    const x = 1;\n\n    return x;\n}",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "padding-line-between-statements");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "padding-line-between-statements", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });

        it("valid case 2", function () {
            const code = "function bar() {\n    const a = 1;\n    const b = 2;\n\n    foo();\n}",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "padding-line-between-statements");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "padding-line-between-statements", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "function foo() {\n    const x = 1;\n    return x;\n}",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "padding-line-between-statements");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "padding-line-between-statements", but got ${relevantMessages.length}`
            );
        });

        it("invalid case 2", function () {
            const code = "function bar() {\n    const x = 1;\n    foo();\n}",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "padding-line-between-statements");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "padding-line-between-statements", but got ${relevantMessages.length}`
            );
        });
    });
});
