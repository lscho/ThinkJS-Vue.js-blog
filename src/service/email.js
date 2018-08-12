module.exports = class extends think.Service {
  /**
     * 注册HOOK点
     * @return {[type]} [description]
     */
  static registerHook() {
    return {
      'comment': ['commentCreate']
    };
  }

  /**
     * 评论邮件提醒
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
  async comment(data) {
    const config = await think.model('config').cache('config').getList();
    if (think.isEmpty(config)) {
      return false;
    }
    const email = config.email;
    if (think.isEmpty(email)) {
      return false;
    }

    const transport = {
      service: email.host,
      port: email.port,
      secure: !think.isEmpty(email.secure),
      auth: {
        user: email.user,
        pass: email.pass
      }
    };
    const date = think.datetime(data.create_time * 1000);
    const options = {};
    options.from = email.user;

    // 给自己发送一份
    if (data.email !== email.user) {
      options.to = email.user;
      options.subject = '[' + data.content.title + '] 有新的评论';
      options.html = `<div style="margin: 16px 40px; background-color: #eef2fa; border: 1px solid #d8e3e8; padding: 0 15px;  -moz-border-radius:5px; -webkit-border-radius:5px; -khtml-border-radius:5px; border-radius:5px;">
                    <p>${config.site.title}：<a target="_blank" href="${config.site.url}/${data.content.category.slug}/${data.content.slug}.html#comment-${data.id}">${data.content.title}</a></strong>&nbsp;有新的评论</p>
                    <p><strong>${data.author}</strong>&nbsp;说：${data.text}</p>
                    <p>时间：${date}<br />IP：${data.ip}<br />邮箱：${data.email} [<a href='${config.site.url}/admin.html#/comment/list' target='_blank'>管理评论</a>]<br /></p>
                    </div>`;
      think.sendEmail(transport, options);
    }

    // 给被回复者发送一份
    if (data.parent_id) {
      const parent = await think.model('comment').where({ id: data.parent_id }).find();
      if (parent.email !== email.user) {
        options.to = parent.email;
        options.subject = '您在 [' + data.content.title + '] 的评论有了回复 - ' + config.site.url;
        options.html = `<div style="margin: 16px 40px; background-color: #eef2fa; border: 1px solid #d8e3e8; padding: 0 15px;  -moz-border-radius:5px; -webkit-border-radius:5px; -khtml-border-radius:5px; border-radius:5px;">
                      <p>${data.author}：<a target="_blank" href="${config.site.url}/${data.content.category.slug}/${data.content.slug}.html#comment-${data.id}">${data.content.title}</a>&nbsp;有新的回复</p>
                      <p><strong>${data.author}</strong>&nbsp;说：${data.text}</p>
                      <p>你的评论：${parent.text}</p>
                      <p>时间：${date}</p>
                    </div>`;
        think.sendEmail(transport, options);
      }
    }
  }
};
