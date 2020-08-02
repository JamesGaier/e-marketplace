const db = require('../models');
exports.getCart = async (req, res, next) => {
    try {

        const { id } = req.user;
        const cart = await db.CartItem.find({user: id}).populate('item').exec();
        res.status(200).json(cart);
    } catch(err) {
        err.status = 400;
        next(err);
    }
};
exports.addItem = async (req, res, next) => {
    try {
        const { id: itemId } = req.params;
        const { id: userId } = req.user;
        const user = await db.User.findById(userId);

        if(await db.CartItem.count({item: itemId}) > 0) {
            throw new Error('item already in cart');
        }
        const item = await db.Item.findById(itemId);

        const cartItem  = await db.CartItem.create({
            item: item._id,
            user: user._id,
            quantity: 1
        });
        user.cart.push({ _id: cartItem._id});
        await user.save();
        const toRet = await db.CartItem.findOne({item: itemId}).populate('item').exec();
        res.status(200).json(toRet);
    } catch(err) {
        err.status = 400;
        next(err);
    }
};
exports.removeItem = async (req, res, next) => {
    try {
        // destructured alias, renamed destructured name
        const { id: cartId } = req.params;
        const { id: userId } = req.user;

        // get user from database
        const user = await db.User.findById(userId);

        const cartItem = await db.CartItem.findById(cartId);

        //console.log(storeItem);
        if(user.cart.length === 0) throw Error('Item does not exist');
        user.cart = user.cart.filter(item => {
            if(JSON.stringify(item._id) !== JSON.stringify(cartItem._id)) {
                return item;
            }
        });
        await db.CartItem.findById(cartId).remove().exec();
        await user.markModified('cart');
        await user.save();
        res.status(200).json(cartItem);
    } catch(err) {
        err.status = 400;
        next(err);
    }

};
exports.changeCount = async (req, res, next) => {
    try {
        const { id: cartId, val } = req.params;
        const { id: userId } = req.user;
        const user = await db.User.findById(userId);


        const item = await db.CartItem.findById(cartId);

        item.quantity = val;

        await item.save();
        await user.save();
        res.status(200).json(item);
    } catch(err) {
        err.status = 400;
        next(err);
    }
};
