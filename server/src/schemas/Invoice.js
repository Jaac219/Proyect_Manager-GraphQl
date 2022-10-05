const invoiceSchema = [`
  type Invoice {
    _id: String!
    number: Int!
    totalPrice: Float
    iva: Float
    productsOrder: [Product_Order!]!
    isRemove: Boolean
  }

  type Query {
    Invoices_Get(filter: Invoice_Filter, option: Option): [Invoice]
  }

  type Mutation {
    Invoice_Save(invoiceInput: Invoice_Input!): ID
    Invoice_Delete(_id: String!): Boolean
  }

  type Product_Order {
    productId: String
    cant: Int
    value: Float
  }

  input Invoice_Filter {
    _id: String
    number: Int
    productId: String
  }

  input Invoice_Input {
    _id: String
    number: String
    productsOrder: [Product_Order_Input]
  }

  input Product_Order_Input {
    productId: String
    cant: Int
  }

`];

module.exports = invoiceSchema;