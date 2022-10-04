// const category = require("../models/category.js");
// const product = require("../models/product.js");

const { generateId, handlePagination } = require("@codecraftkit/utils");
const { default: mongoose } = require("mongoose");

const Get_Categories = async (_, {filter = {}, option = {}}, { category }) => {
  try {
    let { skip, limit } = handlePagination(option);
    let { name } = filter;

    filter.isRemove = false;
    if(name) filter.name = { $regex: name, $options: 'i' }

    const find = category.find(filter);

    if(limit) find.limit(limit);
    if(skip) find.skip(skip);

    return await find.exec();
  } catch (error) {
    return error;
  }
}

const Get_Category = async (_, { id }, { category }) => {
  try {
    return await category.findById(id);
  } catch (error) {
    return error;
  }
}

const Save_Category = async (_, { categoryInput }, { category }) => {
  try {
    console.log(categoryInput)
    if(categoryInput._id) return await Update_Category(_, { categoryInput }, { category });
    return await Create_Category(_, { categoryInput }, { category });
  } catch (error) {
    return error;
  }
}

const Create_Category = async (_, { categoryInput }, { category }) => {
  try {
    const _id = generateId();
    await category({ _id, ...categoryInput }).save();
    return _id;
  } catch (error) {
    return error;
  }
}

const Update_Category = async (_, { categoryInput }, { category }) => {
  try {
    await category.findByIdAndUpdate(categoryInput._id, { $set: categoryInput }, { new: true });
    return categoryInput._id;
  } catch (error) {
    return error;
  }
}

const Delete_Category = async (_, { _id }, { category, product }) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await category.findByIdAndUpdate(_id, { $set: { isRemove: true } });
    await product.updateMany({categoryId: _id}, {$set: {categoryId: null}});
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    return error;
  } finally {
    session.endSession();
    return true;
  }
}

module.exports = {
  Query: {
    Get_Categories,
    Get_Category
  },
  Mutation: {
    Save_Category,
    Delete_Category
  },
  Category: {
    products: async (parent, args, { product }) =>{
      return await product.find({categoryId: parent._id, isRemove: false});
    }
  }
}