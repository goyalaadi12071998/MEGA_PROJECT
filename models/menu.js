const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    item : {
        type : String,
        required : true
    },
    price: {
        type : Number,
        required : true
    },
    quantity: {
        type : Number,
        required : true
    },
    shop : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required : true
    }
});

module.exports = mongoose.model('Menu',menuSchema);