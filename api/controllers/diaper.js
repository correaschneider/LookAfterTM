const couch = require('../services/db');

const dbName_orders = 'orders';
const dbName_diapers = 'diapers';

const view_all_diapers = '_design/all_diapers/_view/all';

const Diaper = {
    get () {
        return couch.get(dbName_diapers, view_all_diapers).then((result) => {
            return result.data;
        }, (err) => err);
    },
    
    set (diaper) {
        diaper.sizes.map((size, i) => {
            diaper.sizes[i].last_update = new Date().getTime();
        });

        return couch.insert(dbName_diapers, diaper).then((result) => {
            return result.data;
        }, (err) => err);
    },

    getByID (id) {
        return couch.get(dbName_diapers, id).then((result) => {
            let diaper = result.data;

            let sizes = diaper.sizes.map(async (size, i) => {
                let mangoQuery = {
                    selector: {
                        diaper_id: {
                            $eq: id
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

                        orders.sort(function (a, b) {
                            if (a.time > b.time) {
                                return 1;
                            }
                            if (a.time < b.time) {
                                return -1;
                            }
                            return 0;
                        });
                        
                        let lastTime = size.last_update;
                        orders.map((order) => {
                            itemsTotal += order.quantity;
                            
                            diffTime = order.time - lastTime;
                            diffMinutes += diffTime;
                            
                            lastTime = order.time;
                        });
                        
                        diffMinutes = new Date(diffMinutes).getMinutes();

                        let total = (avaliable * diffMinutes) / itemsTotal;

                        size.time_to_zero = Math.ceil(total);
                    }

                    return size;
                }, (err) => err);
            });

            return Promise.all(sizes).then((sizes) => {
                diaper.sizes = sizes;

                return diaper
            }, (err) => err);
        }, (err) => err);
    }
}

module.exports = Diaper;