const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.headers['x-auth-token'];
    if(!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch(err) {
        err.status = 400;
        next(err);
    }
};
module.exports = auth;