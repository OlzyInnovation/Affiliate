const router = require('express').Router();
// const facebookController = require('./credentialControllers/facebookController');
const telegramController = require('../controllers/credentialControllers/telegramController');
// const twitterController = require('./credentialControllers/twitterController');
// const wordpressController = require('./credentialControllers/twitterController');

// router
//   .route('/facebook')
//   .get(facebookController.index)
//   .post(facebookController.add)
//   .put(facebookController.update);

router
  .route('/telegram')
  .get(telegramController.index)
  .post(telegramController.add)
  .put(telegramController.update);

// router
//   .route('/twitter')
//   .get(twitterController.index)
//   .post(twitterController.add)
//   .put(twitterController.update);

// router
//   .route('/wordpress')
//   .get(wordpressController.index)
//   .post(wordpressController.add)
//   .put(wordpressController.update);

module.exports = router;
