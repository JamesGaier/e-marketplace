const router = require('express').Router();

const controller = require('../controllers');
const auth = require('../middleware/auth');
router.get('/user', auth, controller.user);
router.post('/register', controller.register);
router.post('/login', controller.login);

module.exports = router;