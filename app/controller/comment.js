"use strict";

const Controller = require("egg").Controller;

class Comment extends Controller {
    async addComment() {
        const { ctx } = this;
        if (!ctx.isAuthenticated()) throw 1;
        const rule = {
            content: { type: "string" },
            article_id: { type: "string" }
        };
        const { body } = ctx.request;
        try {
            // 校验参数
            ctx.validate(rule, body);
        } catch (error) {
            throw 3;
        }

        body.author = ctx.user.id;
        body.avatar_url = ctx.user.avatar_url;

        await ctx.service.comment.addComment(body);
        // 添加消息
        if (body.parent || body.cur) {
            ctx.service.notice.addNotice({
                from: body.author,
                to: body.parent || body.cur,
                target: body.article_id
            });
        }
    }
    async getComment() {
        const { ctx } = this;
        const { query } = ctx;
        if (!query.id) throw 3;

        const res = await ctx.service.comment.getComment(query.id);

        ctx.body.data = res;
    }
    async removeComment() {
        const { ctx } = this;
        if (!ctx.isAuthenticated()) throw 1;

        const { body } = ctx.request;
        if (!body.id) throw 3;

        await ctx.service.comment.removeComment(body.id);
    }
}

module.exports = Comment;
