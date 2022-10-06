const { connect } = require("mongoose");

const db = process.env.MONGOSE_URL;

connect(db).then(()=>{
  console.log('Conectado a base de datos')
}).catch((error)=>{
  console.log(error);
})