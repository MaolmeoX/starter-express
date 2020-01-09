const router = require('express').Router();

router.use('/users', require('./users.route'));

module.exports = router;