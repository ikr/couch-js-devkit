(function (undefined) {
    'use strict';

    exports.foo = function (x) {
        return exports.bar(x);
    };

    exports.bar = function (x) {
        return 'Bar for ' + x;
    };
}());
