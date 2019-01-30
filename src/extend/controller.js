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
        for (const { service, method } of hookFuncs) {
            await service[method](...args)
        };
    },

    /**
     * 发送响应
     * @param  {[type]} tpl [description]
     * @return {[type]}     [description]
     */
    async renderAndFlush(tpl) {
        const firstChunkMinLength = 4096;
        let content = await this.render(tpl);

        //first chunk
        if (!this.ctx.headerSent) {
            this.ctx.type = 'html';
            this.ctx.flushHeaders();

            let length = content.length;
            if (length < firstChunkMinLength) {
                content += `<s>${' '.repeat(firstChunkMinLength - length)}</s>`;
            }
        }

        this.ctx.res.write(content);
    }

};