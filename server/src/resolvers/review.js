const review = require("../models/review.js");
const product = require("../models/product.js");

const { generateId, handleFilters } = require("@codecraftkit/utils");

const Get_Reviews = async (_, { filter = {}, option = {} }) => {
  try {
    let { skip, limit } = handleFilters(option);
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

const Get_Review = async (_, { id }) => {
  try {
    return await review.findById(id);
  } catch (error) {
    return error;
  }
}

const Save_Review = async (_, { reviewInput }) => {
  try {
    if(reviewInput._id) return await Update_Review(_, { reviewInput })
    return await Create_Review(_, { reviewInput })
  } catch (error) {
    return error;
  }
}

const Create_Review = async (_, { reviewInput }) => {
  try {
    const _id = generateId();
    await new review({ _id, ...reviewInput }).save();
    return _id;
  } catch (error) {
    return error;
  }
}

const Update_Review = async (_, { reviewInput }) => {
  try {
    await review.findByIdAndUpdate(reviewInput._id, { $set: reviewInput }, {new: true});
    return reviewInput._id;
  } catch (error) {
    return error;
  }
}

const Delete_Review = async (_, { _id }) => {
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
    product:  async (parent, args, context) => {
      return await product.findById(parent.productId);
    }
  }
}