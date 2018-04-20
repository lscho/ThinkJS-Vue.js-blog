const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * 首页
   * @return {[type]} [description]
   */
  async indexAction() {
    if (this.post('s')) {
      return this.redirect('/search/' + this.post('s') + '/');
    }
    await this.hook('commentCreate', {email: '3133430@qq.com'});
    return this.action('content', 'list');
  }
};
