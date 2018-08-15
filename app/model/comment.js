"use strict";

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const CommentSchema = new Schema({
        _id: { type: String },
        id: { type: String },
        content: { type: String },
        author: { type: String, ref: "jef_user" },
        avatar_url: { type: String },
        article_id: { type: String },
        parent: { type: String, ref: "jef_user" },
        create_at: { type: Date, default: Date.now() }
    });

    return mongoose.model("jef_comment", CommentSchema);
};
