const router = require('express').Router();

const controller = require('../controllers');
const auth = require('../middleware/auth');

router.route('/')
    .get(auth, controller.getCart)

router.route('/:id')
    .delete(auth, controller.removeItem)
    .post(auth, controller.addItem)

router.route('/:id/:val')
    .put(auth, controller.changeCount)
module.exports = router;