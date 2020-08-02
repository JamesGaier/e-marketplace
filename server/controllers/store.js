const db = require('../models');
exports.getProducts = async (req, res, next) => {
    try {
        //const items = await db.Item.find()
        const items = await db.Item.find();
        res.status(200).json(items);
    } catch(err) {
        err.status = 400;
        next(err);
    }
};
exports.addProduct = async (req, res, next) => {
    try {
        const { name, price, imgPath } = req.body;

        await db.Item.create({
            name,
            price,
            imgPath
        });
        res.status(201).json({name, price, imgPath});
    } catch(err) {
        err.status = 400;
        next(err);
    }
};
exports.removeProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedItem = await db.Item.findById(id);
        await db.Item.findByIdAndDelete(id);
        res.status(200).json(deletedItem);
    } catch(err) {
        err.status = 400;
        next(err);
    }
};
exports.findProduct = async (req, res, next) => {
    try {
        const { q } = req.query;
        const result = await db.Item.find({"name": {"$regex": q, "$options": "i"}});
        res.status(200).json({result});
    } catch(err) {
        err.status = 400;
        next(err);
    }
};