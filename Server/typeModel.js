// typeModel.js

const mongoose = require('mongoose');

// Định nghĩa schema cho Category
const typeSchema = new mongoose.Schema({
    ProductTypeID: {
        type: Number,
        required: true,
        unique: true},
    CategoryID: {type: Number, required: true},
    ProductType: {type: String, required: true}
}, { collection: 'Type' }); // Chỉ định tên collection là 'Category'

// Tạo model từ schema
const Type = mongoose.model('Type', typeSchema);

module.exports = Type;
