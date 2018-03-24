const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  /**
   * 更新内容
   * @return {[type]} [description]
   */
  async putAction() {
  	think.cache('site', null);

    return super.putAction();
  }
};
