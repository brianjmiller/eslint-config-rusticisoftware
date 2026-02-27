#!/usr/bin/env node

/* global console */

/**
 * Test runner for Linter.verify()-based ESLint configuration tests
 * Runs all tests in tests/lib/style/ and tests/lib/lint/
 * Tests verify that code behaves correctly according to the config in index.js
 */

const {execSync} = require("child_process"),
    path = require("path"),
    fs = require("fs"),
    testsDir = path.join(__dirname, "lib"),
    styleTestsDir = path.join(testsDir, "style"),
    lintTestsDir = path.join(testsDir, "lint"),

    getTestFiles = function (dir) {
        try {
            // eslint-disable-next-line n/no-sync
            return fs
                .readdirSync(dir)
                .filter((file) => file.endsWith(".js"))
                .map((file) => path.join(dir, file));
        }
        catch (error) {
            console.error(`Error reading directory ${dir}:`, error.message);

            return [];
        }
    },

    runTests = function () {
        console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("  ESLint Configuration Test Suite");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

        const styleTests = getTestFiles(styleTestsDir),
            lintTests = getTestFiles(lintTestsDir),
            allTests = [...styleTests, ...lintTests];

        if (allTests.length === 0) {
            console.error("No test files found!");
            throw new Error("No test files found");
        }

        console.log(`Running ${allTests.length} test files...`);
        console.log(`  Style rules: ${styleTests.length}`);
        console.log(`  Lint rules:  ${lintTests.length}\n`);

        try {
            // Run mocha with all test files
            const mochaPath = path.join(
                    __dirname,
                    "..",
                    "node_modules",
                    ".bin",
                    "mocha"
                ),
                command = `"${mochaPath}" ${allTests.map((file) => `"${file}"`).join(" ")}`;

            // eslint-disable-next-line n/no-sync
            execSync(command, {
                stdio: "inherit",
                cwd: path.join(__dirname, "..")
            });

            console.log("\n✓ All tests passed!");
        }
        catch (err) {
            console.error("\n✗ Some tests failed");
            throw new Error("Tests failed", {cause: err});
        }
    };

if (require.main === module) {
    runTests();
}

module.exports = {runTests};
