// categoryModel.js

const mongoose = require('mongoose');

// Định nghĩa schema cho Category
const brandSchema = new mongoose.Schema({
    BrandID: {
        type: Number,
        required: true,
        unique: true},
    BrandName: {type: String, required: true},
    Logo: {type: String, required: true}
}, { collection: 'Brand' }); // Chỉ định tên collection là 'Category'

// Tạo model từ schema
const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
