const mongoose = require('mongoose');

const cartItem = new mongoose.Schema({
    item: {type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    quantity: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('CartItem', cartItem);