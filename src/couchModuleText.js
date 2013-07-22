(function (undefined) {
    'use strict';

    var _ = require('underscore');

    module.exports = function (nodeModule, dependencyNameToPathMap) {
        return _.map(dependencyNameToPathMap, function (path, name) {
            return ['var ', name, ' = require(\'', path, '\');'].join('');
        }).concat(
            _.isFunction(nodeModule) ?
            ['module.exports = ', nodeModule.toString(), ';'].join('') :

            _.map(nodeModule, function (method, methodName) {
                return ['exports.', methodName, ' = ', method.toString(), ';'].join('');
            })
        ).join('\n');
    };
}());
