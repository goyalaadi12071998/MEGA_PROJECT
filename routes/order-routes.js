const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.post('/api/shop/order', async function (req, res){
    console.log(req.body);
    const newOrder = new Order({
        item: req.body.item,
        price: req.body.price*req.body.quantity,
        quantity: req.body.quantity,
        shop: req.body.shop_id
    });
    await newOrder.save();
    delete newOrder._id;
    return res.send({newOrder: newOrder});
});

module.exports = router;