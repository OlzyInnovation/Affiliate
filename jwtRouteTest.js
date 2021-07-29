const router = require('express').Router();
const auth = require('./validation/verifyToken');

router.get('/', auth, (req, res) => {
  res.send({ message: 'Successfully Entered Protected Route' });
});

module.exports = router;
