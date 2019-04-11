const express = require('express');
const router = express.Router();

const couch = require('../services/db');

const dbName_orders = 'orders';
const dbName_diapers = 'diapers';

const view_all_diapers = '_design/all_diapers/_view/all';

router.use('/', (req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    couch.get(dbName_diapers, view_all_diapers).then((result) => {
        res.send(result.data);
    }, (err) => res.send(err));
});

module.exports = router;