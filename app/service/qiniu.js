const Service = require("egg").Service;
const Qiniu = require("qiniu");

class QiniuService extends Service {
    uploadToken() {
        const { qiniuToken } = this.config;
        const mac = new Qiniu.auth.digest.Mac(
            qiniuToken.accessKey,
            qiniuToken.secretKey
        );
        const putPolicy = new Qiniu.rs.PutPolicy(qiniuToken.options);
        return putPolicy.uploadToken(mac);
    }
}

module.exports = QiniuService;
