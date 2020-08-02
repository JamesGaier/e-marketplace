
module.exports = {
    ...require('./auth'),
    ...require('./cart'),
    ...require('./store')
};
module.exports.notFound = (res, req, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
};
module.exports.errors = (err, req, res, next) => {
    res.status(err.status || 400).json({
        message: err.message || 'Something went wrong'
    });
};