module.exports = class extends think.Model {
  // 验证密码
  verifyPassword(userInfo, password) {
    return think.md5(think.md5(password) + userInfo.encrypt) === userInfo.password;
  }
};
