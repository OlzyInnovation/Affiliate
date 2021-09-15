const Affiliate = require('../../models/misc/AffiliateSetting');
const { decoded } = require('../../helpers/decodedJWT');

module.exports = {
  index: async (req, res, next) => {
    id = decoded(req);

    const data = await Affiliate.findOne({ _id: id });

    if (!data) res.status(400).send('No credentials added yet!');

    res.send(data);
  },

  add: async (req, res, next) => {
    id = decoded(req);

    let conf = req.body;
    conf._id = id;
    try {
      const user = await Affiliate.create({
        conf,
      });
      res
        .status(200)
        .json({ success: true, data: 'Affiliate Configuration Added' });
    } catch (error) {
      // return next(new ErrorResponse('Something went wrong!', 500));
    }
  },
  update: async (req, res, next) => {
    id = decoded(req);
    const {
      amazon_tag_id,
      earnkaro_referral_link,
      earnkaro_id,
      inr_deals_username,
      flipkart_affid,
      cuelinks_id,
      convert_amazon,
      convert_flipkart,
      convert_others,
    } = req.body;

    try {
      if (amazon_tag_id) {
        await Affiliate.updateOne(
          {
            _id: id,
          },
          { $set: { amazon_tag_id: amazon_tag_id } }
        );
      }

      if (earnKaro_referral_link) {
        await Affiliate.updateOne(
          { _id: id },
          { $set: { earnKaro_referral_link: earnKaro_referral_link } }
        );
      }
      if (earnkaro_id) {
        await Affiliate.updateOne(
          { _id: id },
          { $set: { earnkaro_id: earnkaro_id } }
        );
      }
      if (inr_deals_username) {
        await Affiliate.updateOne(
          { _id: id },
          { $set: { inr_deals_username: inr_deals_username } }
        );
      }
      if (flipkart_affid) {
        await Affiliate.updateOne(
          { _id: id },
          { $set: { flipkart_affid: flipkart_affid } }
        );
      }
      if (cuelinks_id) {
        await Affiliate.updateOne(
          { _id: id },
          { $set: { cuelinks_id: cuelinks_id } }
        );
      }
      if (convert_amazon) {
        await Affiliate.updateOne(
          { _id: id },
          { $set: { convert_amazon: convert_amazon } }
        );
      }
      if (convert_flipkart) {
        await Affiliate.updateOne(
          { _id: id },
          { $set: { convert_flipkart: convert_flipkart } }
        );
      }
      if (convert_others) {
        await Affiliate.updateOne(
          { _id: id },
          { $set: { convert_others: convert_others } }
        );
      }

      res.status(201).json({
        success: true,
        data: 'Affiliate Configuration Updated Successfully',
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        data: 'Something went wrong!, Please try again',
      });
    }
  },
  delete: async (req, res, next) => {
    id = decoded(req);
    const {
      amazon_tag_id,
      earnkaro_referral_link,
      earnkaro_id,
      inr_deals_username,
      flipkart_affid,
      cuelinks_id,
      convert_amazon,
      convert_flipkart,
      convert_others,
    } = req.body;
    try {
      if (amazon_tag_id) {
        await Affiliate.updateOne(
          {
            _id: id,
          },
          { $unset: { amazon_tag_id: '' } }
        );
      }

      if (earnKaro_referral_link) {
        await Affiliate.updateOne(
          {
            _id: id,
          },
          { $unset: { earnKaro_referral_link: '' } }
        );
      }
      if (earnkaro_id) {
        await Affiliate.updateOne(
          {
            _id: id,
          },
          { $unset: { earnkaro_id: '' } }
        );
      }
      if (inr_deals_username) {
        await Affiliate.updateOne(
          {
            _id: id,
          },
          { $unset: { inr_deals_username: '' } }
        );
      }
      if (flipkart_affid) {
        await Affiliate.updateOne(
          {
            _id: id,
          },
          { $unset: { flipkart_affid: '' } }
        );
      }
      if (cuelinks_id) {
        await Affiliate.updateOne(
          {
            _id: id,
          },
          { $unset: { cuelinks_id: '' } }
        );
      }
      if (convert_amazon) {
        await Affiliate.updateOne(
          {
            _id: id,
          },
          { $unset: { convert_amazon: '' } }
        );
      }
      if (convert_flipkart) {
        await Affiliate.updateOne(
          {
            _id: id,
          },
          { $unset: { convert_flipkart: '' } }
        );
      }
      if (convert_others) {
        await Affiliate.updateOne(
          {
            _id: id,
          },
          { $unset: { convert_others: '' } }
        );
      }

      res.status(201).json({
        success: true,
        data: 'Affiliate Configuration Updated Successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: 'Something went wrong!, Please try again',
      });
    }
  },
};
