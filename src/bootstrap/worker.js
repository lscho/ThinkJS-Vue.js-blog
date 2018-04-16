const fs = require('fs');
const path = require('path');
think.beforeStartServer(async() => {
    // 注册插件
    let hooks = {};
    try {
        let files = fs.readdirSync(think.APP_PATH + '/service');
        files.forEach((val, index) => {
            let ext = path.extname(val);
            if (ext === '.js') {
                let service = think.service(path.basename(val, ext));
                if (typeof service.registerHook === 'function') {
                    let data = service.registerHook();
                    for (let hook in data) {
                        for (let i in data[hook]) {
                            let node = data[hook][i];
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
        })
    } catch (e) {
        think.logger.error(e);
    }
    think.config('hooks', hooks);
})