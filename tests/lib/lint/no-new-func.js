"use strict";

/**
 * Tests for no-new-func
 * This file tests the rule against the actual config from index.js
 * using Linter.verify() to ensure the configuration is correct.
 */

 const {Linter} = require("eslint"),
    assert = require("assert"),
    baseConfig = require("../../../index.js"),

    // Extend the flat-config array with languageOptions for Linter.verify()
     config = [
         ...baseConfig,
         {
             languageOptions: {
                 ecmaVersion: 2021,
                 sourceType: "script",
             },
         }
     ];

    describe("no-new-func", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "const fn = function() {};",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "no-new-func");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "no-new-func", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "const fn = new Function(\"a\", \"b\", \"return a + b\");",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "no-new-func");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "no-new-func", but got ${relevantMessages.length}`
            );
        });
    });
});
