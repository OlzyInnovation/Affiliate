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
final = 'https://amazon.com';

domain = new URL(final);
host = domain.hostname;
params = domain.searchParams;
let new_url;
// search_params = url.searchParams;

if (host.includes('amazon')) {
  params.set('affid', 'inr_deals_uname');
  domain.search = params.toString();
  new_url = domain.toString();
}

console.log('Domain', domain);
console.log('Host', host);
console.log('Params', params);
console.log('New', new_url);

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
