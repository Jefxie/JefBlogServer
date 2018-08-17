const Service = require("egg").Service;
const Qiniu = require("qiniu");

class QiniuService extends Service {
    uploadToken() {
        // const { qiniuToken } = this.config;
        const qiniuToken = {
            accessKey: "gDdFqmUq-ZQJwBEwnexLN0zV3jwsXkkO93ZJe2zF",
            secretKey: "4iz6EAyiiJjPz2DR9mADDpAUNdk-Y020ZR5qc2HU",
            options: {
                scope: "jefblog",
                returnBody: `{"err":0,"data":"http://image.jef.site/$(key)"","key":"$(key)","hash":"$(etag)"}`
            }
        };
        console.log("qiniu", qiniuToken);
        const mac = new Qiniu.auth.digest.Mac(
            qiniuToken.accessKey,
            qiniuToken.secretKey
        );
        const putPolicy = new Qiniu.rs.PutPolicy(qiniuToken.options);
        return putPolicy.uploadToken(mac);
    }
}

module.exports = QiniuService;
