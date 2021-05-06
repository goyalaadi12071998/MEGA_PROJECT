const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Shop = require('../models/shop');
const requireAuth = require('../middlewares/require-auth');
const Menu = require('../models/menu');

router.post('/api/shop/order', async function (req, res){
    console.log(req.body);
    const newOrder = new Order({
        item: req.body.item,
        price: req.body.price*req.body.quantity,
        quantity: req.body.quantity,
        shop: req.body.shop_id
    });
    let menu = await Menu.findById(req.body.menuid);
    menu.quantity = menu.quantity-req.body.quantity;
    await menu.save();
    await newOrder.save();
    delete newOrder._id;
    return res.render("order.ejs",{newOrder: newOrder});
});

router.get('/api/shop/order',requireAuth, async (req, res)=>{
    const orders = await Order.find({shop:req.currentShop._id});
    const shop = await Shop.findById(req.currentShop._id);
    console.log(orders);
    res.render("tabledata3.ejs",{orders: orders, shop: shop});
})

module.exports = router;