const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/require-auth');
const Menu = require('../models/menu');
const Shop = require('../models/shop');

router.get('/api/shop/addproduct',requireAuth, async function (req, res){
    res.render('addproduct.ejs');
})

router.post('/api/shop/addproduct',requireAuth, async (req, res) => {
    const {item, price, quantity} = req.body;
    const newMenu = new Menu({
        item: item,
        price: price,
        quantity: quantity,
        shop: req.currentShop._id 
    });
    await newMenu.save();
    res.redirect('/api/shop/addproduct');
});

router.get('/api/shop', requireAuth ,async (req, res) => {
    const menu = await Menu.find({shop: req.currentShop._id, quantity: {$gt: 0}});
    const shop = await Shop.findById(req.currentShop._id);
    return res.render("tabledata2.ejs",{menu: menu, shop: shop});
})

router.get('/api/shop/:id', async function(req, res){
    const menu = await Menu.find({shop: req.params.id, quantity: {$gt: 0}});
    const shop = await Shop.findById(menu[0].shop);
    console.log(menu[0]);
    return res.render("tabledata.ejs",{menu: menu, shop: shop});
});

module.exports = router;