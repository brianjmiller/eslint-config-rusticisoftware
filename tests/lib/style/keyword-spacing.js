"use strict";

/**
 * Tests for keyword-spacing
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

    describe("keyword-spacing", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "if (true) {}",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/keyword-spacing");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "@stylistic/keyword-spacing", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });

        it("valid case 2", function () {
            const code = "for (let i = 0; i < 10; i += 1) {}",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/keyword-spacing");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "@stylistic/keyword-spacing", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "if(true) {}",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/keyword-spacing");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "@stylistic/keyword-spacing", but got ${relevantMessages.length}`
            );
        });

        it("invalid case 2", function () {
            const code = "for(let i = 0; i < 10; i += 1) {}",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/keyword-spacing");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "@stylistic/keyword-spacing", but got ${relevantMessages.length}`
            );
        });
    });
});
