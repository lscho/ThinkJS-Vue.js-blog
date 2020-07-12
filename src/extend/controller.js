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
        const firstChunkMinLength = 2014;
        let content = await this.render(tpl);

        //first chunk
        if (!this.ctx.headerSent) {
            this.ctx.type = 'html';
            this.ctx.flushHeaders();

            let length = content.length;

            // 第一个 chunk 太小会被浏览器缓存起来达不到效果，参考：https://stackoverflow.com/questions/16909227/using-transfer-encoding-chunked-how-much-data-must-be-sent-before-browsers-s
            if (length < firstChunkMinLength) {
                content += `<s>${' '.repeat(firstChunkMinLength - length)}</s>`;
            }
        }

        this.ctx.res.write(content);
    },

    /**
     * 跳转页面
     * 已经发送了正文，就不能再通过 30X 状态码和 Location 头部来跳转页面，输出一段js来跳转
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    redirect(url){
        this.ctx.res.write(`<script>window.location.href="${url}"</script>`);
        return this.ctx.res.end();
    }

};