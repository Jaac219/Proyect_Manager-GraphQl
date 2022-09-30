const { Schema, model } = require("mongoose");

const collectionName = 'category';

const schema = new Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
    require: true
  }
},{
  collation: collectionName,
  _id: false
});

module.exports = model(collectionName, schema);