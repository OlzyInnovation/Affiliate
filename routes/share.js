const router = require('express').Router();
const facebookController = require('./shareControllers/facebookController');
const telegramController = require('./shareControllers/telegramController');
const twitterController = require('./shareControllers/twitterController');
const wordpressController = require('./shareControllers/twitterController');

// router.route('/facebook').post(facebookController.add);

router.route('/telegram').post(telegramController.index);

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
