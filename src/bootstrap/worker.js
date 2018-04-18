const fs = require('fs');
const path = require('path');
think.beforeStartServer(async() => {
  // 注册插件
  const hooks = {};
  try {
    const files = fs.readdirSync(think.APP_PATH + '/service');
    files.forEach((val, index) => {
      const ext = path.extname(val);
      if (ext === '.js') {
        const serviceName = path.basename(val, ext);
        const service = think.service(serviceName);
        if (typeof service.registerHook === 'function') {
          const data = service.registerHook();
          // hook点
          for (const hook in data) {
            for (const i in data[hook]) {
              const node = data[hook][i];
              if (!hooks[node]) {
                hooks[node] = [];
              }
              if (typeof service[hook] === 'function') {
                hooks[node].push(service[hook]);
              }
            }
          }
        }
      }
    });
  } catch (e) {
    think.logger.error(e);
  }
  think.config('hooks', hooks);
});
