const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  // 添加分类
  async postAction() {
    const userInfo = this.userInfo;
    const data = {
      user_id: userInfo.id,
      name: this.post('name'),
      slug: this.post('slug'),
      type: this.post('type'),
      sort: this.post('sort'),
      description: this.post('description')
    };
    const id = await this.modelInstance.add(data);
    if (id) {
      return this.success({ id: id }, '添加成功');
    } else {
      return this.fail(1000, '添加失败');
    }
  }

  // 查询分类
  async getAction() {
    let data;
    if (this.id) {
      data = await this.modelInstance.where({ id: this.id }).find();
      return this.success(data);
    }
    const type = this.get('type') || 'category';
    data = await this.modelInstance.where({ type: type }).order('sort desc').select();
    return this.success(data);
  }
};
