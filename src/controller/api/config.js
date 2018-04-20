const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  /**
     * 获取配置
     * @return {[type]} [description]
     */
  async getAction() {
    const type = this.get('type');
    const list = await this.model('config').getList(type);
    return this.success(list);
  }

  /**
     * 更新配置
     * @return {[type]} [description]
     */
  async putAction() {
    const data = this.post();
    const res = await this.model('config').save(this.id, data);
    if (res) {
      await this.hook('configUpdate', {type: this.id, data: data});
      return this.success({ id: res }, '更新成功');
    } else {
      return this.fail(1000, '更新失败');
    }
  }
};
