"use strict";

/**
 * Tests for object-curly-newline
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

    describe("object-curly-newline", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "const obj = {a: 1, b: 2};",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/object-curly-newline");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "@stylistic/object-curly-newline", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });

        it("valid case 2", function () {
            const code = "const obj = {\n    a: 1,\n    b: 2\n};",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/object-curly-newline");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "@stylistic/object-curly-newline", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "const obj = {a: 1,\n    b: 2};",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/object-curly-newline");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 2,
                `Expected at least 2 error(s) for "@stylistic/object-curly-newline", but got ${relevantMessages.length}`
            );
        });
    });
});
