#!/usr/bin/env node

/* eslint-disable no-template-curly-in-string */
/**
 * Enhanced rule-specific test cases with proper outputs for auto-fixable rules
 */

const RULE_TEST_CASES = {
    // ===== STYLE RULES (auto-fixable) =====
    quotes: {
        valid: [
            "\"double quotes\"",
            "const str = \"hello\";",
            "const obj = {key: \"value\"};"
        ],
        invalid: [
            {code: "'single quotes'", output: "\"single quotes\"", errors: 1},
            {
                code: "const str = 'hello';",
                output: "const str = \"hello\";",
                errors: 1
            }
        ]
    },
    semi: {
        valid: ["const x = 1;", "function foo() { return 1; }"],
        invalid: [
            {code: "const x = 1", output: "const x = 1;", errors: 1},
            {
                code: "function foo() { return 1 }",
                output: "function foo() { return 1; }",
                errors: 1
            }
        ]
    },
    indent: {
        valid: [
            "function foo() {\n    return 1;\n}",
            "if (true) {\n    const x = 1;\n}"
        ],
        invalid: [
            {
                code: "function foo() {\n  return 1;\n}",
                output: "function foo() {\n    return 1;\n}",
                errors: 1
            }
        ]
    },
    "comma-dangle": {
        valid: ["const obj = {a: 1, b: 2};", "const arr = [1, 2, 3];"],
        invalid: [
            {
                code: "const obj = {a: 1, b: 2,};",
                output: "const obj = {a: 1, b: 2};",
                errors: 1
            },
            {
                code: "const arr = [1, 2, 3,];",
                output: "const arr = [1, 2, 3];",
                errors: 1
            }
        ]
    },
    "brace-style": {
        valid: [
            "if (x) {\n    foo();\n}\nelse {\n    bar();\n}",
            "try {\n    foo();\n}\ncatch (e) {\n    bar();\n}"
        ],
        invalid: [
            {
                code: "if (x) {\n    foo();\n} else {\n    bar();\n}",
                output: "if (x) {\n    foo();\n}\n else {\n    bar();\n}",
                errors: 1
            }
        ]
    },
    "space-before-function-paren": {
        valid: ["function foo () {}", "const bar = function () {};"],
        invalid: [
            {
                code: "function foo() {}",
                output: "function foo () {}",
                errors: 1
            },
            {
                code: "const bar = function() {};",
                output: "const bar = function () {};",
                errors: 1
            }
        ]
    },
    "arrow-spacing": {
        valid: ["const fn = () => 1;", "const fn = (x) => x + 1;"],
        invalid: [
            {
                code: "const fn = ()=> 1;",
                output: "const fn = () => 1;",
                errors: 1
            },
            {
                code: "const fn = (x)=>x + 1;",
                output: "const fn = (x) => x + 1;",
                errors: 2
            }
        ]
    },
    "arrow-parens": {
        valid: ["const fn = (x) => x;", "const fn = () => 1;"],
        invalid: [
            {
                code: "const fn = x => x;",
                output: "const fn = (x) => x;",
                errors: 1
            }
        ]
    },
    "eol-last": {
        valid: ["const x = 1;\n"],
        invalid: [
            {code: "const x = 1;", output: "const x = 1;\n", errors: 1}
        ]
    },
    "no-trailing-spaces": {
        valid: ["const x = 1;"],
        invalid: [
            {code: "const x = 1; ", output: "const x = 1;", errors: 1},
            {code: "const x = 1;  ", output: "const x = 1;", errors: 1}
        ]
    },
    "comma-spacing": {
        valid: ["const arr = [1, 2, 3];", "foo(a, b, c);"],
        invalid: [
            {
                code: "const arr = [1,2,3];",
                output: "const arr = [1, 2, 3];",
                errors: 2
            },
            {code: "foo(a,b,c);", output: "foo(a, b, c);", errors: 2}
        ]
    },
    "key-spacing": {
        valid: ["const obj = {a: 1, b: 2};"],
        invalid: [
            {
                code: "const obj = {a:1, b:2};",
                output: "const obj = {a: 1, b: 2};",
                errors: 2
            }
        ]
    },
    "keyword-spacing": {
        valid: ["if (true) {}", "for (let i = 0; i < 10; i += 1) {}"],
        invalid: [
            {code: "if(true) {}", output: "if (true) {}", errors: 1},
            {
                code: "for(let i = 0; i < 10; i += 1) {}",
                output: "for (let i = 0; i < 10; i += 1) {}",
                errors: 1
            }
        ]
    },
    "space-infix-ops": {
        valid: ["const x = 1 + 2;", "const y = a * b;"],
        invalid: [
            {code: "const x = 1+2;", output: "const x = 1 + 2;", errors: 1},
            {code: "const y = a*b;", output: "const y = a * b;", errors: 1}
        ]
    },
    "object-curly-spacing": {
        valid: [
            "const obj = {a: 1};",
            {
                code: "import {foo} from \"bar\";",
                parserOptions: {sourceType: "module"}
            }
        ],
        invalid: [
            {
                code: "const obj = { a: 1 };",
                output: "const obj = {a: 1};",
                errors: 2
            }
        ]
    },
    "array-bracket-spacing": {
        valid: ["const arr = [1, 2, 3];", "const item = arr[0];"],
        invalid: [
            {
                code: "const arr = [ 1, 2, 3 ];",
                output: "const arr = [1, 2, 3];",
                errors: 2
            }
        ]
    },
    "space-before-blocks": {
        valid: ["function foo() {}", "if (true) {}"],
        invalid: [
            {
                code: "function foo(){}",
                output: "function foo() {}",
                errors: 1
            },
            {code: "if (true){}", output: "if (true) {}", errors: 1}
        ]
    },
    "space-in-parens": {
        valid: ["foo(1, 2, 3);", "if (true) {}"],
        invalid: [
            {code: "foo( 1, 2, 3 );", output: "foo(1, 2, 3);", errors: 2}
        ]
    },
    "comma-style": {
        valid: ["const arr = [\n    1,\n    2,\n    3\n];"],
        invalid: [
            {
                code: "const arr = [\n    1\n    , 2\n];",
                output: "const arr = [\n    1,\n     2\n];",
                errors: 1
            }
        ]
    },
    "computed-property-spacing": {
        valid: ["obj[key];", "const x = arr[0];"],
        invalid: [{code: "obj[ key ];", output: "obj[key];", errors: 2}]
    },
    "func-call-spacing": {
        valid: ["foo();", "bar(1, 2);"],
        invalid: [{code: "foo ();", output: "foo();", errors: 1}]
    },
    "no-multi-spaces": {
        valid: ["const x = 1;"],
        invalid: [{code: "const x  = 1;", output: "const x = 1;", errors: 1}]
    },
    "no-whitespace-before-property": {
        valid: ["obj.property;"],
        invalid: [
            {code: "obj .property;", output: "obj.property;", errors: 1}
        ]
    },
    "semi-spacing": {
        valid: ["const x = 1; const y = 2;"],
        invalid: [
            {
                code: "const x = 1 ;const y = 2;",
                output: "const x = 1; const y = 2;",
                errors: 2
            }
        ]
    },
    "space-unary-ops": {
        valid: ["const x = typeof y;", "const z = ! x;"],
        invalid: [
            {
                code: "const x = typeof(y);",
                output: "const x = typeof (y);",
                errors: 1
            }
        ]
    },
    "spaced-comment": {
        valid: ["// comment", "/* comment */"],
        invalid: [
            {code: "//comment", output: "// comment", errors: 1},
            {code: "/*comment */", output: "/* comment */", errors: 1}
        ]
    },
    "quote-props": {
        valid: ["const obj = {a: 1, b: 2};"],
        invalid: [
            {
                code: "const obj = {\"a\": 1};",
                output: "const obj = {a: 1};",
                errors: 1
            }
        ]
    },
    "dot-location": {
        valid: ["obj\n    .property;"],
        invalid: [
            {
                code: "obj.\n    property;",
                output: "obj\n    .property;",
                errors: 1
            }
        ]
    },
    "generator-star-spacing": {
        valid: ["function *generator() {}"],
        invalid: [
            {
                code: "function* generator() {}",
                output: "function *generator() {}",
                errors: 2
            }
        ]
    },
    "yield-star-spacing": {
        valid: ["function* gen() { yield* other(); }"],
        invalid: [
            {
                code: "function* gen() { yield *other(); }",
                output: "function* gen() { yield* other(); }",
                errors: 2
            }
        ]
    },
    "rest-spread-spacing": {
        valid: ["const arr = [...other];", "function foo(...args) {}"],
        invalid: [
            {
                code: "const arr = [... other];",
                output: "const arr = [...other];",
                errors: 1
            }
        ]
    },
    "template-curly-spacing": {
        valid: ["const str = `hello ${name}`;"],
        invalid: [
            {
                code: "const str = `hello ${ name }`;",
                output: "const str = `hello ${name}`;",
                errors: 2
            }
        ]
    },
    "template-tag-spacing": {
        valid: ["tag`template`;"],
        invalid: [
            {code: "tag `template`;", output: "tag`template`;", errors: 1}
        ]
    },
    "block-spacing": {
        valid: ["function foo() { return 1; }", "if (x) { foo(); }"],
        invalid: [
            {
                code: "function foo() {return 1;}",
                output: "function foo() { return 1; }",
                errors: 2
            },
            {
                code: "function foo() { return 1;}",
                output: "function foo() { return 1; }",
                errors: 1
            }
        ]
    },
    "new-parens": {
        valid: ["const x = new Foo();"],
        invalid: [
            {
                code: "const x = new Foo;",
                output: "const x = new Foo();",
                errors: 1
            }
        ]
    },
    "no-extra-parens": {
        valid: ["const x = (a + b) * c;"],
        invalid: [
            {code: "const x = (a);", output: "const x = a;", errors: 1}
        ]
    },
    "no-floating-decimal": {
        valid: ["const x = 0.5;"],
        invalid: [
            {code: "const x = .5;", output: "const x = 0.5;", errors: 1}
        ]
    },
    "no-multiple-empty-lines": {
        valid: ["const x = 1;\nconst y = 2;"],
        invalid: [
            {
                code: "const x = 1;\n\n\nconst y = 2;",
                output: "const x = 1;\n\nconst y = 2;",
                errors: 1
            }
        ]
    },
    "padded-blocks": {
        valid: ["if (x) {\n    foo();\n}"],
        invalid: [
            {
                code: "if (x) {\n\n    foo();\n}",
                output: "if (x) {\n    foo();\n}",
                errors: 1
            }
        ]
    },
    "operator-linebreak": {
        valid: ["const x = a\n    + b;"],
        invalid: [
            {
                code: "const x = a +\n    b;",
                output: "const x = a\n    + b;",
                errors: 1
            }
        ]
    },
    "one-var-declaration-per-line": {
        valid: ["let a,\n    b;"],
        invalid: [
            // Note: This rule requires multiple declarations to flag an error
            // A single declaration won't trigger it
        ]
    },
    "wrap-iife": {
        valid: ["(function () {}());"],
        invalid: [
            {
                code: "const x = function () {}();",
                output: "const x = (function () {}());",
                errors: 1
            }
        ]
    },
    "unicode-bom": {
        valid: ["const x = 1;"],
        invalid: [
            {code: "\uFEFFconst x = 1;", output: "const x = 1;", errors: 1}
        ]
    },
    curly: {
        valid: ["if (true) {\n    foo();\n}", "while (true) {\n    bar();\n}"],
        invalid: [
            {
                code: "if (true) foo();",
                output: "if (true) {foo();}",
                errors: 1
            }
        ]
    },

    // ===== LINT RULES (some auto-fixable) =====
    "no-var": {
        valid: ["const x = 1;", "let y = 2;"],
        invalid: [
            {code: "var x = 1;", errors: 1},
            {code: "var y = 2;", errors: 1}
        ]
    },
    "prefer-const": {
        valid: ["const x = 1;", "let y = 1; y = 2;"],
        invalid: [{code: "let x = 1;", output: "const x = 1;", errors: 1}]
    },
    "arrow-body-style": {
        valid: [
            "const fn = () => 1;",
            "const fn = () => { foo(); return bar(); };"
        ],
        invalid: [
            {
                code: "const fn = () => { return 1; };",
                output: "const fn = () => 1;",
                errors: 1
            }
        ]
    },
    "no-extra-bind": {
        valid: ["const fn = function() { this.a; }.bind(obj);"],
        invalid: [
            {
                code: "const fn = function() {}.bind(obj);",
                output: "const fn = function() {};",
                errors: 1
            }
        ]
    },
    "no-extra-label": {
        valid: ["A: while (a) { break; B: while (b) { break A; } }"],
        invalid: [
            {
                code: "A: while (a) { break A; }",
                output: "A: while (a) { break; }",
                errors: 1
            }
        ]
    },
    "no-useless-rename": {
        valid: ["const {a} = obj;"],
        invalid: [
            {
                code: "const {a: a} = obj;",
                output: "const {a} = obj;",
                errors: 1
            }
        ]
    },
    "no-useless-return": {
        valid: ["function foo() { return 1; }"],
        invalid: [
            {
                code: "function foo() { bar(); return; }",
                output: "function foo() { bar();  }",
                errors: 1
            }
        ]
    },
    "no-useless-computed-key": {
        valid: ["const obj = {a: 1};"],
        invalid: [
            {
                code: "const obj = {[\"a\"]: 1};",
                output: "const obj = {\"a\": 1};",
                errors: 1
            }
        ]
    },
    "object-shorthand": {
        valid: ["const obj = {a, b};"],
        invalid: [
            {
                code: "const obj = {a: a};",
                output: "const obj = {a};",
                errors: 1
            }
        ]
    },
    "operator-assignment": {
        valid: ["x += 1;"],
        invalid: [{code: "x = x + 1;", output: "x += 1;", errors: 1}]
    },
    "prefer-numeric-literals": {
        valid: ["const x = 0b111;"],
        invalid: [
            {
                code: "const x = parseInt(\"111\", 2);",
                output: "const x = 0b111;",
                errors: 1
            }
        ]
    },
    "sort-imports": {
        valid: [
            {
                code: "import {a, b} from \"mod\";",
                parserOptions: {sourceType: "module"}
            }
        ],
        invalid: [
            {
                code: "import {b, a} from \"mod\";",
                output: "import {a, b} from \"mod\";",
                parserOptions: {sourceType: "module"},
                errors: 1
            }
        ]
    },
    "dot-notation": {
        valid: ["const x = obj.property;", "const y = obj[variable];"],
        invalid: [
            {
                code: "const x = obj[\"property\"];",
                output: "const x = obj.property;",
                errors: 1
            }
        ]
    },
    "no-else-return": {
        valid: ["function foo() {\n    if (x) { return 1; }\n    return 2;\n}"],
        invalid: [
            {
                code: "function foo() {\n    if (x) { return 1; } else { return 2; }\n}",
                output: "function foo() {\n    if (x) { return 1; }  return 2; \n}",
                errors: 1
            }
        ]
    },
    "no-lonely-if": {
        valid: ["if (a) {}\nelse if (b) {}"],
        invalid: [
            {
                code: "if (a) {}\nelse { if (b) {} }",
                output: "if (a) {}\nelse if (b) {}",
                errors: 1
            }
        ]
    },
    "no-undef-init": {
        valid: ["let x;"],
        invalid: [{code: "let x = undefined;", output: "let x;", errors: 1}]
    },
    "no-unneeded-ternary": {
        valid: ["const x = condition ? a : b;"],
        invalid: [
            {
                code: "const x = condition ? true : false;",
                output: "const x = !!condition;",
                errors: 1
            }
        ]
    },
    "prefer-arrow-callback": {
        valid: ["foo(() => {});"],
        invalid: [
            {
                code: "foo(function() {});",
                output: "foo(() => {});",
                errors: 1
            }
        ]
    },
    "prefer-template": {
        valid: ["const str = `hello ${name}`;"],
        invalid: [
            {
                code: "const str = \"hello \" + name;",
                output: "const str = `hello ${name}`;",
                errors: 1
            }
        ]
    },
    yoda: {
        valid: ["if (x === 1) {}"],
        invalid: [
            {code: "if (1 === x) {}", output: "if (x === 1) {}", errors: 1}
        ]
    },

    // ===== NON-FIXABLE LINT RULES =====
    eqeqeq: {
        valid: ["if (x === 1) {}", "if (y !== 2) {}"],
        invalid: [
            {code: "if (x == 1) {}", errors: 1},
            {code: "if (y != 2) {}", errors: 1}
        ]
    },
    "no-unused-expressions": {
        valid: ["const x = foo();", "if (x) { foo(); }"],
        invalid: [{code: "foo;", errors: 1}]
    },
    "no-eval": {
        valid: ["const result = calculate(x);"],
        invalid: [{code: "eval(\"2 + 2\");", errors: 1}]
    },
    "no-alert": {
        valid: ["console.log(\"message\");"],
        invalid: [{code: "alert(\"message\");", errors: 1}]
    },
    strict: {
        valid: [
            // Valid: function with "use strict"
            "function foo() {\n    \"use strict\";\n    return 1;\n}"
        ],
        invalid: [
            // Invalid: function without "use strict"
            {code: "function foo() {\n    return 1;\n}", errors: 1}
        ]
    },
    camelcase: {
        valid: ["const myVariable = 1;", "function myFunction() {}"],
        invalid: [{code: "const my_variable = 1;", errors: 1}]
    },
    "no-use-before-define": {
        valid: ["const x = 1;\nconst y = x + 1;"],
        invalid: [{code: "const y = x + 1;\nconst x = 1;", errors: 1}]
    },
    "no-array-constructor": {
        valid: ["const arr = [];", "const arr = [1, 2, 3];"],
        invalid: [{code: "const arr = new Array();", errors: 1}]
    },
    "no-new-object": {
        valid: ["const obj = {};", "const obj = {a: 1};"],
        invalid: [{code: "const obj = new Object();", errors: 1}]
    },
    "no-throw-literal": {
        valid: ["throw new Error(\"message\");"],
        invalid: [{code: "throw \"error\";", errors: 1}]
    },
    "no-with": {
        valid: ["const x = obj.property;"],
        invalid: [{code: "with (obj) { property; }", errors: 1}]
    },
    "no-bitwise": {
        valid: ["const x = a && b;"],
        invalid: [{code: "const x = a & b;", errors: 1}]
    },
    "no-caller": {
        valid: ["function foo() {}"],
        invalid: [{code: "function foo() { arguments.caller; }", errors: 1}]
    },
    "no-labels": {
        valid: ["while (x) { break; }"],
        invalid: [{code: "A: while (x) { break A; }", errors: 2}]
    },
    "no-loop-func": {
        valid: [
            "const arr = [1, 2, 3];\nfor (let i = 0; i < arr.length; i += 1) { arr[i]; }"
        ],
        invalid: [
            {
                code: "for (var i = 0; i < 10; i += 1) { setTimeout(function() { console.log(i); }); }",
                errors: 1
            }
        ]
    },
    "no-magic-numbers": {
        valid: ["const x = 0;", "const y = 1;"],
        invalid: [{code: "const x = a + 42;", errors: 1}]
    },
    "no-multi-str": {
        valid: ["const str = \"line1\\nline2\";"],
        invalid: [{code: "const str = \"line1\\\nline2\";", errors: 1}]
    },
    "no-new": {
        valid: ["const x = new Foo();"],
        invalid: [{code: "new Foo();", errors: 1}]
    },
    "no-new-func": {
        valid: ["const fn = function() {};"],
        invalid: [
            {
                code: "const fn = new Function(\"a\", \"b\", \"return a + b\");",
                errors: 1
            }
        ]
    },
    "no-new-wrappers": {
        valid: ["const str = String(x);"],
        invalid: [{code: "const str = new String(x);", errors: 1}]
    },
    "no-plusplus": {
        valid: ["i += 1;"],
        invalid: [{code: "i++;", errors: 1}]
    },
    "no-proto": {
        valid: ["Object.getPrototypeOf(obj);"],
        invalid: [{code: "obj.__proto__;", errors: 1}]
    },
    "no-return-assign": {
        valid: ["function foo() { const x = 1; return x; }"],
        invalid: [{code: "function foo() { return x = 1; }", errors: 1}]
    },
    "no-script-url": {
        valid: ["const url = \"http://example.com\";"],
        invalid: [{code: "const url = \"javascript:void(0)\";", errors: 1}]
    },
    "no-self-compare": {
        valid: ["if (x === y) {}"],
        invalid: [{code: "if (x === x) {}", errors: 1}]
    },
    "no-sequences": {
        valid: ["x = 1; y = 2;"],
        invalid: [{code: "if (x = 1, y = 2) {}", errors: 1}]
    },
    "no-undefined": {
        valid: ["let x;"],
        invalid: [{code: "const x = undefined;", errors: 1}]
    },
    "no-useless-call": {
        valid: ["foo();"],
        invalid: [{code: "foo.call(undefined, 1, 2);", errors: 1}]
    },
    "no-useless-concat": {
        valid: [
            "const str = \"hello world\";",
            "const str = variable + \" world\";"
        ],
        invalid: [{code: "const str = \"hello\" + \"world\";", errors: 1}]
    },
    "no-useless-constructor": {
        valid: ["class A { constructor(x) { this.x = x; } }"],
        invalid: [{code: "class A { constructor() {} }", errors: 1}]
    },
    "no-useless-escape": {
        valid: ["const str = \"\\n\";"],
        invalid: [{code: "const str = \"\\a\";", errors: 1}]
    },
    "no-void": {
        valid: ["const x = undefined;"],
        invalid: [{code: "const x = void 0;", errors: 1}]
    },
    "vars-on-top": {
        valid: ["function foo() { var x = 1; }"],
        invalid: [{code: "function foo() { foo(); var x = 1; }", errors: 1}]
    },
    "block-scoped-var": {
        valid: ["function foo() { const x = 1; }"],
        invalid: [
            {
                code: "function foo() { if (true) { var x = 1; } console.log(x); }",
                errors: 1
            }
        ]
    },
    "default-case": {
        valid: ["switch (x) { case 1: break; default: break; }"],
        invalid: [{code: "switch (x) { case 1: break; }", errors: 1}]
    },
    "guard-for-in": {
        valid: [
            "for (const key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) {} }"
        ],
        invalid: [
            {code: "for (const key in obj) { console.log(key); }", errors: 1}
        ]
    },
    "no-empty-function": {
        valid: ["function foo() { console.log(\"x\"); }"],
        invalid: [{code: "function foo() {}", errors: 1}]
    },
    "no-implicit-globals": {
        valid: ["const x = 1;"],
        invalid: [{code: "var x = 1;", errors: 1}]
    },
    "no-implied-eval": {
        valid: ["setTimeout(function() {}, 1000);"],
        invalid: [{code: "setTimeout(\"alert('x')\", 1000);", errors: 1}]
    },
    "no-iterator": {
        valid: ["const arr = [1, 2, 3];"],
        invalid: [{code: "obj.__iterator__ = function() {};", errors: 1}]
    },
    "no-lone-blocks": {
        valid: ["if (true) { const x = 1; }"],
        invalid: [{code: "{ bar(); }", errors: 1}]
    },
    "no-param-reassign": {
        valid: ["function foo(x) { const y = x + 1; }"],
        invalid: [{code: "function foo(x) { x = 1; }", errors: 1}]
    },
    "no-return-await": {
        valid: ["async function foo() { return bar(); }"],
        invalid: [
            {code: "async function foo() { return await bar(); }", errors: 1}
        ]
    },
    "require-await": {
        valid: ["async function foo() { await bar(); }"],
        invalid: [{code: "async function foo() { bar(); }", errors: 1}]
    },
    "no-duplicate-imports": {
        valid: [
            {
                code: "import {a, b} from \"mod\";",
                parserOptions: {sourceType: "module"}
            }
        ],
        invalid: [
            {
                code: "import {a} from \"mod\";\nimport {b} from \"mod\";",
                parserOptions: {sourceType: "module"},
                errors: 1
            }
        ]
    },
    "no-template-curly-in-string": {
        valid: ["const str = `hello ${name}`;"],
        invalid: [{code: "const str = \"hello ${name}\";", errors: 1}]
    },
    "no-await-in-loop": {
        valid: [
            {
                code: "async function foo() {\n    const results = await Promise.all(items.map(async (item) => process(item)));\n}",
                parserOptions: {ecmaVersion: 2021}
            }
        ],
        invalid: [
            {
                code: "async function foo() {\n    for (const item of items) { await process(item); }\n}",
                parserOptions: {ecmaVersion: 2021},
                errors: 1
            }
        ]
    },
    "array-callback-return": {
        valid: ["[1, 2, 3].map((x) => x * 2);"],
        invalid: [{code: "[1, 2, 3].map((x) => { x * 2; });", errors: 1}]
    },
    complexity: {
        valid: ["function foo() { return 1; }"],
        invalid: [
            {
                code: "function foo() { if (a) {} if (b) {} if (c) {} if (d) {} if (e) {} if (f) {} if (g) {} if (h) {} if (i) {} if (j) {} if (k) {} if (l) {} if (m) {} if (n) {} if (o) {} if (p) {} if (q) {} if (r) {} if (s) {} if (t) {} if (u) {} }",
                errors: 1
            }
        ]
    },
    "accessor-pairs": {
        valid: ["const obj = { get x() { return 1; }, set x(v) {} };"],
        invalid: [{code: "const obj = { set x(v) {} };", errors: 1}]
    },
    "class-methods-use-this": {
        valid: ["class A { foo() { this.bar(); } }"],
        invalid: [{code: "class A { foo() { bar(); } }", errors: 1}]
    },
    "consistent-this": {
        valid: ["const self = this;"],
        invalid: [{code: "const that = this;", errors: 1}]
    },
    "func-names": {
        valid: ["const foo = function () {};"],
        invalid: [{code: "const foo = function bar() {};", errors: 1}]
    },
    "func-style": {
        valid: ["const foo = function () {};"],
        invalid: [{code: "function foo() {}", errors: 1}]
    },
    "global-require": {
        valid: ["const mod = require(\"mod\");"],
        invalid: [
            {
                code: "function foo() { const mod = require(\"mod\"); }",
                errors: 1
            }
        ]
    },
    "max-depth": {
        valid: ["if (a) { if (b) {} }"],
        invalid: [
            {
                code: "if (a) { if (b) { if (c) { if (d) { if (e) {} } } } }",
                errors: 1
            }
        ]
    },
    "max-nested-callbacks": {
        valid: ["foo(function() { bar(function() {}); });"],
        invalid: [
            {
                code: "foo(function() { bar(function() { baz(function() { qux(function() { quux(function() { corge(function() { grault(function() { garply(function() { waldo(function() { fred(function() { plugh(function() {}); }); }); }); }); }); }); }); }); }); });",
                errors: 1
            }
        ]
    },
    "new-cap": {
        valid: ["const x = new Foo();"],
        invalid: [{code: "const x = new foo();", errors: 1}]
    },
    "no-eq-null": {
        valid: ["if (x === null) {}"],
        invalid: [{code: "if (x == null) {}", errors: 1}]
    },
    "no-extend-native": {
        valid: ["Object.defineProperty({}, \"foo\", {});"],
        invalid: [{code: "Object.prototype.foo = function() {};", errors: 1}]
    },
    "no-invalid-this": {
        valid: ["function foo() { return function() { this.bar(); }; }"],
        invalid: [
            {
                code: "\"use strict\";\n\nfunction foo() { this.bar(); }",
                errors: 1
            }
        ]
    },
    "no-label-var": {
        valid: ["const x = 1; A: while (true) {}"],
        invalid: [{code: "const x = 1; x: while (true) {}", errors: 1}]
    },
    "no-native-reassign": {
        valid: ["let Array = 1;"],
        invalid: [{code: "Array = 1;", errors: 1}]
    },
    "no-shadow-restricted-names": {
        valid: ["const myUndefined = 1;"],
        invalid: [{code: "const undefined = 1;", errors: 1}]
    },
    "no-octal-escape": {
        valid: ["const str = \"\\x07\";"],
        invalid: [{code: "const str = \"\\07\";", errors: 1}]
    },
    radix: {
        valid: ["parseInt(\"10\", 10);"],
        invalid: [{code: "parseInt(\"10\");", errors: 1}]
    },
    "symbol-description": {
        valid: [
            {
                code: "const sym = Symbol(\"description\");",
                parserOptions: {ecmaVersion: 2015}
            }
        ],
        invalid: []
    },
    "no-continue": {
        valid: ["for (let i = 0; i < 10; i += 1) { if (i === 5) { break; } }"],
        invalid: [
            {
                code: "for (let i = 0; i < 10; i += 1) { if (i === 5) { continue; } }",
                errors: 1
            }
        ]
    },
    "no-inline-comments": {
        valid: ["// comment\nconst x = 1;"],
        invalid: [{code: "const x = 1; // comment", errors: 1}]
    },
    "line-comment-position": {
        valid: ["// comment\nconst x = 1;"],
        invalid: [{code: "const x = 1; // comment", errors: 1}]
    },
    "one-var": {
        valid: ["const a = 1,\n    b = 2;"],
        invalid: []
    },
    "no-mixed-operators": {
        valid: ["const x = (a + b) * c;"],
        invalid: [{code: "const x = a + b * c;", errors: 2}]
    },
    "prefer-promise-reject-errors": {
        valid: ["Promise.reject(new Error(\"message\"));"],
        invalid: [{code: "Promise.reject(\"message\");", errors: 1}]
    },
    "func-name-matching": {
        valid: ["const foo = function foo() {};"],
        invalid: [{code: "const foo = function bar() {};", errors: 1}]
    },
    "no-unmodified-loop-condition": {
        valid: ["let i = 0; while (i < 10) { i += 1; }"],
        invalid: [{code: "const i = 0; while (i < 10) {}", errors: 1}]
    },
    "max-statements-per-line": {
        valid: ["const x = 1;\nconst y = 2;"],
        invalid: [{code: "const x = 1; const y = 2;", errors: 1}]
    },
    "no-confusing-arrow": {
        valid: ["const x = (a) => (a ? 1 : 2);"],
        invalid: [
            {
                code: "const x = a => a ? 1 : 2;",
                output: "const x = a => (a ? 1 : 2);",
                errors: 1
            }
        ]
    },
    "no-div-regex": {
        valid: ["const regex = /[=]/;"],
        invalid: [
            {
                code: "const regex = /=foo/;",
                output: "const regex = /[=]foo/;",
                errors: 1
            }
        ]
    },
    "no-constant-condition": {
        valid: ["if (x) {}"],
        invalid: [{code: "if (true) {}", errors: 1}]
    },
    "no-catch-shadow": {
        valid: ["const e = 1; try {} catch (err) {}"],
        invalid: [{code: "const e = 1; try {} catch (e) {}", errors: 1}]
    },
    "no-process-env": {
        valid: ["const x = config.value;"],
        invalid: [{code: "const x = process.env.VALUE;", errors: 1}]
    },
    "no-process-exit": {
        valid: ["throw new Error(\"exit\");"],
        invalid: [{code: "process.exit(1);", errors: 1}]
    },
    "no-sync": {
        valid: ["fs.readFile(\"file\", callback);"],
        invalid: [{code: "fs.readFileSync(\"file\");", errors: 1}]
    },
    "no-negated-in-lhs": {
        valid: ["if (!(key in obj)) {}"],
        invalid: [{code: "if (!key in obj) {}", errors: 1}]
    },
    "no-tabs": {
        valid: ["const x = 1;"],
        invalid: [{code: "\tconst x = 1;", errors: 1}]
    },
    "no-path-concat": {
        valid: ["const p = path.join(__dirname, \"file\");"],
        invalid: [{code: "const p = __dirname + \"/file\";", errors: 1}]
    },
    "no-new-require": {
        valid: ["const mod = require(\"mod\");"],
        invalid: [{code: "const mod = new require(\"mod\");", errors: 1}]
    },
    "handle-callback-err": {
        valid: ["function foo(err, data) { if (err) {} }"],
        invalid: [
            {
                code: "function foo(err, data) { console.log(data); }",
                errors: 1
            }
        ]
    },
    "no-restricted-globals": {
        valid: ["const x = 1;"],
        invalid: [
            // Note: This rule requires specific globals to be restricted in config
            // Since our config has no restrictions, no code will fail this rule
        ]
    },
    "no-restricted-imports": {
        valid: [
            {
                code: "import foo from \"foo\";",
                parserOptions: {sourceType: "module"}
            }
        ],
        invalid: [
            // Note: This rule requires specific imports to be restricted in config
            // Since our config has no restrictions, no code will fail this rule
        ]
    },
    "no-restricted-modules": {
        valid: ["const foo = require(\"foo\");"],
        invalid: [
            // Note: This rule requires specific modules to be restricted in config
            // Since our config has no restrictions, no code will fail this rule
        ]
    },
    "no-restricted-properties": {
        valid: ["const x = obj.prop;"],
        invalid: [
            // Note: This rule requires specific properties to be restricted in config
            // Since our config has no restrictions, no code will fail this rule
        ]
    },
    "no-restricted-syntax": {
        valid: ["const x = 1;"],
        invalid: [
            // Note: This rule requires specific syntax to be restricted in config
            // Since our config has no restrictions, no code will fail this rule
        ]
    },
    "id-blacklist": {
        valid: ["const myVar = 1;"],
        invalid: [
            // Note: This rule requires specific blacklisted identifiers in config
            // Since our config has no blacklist, no code will fail this rule
        ]
    },
    "id-match": {
        valid: ["const myVar = 1;"],
        invalid: [
            // Note: This rule requires a pattern in config
            // Since our config has no pattern, no code will fail this rule
        ]
    },

    // ===== ADDITIONAL RULES WITH PROPER TEST CASES =====
    "jsx-quotes": {
        valid: [
            {
                code: "<Component attr=\"value\" />",
                parserOptions: {ecmaFeatures: {jsx: true}}
            }
        ],
        invalid: [
            {
                code: "<Component attr='value' />",
                output: "<Component attr=\"value\" />",
                parserOptions: {ecmaFeatures: {jsx: true}},
                errors: 1
            }
        ]
    },
    "linebreak-style": {
        valid: ["const x = 1;\n"],
        invalid: [
            // Note: This rule is set to "warn" in config, not "error"
            // The test will pass if the code matches the system EOL
        ]
    },
    "newline-after-var": {
        valid: ["const x = 1;\n\nfoo();", "let y = 2;\n\nbar();"],
        invalid: [
            {
                code: "const x = 1;\nfoo();",
                output: "const x = 1;\n\nfoo();",
                errors: 1
            }
        ]
    },
    "no-spaced-func": {
        valid: ["foo();", "bar(1, 2);"],
        invalid: [{code: "foo ();", output: "foo();", errors: 1}]
    },
    "object-curly-newline": {
        valid: [
            "const obj = {a: 1, b: 2};",
            "const obj = {\n    a: 1,\n    b: 2\n};"
        ],
        invalid: [
            {
                code: "const obj = {a: 1,\n    b: 2};",
                output: "const obj = {\na: 1,\n    b: 2\n};",
                errors: 2
            }
        ]
    },
    "object-property-newline": {
        valid: [
            "const obj = {a: 1, b: 2};",
            "const obj = {\n    a: 1,\n    b: 2\n};"
        ],
        invalid: [
            {
                code: "const obj = {a: 1, b: 2,\n    c: 3};",
                output: "const obj = {a: 1,\nb: 2,\n    c: 3};",
                errors: 1
            }
        ]
    },
    "padding-line-between-statements": {
        valid: [
            "function foo() {\n    const x = 1;\n\n    return x;\n}",
            "function bar() {\n    const a = 1;\n    const b = 2;\n\n    foo();\n}"
        ],
        invalid: [
            {
                code: "function foo() {\n    const x = 1;\n    return x;\n}",
                output: "function foo() {\n    const x = 1;\n\n    return x;\n}",
                errors: 1
            },
            {
                code: "function bar() {\n    const x = 1;\n    foo();\n}",
                output: "function bar() {\n    const x = 1;\n\n    foo();\n}",
                errors: 1
            }
        ]
    },
    "max-params": {
        valid: ["function foo(a, b, c, d, e) {}"],
        invalid: [{code: "function foo(a, b, c, d, e, f) {}", errors: 1}]
    },

    // ===== RULES THAT ARE "OFF" - PROVIDE MINIMAL NON-ERROR TESTS =====
    "lines-around-comment": {
        valid: ["// comment\nconst x = 1;"],
        invalid: []
    },
    "lines-around-directive": {
        valid: ["\"use strict\";\n\nconst x = 1;"],
        invalid: []
    },
    "max-len": {
        valid: ["const x = 1;"],
        invalid: []
    },
    "multiline-ternary": {
        valid: ["const x = a ?\n    b :\n    c;"],
        invalid: []
    },
    "newline-before-return": {
        valid: ["function foo() {\n    const x = 1;\n\n    return x;\n}"],
        invalid: []
    },
    "newline-per-chained-call": {
        valid: ["obj.method1()\n    .method2()\n    .method3();"],
        invalid: []
    },
    "wrap-regex": {
        valid: ["const regex = /abc/;"],
        invalid: []
    },
    "callback-return": {
        valid: ["function foo(callback) { callback(); }"],
        invalid: []
    },
    "capitalized-comments": {
        valid: ["// Capitalized comment"],
        invalid: []
    },
    "consistent-return": {
        valid: ["function foo() { if (x) { return 1; } return 2; }"],
        invalid: []
    },
    "id-length": {
        valid: ["const myVar = 1;"],
        invalid: []
    },
    "init-declarations": {
        valid: ["let x = 1;"],
        invalid: []
    },
    "max-lines": {
        valid: ["const x = 1;"],
        invalid: []
    },
    "max-statements": {
        valid: ["function foo() { const a = 1; const b = 2; const c = 3; }"],
        invalid: []
    },
    "no-mixed-requires": {
        valid: ["const fs = require(\"fs\");"],
        invalid: []
    },
    "no-multi-assign": {
        valid: ["const x = 1;\nconst y = 2;"],
        invalid: []
    },
    "no-negated-condition": {
        valid: ["if (x) {} else {}"],
        invalid: []
    },
    "no-nested-ternary": {
        valid: ["const x = a ? b : c;"],
        invalid: []
    },
    "no-prototype-builtins": {
        valid: ["Object.prototype.hasOwnProperty.call(obj, key);"],
        invalid: []
    },
    "no-shadow": {
        valid: ["const x = 1; function foo() { const y = 2; }"],
        invalid: []
    },
    "no-ternary": {
        valid: ["const x = a || b;"],
        invalid: []
    },
    "no-underscore-dangle": {
        valid: ["const myPrivate = 1;"],
        invalid: []
    },
    "no-warning-comments": {
        valid: ["// Regular comment"],
        invalid: []
    },
    "prefer-reflect": {
        valid: ["Reflect.defineProperty(obj, key, desc);"],
        invalid: []
    },
    "prefer-rest-params": {
        valid: ["function foo(...args) { const arr = args; }"],
        invalid: []
    },
    "prefer-spread": {
        valid: ["Math.max(...arr);"],
        invalid: []
    },
    "require-jsdoc": {
        valid: ["/** JSDoc */ function foo() {}"],
        invalid: []
    },
    "sort-keys": {
        valid: ["const obj = {a: 1, b: 2};"],
        invalid: []
    },
    "sort-vars": {
        valid: ["let a,\n    b;"],
        invalid: []
    },
    "valid-jsdoc": {
        valid: ["/** Comment\n * @returns {void}\n */ function foo() {}"],
        invalid: []
    }
};

module.exports = RULE_TEST_CASES;
