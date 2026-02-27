"use strict";

/**
 * Tests for symbol-description
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

    describe("symbol-description", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const testConfig = [
                    ...config,
                    { languageOptions: { ecmaVersion: 2015 } }
                ],
                code = "const sym = Symbol(\"description\");",
                messages = linter.verify(code, testConfig),
                relevantMessages = messages.filter((msg) => msg.ruleId === "symbol-description");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "symbol-description", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });
});
