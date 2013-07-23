/* jshint nomen: false */

(function (undefined) {
    'use strict';

    module.exports = function (dbName, schemaName, schema) {
        var cradle = require('cradle'),
            db = new (cradle.Connection)().database(dbName),
            consoleCallback = function (err, res) { console.info(err || res); };

        db.get('_design/' + schemaName, function (err, res) {
            if (err && ('not_found' === err.error)) {
                db.save('_design/' + schemaName, schema, consoleCallback);
            }
            else if (err) {
                console.info(err);
            }
            else {
                db.save('_design/' + schemaName, res._rev, schema, consoleCallback);
            }
        });
    };
}());
