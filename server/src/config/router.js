module.exports = [
  // RESTFUL
  [/\/api\/(\w+)(?:\/(.*))?/, 'api/:1?id=:2', 'rest'],
  ['/page/about', 'post/page?slug=about'],
  ['/page/links', 'post/page?slug=links'],
  ['/page/archives', 'post/archives'],
  [/\/page\/(\d+)/, 'post/list?page=:1'],
  ['/search/:search', 'post/muster'],
  ['/category/:category', 'post/muster'],
  ['/category/:category/:page', 'post/muster'],
  ['/tag/:tag', 'post/muster'],
  ['/tag/:tag/:page', 'post/muster'],
  ['/:category/:slug', 'post/detail'],
  ['/:category/:slug/comment', 'post/comment']
];
