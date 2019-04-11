const NodeCouchDB = require('node-couchdb');

const couch = new NodeCouchDB({
    host: 'lookafter_db',
    auth: {
        user: 'lookafter',
        pass: 'lookafter'
    }
});

module.exports = couch;