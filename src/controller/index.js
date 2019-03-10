const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * 首页
   * @return {[type]} [description]
   */
  async indexAction() {
    let searchParam = this.post('s');
    if (searchParam) {
      searchParam = encodeURIComponent(searchParam);
      return this.redirect('/search/' + searchParam + '/');
    }
    return this.action('content', 'list');
  }
};
