const { Schema, model } = require("mongoose");

const collectionName = 'review';

const schema = new Schema({
  _id: {
    type: String
  },
  title: {
    type: String,
    require: true
  },
  comment: {
    type: String
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
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