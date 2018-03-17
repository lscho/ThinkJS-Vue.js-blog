module.exports = class extends think.Logic {
  postAction() {
    const rules = {
      name: {
        string: true,
        required: true
      }
    };
    const msgs = {
      name: '分类名称不能为空'
    };
    const flag = this.validate(rules, msgs);
    if (!flag) {
      return this.fail(1001, 'validate error', this.validateErrors);
    }
  }
};
