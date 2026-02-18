"use strict";

/**
 * Tests for linebreak-style
 * This file tests the rule against the actual config from index.js
 * using Linter.verify() to ensure the configuration is correct.
 */

const {Linter} = require("eslint"),
    assert = require("assert"),
    baseConfig = require("../../../index.js"),

    // Enhance config with necessary parserOptions for Linter.verify()
    config = {
        ...baseConfig,
        parserOptions: {
            ecmaVersion: 2021,
            sourceType: "script"
        }
    };

describe("linebreak-style", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "const x = 1;\n",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "linebreak-style");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "linebreak-style", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });
});
