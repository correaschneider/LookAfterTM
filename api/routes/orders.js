const express = require('express');
const router = express.Router();

const couch = require('../services/db');

const dbName_orders = 'orders';
const dbName_diapers = 'diapers';

const view_all_diapers = '_design/all_diapers/_view/all';

router.use('/orders', (req, res, next) => {
    next();
});

router.post('/orders', (req, res) => {
    let order = {
        diaper_id: req.body.diaper_id,
        _rev: req.body.rev,
        size: req.body.size,
        quantity: req.body.quantity,
        time: new Date().getTime()
    };
    
    couch.get(dbName_diapers, order.diaper_id).then((result) => {
        let diaper = result.data;

        let size = diaper.sizes.filter((size) => size.size === order.size);
        size = size[0];
        
        if (size.avaliable >= order.quantity) {
            diaper.sizes.map((size, i) => {
                if (size.size === order.size) {
                    diaper.sizes[i].avaliable -= order.quantity;
                    diaper.sizes[i].purchased += order.quantity;
                }
            });

            couch.update(dbName_diapers, diaper).then((result) => {
                couch.insert(dbName_orders, order).then((result) => {
                    res.send({message: `You bougth ${order.model} with size ${order.size}`});
                }, (err) => res.send(err));
            }, (err) => res.send(err));
        } else {
            res.status(401).send({message: 'This diaper, don\'t have more in the stock'});
        }
    }, (err) => res.send(err));
});

module.exports = router;