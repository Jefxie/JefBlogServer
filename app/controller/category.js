"use strict";

const Controller = require("egg").Controller;

class Category extends Controller {
    async addCategory() {
        const { ctx } = this;
        
        if (!ctx.isAuthenticated()) throw 1;
        if (ctx.user.level !== "Admin") throw 4;

        const rule = {
            name: { type: "string" },
            alias: { type: "string" }
        };
        const { body } = ctx.request;
        try {
            // 校验参数
            ctx.validate(rule, body);
        } catch (error) {
            throw 3;
        }
        const res = await ctx.service.category.addCategory(
            body.name,
            body.alias
        );
        ctx.body.data = res;
    }
    async modifyCategory() {
        const { ctx } = this;

        if (!ctx.isAuthenticated()) throw 1;
        if (ctx.user.level !== "Admin") throw 4;

        const { body } = ctx.request;
        if (!body.id) throw 3;
        const category = await ctx.service.category.getOneCategory(body.id);
        category.name = body.name || category.name;
        category.alias = body.alias || category.alias;
        await category.save();
    }
    async deleteCategory() {
        const { ctx } = this;

        if (!ctx.isAuthenticated()) throw 1;
        if (ctx.user.level !== "Admin") throw 4;
        
        const { body } = ctx.request;
        if (!body.id) throw 3;
        await ctx.service.category.removeCategory(body.id);
    }
    async getCategoryList() {
        const { ctx } = this;
        const res = await ctx.service.category.getCategoryList();
        ctx.body.data = res;
    }
}

module.exports = Category;
