module.exports = {

    /**
     * 执行hook
     * @param  {[type]}    name [description]
     * @param  {...[type]} args [description]
     * @return {[type]}         [description]
     */
    async hook(name, ...args) {
        const { hooks } = think.config();
        const hookFuncs = hooks[name];
        if (!think.isArray(hookFuncs)) {
            return;
        }
        for(const {service, method} of hookFuncs) {
            await service[method](...args)
        };
    }
};