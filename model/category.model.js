const mongoose = require('mongoose');
// Schema

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'category is required'],
        unique: [true, 'category must be unique'],
        minlength: [3, 'is too short'],
        maxlength: [20, 'is too long'],
    },
    slug: {
        type: String,
        lowercase: true,
    },

}, { timestamps: true });

// Model
const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
