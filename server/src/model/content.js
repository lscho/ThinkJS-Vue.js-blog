module.exports = class extends think.Model {

  // 模型关联
  get relation() {
    return {
      category: {
      	type:think.Model.BELONG_TO,
      	model:'meta',
      	key:'category_id',
      	fKey:'id',
      	field:'id,name,slug,description,count'
      },
      tag:{
        type:think.Model.MANY_TO_MANY,
        model:'meta',
        rModel: 'relationships',
        rfKey: 'meta_id',
        key:'id',
        fKey:'content_id',
        field:'id,name,slug,description,count'
      },
      user:{
      	type:think.Model.HAS_ONE,
      	model:'user',
      	key:'uid',
      	fKey:'id',
      	field:'id,username,email,qq,github,weibo,zhihu'
      }
    };	
  }

  // 更新文章数量
  updateCount(id,category_id,tagData){
    //更新分类数量
    const category_count=this.where({category_id:category_id}).count();
    this.model('meta').where({id:category_id}).update({count:category_count});
    //更新标签数量
    for(var i in tagData){
      let tag_count=this.model('relationships').where({meta_id:tagData[i]}).count();
      this.model('meta').where({id:tagData[i]}).update({count:tag_count});
    }
  }
}