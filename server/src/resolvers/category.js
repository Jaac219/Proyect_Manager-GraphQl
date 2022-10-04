const category = require("../models/category.js");
const product = require("../models/product.js");

const { generateId, handlePagination } = require("@codecraftkit/utils");

const Get_Categories = async (_, {filter = {}, option = {}}) => {
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

const Get_Category = async (_, { id }) => {
  try {
    return await category.findById(id);
  } catch (error) {
    return error;
  }
}

const Save_Category = async (_, { categoryInput }) => {
  try {
    if(categoryInput._id) return await Update_Category(_, { categoryInput });
    return await Create_Category(_, { categoryInput });
  } catch (error) {
    return error;
  }
}

const Create_Category = async (_, { categoryInput }) => {
  try {
    const _id = generateId();
    await category({ _id, ...categoryInput }).save();
    console.log('si')
    return _id;
  } catch (error) {
    return error;
  }
}

const Update_Category = async (_, { categoryInput }) => {
  try {
    await category.findByIdAndUpdate(categoryInput._id, { $set: categoryInput }, { new: true });
    return categoryInput._id;
  } catch (error) {
    return error;
  }
}

const Delete_Category = async (_, { _id }) => {
  try {
    await category.findByIdAndUpdate(_id, { $set: { isRemove: true } });
    return true;
  } catch (error) {
    return error;
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
    products: async (parent, args) =>{
      return await product.find({categoryId: parent._id});
    }
  }
}