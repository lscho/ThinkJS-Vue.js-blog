module.exports = class extends think.Logic {
  postAction() {
    const rules = {
      title: {
        string: true,
        required: true
      },
      category_id: {
        int: true,
        required: true
      },
      create_time: {
        date: true,
        required: true
      },
      status: {
        int: true,
        required: true
      }
    };
    const msgs = {
      name: '文章标题不能为空',
      category_id: '分类必须选择',
      create_time: '发布时间不能为空',
      status: '文章状态不能为空'
    };
    const flag = this.validate(rules, msgs);
    if (!flag) {
      return this.fail(1001, 'validate error', this.validateErrors);
    }
  }
};
