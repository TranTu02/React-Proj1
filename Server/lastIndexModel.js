const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  ProductID: { type: Number, required: true,  unique: true },
  CategoryID: { type: Number, required: true  , unique: true },
  BrandID: { type: Number, required: true  , unique: true },
  PhotoID: { type: Number, required: true  , unique: true },
  ProductTypeID: { type: Number, required: true , unique: true },
  BillID: { type: Number, required: true  , unique: true },
  BannerID: { type: Number, required: true , unique: true },
  DiscountID: { type: Number, required: true  , unique: true },
  StockID: { type: Number, required: true , unique: true },
  PresentID: { type: Number, required: true  , unique: true },
  LocationID: { type: Number, required: true  , unique: true },
});

// Chỉ định tên collection là 'Product'
module.exports = mongoose.model('LastIndex', productSchema, 'LastIndex');
