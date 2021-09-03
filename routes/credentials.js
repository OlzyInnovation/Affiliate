const router = require('express').Router();
const facebookController = require('../controllers/credentialControllers/facebookController');
const telegramController = require('../controllers/credentialControllers/telegramController');
const twitterController = require('../controllers/credentialControllers/twitterController');
const wordpressController = require('../controllers/credentialControllers/twitterController');

router
  .route('/facebook')
  .get(facebookController.index)
  .post(facebookController.add);
// .put(facebookController.update);

router
  .route('/telegram')
  .get(telegramController.index)
  .post(telegramController.add)
  .put(telegramController.update)
  .delete(telegramController.delete)

router
  .route('/twitter')
  .get(twitterController.index)
  .post(twitterController.add);
// // .put(twitterController.update);

router
  .route('/wordpress')
  .get(wordpressController.index)
  .post(wordpressController.add);
// .put(wordpressController.update);

module.exports = router;
