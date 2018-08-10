"use strict";

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const CategorySchema = new Schema({
        id: { type: String },
        name: { type: String },
        alias: { type: String },
    });

    return mongoose.model('jef_category',CategorySchema);
};
