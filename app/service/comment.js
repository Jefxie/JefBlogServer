const Service = require("egg").Service;

class CommentService extends Service {
    async addComment(data) {
        const { ctx } = this;
        const comment = await ctx.model.Comment();
        const $id = ctx.uuid(1);
        comment._id = $id;
        comment.id = $id;
        comment.content = data.content;
        comment.author = data.author;
        comment.article_id = data.article_id;
        comment.parent = data.parent || "";
        comment.create_at = Date.now();
        comment.avatar_url = data.avatar_url;
        return comment.save();
    }
    getComment(id) {
        return this.ctx.model.Comment.find(
            { article_id: id },
            { _id: 0, __v: 0, avatar_url: 0 }
        )
            .populate("author", "-_id name login id avatar_url")
            .populate("parent", "-_id name login avatar_url");
    }
    removeComment(id) {
        return this.ctx.model.Comment.remove({ id }).exec();
    }
}

module.exports = CommentService;
