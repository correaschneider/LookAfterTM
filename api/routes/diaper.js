const express = require('express');
const Diaper = require('../controllers/diaper');

const router = express.Router();

router.use('/diaper', (req, res, next) => {
    next();
});

router.get('/diaper', (req, res) => {
    Diaper.get().then((data) => res.send(data), (err) => res.send(err));
});

router.get('/diaper/:diaper_id', (req, res) => {
    let diaper_id = req.params.diaper_id;
    
    Diaper.getByID(diaper_id).then((data) => res.send(data), (err) => res.send(err));
});

module.exports = router;