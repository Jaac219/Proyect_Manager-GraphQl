const product = require("../models/product.js");
const category = require("../models/category.js");
const review = require("../models/review.js");

const { generateId, handlePagination } = require("@codecraftkit/utils");

const Get_Products = async(_, {filter = {}, option = {}}) =>{
  try {
    let { skip, limit } = handlePagination(option);
    let { name, description } = filter;
    
    filter.isRemove = false;
    if(name) filter.name = { $regex: name, $options: 'i' }
    if(description) filter.description = { $regex: description, $options: 'i' }

    const find = product.find(filter);

    if(limit) find.limit(limit);
    if(skip) find.skip(skip);

    return await find.exec();
  } catch (error) {
    return error;
  }
}

const Get_Product = async(_, { id }) =>{
  try {
    return await product.findById(id);
  } catch (error) {
    return error;
  }
}

const Save_Product = async(_,  { productInput }) => {
  try {
    if(productInput._id) return await Update_Product(_, { productInput });
    return await Create_Product(_, { productInput });
  } catch (error) {
    return error;
  }
}

const Create_Product = async(_, {productInput}) => {
  try {
    const _id = generateId();
    await new product({ _id, ...productInput }).save();
    return _id;
  } catch (error) {
    return error;
  }
}

const Update_Product = async(_, {productInput}) => {
  try {
    await product.findByIdAndUpdate(productInput._id, {$set: productInput}, { new: true });
    return productInput._id;
  } catch (error) {
    return error;
  }
}

const Delete_Product = async(_, { _id }) => {
  try { 
    await product.findByIdAndUpdate(_id, {$set: { isRemove: true }});
    await review.updateMany({productId: _id}, {$set: {isRemove: true}}); 
    return true;
  } catch (error) {
    return error;
  }
}

const Update_Quantity = async(_, { _id, option, value }) => {
  try { 
    if(option === "ADD"){
      console.log("add")
      // Pendiente por hacer
      await product.findByIdAndUpdate(_id, {$set: { quantity: { $add: 1 }}})
    } 
    return _id;
  } catch (error) {
    return error;
  }
}

module.exports = {
  Query: {
    Get_Products,
    Get_Product
  },
  Mutation: {
    Save_Product,
    Delete_Product,
    Update_Quantity
  },
  Product: {
    category: async(parent, args)=>{
      return await category.findById(parent.categoryId);
    },
    reviews: async(parent, args, context)=>{
      return await review.find({productId: parent._id});
    }
  }
}