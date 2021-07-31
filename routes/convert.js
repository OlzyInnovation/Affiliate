const router = require('express').Router();
const converter = require('../helpers/converter');

router.route('/convert').post(converter.index);

module.exports = router;
