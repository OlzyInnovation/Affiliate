const fetch = require('node-fetch');

exports.shorten = (url) => {
  var headers = {
    // EDIT Bearer key before upload
    Authorization: `Bearer 3c73fd8580fc2752f140d034bda5f146cc71124b`,
    'Content-Type': 'application/json',
  };

  var dataString = `{ "long_url": "${url}", "domain": "bit.ly"}`;

  var option = {
    method: 'POST',
    headers: headers,
    body: dataString,
  };

  fetch('https://api-ssl.bitly.com/v4/shorten', option)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};
