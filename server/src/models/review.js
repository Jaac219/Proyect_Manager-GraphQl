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
    type: Number
  },
  productId: {
    type: String,
    require: true
  },
},{
  collection: collectionName,
  _id: false
})