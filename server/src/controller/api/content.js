const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {

	// 添加内容
	async postAction(){
		const userInfo=this.userInfo;
		const data={
			uid:userInfo.id,
			title:this.post('title'),
			category_id:this.post('category_id'),
			slug:this.post('slug'),
			status:this.post('status'),
			content:this.post('content'),
			view:0,
			create_time:this.post('create_time')?(new Date(this.post('create_time'))).getTime()/1000:(new Date()).getTime()/1000
		}
		const id = await this.modelInstance.add(data);
		if(id){
			//添加标签关系
			const tag=this.post('tag');
			let tagData=[];
			for(var i in tag){
				tagData.push({
					content_id:id,
					meta_id:tag[i]
				});
			}
			this.model('relationships').addMany(tagData);

			return this.success({id:id},"添加成功");
		}else{
			return this.fail(1000,"添加失败");
		}
	}

	//更新内容
	async putAction(){
		const id=this.id;
	    if (!this.id) {
	      return this.fail(1001,'文章不存在');
	    }
		const data={
			title:this.post('title'),
			category_id:this.post('category_id'),
			slug:this.post('slug'),
			status:this.post('status'),
			content:this.post('content'),
			view:0,
			create_time:this.post('create_time')?(new Date(this.post('create_time'))).getTime()/1000:(new Date()).getTime()/1000
		}
		const res = await this.modelInstance.where({id:id}).update(data);
		if(res){
			//添加标签关系
			const tag=this.post('tag');
			let tagData=[];
			for(var i in tag){
				tagData.push({
					content_id:id,
					meta_id:tag[i]
				});
			}
			await this.model('relationships').where({content_id:id}).delete();
			this.model('relationships').addMany(tagData);

			return this.success({id:id},"修改成功");
		}else{
			return this.fail(1000,"添加失败");
		}
	}

	//删除内容
	  async deleteAction() {
	    if (!this.id) {
	      return this.fail(1001,'文章不存在');
	    }
	    const rows = await this.modelInstance.where({id: this.id}).delete();
	    if(rows){
	      return this.success({affectedRows:rows },"删除成功");
	    }else{
	      return this.fail(1000,"删除失败");
	    }
	  }
};
