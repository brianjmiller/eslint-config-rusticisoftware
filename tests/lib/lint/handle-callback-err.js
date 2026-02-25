"use strict";

/**
 * Tests for handle-callback-err
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

describe("handle-callback-err", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "function foo(err, data) { if (err) {} }",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "handle-callback-err");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "handle-callback-err", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "function foo(err, data) { console.log(data); }",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "handle-callback-err");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "handle-callback-err", but got ${relevantMessages.length}`
            );
        });
    });
});
