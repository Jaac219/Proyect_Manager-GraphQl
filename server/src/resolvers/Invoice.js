const { invoice } = require("../models");

const { generateId, handlePagination } = require("@codecraftkit/utils");

const Invoices_Get = async (_, { filter = {}, option = {} }) => {
  try {
    const { skip, limit } = handlePagination();

    const query = { isRemove: false }

    const {
      _id,
      number
    } = filter;

    if(_id) query._id = _id;
    if(number) query.number = number;

    const find = invoice.find(query);

    if(skip) find.skip(skip);
    if(limit) find.limit(limit);

    return await find.exec();

  } catch (error) {
    return error;
  }
}

const Invoice_Save = async (_, { invoiceInput }) => {
  try {
    return invoiceInput._id 
      ? await Invoice_Update(_, { invoiceInput })
      : await Invoice_Create(_, { invoiceInput });
  } catch (error) {
    return error;
  }
}

const Invoice_Create = async (_, { invoiceInput }) => {
  try {
    const _id = generateId();

    const {
      number,
      productsOrder
    } = invoiceInput;

    await new invoice({ 
      _id,
      number,
      productsOrder
    }).save();

    return _id;

  } catch (error) {
    return error;
  }
}

const Invoice_Update = async (_, { invoiceInput }) => {
  try {
    const {
      _id,
      number
    } = invoiceInput;

    await invoice.findByIdAndUpdate(_id, 
    { $set: {
      _id,
      number,
      productsOrder
    }}, { new: true })

  } catch (error) {
    return error;
  }
}

const Invoice_Delete = async (_, { _id }) => {
  try {
    await invoice.findByIdAndUpdate(_id, {$set: {isRemove: true}});
    return true;
  } catch (error) {
    return error;
  }
}

module.exports = {
  Query: {
    Invoices_Get
  },
  Mutation: {
    Invoice_Save,
    Invoice_Delete
  }
}