const mongoose = require('mongoose');

// Định nghĩa schema cho Present Event
const presentProductSchema = new mongoose.Schema({
    ProductID: {
        type: Number,
        required: true,
        unique: true
    },
    Require: {
        type: Number,
        required: true,
        min: 1 // Đảm bảo số lượng không âm
    },
    PresentID: {
        type: Number,
        required: true
    },

},{ collection: 'PresentProduct' });

// Tạo model từ schema
const PresentProduct = mongoose.model('PresentProduct', presentProductSchema);

module.exports = PresentProduct;
