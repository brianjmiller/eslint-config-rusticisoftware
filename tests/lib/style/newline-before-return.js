"use strict";

/**
 * Tests for newline-before-return
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

    describe("newline-before-return", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "function foo() {\n    const x = 1;\n\n    return x;\n}",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/padding-line-between-statements");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "@stylistic/padding-line-between-statements", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });
});
