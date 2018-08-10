const Service = require("egg").Service;

class CommentService extends Service {
    async addComment(data) {
        const { ctx } = this;
        const comment = await ctx.model.Comment();
        comment.id = ctx.uuid(1);
        comment.content = data.content;
        comment.author = data.author;
        comment.article_id = data.article_id;
        comment.parent = data.parent||'';
        comment.create_at = Date.now();
        comment.avatar_url = data.avatar_url;
        return comment.save();
    }
    getComment(id) {
        return this.ctx.model.Comment.find(
            { article_id: id },
            { _id: 0, __v: 0 }
        );
    }
    removeComment(id) {
        return this.ctx.model.Comment.remove({ id }).exec();
    }
}

module.exports = CommentService;
