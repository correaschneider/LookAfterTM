const express = require('express');
const router = express.Router();

const couch = require('../services/db');

const dbName_orders = 'orders';
const dbName_diapers = 'diapers';

const view_all_diapers = '_design/all_diapers/_view/all';

router.use('/diaper', (req, res, next) => {
    next();
});

router.get('/diaper/:diaper_id', (req, res) => {
    let diaper_id = req.params.diaper_id;
    couch.get(dbName_diapers, diaper_id).then((result) => {
        let diaper = result.data;

        let sizes = diaper.sizes.map(async (size, i) => {
            let mangoQuery = {
                selector: {
                    diaper_id: {
                        $eq: diaper_id
                    },
                    size: {
                        $eq: size.size
                    }
                }
            };
            let parameters = {};
            
            return couch.mango(dbName_orders, mangoQuery, parameters).then((result) => {
                let orders = result.data.docs;
                let ordersTotal = orders.length;

                if (ordersTotal >= 2) {
                    let itemsTotal = 0;
                    let diffTime = 0;
                    let diffMinutes = 0;
                    let avaliable = size.avaliable;

                    console.log(orders)
                    
                    orders.sort(function (a, b) {
                        if (a.time > b.time) {
                            return 1;
                        }
                        if (a.time < b.time) {
                            return -1;
                        }
                        return 0;
                    });
                    
                    console.log(orders)
                    
                    orders.map((order) => {
                        itemsTotal += order.quantity;
                    });

                    diffTime = Math.abs((orders[ordersTotal - 1].time || 0) - (orders[0].time || 0));
                    diffMinutes += Math.floor(diffTime / (1000 * 60)); 

                    let total = avaliable - (itemsTotal * diffMinutes);

                    size.time_to_zero = total;
                }

                return size;
            }, (err) => res.send(err));
        });

        Promise.all(sizes).then((sizes) => {
            res.send(diaper)
        });
    }, (err) => res.send(err));
});

module.exports = router;