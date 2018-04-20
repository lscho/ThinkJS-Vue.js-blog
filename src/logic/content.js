module.exports = class extends think.Logic {
  commentAction() {
    const rules = {
      slug: {
        string: true,
        required: true,
        method: 'GET'
      },
      author: {
        string: true,
        required: true
      },
      email: {
        email: true,
        required: true
      },
      text: {
        string: true,
        required: true
      }
    };
    const msgs = {
      slug: '文章不存在',
      author: '名字不能为空',
      email: '邮箱不能为空',
      text: '留言内容不能为空'
    };
    const flag = this.validate(rules, msgs);
    if (!flag) {
      return this.fail(1001, 'validate error', this.validateErrors);
    }
  }
};
