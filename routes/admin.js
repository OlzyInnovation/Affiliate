const express = require('express');
const router = express.Router();
const { users } = require('../controllers/admin');

router.route('/users').post(users);

module.exports = router;
