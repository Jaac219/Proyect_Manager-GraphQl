const { Schema, model } = require("mongoose");

const collectionName = 'invoice';

const schema = new Schema({
  _id: {
    type: String
  },
  number: {
    type: String,
    require: true
  },
  invoicePrice: {
    type: Number
  },
  invoiceIva: {
    type: Number
  },
  totalPrice: {
    type: Number
  },
  productsOrder:{
    type: Array
  },
  state: {
    type: String,
    enum : ['PAY','CANCEL'],
    default: "PAY"
  }
},{
  collection: collectionName,
  timestamps: true,
  _id: false
});

module.exports = model(collectionName, schema);