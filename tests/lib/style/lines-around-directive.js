"use strict";

/**
 * Tests for lines-around-directive
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

    describe("lines-around-directive", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "\"use strict\";\n\nconst x = 1;",
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
