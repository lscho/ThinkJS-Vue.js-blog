module.exports = [
  // RESTFUL
  [/\/api\/(\w+)(?:\/(.*))?/, 'api/:1?id=:2', 'rest'],
  ['/page/about', 'post/page?slug=about'],
  ['/page/links', 'post/page?slug=links'],
  ['/page/archives', 'post/archives'],
  ['/:category/:slug', 'post/detail']
];
