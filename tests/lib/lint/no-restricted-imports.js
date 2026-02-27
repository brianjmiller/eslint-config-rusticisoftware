"use strict";

/**
 * Tests for no-restricted-imports
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

    describe("no-restricted-imports", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const testConfig = [
                    ...config,
                    { languageOptions: { sourceType: "module" } }
                ],
                code = "import foo from \"foo\";",
                messages = linter.verify(code, testConfig),
                relevantMessages = messages.filter((msg) => msg.ruleId === "no-restricted-imports");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "no-restricted-imports", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });
});
