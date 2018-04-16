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
            'comment': ['commentCreate', 'commentUpdate', 'commentDelete'],
            'content': ['contentCreate', 'contentUpdate', 'contentDelete']
        }
    }

    /**
     * 更新留言缓存
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    comment(data) {

    }

    /**
     * 更新内容缓存
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    content(data) {

    }
}