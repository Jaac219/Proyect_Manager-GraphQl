const invoiceSchema = [`
  type Invoice {
    _id: String!
    number: Int!
    client: String
    invoicePrice: Float
    invoiceIva: Float
    totalPrice: Float
    productsOrder: [Product_Order!]!
    state: String!
  }

  type Query {
    Invoices_Get(filter: Invoice_Filter, option: Option): [Invoice]
    Invoice_Count(filter: Invoice_Filter):Int
  }

  type Mutation {
    Invoice_Save(invoiceInput: Invoice_Input!): ID
    Invoice_Cancel(_id: String!): Boolean
  }

  type Product_Order {
    productId: String
    productName: String
    cant: Int
    unitPrice: Float
    subtotal: Float
    iva: Float
    totalValue: Float
  }

  input Invoice_Filter {
    _id: String
    number: Int
    createdAt: GraphQLDateTime
    productName: String
    productId: String
    client: String
  }

  input Invoice_Input {
    _id: String 
    number: String
    client: String
    productsOrder: [Product_Order_Input!]
  }

  input Product_Order_Input {
    productId: String
    cant: Int
    iva: Int
  }

`];

module.exports = invoiceSchema;