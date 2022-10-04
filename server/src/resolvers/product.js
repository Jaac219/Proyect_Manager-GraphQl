const { product, review, category } = require("../models");

const { generateId, handlePagination } = require("@codecraftkit/utils");
const { default: mongoose } = require("mongoose");

const Products_Get = async(_, {filter = {}, option = {}}) =>{
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

const Product_Get = async(_, { id }) =>{
  try {
    return await product.findById(id);
  } catch (error) {
    return error;
  }
}

const Product_Save = async(_,  { productInput }) => {
  try {
    if(productInput._id) return await Product_Update(_, { productInput });
    return await Product_Create(_, { productInput });
  } catch (error) {
    return error;
  }
}

const Product_Create = async(_, {productInput}) => {
  try {
    const _id = generateId();
    await new product({ _id, ...productInput }).save();
    return _id;
  } catch (error) {
    return error;
  }
}

const Product_Update = async(_, {productInput}) => {
  try {
    await product.findByIdAndUpdate(productInput._id, {$set: productInput}, { new: true });
    return productInput._id;
  } catch (error) {
    return error;
  }
}

const Product_Delete = async(_, { _id }) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try { 
    await product.findByIdAndUpdate(_id, {$set: { isRemove: true }});
    await review.updateMany({productId: _id}, {$set: {isRemove: true}}); 
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    return error;
  } finally {
    session.endSession();
    return true;
  }
}

const Update_Quantity = async(_, { _id, option, value }) => {
  try { 
    if(option === "INC"){
      await product.findByIdAndUpdate(_id, {$inc: { quantity: value}});
    } else if (option === "DEC") {
      await product.findByIdAndUpdate(_id, {$inc: { quantity: -value}});
    }
    return true;
  } catch (error) {
    return error;
  }
}

module.exports = {
  Query: {
    Products_Get,
    Product_Get
  },
  Mutation: {
    Product_Save,
    Product_Delete,
    Update_Quantity
  },
  Product: {
    category: async(parent, args)=>{
      return await category.findById(parent.categoryId);
    },
    reviews: async(parent, args)=>{
      return await review.find({productId: parent._id, isRemove: false});
    }
  }
}