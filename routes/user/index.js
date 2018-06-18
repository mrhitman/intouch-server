const express = require('express');
const router = new express.Router();

router.get('/login', require('./login'));
router.get('/logout', require('./logout'));
router.get('/register', require('./register'));

module.exports = router;