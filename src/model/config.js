module.exports = class extends think.Model {
  /**
     * 获取配置列表
     * @param  {String} type [description]
     * @return {[type]}      [description]
     */
  async getList(type = '') {
    const map = {};
    if (type) {
      map.type = type;
    }
    const list = await this.where(map).select();
    const data = {};
    for (const i in list) {
      data[list[i].name] = JSON.parse(list[i].value);
    }
    return data;
  }

  /**
     * 保存配置
     * @param  {[type]} name  [description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
  async save(name, value) {
    const data = {
      name: name,
      value: JSON.stringify(value)
    };
    return this.thenUpdate(data, { name: name });
  }
};
