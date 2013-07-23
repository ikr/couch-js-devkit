(function () {
    'use strict';

    ['couchModuleText', 'updateSchema'].forEach(function (toExport) {
        module.exports[toExport] = require('./src/' + toExport);
    });
}());
