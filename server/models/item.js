const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    imgPath: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Item', itemSchema);