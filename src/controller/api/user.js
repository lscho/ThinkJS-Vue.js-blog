const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  // 查询用户信息
  async getAction() {
    const userInfo = this.userInfo;
    if (think.isEmpty(userInfo)) {
      this.ctx.status = 401;
      return this.fail(-1, '请登录后操作');
    }
    let data;
    if (this.id) {
      data = await this.modelInstance.where({ username: this.id }).fieldReverse('id,password,encrypt').find();
      data.avator = 'https://secure.gravatar.com/avatar/' + think.md5(data.email);
      return this.success(data);
    } else {
      data = await this.modelInstance.select();
      return this.success(data);
    }
  }

  /**
   * 更新用户信息
   * @return {[type]} [description]
   */
  async putAction() {

    const userInfo = await this.modelInstance.where({ username: this.id }).find();
    let data = this.post();
    if (think.isEmpty(data)) {
      return this.fail(1000, '数据不能为空');
    }
    console.log(data)
    if(!think.isEmpty(data.password)){
      if(data.newPassword!==data.confirmPassword){
        return this.fail(1000, '两次密码不一致');
      }

      if(!this.modelInstance.verifyPassword(userInfo,data.password)){
        return this.fail(1000, '旧密码不正确');
      }

      data.password=this.modelInstance.sign(userInfo,data.newPassword);
    }
    const rows = await this.modelInstance.where({ id: userInfo.id }).update(data);
    if (rows) {
      data.id = userInfo.id;
      await this.hook('userUpdate', data);
      return this.success({ affectedRows: rows }, '更新成功');
    } else {
      return this.fail(1000, '更新失败');
    }
  }
};