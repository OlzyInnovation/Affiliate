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
  .post(affiliateController.add);
// .put(affiliateController.update);

router.route('/header').get(headerController.index).post(headerController.add);
// .put(affiliateController.update);
router
  .route('/ownShortener')
  .get(ownShortenerController.index)
  .post(ownShortenerController.add);
// .put(affiliateController.update);
router
  .route('/textReplace')
  .get(textReplaceController.index)
  .post(textReplaceController.add);
// .put(affiliateController.update);
router
  .route('/urlReplace')
  .get(urlReplaceController.index)
  .post(urlReplaceController.add);
// .put(affiliateController.update);
router
  .route('/whitelist')
  .get(whitelistController.index)
  .post(whitelistController.add);
// .put(affiliateController.update);

module.exports = router;
