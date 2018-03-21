const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * 首页
   * @return {[type]} [description]
   */
  indexAction() {
    if (this.post('s')) {
      return this.redirect('/search/' + this.post('s') + '/');
    }
    return this.action('post', 'list');
  }
};
