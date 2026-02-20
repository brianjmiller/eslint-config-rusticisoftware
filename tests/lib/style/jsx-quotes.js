"use strict";

/**
 * Tests for jsx-quotes
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

    describe("jsx-quotes", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const testConfig = [
                    ...config,
                    { languageOptions: { parserOptions: { ecmaFeatures: {jsx: true} } } }
                ],
                code = "<Component attr=\"value\" />",
                messages = linter.verify(code, testConfig),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/jsx-quotes");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "@stylistic/jsx-quotes", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const testConfig = [
                    ...config,
                    { languageOptions: { parserOptions: { ecmaFeatures: {jsx: true} } } }
                ],
                code = "<Component attr='value' />",
                messages = linter.verify(code, testConfig),
                relevantMessages = messages.filter((msg) => msg.ruleId === "@stylistic/jsx-quotes");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "@stylistic/jsx-quotes", but got ${relevantMessages.length}`
            );
        });
    });
});
