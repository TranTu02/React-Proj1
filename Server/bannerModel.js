// categoryModel.js
const mongoose = require('mongoose');

// Định nghĩa schema cho Category
const bannerSchema = new mongoose.Schema({
    BannerID: {
        type: Number,
        required: true,
        unique: true},
    ImgSrc: {type: String, required: true},
    CategoryID: {type: String, required: true},
    BrandID: {type: String, required: true},
    ProductTypeID: {type: String, required: true},
    Other: {type: String, required: true},
    Order:{type: Number, required:true}
}, { collection: 'Banner' }); // Chỉ định tên collection là 'Category'

// Tạo model từ schema
const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
