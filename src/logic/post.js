module.exports = class extends think.Logic {
  commentAction() {
    const rules = {
      author: {
        string: true,
        required: true
      },
      email: {
        string: true,
        email: true
      },
      url: {
        string: true,
        url: true
      },
      text: {
        string: true,
        required: true
      }
    };
    const msgs = {
      author: '留言姓名不能为空',
      email: '邮箱不能为空',
      url: '地址不能为空',
      text: '内容不能为空'

    };
    const flag = this.validate(rules, msgs);
    if (!flag) {
      return this.fail(1001, 'validate error', this.validateErrors);
    }
  }
};
