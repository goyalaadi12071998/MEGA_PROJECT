const express = require('express');
const router = express.Router();

router.get('/api/shop/signin',function (req, res){
    res.send({message: 'Helpers'});
});

module.exports = router;