module.exports = class extends think.Service {
  /**
     * 注册HOOK点
     * @return {[type]} [description]
     */
  static registerHook() {
    return {
      'comment': ['commentCreate', 'commentUpdate', 'commentDelete'],
      'content': ['contentCreate', 'contentUpdate', 'contentDelete'],
      'config': ['configUpdate']
    };
  }

  /**
     * 更新留言缓存
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
  comment(data) {
    think.cache('recent_comment', null);
  }

  /**
     * 更新内容缓存
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
  content(data) {
    think.cache('recent_content', null);
  }

  config(data) {
    think.cache('config', null);
  }
};
