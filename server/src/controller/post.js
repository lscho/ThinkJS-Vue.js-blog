const Base = require('./base.js');

module.exports = class extends Base {

	/**
	 * 文章列表
	 * @return {[type]} [description]
	 */
  async listAction() {
		let map={
			status:99,
			type:'post'
		}

		let page=this.get('page')||1;
		let pageSize=this.get('pageSize')||5;

		let contents=await this.model('content').where(map).page(page,pageSize).fieldReverse('content,markdown').order('create_time desc').countSelect();

		this.assign('contents',contents);
    return this.display('list');
  }

  /**
   * 文章集合，检索、分类、标签等
   * @return {[type]} [description]
   */
  async musterAction(){
    let map={
      status:99,
      type:'post'
    }

    let meta={};
    if(this.get('search')){
      map['title|description']=this.get('search');
      meta={key:'search',value:this.get('search')};
    }
    if(this.get('category')){
      let categoryId=await this.model('meta').where({slug:this.get('category'),type:'category'}).getField('id', true);
      meta={key:'category',value:this.get('category')};
      if(categoryId){
        map['category_id']=categoryId;
      }
    }

    if(this.get('tag')){
      let tags=await this.model('meta').where({slug:this.get('tag'),type:'tag'}).getField('id');
      let contentIds=await this.model('relationships').where({meta_id:['IN',tags]}).getField('content_id');
      meta={key:'tag',value:this.get('tag')};
      if(contentIds){
        map['id']=['IN',contentIds];
      }
    }

    this.assign('meta',meta);

    let page=this.get('page')||1;
    let pageSize=this.get('pageSize')||6;

    let contents=await this.model('content').where(map).page(page,pageSize).fieldReverse('content,markdown').order('create_time desc').countSelect();

    this.assign('contents',contents);
    return this.display('muster');    
  }

  /**
   * 文章详情
   * @return {[type]} [description]
   */
  async detailAction(){
  	let map={
  		slug:this.get('slug'),
  		type:'post',
  		status:99
  	}

  	let content=await this.model('content').where(map).find();

  	this.assign('content',content);
  	return this.display('post');
  }

  /**
   * 文章归档
   * @return {[type]} [description]
   */
  async archivesAction(){
  	let map={
  		type:'post',
  		status:99
  	}

  	let data=await this.model('content').field('slug,title,create_time,category_id').where(map).order('create_time desc').select();

  	let list={};
  	for(let i in data){
      data[i].create_time*=1000;
  		let month=think.datetime(data[i].create_time,'MM, YYYY');
  		if(!list[month]){
  			list[month]=[];
  		}
  		list[month].push(data[i]);
  	}

  	this.assign('list',list);
  	return this.display('archives');
  }

  /**
   * 页面详情
   * @return {[type]} [description]
   */
  async pageAction(){
  	let map={
  		slug:this.get('slug'),
  		type:'page',
  		status:99
  	}

  	let content=await this.model('content').where(map).find();

  	this.assign('content',content);
  	return this.display('page');
  }
};
