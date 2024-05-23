const mongoose = require('mongoose');

// Định nghĩa schema cho Present Event
const saleEventSchema = new mongoose.Schema({
    DiscountID: {
        type: Number,
        required: true,
        unique: true
    },
    DiscountTitle: {
        type: String,
        required: true
    },
    Start: {
        type: Date,
        required: true,
        // validate: {
        //     validator: function(date) {
        //         // Kiểm tra ngày bắt đầu không được lớn hơn ngày kết thúc
        //         return date <= this.End;
        //     },
        //     message: 'Start date must be less than or equal to end date'
        // }
    },
    End: {
        type: Date,
        required: true,
        // validate: {
        //     validator: function(date) {
        //         // Kiểm tra ngày kết thúc không được nhỏ hơn ngày bắt đầu
        //         return date >= this.Start;
        //     },
        //     message: 'End date must be greater than or equal to start date'
        // }
    }
},{ collection: 'SaleEvent' });

// Tạo model từ schema
const SaleEvent = mongoose.model('SaleEvent', saleEventSchema);

module.exports = SaleEvent;
