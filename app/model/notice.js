"use strict";

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const NoticeSchema = new Schema({
        _id: { type: String },
        from: { type: String, ref: "jef_user" },
        to: { type: String },
        type: { type: String, default: "comment" },
        created_at: { type: Date, default: Date.now() },
        state: { type: Number, default: 1 },
        target: { type: String, ref: "jef_article" }
    });

    return mongoose.model("jef_notice", NoticeSchema);
};