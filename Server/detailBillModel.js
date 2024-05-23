const mongoose = require('mongoose');

const detailBillSchema = new mongoose.Schema({
    BillID: {
        type: Number,
        required: true
    },
    ProductID: {
        type: Number,
        required: true
    },
    Quantity:{
        type: Number,
        required: true,
        min: 0 // Đảm bảo số lượng không âm
    },

}, {
    collection: 'DetailBill' // Chỉ định tên collection
  });
  

const DetailBill = mongoose.model('DetailBill', detailBillSchema);

module.exports = DetailBill;
