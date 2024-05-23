// categoryModel.js
const mongoose = require('mongoose');

// Định nghĩa schema cho Category
const photoSchema = new mongoose.Schema({
    PhotoID: {
        type: Number,
        required: true,
        unique: true},
    ProductID: {type: Number, required: true},
    ImgSrc: {type: String, required: true}
}, { collection: 'Photo' }); // Chỉ định tên collection là 'Category'

// Tạo model từ schema
const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
