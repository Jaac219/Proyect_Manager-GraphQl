const { Schema, model } = require("mongoose");

const collectionName = 'review';

const schema = new Schema({
  _id: {
    type: String
  },
  date: {
    type: Date,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  comment: {
    type: String
  },
  rating: {
    type: String
  },
  productId: {
    type: String,
    require: true
  },
  isRemove: {
    type: Boolean,
    default: false
  }
},{
  collection: collectionName,
  timestamps: true,
  _id: false
})

module.exports = model(collectionName, schema);