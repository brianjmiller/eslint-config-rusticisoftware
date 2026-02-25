"use strict";

/**
 * Tests for no-use-before-define
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

describe("no-use-before-define", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "const x = 1;\nconst y = x + 1;",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "no-use-before-define");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "no-use-before-define", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "const y = x + 1;\nconst x = 1;",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "no-use-before-define");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "no-use-before-define", but got ${relevantMessages.length}`
            );
        });
    });
});
