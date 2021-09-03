const router = require('express').Router();
const affiliateController = require('../controllers/miscControllers/affiliateController');
const headerController = require('../controllers/miscControllers/headerController');
const ownShortenerController = require('../controllers/miscControllers/ownShortenerController');
const textReplaceController = require('../controllers/miscControllers/textReplaceController');
const urlReplaceController = require('../controllers/miscControllers/urlReplaceController');
const whitelistController = require('../controllers/miscControllers/whitelistController');

router
  .route('/affiliate')
  .get(affiliateController.index)
  .post(affiliateController.add)
  .put(affiliateController.update)
  .delete(affiliateController.delete);

router
  .route('/header')
  .get(headerController.index)
  .post(headerController.add)
  .put(headerController.update)
  .delete(headerController.delete);
router
  .route('/ownShortener')
  .get(ownShortenerController.index)
  .post(ownShortenerController.add)
  .put(ownShortenerController.update)
  .delete(ownShortenerController.delete);
router
  .route('/textReplace')
  .get(textReplaceController.index)
  .post(textReplaceController.add)
  .put(textReplaceController.update)
  .delete(textReplaceController.delete);
router
  .route('/urlReplace')
  .get(urlReplaceController.index)
  .post(urlReplaceController.add)
  .put(urlReplaceController.update)
  .delete(urlReplaceController.delete);
router
  .route('/whitelist')
  .get(whitelistController.index)
  .post(whitelistController.add)
  .put(whitelistController.update)
  .delete(whitelistController.delete);

module.exports = router;
