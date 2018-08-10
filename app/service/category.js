const Service = require("egg").Service;

class CategoryService extends Service {
    async addCategory(name, alias) {
        const { ctx } = this;
        const category = await ctx.model.Category();
        const _save = {
            id: ctx.uuid(),
            name,
            alias
        };
        Object.assign(category, _save);
        await category.save();
        return Promise.resolve(_save);
    }
    getOneCategory(id) {
        const { ctx } = this;
        return ctx.model.Category.findOne({ id });
    }
    getCategoryList() {
        return this.ctx.model.Category.find({}, { _id: 0, __v: 0 });
    }
    removeCategory(id) {
        return this.ctx.model.Category.remove({ id }).exec();
    }
}

module.exports = CategoryService;
