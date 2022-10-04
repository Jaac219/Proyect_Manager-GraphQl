// const review = require("../models/review.js");
// const product = require("../models/product.js");

const { generateId, handlePagination } = require("@codecraftkit/utils");

const Get_Reviews = async (_, { filter = {}, option = {} }, { review }) => {
  try {
    let { skip, limit } = handlePagination(option);
    let { date, title, comment, rating } = filter;

    filter.isRemove = false;
    if(date) filter.date = new Date(date);
    if(title) filter.title = { $regex: title, $options: 'i'}
    if(comment) filter.comment = { $regex: comment, $options: 'i'}

    const find = review.find(filter);

    if(limit) find.limit(limit);
    if(skip) find.skip(skip);

    return await find.exec();
  } catch (error) {
    return error;
  }
}

const Get_Review = async (_, { id }, { review }) => {
  try {
    return await review.findById(id);
  } catch (error) {
    return error;
  }
}

const Save_Review = async (_, { reviewInput }, { review }) => {
  try {
    if(reviewInput._id) return await Update_Review(_, { reviewInput }, { review })
    return await Create_Review(_, { reviewInput }, { review })
  } catch (error) {
    return error;
  }
}

const Create_Review = async (_, { reviewInput }, { review }) => {
  try {
    const _id = generateId();
    await new review({ _id, ...reviewInput }).save();
    return _id;
  } catch (error) {
    return error;
  }
}

const Update_Review = async (_, { reviewInput }, { review }) => {
  try {
    await review.findByIdAndUpdate(reviewInput._id, { $set: reviewInput }, {new: true});
    return reviewInput._id;
  } catch (error) {
    return error;
  }
}

const Delete_Review = async (_, { _id }, { review }) => {
  try {
    await review.findByIdAndUpdate(_id, {$set: {isRemove: true}});
    return true;
  } catch (error) {
    return error;
  }
}


module.exports = {
  Query: {
    Get_Reviews,
    Get_Review
  },
  Mutation: {
    Save_Review,
    Delete_Review
  },
  Review:{
    product:  async (parent, args, { product }) => {
      return await product.findById(parent.productId);
    }
  }
}