const router = require('express').Router();
const {
  wordpress,
  twitter,
  telegram,
  facebook,
} = require('../controllers/shareControllers/share');

router.route('/wordpress').post(wordpress);

router.route('/twitter').post(twitter);

router.route('/telegram').post(telegram);

router.route('/facebook').post(facebook);

module.exports = router;
