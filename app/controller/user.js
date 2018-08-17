"use strict";

const Controller = require("egg").Controller;

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
}

module.exports = Users;
