// // const extractUrls = require('extract-urls');

// // let text = `You can read https://github.com/huckbit/extract-urls or https://www.npmjs.com/package/extract-urls for more info`;
// // let urls = extractUrls(text);

// // console.log(urls);

// var fetch = require('node-fetch');

// // var headers = {
// //   Authorization: 'Bearer 3c73fd8580fc2752f140d034bda5f146cc71124b',
// //   'Content-Type': 'application/json',
// // };

// // var dataString = '{ "long_url": "https://facebook.com", "domain": "bit.ly"}';

// // var option = {
// //   method: 'POST',
// //   headers: headers,
// //   body: dataString,
// // };

// // fetch('https://api-ssl.bitly.com/v4/shorten', option)
// //   .then((res) => res.json())
// //   .then((data) => console.log(data));

// ///WORKS
// // const shorten = (url) => {
// //   var headers = {
// //     Authorization: `Bearer 3c73fd8580fc2752f140d034bda5f146cc71124b`,
// //     'Content-Type': 'application/json',
// //   };

// //   var dataString = `{ "long_url": "${url}", "domain": "bit.ly"}`;

// //   var option = {
// //     method: 'POST',
// //     headers: headers,
// //     body: dataString,
// //   };

// //   fetch('https://api-ssl.bitly.com/v4/shorten', option)
// //     .then((res) => res.json())
// //     .then((data) => console.log(data));
// // };

// // shorten('https://dev.bitly.com');

// /// WORKS END

// ///THROWS FORBIDDEN
// const shorten = (url) => {
//   var headers = {
//     Authorization: `Bearer ${process.env.BITLY_BEARER}`,
//     'Content-Type': 'application/json',
//   };

//   var dataString = `{ "long_url": "${url}", "domain": "${process.env.BITLY_DOMAIN}"}`;

//   var option = {
//     method: 'POST',
//     headers: headers,
//     body: dataString,
//   };

//   fetch('https://api-ssl.bitly.com/v4/shorten', option)
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// };

// shorten('https://dev.bitly.com');

// // process.env
// // BITLY_SHORTEN_URL='https://api-ssl.bitly.com/v4/shorten'
// // BITLY_BEARER=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// // BITLY_DOMAIN=bit.ly
// // error - only absolute urls are supportedd

// var urlExpand = require('url-expand');

// urlExpand('http://google.com', function (err, url) {
//   console.log(url);
// });

const pricefinder = require('pricefinder-ecommerce');
const product = async (url) => {
  sth = await pricefinder(url, 'amazon');
  console.log(sth);
};

product('https://www.amazon.in/dp/B084456GH4');
