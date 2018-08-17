"use strict";

const Controller = require("egg").Controller;
const qiniu = require("qiniu");

class Users extends Controller {
    async userLogin() {
        const { ctx } = this;
        const { query = {} } = ctx;
        if (query.login) {
            const user = await ctx.service.user.getOneUserinfoToLogin(
                query.login
            );
            ctx.body.data = user;
        } else if (ctx.isAuthenticated()) {
            ctx.body.data = ctx.user;
        } else {
            throw 1;
        }
    }
    async modifyUserInfo() {
        const { ctx } = this;

        if (!ctx.isAuthenticated()) throw 1;

        const { body } = ctx.request;

        // 修改参数
        try {
            const user = await ctx.service.user.getOneUserinfo(ctx.user.id);

            user.name = body.name || user.name;
            user.bio = body.bio || user.bio;
            user.blog = body.blog || user.blog;
            user.avatar_url = body.avatar_url || user.avatar_url;
            user.location = body.location || location;

            user.save();
        } catch (error) {
            throw error;
        }
    }
    userLogout() {
        const { ctx } = this;
        if (!ctx.isAuthenticated()) throw 1;

        ctx.logout();
    }
    async qiniuToken() {
        const accessKey = "gDdFqmUq-ZQJwBEwnexLN0zV3jwsXkkO93ZJe2zF";
        const secretKey = "4iz6EAyiiJjPz2DR9mADDpAUNdk-Y020ZR5qc2HU";

        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        const options = {
            scope: "jefblog",
            returnBody:`{"errno":0,"data":["http://image.jef.site/$(key)"],"key":"$(key)","hash":"$(etag)"}`
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);
        this.ctx.body.uptoken = uploadToken;
        this.ctx.body.unique_names = true;
    }
}

module.exports = Users;
