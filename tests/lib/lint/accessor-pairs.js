"use strict";

/**
 * Tests for accessor-pairs
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

    describe("accessor-pairs", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "const obj = { get x() { return 1; }, set x(v) {} };",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "accessor-pairs");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "accessor-pairs", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "const obj = { set x(v) {} };",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "accessor-pairs");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "accessor-pairs", but got ${relevantMessages.length}`
            );
        });
    });
});
