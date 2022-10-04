const { category, product } = require("../models");

const { generateId, handlePagination } = require("@codecraftkit/utils");
const { default: mongoose } = require("mongoose");

const Categories_Get = async (_, {filter = {}, option = {}}) => {
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

const Category_Get = async (_, { id }) => {
  try {
    return await category.findById(id);
  } catch (error) {
    return error;
  }
}

const Category_Save = async (_, { categoryInput }) => {
  try {
    console.log(categoryInput)
    if(categoryInput._id) return await Category_Update(_, { categoryInput });
    return await Category_Create(_, { categoryInput });
  } catch (error) {
    return error;
  }
}

const Category_Create = async (_, { categoryInput }) => {
  try {
    const _id = generateId();
    await category({ _id, ...categoryInput }).save();
    return _id;
  } catch (error) {
    return error;
  }
}

const Category_Update = async (_, { categoryInput }) => {
  try {
    await category.findByIdAndUpdate(categoryInput._id, { $set: categoryInput }, { new: true });
    return categoryInput._id;
  } catch (error) {
    return error;
  }
}

const Category_Delete = async (_, { _id }) => {
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
    Categories_Get,
    Category_Get
  },
  Mutation: {
    Category_Save,
    Category_Delete
  },
  Category: {
    products: async (parent, args, { product }) =>{
      return await product.find({categoryId: parent._id, isRemove: false});
    }
  }
}