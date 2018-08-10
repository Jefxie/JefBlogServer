"use strict";

const Controller = require("egg").Controller;

class Article extends Controller {
    async addArticle() {
        const { ctx } = this;

        if (!ctx.isAuthenticated()) throw 1;
        if (ctx.user.level !== "Admin") throw 4;

        const rule = {
            title: { type: "string" },
            content: { type: "string" },
            abstract: { type: "string" },
            author: { type: "string" },
            category_id: { type: "string" }
        };
        const { body } = ctx.request;
        try {
            // 校验参数
            ctx.validate(rule, body);
        } catch (error) {
            throw 3;
        }
        const res = await ctx.service.article.addArticle(body);
        ctx.body.data = res;
    }
    async getArticleDetail() {
        const { ctx } = this;
        if (!ctx.params.id) throw 3;
        // find detail
        const res = await ctx.service.article.getOneArticle(ctx.params.id);
        
        ctx.body.data = res;
        // pv +1
        ++res.pv;
        res.save();
    }
    async getArticleList() {
        const { ctx } = this;

        const { query = {} } = ctx;

        const res = await ctx.service.article.getArticleList(
            query.category || {},
            query.total || 10,
            query.page || 1
        );

        ctx.body.data = res;
    }
    async modifyArticle() {
        const { ctx } = this;

        if (!ctx.isAuthenticated()) throw 1;
        if (ctx.user.level !== "Admin") throw 4;

        const { body } = ctx.request;
        if (!body.id) throw 3;

        const res = await ctx.service.article.getOneArticle(body.id);
        res.title = body.title || res.title;
        res.content = body.content || res.content;
        res.abstract = body.abstract || res.abstract;
        res.category_id = body.category_id || res.category_id;

        await res.save();
    }
    async removeArticle() {
        const { ctx } = this;

        if (!ctx.isAuthenticated()) throw 1;
        if (ctx.user.level !== "Admin") throw 4;

        const { body } = ctx.request;
        if (!body.id) throw 3;

        await ctx.service.article.removeArticle(body.id);
    }
}

module.exports = Article;
