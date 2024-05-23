// categoryModel.js

const mongoose = require('mongoose');

// Định nghĩa schema cho Category
const categorySchema = new mongoose.Schema({
    CategoryID: {
        type: Number,
        required: true,
        unique: true},
    CategoryName: {type: String, required: true},
    CategoryIllustration: {type: String, required: true},
    Order: {type: Number, require: true},
}, { collection: 'Category' }); // Chỉ định tên collection là 'Category'

// Tạo model từ schema
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
