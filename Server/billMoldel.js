const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  BillID: { type: Number, required: true, unique: true },
  Name: { type: String, required: true },
  PhoneNumber: { type: String, required: true },
  Location: { type: String, required: true },
  Address: { type: String, required: true },
  Date: { type: String, required: true },
  Time: { type: String, required: true },
  Payment: { type: String, required: true },
  Note: { type: String },
  CompanyName: { type: String },
  Email: { type: String},
  TaxCode: { type: String },
  CompanyAddress: { type: String },
  totalCart: { type: Number, required: true },
  totalPresent: { type: Number, required: true },
  ShipCost: { type: Number, required: true },
  totalReduce: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  Status: { type: Number, required: true },
  Shipper: { type: String},
});

// Chỉ định tên collection là 'Product'
module.exports = mongoose.model('Bill', billSchema, 'Bill');
