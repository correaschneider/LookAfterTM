const express = require('express');
const Order = require('../controllers/order');

const router = express.Router();

router.use('/order', (req, res, next) => {
    next();
});

router.post('/order', (req, res) => {
    let order = {
        diaper_id: req.body.diaper_id,
        _rev: req.body.rev,
        size: req.body.size,
        quantity: req.body.quantity,
        time: new Date().getTime()
    }

    Order.get(order).then((data) => res.send(data), (err) => res.send(err));
});

module.exports = router;