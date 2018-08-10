const Service = require("egg").Service;

class CategoryService extends Service {
    async addArticle(data) {
        const { ctx } = this;
        const article = await ctx.model.Article();
        article.id = ctx.uuid();
        article.title = data.title;
        article.content = encodeURIComponent(data.content);
        article.abstract = data.abstract;
        article.author = data.author;
        article.category_id = data.category_id;
        article.create_at = Date.now();
        article.pv = 0;

        return article.save();
    }
    getOneArticle(id) {
        const { ctx } = this;
        return ctx.model.Article.findOne({ id });
    }
    getArticleList(category = {}, total = 10, page = 1) {
        return this.ctx.model.Article.find(category, {
            title: 1,
            abstract: 1,
            create_at: 1,
            pv: 1,
            author: 1
        })
            .sort("create_at")
            .skip(total * (page - 1))
            .limit(total);
    }
    removeArticle(id) {
        return this.ctx.model.Article.remove({ id }).exec();
    }
}

module.exports = CategoryService;
