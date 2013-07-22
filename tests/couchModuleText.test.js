/* jshint evil: true */

(function (undefined) {
    'use strict';

    var assert = require('assert'),
        couchModuleText = require('../src/couchModuleText'),
        dummyModule = require('./dummyModule'),
        dummyFnModule = require('./dummyFnModule');

    describe('dummyModule', function () {
        it('works', function () {
            assert.strictEqual(dummyModule.foo('ikr'), 'Bar for ikr');
        });
    });

    describe('dummyFnModule', function () {
        it('works', function () {
            assert.strictEqual(dummyFnModule(42), 42);
        });
    });

    describe('couchModuleText', function () {
        it('generates "exports.bar = " code', function () {
            assert(couchModuleText(dummyModule).indexOf('exports.bar =') >= 0);
        });

        it('produces the code which, when eval-ed in the current scope, still runs', function () {
            var exports = {};
            eval(couchModuleText(dummyModule));
            assert.strictEqual(exports.foo('ikr'), 'Bar for ikr');
        });

        it('includes the CommonJS dependency declaration', function () {
            var declarationCode = 'var _ = require(\'views/lib/underscore\');';

            assert(
                couchModuleText(
                    dummyModule,
                    {_: 'views/lib/underscore'}
                ).indexOf(declarationCode) >= 0,

                'Expected to contain: ' + declarationCode
            );
        });

        it('generates module.exports for a function', function () {
            assert(couchModuleText(dummyFnModule).indexOf('module.exports =') >= 0);
            assert(couchModuleText(dummyFnModule).indexOf('return x;') > 0);
        });
    });
}());
