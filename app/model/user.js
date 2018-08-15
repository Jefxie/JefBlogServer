"use strict";

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        login: { type: String },
        _id: { type: String },
        id: { type: String },
        name: { type: String },
        email: { type: String },
        avatar_url: { type: String },
        created_at: { type: Date, default: Date.now() },
        bio: { type: String },
        blog: { type: String },
        location: { type: String },
        level: { type: String }
    });

    return mongoose.model("jef_user", UserSchema);
};
