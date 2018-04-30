module.exports = {

  /**
     * hook
     * @param  {[type]} node 钩子点
     * @param  {[type]} data 数据
     * @return {[type]}      [description]
     */
  async hook(node, data) {
    const hooks = think.config('hooks');
    try {
      if (hooks[node]) {
        for (const i in hooks[node]) {
          let hook=hooks[node][i];
          let service=think.service(hook.service);
          await service[hook.function](data);
        }
      }
    } catch (e) {
      think.logger.error(e);
    }
  }
};
