"use strict";

/**
 * Tests for quotes
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

    describe("quotes", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "\"double quotes\"",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/quotes");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "@stylistic/quotes", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });

        it("valid case 2", function () {
            const code = "const str = \"hello\";",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/quotes");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "@stylistic/quotes", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });

        it("valid case 3", function () {
            const code = "const obj = {key: \"value\"};",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/quotes");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "@stylistic/quotes", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "'single quotes'",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/quotes");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "@stylistic/quotes", but got ${relevantMessages.length}`
            );
        });

        it("invalid case 2", function () {
            const code = "const str = 'hello';",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/quotes");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "@stylistic/quotes", but got ${relevantMessages.length}`
            );
        });
    });
});
