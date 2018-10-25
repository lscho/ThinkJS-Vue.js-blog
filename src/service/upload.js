module.exports = class extends think.Service {
    /**
     * 注册HOOK点
     * @return {[type]} [description]
     */
    static registerHook() {
        return {
            'qiniu': ['upload'],
            'cdn': ['upload']
        };
    }

    /**
     * cdn 链接处理
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    async cdn(data) {
        const config = await think.model('config').cache('config').getList();
        if (think.isEmpty(config) || think.isEmpty(config.site) || think.isEmpty(config.site.cdn)) {
            return false;
        }
        data.url = config.site.cdn + data.url;
        return true;
    }

    /**
     * 上传到七牛空间
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    async qiniu(data) {
        // 暂时不使用
        return false;
        let QN = require("qiniu");
        const config = await think.model('config').cache('config').getList();
        if (think.isEmpty(config)) {
            return false;
        }
        const qiniu = config.qiniu;
        if (think.isEmpty(qiniu)) {
            return false;
        }

        const bucket = qiniu.bucket;
        const accessKey = qiniu.access_key;
        const secretKey = qiniu.secret_key;

        const mac = new QN.auth.digest.Mac(accessKey, secretKey);
        const putPolicy = new QN.rs.PutPolicy({ scope: bucket });
        const uploadToken = putPolicy.uploadToken(mac);
        const qnConfig = new QN.conf.Config();
        const formUploader = new QN.form_up.FormUploader(qnConfig);
        const putExtra = new QN.form_up.PutExtra();

        const localFile = data.filepath;

        return new Promise((resolve, reject) => {
            formUploader.putFile(uploadToken, data.basename, localFile, putExtra, (respErr, respBody, respInfo) => {
                if (respErr) {
                    reject(respErr);
                }
                if (respInfo.statusCode == 200) {
                    resolve(respBody);
                } else {
                    reject(respBody);
                }
            });
        })

    }

};