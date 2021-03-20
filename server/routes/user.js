const express = require('express');
const user = require('../controllers/user.js');

const router = express.Router();

router.post('/signin', user.signin);
router.post('/signup', user.signup);

module.exports = router;