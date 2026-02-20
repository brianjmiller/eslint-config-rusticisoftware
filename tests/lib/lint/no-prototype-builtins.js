"use strict";

/**
 * Tests for no-prototype-builtins
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

    describe("no-prototype-builtins", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "Object.prototype.hasOwnProperty.call(obj, key);",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "no-prototype-builtins");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "no-prototype-builtins", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });
});
