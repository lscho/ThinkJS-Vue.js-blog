module.exports = class extends think.Model {
  // 模型关联
  get relation() {
    return {
      category: {
        type: think.Model.BELONG_TO,
        model: 'meta',
        key: 'category_id',
        fKey: 'id',
        field: 'id,name,slug,description,count'
      },
      tag: {
        type: think.Model.MANY_TO_MANY,
        model: 'meta',
        rModel: 'relationship',
        rfKey: 'meta_id',
        key: 'id',
        fKey: 'content_id',
        field: 'id,name,slug,description,count'
      },
      comment: {
        type: think.Model.HAS_MANY,
        key: 'id',
        fKey: 'content_id',
        where: 'status=99',
        order: 'create_time desc'
      },
      user: {
        type: think.Model.BELONG_TO,
        model: 'user',
        key: 'user_id',
        fKey: 'id',
        field: 'id,username,email,qq,github,weibo,zhihu'
      }
    };
  }

  // 添加文章
  async insert(data) {
    const tag = data.tag;
    delete data.tag;
    data = this.parseContent(data);
    const id = await this.add(data);
    if (id) {
      // 添加标签关系
      const tagData = [];
      for (var i in tag) {
        tagData.push({
          content_id: id,
          meta_id: tag[i]
        });
      }
      think.model('relationship').addMany(tagData);
      // 更新文章数量
      this.updateCount(data.category_id, tag);
    }
    return id;
  }

  // 更新文章
  async save(id, data) {
    // 查询修改前数据
    const oldData = await this.where({ id: id }).find();
    // 修改分类统计
    if (oldData.category_id !== data.category_id) {
      think.model('meta').where({ id: oldData.category_id }).decrement('count');
    }

    // 更新数据
    data = this.parseContent(data);
    data.id = id;
    const res = await this.where({ id: data.id }).update(data);

    if (res) {
      //更新文章数量
      this.updateCount(data.category_id, data.tag);
    }

    return res;
  }

  // 处理内容，生成文章简介
  parseContent(data) {
    // 描述处理
    if (data.content.indexOf('<!--more-->') > -1) {
      data.description = data.content.split('<!--more-->')[0]; // 写文章内容时，description部分是<!--more-->前面的部分,要自己写
    } else {
      data.description = '';
    }
    // 唯一标识处理
    if (!data.slug) {
      data.slug = think.md5(new Date());
    }
    return data;
  }

  // 更新文章数量
  async updateCount(categoryId, tagData) {
    // 更新分类数量
    const categoryCount = await this.where({ category_id: categoryId }).count();
    think.model('meta').where({ id: categoryId }).update({ count: categoryCount });
    // 更新标签数量
    for (var i in tagData) {
      const tagCount = await think.model('relationship').where({ meta_id: tagData[i] }).count();
      think.model('meta').where({ id: tagData[i] }).update({ count: tagCount });
    }
  }
};
