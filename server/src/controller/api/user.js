const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {

	//查询用户信息
	async getAction() {
		const userInfo = this.userInfo;
		let data;
		if (this.id) {
			data = await this.modelInstance.where({ id: userInfo.id }).fieldReverse("id,password,encrypt").find();
			data.avator = 'https://secure.gravatar.com/avatar/' + think.md5(data.email);
			return this.success(data);
		} else {
			data = await this.modelInstance.select();
			return this.success(data);
		}
	}

	//更新用户信息
	async putAction() {
		const userInfo = this.userInfo;
		const data = this.post();
		if (think.isEmpty(data)) {
			return this.fail(1000, '数据不能为空');
		}
		const rows = await this.modelInstance.where({ id: userInfo.id }).update(data);
		if (rows) {
			return this.success({ affectedRows: rows }, "更新成功");
		} else {
			return this.fail(1000, "更新失败");
		}
	}
};
