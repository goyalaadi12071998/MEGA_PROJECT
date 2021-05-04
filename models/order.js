const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    item : String,
    price : Number,
    quantity : Number,
    shop: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Order',orderSchema);