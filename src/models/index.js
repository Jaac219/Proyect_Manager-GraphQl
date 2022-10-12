const { default: mongoose } = require("mongoose");
const product = require("./Product.js");
const review = require("./Review.js");
const category = require("./Category.js");
const invoice = require("./Invoice.js");

module.exports = { 
  product,
  review,
  category,
  invoice,
  mongoose
 }