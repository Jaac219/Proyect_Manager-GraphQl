const { Schema, model } = require("mongoose");

const collectionName = "product";

const schema = new Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String
  },
  quantity: {
    type: Number,
    min: 0
  },
  image: {
    type: String
  },
  price: {
    type: Number
  },
  onSale: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number
  },
  categoryId: {
    type: String,
    require: true
  },
  isRemove: {
    type: Boolean,
    default: false
  }
}, {
  collection: collectionName,
  timestamps: true,
  _id: false
});

module.exports = model(collectionName, schema);