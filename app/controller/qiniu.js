"use strict";

const Controller = require("egg").Controller;

class Qiniu extends Controller {
    qiniuUploadToken() {
        const { ctx } = this;

        const uploadToken = ctx.service.qiniu.uploadToken();

        ctx.body.token = uploadToken;
    }
}

module.exports = Qiniu;
