const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    isDelverable: {
        type: Boolean,
        default: true
    },
    items : {
        type: Array,
        default: []
    },
    address: {
        type: String,
        required: true,
        default: 'Not Applicable'
    }
});

module.exports = mongoose.model('Order',orderSchema);