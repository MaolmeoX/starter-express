const router = require('express').Router();
const userController = require('../controllers/users.controller');

router.use('/api', require('./api'));

// router.post("/login", userController.postLogin);
router.post("/users", userController.postUser);

module.exports = router;