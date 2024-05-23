const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  ProductID: { type: Number, required: true, unique: true },
  ProductName: { type: String, required: true },
  BrandID: { type: Number, required: true },
  CategoryID: { type: Number, required: true },
  ProductTypeID: { type: Number, required: true },
  Image: { type: String, required: true },
  Price: { type: Number, required: true },
  Description: { type: String, required: true },
  Stock: { type: Number, required: true },
  Date: { type: Date, required: true },
  Overview: { type: String, required: true },
  CalculationUnit: { type: String, required: true },
  Weight: { type: Number, required: true },
});

// Chỉ định tên collection là 'Product'
module.exports = mongoose.model('Product', productSchema, 'Product');
