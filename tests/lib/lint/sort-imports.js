"use strict";

/**
 * Tests for sort-imports
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

describe("sort-imports", function () {
    const linter = new Linter();

    describe("valid code", function () {
        it("valid case 1", function () {
            const testConfig = {
                    ...config,
                    parserOptions: {
                        ...config.parserOptions,
                        sourceType: "module"
                    }
                },
                code = "import {a, b} from \"mod\";",
                messages = linter.verify(code, testConfig),
                relevantMessages = messages.filter((msg) => msg.ruleId === "sort-imports");

            assert.strictEqual(
                relevantMessages.length,
                0,
                `Expected no errors for "sort-imports", but got: ${relevantMessages.map((m) => m.message).join(", ")}`
            );
        });
    });

    describe("invalid code", function () {
        it("invalid case 1", function () {
            const testConfig = {
                    ...config,
                    parserOptions: {
                        ...config.parserOptions,
                        sourceType: "module"
                    }
                },
                code = "import {b, a} from \"mod\";",
                messages = linter.verify(code, testConfig),
                relevantMessages = messages.filter((msg) => msg.ruleId === "sort-imports");

            assert.ok(
                // eslint-disable-next-line no-magic-numbers
                relevantMessages.length >= 1,
                `Expected at least 1 error(s) for "sort-imports", but got ${relevantMessages.length}`
            );
        });
    });
});
