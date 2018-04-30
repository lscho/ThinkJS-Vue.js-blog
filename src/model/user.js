module.exports = class extends think.Model {

  /**
   * 验证密码
   * @param  {Object} userInfo 用户信息
   * @param  {String} password 明文密码
   * @return {[type]}          [description]
   */
  verifyPassword(userInfo={}, password="") {
    return think.md5(think.md5(password) + userInfo.encrypt) === userInfo.password;
  }

  /**
   * 生成密码
   * @param  {Object} userInfo 用户信息
   * @param  {String} password 明文密码
   * @return {string}          [description]
   */
  sign(userInfo={}, password=""){
    return think.md5(think.md5(password) + userInfo.encrypt);
  }
};
