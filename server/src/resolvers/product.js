const product = require("../models/product.js");
const category = require("../models/category.js");
const review = require("../models/review.js")

const Get_Products = async(_, {filter = {}, option = {}}) =>{
  try {
    return await product.find(filter).exec();
  } catch (error) {
    return error;
  }
}

const Get_Product = async(_, { id }) =>{
  try {
    return await product.findById(id).exec();
  } catch (error) {
    return error;
  }
}

module.exports = {
  Query: {
    Get_Products,
    Get_Product
  },
  Product: {
    category: async(parent, args, context)=>{
      return await category.findById(parent.categoryId);
    },
    reviews: async(parent, args, context)=>{
      return await review.find({_id: parent._id});
    }
  }
}