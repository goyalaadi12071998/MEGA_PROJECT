const jwt = require('jsonwebtoken');
const Shop = require('../models/shop');

module.exports = async function(req, res, next) {
    if(!req.session || !req.session.token || !req.session.shopActive){
        res.redirect('/api/shop/login');
        //return res.status(403).send({message: 'Authentication Failed'});
    }
    try {    
        const payload = await jwt.verify(req.session.token,process.env.JWT_SECRET);
        const shop = await Shop.findOne({email: payload.email});
        req.currentShop = shop;
        next();
    }catch(err){
        return res.status(500).send({message: 'Internal Server Error ', err});
    }
}