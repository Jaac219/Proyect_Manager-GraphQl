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
    type: Number
  },
  image: {
    type: String
  },
  price: {
    type: Number
  },
  onSale: {
    type: Boolean
  },
  categoryId: {
    type: String,
    require: true
  },
}, {
  collection: collectionName,
  _id: false
});

module.exports = model(collectionName, schema);