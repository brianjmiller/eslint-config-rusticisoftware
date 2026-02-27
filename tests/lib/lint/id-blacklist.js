"use strict";

/**
 * Tests for id-blacklist
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

    describe("id-blacklist", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "const myVar = 1;",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "id-denylist");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "id-denylist", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });
});
