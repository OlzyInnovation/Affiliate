const axios = require('axios');
var WPAPI = require('wpapi');
// var WPAPI = require( 'wpapi/superagent' );
var Twit = require('twit');
var getImageUrls = require('get-image-urls');
const Wordpress = require('../../models/socialCredentials/Wordpress');
const Twitter = require('../../models/socialCredentials/Twitter');
const Telegram = require('../../models/socialCredentials/Telegram');
const Facebook = require('../../models/socialCredentials/Facebook');
const { decoded } = require('../../helpers/decodedJWT');
const ErrorResponse = require('../../utils/errorResponse');

exports.wordpress = async (req, res, next) => {
  const { title, content } = req.body;
  id = decoded(req);
  data = await Wordpress.findOne({ _id: id });
  endpoint = data.url;
  username = data.username;
  password = data.password;
  try {
    let wp = new WPAPI({
      endpoint,
      username,
      password,
    });

    let wp_post = wp
      .posts()
      .create({
        title,
        content,
        status: 'publish',
      })
      .then(function (response) {
        // console.log(response.id);
        // return response.id;
        return response;
      });

    let parsed_url = wp_post.url;
    let image_url = getImageUrls(parsed_url)
      .then(function (images) {
        console.log('Images found', images[0].url);
        return images[0].url;
      })
      .catch(function (e) {
        console.log('ERROR', e);
      });
    if (image_url) {
      wp.media()
        // Upload Image
        .file(image_url)
        .create({
          title,
          alt_text: title,
          caption: title,
          description: '',
        })
        .then(function (response) {
          // Associate media with post
          var newImageId = response.id;
          return wp.media().id(newImageId).update({
            post: wp_post.id,
          });
        })
        .then(function (response) {
          console.log('Media ID #' + response.id);
          console.log('is now associated with Post ID #' + response.post);
        });
    }
  } catch (error) {
    next(error);
  }
};
exports.twitter = async (req, res, next) => {
  const { content } = req.body;
  id = decoded(req);
  data = await Twitter.findOne({ _id: id });

  consumer_key = data.consumer_key;
  consumer_secret = data.consumer_secret;
  access_token = data.access_token;
  access_token_secret = data.access_token_secret;

  try {
    var T = new Twit({
      consumer_key,
      consumer_secret,
      access_token,
      access_token_secret,
      timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
      //   strictSSL: true, // optional - requires SSL certificates to be valid.
    });

    T.post(
      'statuses/update',
      { status: content },
      function (err, data, response) {
        console.log(data);
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
exports.telegram = async (req, res, next) => {
  const { content } = req.body;
  id = decoded(req);
  data = await Telegram.findOne({ _id: id });

  channels = data.channel;
  token = data.token;
  try {
    channels.forEach((channel) => {
      axios
        .post(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            chat_id: channel,
            text: content,
            disable_web_page_preview: true,
          }
        )
        .catch((err) => console.log(err));
    });
    res.status(200).json({ success: true, data: 'Telegram Posts Sent!' });
  } catch (error) {
    console.log(error);
  }
};
exports.facebook = async (req, res, next) => {
  try {
    res.send('Facebook Share Route');
  } catch (error) {
    next(error);
  }
};
