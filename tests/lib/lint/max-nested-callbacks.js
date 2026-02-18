"use strict";

/**
 * Tests for max-nested-callbacks
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

describe("max-nested-callbacks", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "foo(function() { bar(function() {}); });",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "max-nested-callbacks");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "max-nested-callbacks", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "foo(function() { bar(function() { baz(function() { qux(function() { quux(function() { corge(function() { grault(function() { garply(function() { waldo(function() { fred(function() { plugh(function() {}); }); }); }); }); }); }); }); }); }); });",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "max-nested-callbacks");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "max-nested-callbacks", but got ${relevantMessages.length}`
            );
        });
    });
});
