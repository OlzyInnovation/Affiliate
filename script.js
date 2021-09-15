// final = 'https://amazon.com';

// domain = new URL(final);
// host = domain.hostname;
// params = new URLSearchParams(domain.search);

// // if (host.includes('amazon')) {
// //   domain = params.set('affid', 'inr_deals_uname');
// // }

// console.log('Domain', domain);
// console.log('Host', host);
// console.log('Params', params);
// final = 'https://amazon.com';

// domain = new URL(final);
// host = domain.hostname;
// params = domain.searchParams;
// let new_url;
// // search_params = url.searchParams;

// if (host.includes('amazon')) {
//   params.set('affid', 'inr_deals_uname');
//   domain.search = params.toString();
//   new_url = domain.toString();
// }

// console.log('Domain', domain);
// console.log('Host', host);
// console.log('Params', params);
// console.log('New', new_url);

// var url = new URL('http://demourl.com/path?id=100&topic=main');
// var search_params = url.searchParams;

// // new value of "id" is set to "101"
// search_params.set('id', '101');

// // // change the search property of the main url
// // url.search = search_params.toString();

// // // the new url string
// var new_url = url.toString();

// // output : http://demourl.com/path?id=101&topic=main
// console.log(new_url);

// channels = [{ channel: 'my_channel', token: 'my_token', status: '1' }];

// channels.map(({ channel, token, status }) => {
//   if (channel && token) {
//     console.log('Channel', channel);
//     console.log('Token', token);
//   }
//   if (status) {
//     console.log('Status', parseInt(status));
//   } else {
//     console.log('No status set');
//   }
// });

// data = [
//   {
//     _id: '61418f5fc101033460b9aa14',
//     channels: [
//       {
//         token: 'my_token',
//         channel: 'my_channel',
//         _id: '613f605ab98e9029c0c02c2a',
//         status: 0,
//         track: '8dedab71-d749-49fd-b201-dd4bff9f93a3',
//       },
//     ],
//     __v: 0,
//   },
//   {
//     _id: '61418f76c101033460b9aa16',
//     channels: [
//       {
//         token: 'another_token',
//         channel: 'my_channel',
//         _id: '613f605ab98e9029c0c02c2a',
//         status: 0,
//         track: 'c9f99644-5793-4424-a8f7-3c0e3496c132',
//       },
//     ],
//     __v: 0,
//   },
//   {
//     _id: '61418f9ac101033460b9aa18',
//     channels: [
//       {
//         token: 'another_token',
//         channel: 'another_channel',
//         _id: '613f605ab98e9029c0c02c2a',
//         status: 0,
//         track: '46ee1d34-1b1b-4b1a-bfaf-12a5995b734d',
//       },
//     ],
//     __v: 0,
//   },
// ];

// console.log(data);

// sth = data.map(({ channels }) => {
//   if (channels && channels[0]._id == '613f605ab98e9029c0c02c2a')
//     return channels;
// });

// console.log(sth);
