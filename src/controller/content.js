const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * 文章列表
   * @return {[type]} [description]
   */
  async listAction() {
    // 输出头部HTML
    await this.renderAndFlush('header');

    const map = {
      status: 99,
      type: 'post'
    };

    const page = this.get('page') || 1;
    const pageSize = this.get('pageSize') || 5;

    const contents = await this.model('content').where(map).page(page, pageSize).fieldReverse('content,markdown').order('create_time desc').countSelect();

    this.assign('contents', contents);
    return this.display('list');
  }

  /**
   * 文章集合，检索、分类、标签等
   * @return {[type]} [description]
   */
  async musterAction() {
    //输出头部HTML
    await this.renderAndFlush('header');

    const map = {
      status: 99,
      type: 'post'
    };

    let meta = {};
    let searchParam = this.get('search');
    if (searchParam) {
      searchParam = decodeURIComponent(searchParam);
      map['title|description'] = ['like','%'+searchParam+'%'];
      meta = { key: 'search', value: searchParam };
    }
    if (this.get('category')) {
      const categoryId = await this.model('meta').where({ slug: this.get('category'), type: 'category' }).getField('id', true);
      meta = { key: 'category', value: this.get('category') };
      if (categoryId) {
        map['category_id'] = categoryId;
      }
    }

    if (this.get('tag')) {
      const tags = await this.model('meta').where({ slug: this.get('tag'), type: 'tag' }).getField('id');
      const contentIds = await this.model('relationship').where({ meta_id: ['IN', tags] }).getField('content_id');
      meta = { key: 'tag', value: this.get('tag') };
      if (contentIds) {
        map['id'] = ['IN', contentIds];
      }
    }

    this.assign('meta', meta);
    this.assign('title',meta.value);

    const page = this.get('page') || 1;
    const pageSize = this.get('pageSize') || 6;

    const contents = await this.model('content').where(map).page(page, pageSize).fieldReverse('content,markdown').order('create_time desc').countSelect();

    this.assign('contents', contents);
    return this.display('muster');
  }

  /**
   * 文章详情
   * @return {[type]} [description]
   */
  async detailAction() {
    const slug = this.get('slug');
    const { postTitle } = think.config();
    this.assign('title',postTitle[slug] || "");
    // 输出头部HTML
    await this.renderAndFlush('header');

    const map = {
      slug: slug,
      type: 'post',
      status: 99
    };

    const content = await this.model('content').where(map).find();

    if (think.isEmpty(content)) {
      return this.redirect('/404');
    }
    this.assign('content', content);
    // 增加阅读量
    this.model('content').where(map).increment('view');

    const replyTo = this.get('replyTo') || 0;
    this.assign('replyTo', replyTo);

    return this.display('content');
  }

  /**
   * 文章留言
   * @return {[type]} [description]
   */
  async commentAction() {
    // 时间戳检验[过滤机器评论]
    let _t=this.post('_t')||0;

    if(Date.now()-_t>10*60*1000){
      return this.redirect('/404');
    }

    const map = {
      slug: this.get('slug'),
      type: 'post',
      status: 99
    };

    const content = await this.model('content').where(map).find();

    if (think.isEmpty(content)) {
      return this.redirect('/404');
    }

    const data = {
      content_id: content.id,
      author: this.post('author'),
      email: this.post('email'),
      url: this.post('url'),
      ip: this.ip,
      agent: this.header('User-Agent'),
      text: this.post('text'),
      status: 99,
      parent_id: this.post('parent_id'),
      create_time: (new Date()).getTime() / 1000
    };

    const insertId = await this.model('comment').add(data);

    if (insertId) {
      data.id = insertId;
      data.content = content;
      await this.hook('commentCreate', data);
      return this.redirect('/' + content.category.slug + '/' + content.slug + '.html#comment-' + insertId);
    } else {
      return this.redirect('/' + content.category.slug + '/' + content.slug + '.html');
    }
  }

  /**
   * 文章归档
   * @return {[type]} [description]
   */
  async archivesAction() {
    this.assign('title','archives');
    //输出头部HTML
    await this.renderAndFlush('header');

    const map = {
      type: 'post',
      status: 99
    };

    const data = await this.model('content').field('slug,title,create_time,category_id').where(map).order('create_time desc').select();

    const list = {};
    for (const i in data) {
      data[i].create_time *= 1000;
      const month = think.datetime(data[i].create_time, 'MM, YYYY');
      if (!list[month]) {
        list[month] = [];
      }
      list[month].push(data[i]);
    }
    this.assign('list', list);
    return this.display('archives');
  }

  /**
   * 页面详情
   * @return {[type]} [description]
   */
  async pageAction() {
    const slug = this.get('slug');
    const { postTitle } = think.config();
    this.assign('title',postTitle[slug] || "");
    //输出头部HTML
    await this.renderAndFlush('header');

    const map = {
      slug: slug,
      type: 'page',
      status: 99
    };

    const content = await this.model('content').where(map).find();
    this.assign('content', content);
    return this.display('page');
  }
};
