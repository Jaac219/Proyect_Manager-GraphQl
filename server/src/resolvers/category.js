const { category, product } = require("../models");

const { generateId, handlePagination } = require("@codecraftkit/utils");

const Categories_Get = async (_, {filter = {}, option = {}}) => {
  try {
    const { skip, limit } = handlePagination(option);

    const query = { isRemove: false };

    const { _id, name } = filter;

    if(_id) query._id = _id;
    if(name) query.name = { $regex: name, $options: 'i' }

    const find = category.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "product",
          localField: "_id",
          foreignField: "categoryId",
          as: "products",
          pipeline: [
            {
              $lookup: {
                from: "review",
                localField: "_id",
                foreignField: "productId",
                as: "reviews"
              }
            }
          ]
        }
      }
    ]);

    if(limit) find.limit(limit);
    if(skip) find.skip(skip);

    return await find.exec();
  } catch (error) {
    return error;
  }
}

const Category_Save = async (_, { categoryInput }) => {
  try {
    return categoryInput._id
      ? await Category_Update(_, { categoryInput })
      : await Category_Create(_, { categoryInput });
  } catch (error) {
    return error;
  }
}

const Category_Create = async (_, { categoryInput }) => {
  try {
    const { name } = categoryInput;
    const _id = generateId();

    await category({ _id, name }).save();
    return _id;

  } catch (error) {
    return error;
  }
}

const Category_Update = async (_, { categoryInput }) => {
  try {
    const { _id, name } = categoryInput;

    await category.findByIdAndUpdate(_id, 
      { $set: {
        name
      } }, { new: true });

    return _id;
  } catch (error) {
    return error;
  }
}

const Category_Delete = async (_, { _id }) => {
  try {
    await category.findByIdAndUpdate(_id, { $set: { isRemove: true } });
    return true;
  } catch (error) {
    return error;
  }
}

module.exports = {
  Query: {
    Categories_Get
  },
  Mutation: {
    Category_Save,
    Category_Delete
  }
}