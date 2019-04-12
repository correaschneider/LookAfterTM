const NodeCouchDB = require('node-couchdb');

const couch = new NodeCouchDB({
    host: 'lookafter_db',
    auth: {
        user: 'lookafter',
        pass: 'lookafter'
    }
});

const dbs = ['orders', 'diapers'];

couch.listDatabases().then((_dbs) => {
    dbs.map((db) => {
        if (!_dbs.includes(db)) {
            couch.createDatabase(db).then(() => {}, err => console.log(err));
        }
    });
}, err => console.log(err));

module.exports = couch;