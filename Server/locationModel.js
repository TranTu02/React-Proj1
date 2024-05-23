const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    LocationID: {
        type: Number,
        required: true,
        unique:true
    },
    Location: {
        type: String,
        required: true
    },
    Distance:{
        type: Number,
        required: true,
        min: 0 // Đảm bảo số lượng không âm
    },

}, {
    collection: 'Location' // Chỉ định tên collection
  });
  

const DetailBill = mongoose.model('Location', locationSchema);

module.exports = DetailBill;
