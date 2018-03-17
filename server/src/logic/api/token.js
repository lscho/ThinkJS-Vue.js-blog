module.exports = class extends think.Logic {
  postAction() {
    const rules = {
      username: {
        string: true,
        required: true
      },
      password: {
        string: true,
        required: true
      }
    };
    const msgs = {
      username: '用户名不能为空',
      password: '密码不能为空'
    };
    const flag = this.validate(rules, msgs);
    if (!flag) {
      return this.fail(1001, 'validate error', this.validateErrors);
    }
  }
};
