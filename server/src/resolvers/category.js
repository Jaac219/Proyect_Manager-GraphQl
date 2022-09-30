const category = require("../models/category.js");
const product = require("../models/product.js")

const Get_Categories = async (_, {filter = {}})=>{
  try {
    return await category.find().exec();
  } catch (error) {
    return error;
  }
}

const Get_Category = async (_, {id})=>{
  try {
    return await category.findById(id).exec();
  } catch (error) {
    return error;
  }
}

module.exports = {
  Query: {
    Get_Categories,
    Get_Category
  },
  Category: {
    products: async (parent, args) =>{
      return await product.find({_id: parent._id});
    }
  }
}