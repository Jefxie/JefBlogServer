"use strict";

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const NoticeSchema = new Schema({
        id: { type: String },
        author: { type: String },
        type: { type: Number,default:0 },
        created_at: { type: Date, default: Date.now() },
        bio: { type: String },
        blog: { type: String },
        location: { type: String },
        level:{type:String}
    });

    return mongoose.model('jef_notice',NoticeSchema);
};
// jefBlogServer