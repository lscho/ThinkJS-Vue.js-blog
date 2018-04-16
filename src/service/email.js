module.exports = class extends think.Service {
    constructor() {
        super();
    }

    /**
     * 注册插件点
     * @return {[type]} [description]
     */
    registerHook() {
        return {
            'comment': ['commentCreate']
        }
    }


    /**
     * 评论邮件提醒
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    comment(data) {

    }
}