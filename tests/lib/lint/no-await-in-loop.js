"use strict";

/**
 * Tests for no-await-in-loop
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

    describe("no-await-in-loop", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const testConfig = [
                    ...config,
                    { languageOptions: { ecmaVersion: 2021 } }
                ],
                code = "async function foo() {\n    const results = await Promise.all(items.map(async (item) => process(item)));\n}",
                messages = linter.verify(code, testConfig),
                relevantMessages = messages.filter((msg) => msg.ruleId === "no-await-in-loop");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "no-await-in-loop", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const testConfig = [
                    ...config,
                    { languageOptions: { ecmaVersion: 2021 } }
                ],
                code = "async function foo() {\n    for (const item of items) { await process(item); }\n}",
                messages = linter.verify(code, testConfig),
                relevantMessages = messages.filter((msg) => msg.ruleId === "no-await-in-loop");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "no-await-in-loop", but got ${relevantMessages.length}`
            );
        });
    });
});
