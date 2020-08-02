const router = require('express').Router();

const controller = require('../controllers');


router.route('/')
    .get(controller.getProducts)
    .post(controller.addProduct)

router.route('/:id')
    .delete(controller.removeProduct)
router.route('/search')
    .get(controller.findProduct)

module.exports = router;