module.exports = class extends think.Controller {
  async __before() {
    // 获取站点配置
    const config = await think.model('config').cache('config').getList();
    this.assign('site', config.site);
    // 默认title
    this.assign('title',"");
    // 获取用户资料
    const user = await think.model('user').cache('user').find();
    this.assign('user', user);
    // 最近文章
    const recent = await this.getRecent();
    this.assign('recent', recent);
  }

  /**
   * 最近文章和回复
   * @return {[type]} [description]
   */
  async getRecent() {
    // 最近五篇文章
    const content = await think.model('content')
      .where({ status: 99, type: 'post' })
      .cache('recent_content')
      .limit(5).order('create_time desc')
      .fieldReverse('content,markdown')
      .select();
    // 最近五条回复
    const comment = await think.model('comment')
      .cache('recent_comment')
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
      .where({ 'comment.status': 99 })
      .field('comment.*,content.slug,content.category_id,category.slug as category')
      .limit(5)
      .order('comment.create_time desc')
      .select();
    return { content: content, comment: comment };
  }

  async __call() {
    return this.display('404');
  }
};
