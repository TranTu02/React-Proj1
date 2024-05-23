const mongoose = require('mongoose');

// Định nghĩa schema cho Present Event
const discountProductSchema = new mongoose.Schema({
    DiscountID: {
        type: Number,
        required: true
    },
    ProductID: {
        type: Number,
        required: true
    },
    Reduce: {
        type: Number,
        required: true,
        min: 0 // Đảm bảo số lượng không âm
    },

},{ collection: 'DiscountPoduct' });

// /// Tạo custom validator để kiểm tra sự tồn tại của cặp ProductID và DiscountID
// discountProductSchema.path('ProductID').validate(async function(value, callback) {
//     try {
//         const count = await this.model('DiscountProduct').countDocuments({ ProductID: value, DiscountID: this.DiscountID });
//         return count === 0; // Trả về true nếu không có cặp nào lặp lại, ngược lại trả về false
//     } catch (error) {
//         return false; // Trả về false nếu có lỗi xảy ra
//     }
// }, 'ProductID và DiscountID phải là duy nhất.');

// Tạo model từ schema
const DiscountPoduct = mongoose.model('DiscountProduct', discountProductSchema);

module.exports = DiscountPoduct;
