module.exports = class extends think.Controller {
   async __before() {
  	// 获取站点配置
  	const site=await think.model('site').cache('site').find();
  	this.assign('site',site);
  }
};
