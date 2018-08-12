const assert = require('assert');

module.exports = class extends think.Controller {
  constructor(ctx) {
    super(ctx);
    this.resource = this.getResource();
    this.id = this.getId();
    assert(think.isFunction(this.model), 'this.model must be a function');
    this.modelInstance = this.model(this.resource);
  }

  async __before(action) {
    this.header('Access-Control-Allow-Origin', '*');

    this.userInfo = await this.session('userInfo').catch(_ => ({}));

    const isAllowedMethod = this.isMethod('GET');
    const isAllowedResource = this.resource === 'token';
    const isLogin = !think.isEmpty(this.userInfo);

    if(!isAllowedMethod && !isAllowedResource && !isLogin) {
      return this.ctx.throw(401, '请登录后操作');
    }
  }

  getResource() {
    return this.ctx.controller.split('/').slice(-1)[0];
  }

  getId() {
    const id = this.get('id');
    if (id && (think.isString(id) || think.isNumber(id))) {
      return id;
    }
    const last = this.ctx.path.split('/').slice(-1)[0];
    if (last !== this.resource) {
      return last;
    }
    return '';
  }

  async getAction() {
    let data;
    const pk = this.modelInstance.pk;
    if (this.id) {
      data = await this.modelInstance.where({ [pk]: this.id }).find();
      return this.success(data);
    }
    data = await this.modelInstance.order(pk + ' desc').select();
    return this.success(data);
  }

  async postAction() {
    const pk = this.modelInstance.pk;
    const data = this.post();
    delete data[pk];
    if (think.isEmpty(data)) {
      return this.fail('data is empty');
    }
    const insertId = await this.modelInstance.add(data);
    if (insertId) {
      data[pk] = insertId;
      await this.hook(this.resource + 'Create', data);
    } else {
      return this.success({ id: insertId });
    }
  }

  async deleteAction() {
    if (!this.id) {
      return this.fail('params error');
    }
    const pk = this.modelInstance.pk;
    const rows = await this.modelInstance.where({ [pk]: this.id }).delete();
    if (rows) {
      await this.hook(this.resource + 'Delete', {[pk]: this.id});
      return this.success({ affectedRows: rows }, '删除成功');
    } else {
      return this.fail(1000, '删除失败');
    }
  }

  async putAction() {
    if (!this.id) {
      return this.fail('params error');
    }
    const pk = this.modelInstance.pk;
    const data = this.post();
    data[pk] = this.id;
    if (think.isEmpty(data)) {
      return this.fail('data is empty');
    }
    const rows = await this.modelInstance.where({ [pk]: this.id }).update(data);
    if (rows) {
      await this.hook(this.resource + 'Update', data);
      return this.success({ affectedRows: rows }, '更新成功');
    } else {
      return this.fail(1000, '更新失败');
    }
  }

  __call() {

  }
};
