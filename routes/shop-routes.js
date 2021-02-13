const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/require-auth');
const Menu = require('../models/menu');

router.post('/api/shop/addproduct',requireAuth, async (req, res) => {
    const {item, price, quantity} = req.body;
    const newMenu = new Menu({
        item: item,
        price: price,
        quantity: quantity,
        shop: req.currentShop._id
    });
    await newMenu.save();
    return res.status(200).send({message: 'Item added successfully'});
});

router.get('/api/shop/:id', async function(req, res){
    const menu = await Menu.find({shop: req.params.id, quantity: {$gt: 0}});
    return res.status(200).send({message: 'Item in shop' , menu});
});

module.exports = router;