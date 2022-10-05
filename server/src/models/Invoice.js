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
  productsOrder:{
    type: Array
  },
  isRemove: {
    type: Boolean,
    default: false
  }
},{
  collection: collectionName,
  timestamps: true,
  _id: false
});

module.exports = model(collectionName, schema);