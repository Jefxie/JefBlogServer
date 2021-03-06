const Service = require("egg").Service;

class CategoryService extends Service {
    async addArticle(data) {
        const { ctx } = this;
        const article = await ctx.model.Article();
        const $id = ctx.uuid();
        article.id = $id;
        article._id = $id;
        article.title = data.title;
        article.content = encodeURIComponent(data.content);
        article.abstract = data.abstract;
        article.author = data.author;
        article.category = data.category;
        article.create_at = Date.now();
        article.pv = 0;

        return article.save();
    }
    getOneArticle(id) {
        const { ctx } = this;
        return ctx.model.Article.findOne({ id }, { __v: 0 })
            .populate("category", "-_id name id")
            .populate("author", "-_id name login avatar_url id");
    }
    getArticleList(category = {}, total = 10, page = 1) {
        return this.ctx.model.Article.find(category, {
            title: 1,
            abstract: 1,
            create_at: 1,
            pv: 1,
            author: 1,
            category: 1,
            _id: 0,
            id: 1
        })
            .populate("category", "-_id name alias")
            .populate("author", "-_id name login")
            .sort({create_at:-1})
            .skip(total * (page - 1))
            .limit(total);
    }
    removeArticle(id) {
        return this.ctx.model.Article.remove({ id }).exec();
    }
}

module.exports = CategoryService;
