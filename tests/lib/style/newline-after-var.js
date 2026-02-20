"use strict";

/**
 * Tests for newline-after-var
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

    describe("newline-after-var", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "const x = 1;\n\nfoo();",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/padding-line-between-statements");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "@stylistic/padding-line-between-statements", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });

        it("valid case 2", function () {
            const code = "let y = 2;\n\nbar();",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/padding-line-between-statements");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "@stylistic/padding-line-between-statements", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "const x = 1;\nfoo();",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/padding-line-between-statements");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "@stylistic/padding-line-between-statements", but got ${relevantMessages.length}`
            );
        });
    });
});
