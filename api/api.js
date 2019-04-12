const express = require('express');
const bodyParser = require('body-parser');

const order = require('./routes/order');
const diaper = require('./routes/diaper');

const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(order);
app.use(diaper);

app.listen(port, () => console.log(`Server started on port ${port}`));