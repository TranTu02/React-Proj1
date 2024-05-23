const mongoose = require('mongoose');

// Định nghĩa schema cho Present Event
const stockSchema = new mongoose.Schema({
    StockID: {
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
        min: 1,
    },
    Remaining:{
        type:Number,
        min:0,
    },
    Date: {
        type: Date,
        required: true,
    },  
    ExpirationDate: {
        type:Date,
    },
    Cost: {
        type: Number,
        required: true,
        min: 1,
    },
    SupplierTaxCode:
    {
        type: String,
        require: true
    }
},{ collection: 'Stock' });

// Tạo model từ schema
const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
