const { review, product } = require("../models");

const { generateId, handlePagination } = require("@codecraftkit/utils");

const Reviews_Get = async (_, { filter = {}, option = {} }) => {
  try {
    const { skip, limit } = handlePagination(option);

    const query = { isRemove: false };

    const { 
      _id,
      title,
      rating,
      productId,
      createdAt
    } = filter;

    if(_id) query._id = _id;
    if(title) query.title = { $regex: title, $options: 'i'}
    if(rating) query.rating = rating;
    if(productId) query.productId = productId;
    if(createdAt) query.createdAt = {
      $gte: new Date(createdAt), 
      $lte: new Date(`${createdAt}T23:59:59.999Z`)
    };

    const find = review.find(query);

    if(skip) find.skip(skip);
    if(limit) find.limit(limit);

    return await find.exec();
  } catch (error) {
    return error;
  }
}

const Review_Save = async (_, { reviewInput }) => {
  try {
    return reviewInput._id
      ? await Review_Update(_, { reviewInput }) 
      : await Review_Create(_, { reviewInput });
  } catch (error) {
    return error;
  }
}

const Review_Create = async (_, { reviewInput }) => {
  try {
    const _id = generateId();

    const {
      title,
      comment,
      rating,
      productId
    } = reviewInput;

    await new review({ 
      _id,
      title,
      comment,
      rating,
      productId
    }).save();

    const ratings = await review.aggregate([
      {$group : {
        _id: "$productId",
        rating: {$avg: "$rating"}
      }}
    ]);
  
    const promises = ratings.map(async (val)=>{
      await product.findByIdAndUpdate(val._id, {$set: {rating: val.rating}})
    });
  
    await Promise.all(promises);

    return _id;
  } catch (error) {
    return error;
  }
}

const Review_Update = async (_, { reviewInput }) => {
  try {

    const {
      _id,
      title,
      comment,
      rating,
      productId
    } = reviewInput;

    await review.findByIdAndUpdate(_id, 
      {$set: {
        title,
        comment,
        rating,
        productId
      }}, {new: true});

    return _id;
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

const Review_Count = async (_, { filter = {} }) => {
  const query = { isRemove: false };

  const { 
    _id,
    title,
    rating,
    productId,
    createdAt
  } = filter;

  if(_id) query._id = _id;
  if(title) query.title = { $regex: title, $options: 'i'}
  if(rating) query.rating = rating;
  if(productId) query.productId = productId;
  if(createdAt) query.createdAt = {
    $gte: new Date(createdAt), 
    $lte: new Date(`${createdAt}T23:59:59.999Z`)
  };

  return await review.countDocuments(query);
}

module.exports = {
  Query: {
    Reviews_Get,
    Review_Count
  },
  Mutation: {
    Review_Save,
    Review_Delete
  }
}