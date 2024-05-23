// accountModel.js
const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  AccountID: {
    type: Number,
    required: true,
    unique: true
  },
  PhoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  Name: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Birthday: {
    type: String,
    required: true
  },
  Authorize: {
    type: Number,
    required: true
  }
}, {
  collection: 'Account' // Chỉ định tên collection
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
