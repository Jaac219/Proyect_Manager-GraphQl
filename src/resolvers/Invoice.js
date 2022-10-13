const { invoice, product } = require("../models");

const { generateId, handlePagination } = require("@codecraftkit/utils");

const Invoices_Get = async (_, { filter = {}, option = {} }) => {
  try {
    const { skip, limit } = handlePagination();

    const {
      _id,
      number,
      client,
      createdAt,
      productName,
      productId
    } = filter;

    
    if(_id) query._id = _id;
    if(number) query.number = number;
    if(client) query.client = {$regex: client, $options: 'í'};
    if(createdAt) query.createdAt = {
      $gte: new Date(createdAt), 
      $lte: new Date(`${createdAt}T23:59:59.999Z`)
    };
    if(productName) query = {...query, 
      'productsOrder.productName': {
        $regex: productName, 
        $options: 'i'
      }}
    if(productId) query = {...query, 
      'productsOrder.productId': productId}
    
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
    
    /** variables valor e iva total de la factura */
    let invoicePrice = 0, invoiceIva = 0;
    let arrNewQuantity = [];
    
    let {
      number,
      client,
      productsOrder
    } = invoiceInput;
    
    /** Se genera una promesa pending por cada producto actualizar */
    promises = productsOrder.map(async (order) => {

      const { productId, cant, iva } = order;
      let find = await product.findById(productId);
      
      let quantity = find.quantity - cant;
      if(quantity < 0) throw new Error("Producto cantidad menor que 0");

      arrNewQuantity.push({_id: productId, quantity});
      
      /** Calculos datos de la factura y sus items */
      order.productName = find.name;
      order.unitPrice = find.price;
      order.subtotal = cant * find.price;
      order.iva = order.subtotal * (iva/100);
      order.totalValue = order.iva + order.subtotal;
      
      invoiceIva += order.iva;
      invoicePrice += order.subtotal;
      
      return order;
    });
    
    /** Resolución de las promesas */
    await Promise.all(promises);
    
    /** Actualización stock de cada producto */
    arrNewQuantity.forEach(async (vl)=>{
      const { _id, quantity } = vl;
      await product.findByIdAndUpdate(_id, {$set: {quantity}});
    });

    await new invoice({ 
      _id,
      number,
      client,
      invoicePrice,
      invoiceIva,
      productsOrder,
      totalPrice: invoiceIva+invoicePrice,
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
      number,
      client
    } = invoiceInput;

    await invoice.findByIdAndUpdate(_id, 
    { $set: {
      _id,
      number,
      client
    }}, { new: true })

  } catch (error) {
    return error;
  }
}

const Invoice_Cancel = async (_, { _id }) => {
  try {
    let find = await invoice.findOneAndUpdate({_id, state: {$ne: "CANCEL"}}, {$set: {state: "CANCEL"}});

    find?.productsOrder.forEach(async (value)=>{
      const { productId, cant } = value;
      await product.findByIdAndUpdate(productId, {$inc: {quantity: cant}})
    })

    return find ? true : false; 

  } catch (error) {
    return error;
  }
}

const Invoice_Count = async (_, {  }) => {
  let query = { isRemove: false }

  const {
    _id,
    number,
    client,
    createdAt,
    productName,
    productId
  } = filter;
  
  if(_id) query._id = _id;
  if(number) query.number = number;
  if(client) query.client = {$regex: client, $options: 'i'};
  if(createdAt) query.createdAt = {
    $gte: new Date(createdAt), 
    $lte: new Date(`${createdAt}T23:59:59.999Z`)
  };
  if(productName) query = {...query, 
    'productsOrder.productName': {
      $regex: productName, 
      $options: 'i'
    }}
  if(productId) query = {...query, 
    'productsOrder.productId': productId}

    return await invoice.countDocuments(query);
}

module.exports = {
  Query: {
    Invoices_Get,
    Invoice_Count
  },
  Mutation: {
    Invoice_Save,
    Invoice_Cancel
  }
}