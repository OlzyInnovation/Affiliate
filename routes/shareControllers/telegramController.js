const axios = require('axios');
module.exports = {
  // set telegram webhook url
  // GET https://api.telegram.org/bot{my_bot_token}/setWebhook?url={url_to_send_updates_to}

  // Confirm webhook url
  // https://api.telegram.org/bot{my_bot_token}/getWebhookInfo

  index: async (req, res, next) => {
    // console.log(req.body);

    // const url = 'https://api.telegram.org/bot';
    // const apiToken = 'bot-api-token';
    const chatId = req.body.message.chat.id;
    const sentMessage = req.body.message.text;

    if (sentMessage.match(/help/gi) || sentMessage.match(/start/gi)) {
      axios
        .post(`${url}${apiToken}/sendMessage`, {
          chat_id: chatId,
          text: 'hello back 👋',
        })
        .then((response) => {
          res.status(200).send(response);
        })
        .catch((error) => {
          res.send(error);
        });
    } else {
      res.status(200).send({});
    }
  },
};
