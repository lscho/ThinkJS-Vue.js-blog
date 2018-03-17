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

		let contents=await this.model('content').where(map).page(page,pageSize).countSelect();

		this.assign('contents',contents);
    return this.display('index');
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

  	let data=await this.model('content').field('slug,title,create_time,category_id').where(map).select();

  	let list={};
  	for(let i in data){
  		let month=think.datetime(data[i].create_time,'MM DD, YYYY');
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
