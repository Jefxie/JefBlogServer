"use strict";

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const CommentSchema = new Schema({
        id: { type: String },
        content: { type: String },
        author: { type: String },
        avatar_url: { type: String },
        article_id: { type: String },
        parent: { type: String },
        create_at: { type: Date, default: Date.now() }
    });

    return mongoose.model("jef_comment", CommentSchema);
};
