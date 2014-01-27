/* jshint nomen: false */

(function (undefined) {
    'use strict';

    module.exports = function (dbName, schemaName, schema, callback) {
        var cradle = require('cradle'),
            db = new (cradle.Connection)().database(dbName);

        db.get('_design/' + schemaName, function (err, res) {
            if (err && ('not_found' === err.error)) {
                db.save('_design/' + schemaName, schema, callback);
            }
            else if (err) {
                callback(err);
            }
            else {
                db.save('_design/' + schemaName, res._rev, schema, callback);
            }
        });
    };
}());
