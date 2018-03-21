module.exports = class extends think.Model {
  // 模型关联
  get relation() {
    return {
      parent: {
        type: think.Model.BELONG_TO,
        model: 'comment',
        key: 'parent_id',
        fKey: 'id'
      }
    };
  }
};
