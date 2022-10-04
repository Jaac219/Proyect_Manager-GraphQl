const { review, product } = require("../models");

const { generateId, handlePagination } = require("@codecraftkit/utils");

const Reviews_Get = async (_, { filter = {}, option = {} }) => {
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

const Review_Get = async (_, { id }) => {
  try {
    return await review.findById(id);
  } catch (error) {
    return error;
  }
}

const Review_Save = async (_, { reviewInput }) => {
  try {
    if(reviewInput._id) return await Review_Update(_, { reviewInput })
    return await Review_Create(_, { reviewInput })
  } catch (error) {
    return error;
  }
}

const Review_Create = async (_, { reviewInput }) => {
  try {
    const _id = generateId();
    await new review({ _id, ...reviewInput }).save();
    return _id;
  } catch (error) {
    return error;
  }
}

const Review_Update = async (_, { reviewInput }) => {
  try {
    await review.findByIdAndUpdate(reviewInput._id, { $set: reviewInput }, {new: true});
    return reviewInput._id;
  } catch (error) {
    return error;
  }
}

const Review_Delete = async (_, { _id }) => {
  try {
    await review.findByIdAndUpdate(_id, {$set: {isRemove: true}});
    return true;
  } catch (error) {
    return error;
  }
}

module.exports = {
  Query: {
    Reviews_Get,
    Review_Get
  },
  Mutation: {
    Review_Save,
    Review_Delete
  },
  Review:{
    product:  async (parent, args) => {
      return await product.findById(parent.productId);
    }
  }
}