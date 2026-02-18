"use strict";

/**
 * Tests for object-curly-spacing
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

describe("object-curly-spacing", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const code = "const obj = {a: 1};",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "object-curly-spacing");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "object-curly-spacing", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });

        it("valid case 2", function () {
            const testConfig = {
                    ...config,
                    parserOptions: {
                        ...config.parserOptions,
                        sourceType: "module"
                    }
                },
                code = "import {foo} from \"bar\";",
                messages = linter.verify(code, testConfig),
                relevantMessages = messages.filter((msg) => msg.ruleId === "object-curly-spacing");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "object-curly-spacing", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const code = "const obj = { a: 1 };",
                messages = linter.verify(code, config),
                relevantMessages = messages.filter((msg) => msg.ruleId === "object-curly-spacing");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 2,
                `Expected at least 2 error(s) for "object-curly-spacing", but got ${relevantMessages.length}`
            );
        });
    });
});
