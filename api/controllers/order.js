const couch = require('../services/db');

const dbName_orders = 'orders';
const dbName_diapers = 'diapers';

const view_all_diapers = '_design/all_diapers/_view/all';

const Order = {
    get (order) {
        return couch.get(dbName_diapers, order.diaper_id).then((result) => {
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
    
                return couch.update(dbName_diapers, diaper).then((result) => {
                    return couch.insert(dbName_orders, order).then((result) => {
                        return {
                            message: `You bougth ${diaper.model} with size ${order.size}`
                        };
                    }, (err) => err);
                }, (err) => err);
            } else {
                return {
                    message: 'This diaper, don\'t have more in the stock'
                };
            }
        }, (err) => err);
    }
}

module.exports = Order;