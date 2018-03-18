const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
  	if(this.post('s')){
  		return this.redirect('/search/'+this.post('s')+'/');
  	}
  	return this.action('post', 'list');
  }
};
