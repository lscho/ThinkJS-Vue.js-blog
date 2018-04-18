module.exports = class extends think.Service {
  /**
     * 注册HOOK点
     * @return {[type]} [description]
     */
  registerHook() {
    return {
      'comment': ['commentCreate']
    };
  }

  /**
     * 评论邮件提醒
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
  comment(data) {

  }
};
