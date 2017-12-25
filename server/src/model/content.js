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
				rModel: 'relationships',
				rfKey: 'meta_id',
				key: 'id',
				fKey: 'content_id',
				field: 'id,name,slug,description,count'
			},
			user: {
				type: think.Model.HAS_ONE,
				model: 'user',
				key: 'uid',
				fKey: 'id',
				field: 'id,username,email,qq,github,weibo,zhihu'
			}
		};
	}

	//添加文章
	async insert(data) {
		const tag = data.tag;
		delete data.tag;
		data = this.parseContent(data);
		const id = await this.add(data);
		if (id) {
			//添加标签关系
			let tagData = [];
			for (var i in tag) {
				tagData.push({
					content_id: id,
					meta_id: tag[i]
				});
			}
			think.model('relationships').addMany(tagData);
			//更新文章数量
			this.updateCount(id,data.category_id,tag);
		}
		return id;
	}

	//更新文章
	async save(id, data) {
		const tag = data.tag;
		delete data.tag;
		data = this.parseContent(data);
		const res = await this.where({ id: id }).update(data);
		if (res) {
			//添加标签关系
			let tagData = [];
			for (var i in tag) {
				tagData.push({
					content_id: id,
					meta_id: tag[i]
				});
			}
			await think.model('relationships').where({ content_id: id }).delete();
			think.model('relationships').addMany(tagData);
			//更新文章数量
			this.updateCount(id,data.category_id,tag);
		}
		return res;
	}

	// 处理内容，生成文章简介
	parseContent(data) {
		//描述处理
		if (data.content.indexOf('<!--more-->') > -1) {
			data.description = data.content.split("<!--more-->")[0],
				data.content = data.content.split("<!--more-->")[1]
		} else {
			data.description = ""
		}
		//唯一标识处理
		if (!data.slug) {
			data.slug = think.md5(new Date());
		}
		return data;
	}

	// 更新文章数量
	updateCount(id, category_id, tagData) {
		//更新分类数量
		const category_count = this.where({ category_id: category_id }).count();
		think.model('meta').where({ id: category_id }).update({ count: category_count });
		//更新标签数量
		for (var i in tagData) {
			let tag_count = think.model('relationships').where({ meta_id: tagData[i] }).count();
			think.model('meta').where({ id: tagData[i] }).update({ count: tag_count });
		}
	}
}