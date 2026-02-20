"use strict";

/**
 * Tests for key-spacing
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

    describe("key-spacing", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "const obj = {a: 1, b: 2};",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/key-spacing");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "@stylistic/key-spacing", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "const obj = {a:1, b:2};",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/key-spacing");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 2,
                `Expected at least 2 error(s) for "@stylistic/key-spacing", but got ${relevantMessages.length}`
            );
        });
    });
});
