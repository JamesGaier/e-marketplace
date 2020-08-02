const jwt = require('jsonwebtoken');

const db = require('../models');
exports.user = async (req, res, next) => {
    try {
        const { id } = req.user;

        await db.User.findById(id)
                .select('-password')
                .then(user => res.status(200).json(user));
    } catch(err) {
        err.status = 400;
        next(err);
    }
};
exports.register = async (req, res, next) => {
    try {
        if((await db.User.findOne({email: req.body.email})) === null){
            const user = await db.User.create(req.body);
            const { id, username, email } = user;

            const token = jwt.sign({id, email}, process.env.SECRET);
            res.status(201).json({
                id,
                username,
                token
            });
        }
        else {
            throw Error('user already exists');
        }
    } catch(err) {
        next({
            status: 400,
            message: err.message
        });
    }
};
exports.login = async (req, res, next) => {
    try {
        const user = await db.User.findOne({email: req.body.email});

        const { id, email, username} = user;


        const valid = await user.comparePassword(req.body.password);

        if(valid) {
            const token = jwt.sign({id, email}, process.env.SECRET);
            res.json({
                id,
                username,
                token
            });
        }
        else {
            throw new Error();
        }

    } catch(err) {
        err.status = 400;
        next(err);
    }
};

