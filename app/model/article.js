"use strict";

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ArticleSchema = new Schema({
        id: { type: String },
        title: { type: String },
        content: { type: String },
        abstract: { type: String },
        category_id: { type: String },
        author: { type: String },
        create_at: { type: Date, default: Date.now() },
        pv: { type: Number, default: 0 }
    });

    return mongoose.model("jef_article", ArticleSchema);
};
