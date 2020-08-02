const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        required: true
    },
    cart: [{type: mongoose.Schema.Types.ObjectId, ref: 'CartItem'}],
    created: {
        type: Date,
        default: Date.now
    },
});
userSchema.pre('save', async function(next) {
    try {
        if(!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this.password, 10);
        this.password = hashed;
        return next();
    } catch(err) {
        next(err);
    }
});

userSchema.methods.comparePassword = async function(attempt, next) {
    try {
        return await bcrypt.compare(attempt, this.password);
    } catch(err) {
        err.status = 400;
        next(err);
    }
}
module.exports = mongoose.model('User', userSchema);