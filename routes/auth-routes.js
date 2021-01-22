const express = require('express');
const router = express.Router();
const Shop = require('../models/shop');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const requireAuth = require('../middlewares/require-auth');

router.post('/api/shop/signup',async function (req, res){
    const {name, email, password} = req.body;
    try {    
        const existingShop = await Shop.findOne({email});
        if(existingShop) {
            return res.status(409).send({message: 'Shop already exists'});
        }
        const hash = await bcrypt.hash(password,10);
        const shop = new Shop({
            name: name,
            email: email,
            password: hash
        });
        await shop.save();
        return res.status(200).send({message: 'Shop Created Successfully', shop});
    }catch(err){
        return res.status(500).send({message: 'Internal Server Error', err});
    }
});

router.post('/api/shop/login', async function (req, res){
    const {email, password} = req.body;
    try {
        let shop = await Shop.findOne({email: email});
        if(!shop){
            return res.status(400).send({message: 'Shop not found'});
        }
        const isMatch = await bcrypt.compare(password,shop.password);
        if(!isMatch){
            return res.status(400).send({message: 'Credentials mismatch'});
        }
        const token = await jwt.sign({id: shop._id , email: shop.email },process.env.JWT_SECRET);
        req.session = {token: token, shopActive: true};
        return res.status(200).send({shop,token});        

    }catch(err){
        return res.status(500).send({message: 'Internal Server Error ',err});
    }
});

router.post('/api/shop/logout', (req, res) => {
    req.session = null;
    res.status(200).send({message: 'Logout successfully'});
});

module.exports = router;