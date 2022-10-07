

db.category.insertMany([
  {"_id": "k3bWUXid1ZM5bi6BD",  "name": "Tecnologia", "isRemove": false},
  {"_id": "ygYrh7I9jG79AwykC",  "name": "Electrodomesticos", "isRemove": false},
  {"_id": "qTXp5XMJFlXQJldE7",  "name": "Hogar y muebles", "isRemove": false},
  {"_id": "xc69a3Q0BmGgCBEIw",  "name": "Deportes", "isRemove": false},
  {"_id": "ap5vr0c2j0ei4HJTv",  "name": "Herramientas", "isRemove": false},
  {"_id": "EIQlkXgTkkpUvn17g",  "name": "Juegos y juguetes", "isRemove": false},
  {"_id": "XS6RIW5TEvnGs8fXa",  "name": "Industria y oficinas", "isRemove": false}
]);

db.product.insertMany([
  {
    "_id": "XS6RIW5TEvnGs8fXb",
    "name": "Portatil Lenovo",
    "description": "Portatil de 24 pulgadas",
    "quantity": 5,
    "price": 1200000.54,
    "onSale": false,
    "categoryId": "k3bWUXid1ZM5bi6BD",
    "isRemove": false
  },
  {
    "_id": "XS6RIW5TEvnGs1234",
    "name": "Celular Samsung",
    "description": "Celular alta gama de 128gb",
    "quantity": 12,
    "price": 1600000.23,
    "onSale": false,
    "categoryId": "k3bWUXid1ZM5bi6BD",
    "isRemove": false
  },
  {
    "_id": "XS6RIW5TEvnGs8abc",
    "name": "Televisor Toshiba",
    "description": "Tv 4k 51 pulgadas marca toshiba",
    "quantity": 6,
    "price": 1400000.12,
    "onSale": true,
    "categoryId": "k3bWUXid1ZM5bi6BD",
    "isRemove": false
  },
  {
    "_id": "XS6RIW5TEvnGs8qwe",
    "name": "Nevera",
    "description": "Nevera doble No frost",
    "quantity": 7,
    "price": 1600000.12,
    "onSale": false,
    "categoryId": "ygYrh7I9jG79AwykC",
    "isRemove": false
  },
  {
    "_id": "XS6RIW5TEvnGs8rty",
    "name": "Horno microhondas",
    "description": "Horno para calentar la comida",
    "quantity": 9,
    "price": 400000.12,
    "onSale": false,
    "categoryId": "ygYrh7I9jG79AwykC",
    "isRemove": false
  },
  {
    "_id": "XS6RIW5TEvnGs8ghj",
    "name": "Taladro",
    "description": "Taladro percutor skill",
    "quantity": 24,
    "price": 600000.12,
    "onSale": true,
    "categoryId": "ap5vr0c2j0ei4HJTv",
    "isRemove": false
  },
  {
    "_id": "XS6RIW5TEvnGs8mnb",
    "name": "Pulidora",
    "description": "Pulidaro corta todo",
    "quantity": 30,
    "price": 300000.12,
    "onSale": false,
    "categoryId": "ap5vr0c2j0ei4HJTv",
    "isRemove": false
  }
]);

db.review.insertMany([
  {
    "_id": "abcRIW5TEvnGs8mnb",
    "title": "Televisor muy malo",
    "comment": "Dejo de funcionar a los 5 dias",
    "rating": 1,
    "productId": "XS6RIW5TEvnGs8abc",
    "isRemove": false,
    "createdAt": "2022-10-06T17:44:50.584+00:00",
    "updatedAt": "2022-10-06T17:44:50.584+00:00"
  },
  {
    "_id": "cvARIW5TEvnGs8mnb",
    "title": "Buen microhondas",
    "comment": "Calienta rapido la comida",
    "rating": 5,
    "productId": "XS6RIW5TEvnGs8rty",
    "isRemove": false,
    "createdAt": "2022-10-06T17:44:50.584+00:00",
    "updatedAt": "2022-10-06T17:44:50.584+00:00"
  },
  {
    "_id": "XS6asFGTEvnGs8mnb",
    "title": "Taladro revision",
    "comment": "Esta bien para su precio",
    "rating": 3,
    "productId": "XS6RIW5TEvnGs8ghj",
    "isRemove": false,
    "createdAt": "2022-10-10T17:44:50.584+00:00",
    "updatedAt": "2022-10-10T17:44:50.584+00:00"
  }
]);


