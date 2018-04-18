const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  /**
   * 获取数据
   * @return {[type]} [description]
   */
  async getAction() {
    let data;
    const map = {};
    // 获取详情
    if (this.id) {
      map.id = this.id;
      if (think.isEmpty(this.userInfo)) {
        map.status = 99;
      }
      data = await this.modelInstance.where(map).find();

      return this.success(data);
    }

    // 关键词
    const key = this.get('key');
    if (key) {
      map['comment.author|comment.text'] = ['like', '%' + key + '%'];
    }
    // 是否获取全部
    const all = this.get('all');
    if (!all || think.isEmpty(this.userInfo)) {
      map['comment.status'] = 99;
    }

    // 页码
    const page = this.get('page') || 1;
    // 每页显示数量
    const pageSize = this.get('pageSize') || 5;
    data = await this.modelInstance
      .alias('comment')
      .join({
        table: 'content',
        join: 'left',
        as: 'content',
        on: ['content_id', 'id']
      })
      .join({
        table: 'meta',
        join: 'left',
        as: 'category',
        on: ['content.category_id', 'id']
      })
      .where(map)
      .page(page, pageSize)
      .field('comment.*,content.slug,content.title,content.category_id,category.slug as category')
      .order('comment.id desc')
      .countSelect();
    return this.success(data);
  }
};
