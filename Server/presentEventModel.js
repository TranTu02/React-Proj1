const mongoose = require('mongoose');

// Định nghĩa schema cho Present Event
const presentEventSchema = new mongoose.Schema({
    PresentID: {
        type: Number,
        required: true,
        unique: true
    },
    ProductID: {
        type: Number,
        required: true
    },
    Quantity: {
        type: Number,
        required: true,
        min: 1 // Đảm bảo số lượng không âm
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
},{ collection: 'PresentEvent' });

// Tạo model từ schema
const PresentEvent = mongoose.model('PresentEvent', presentEventSchema);

module.exports = PresentEvent;
