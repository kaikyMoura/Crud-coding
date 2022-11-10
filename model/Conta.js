const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Conta = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  cpf: {
    type: String
  },
  phone_number: {
    type: Number
  },
},{
    collection: 'user'
});

module.exports = mongoose.model('Conta', Conta);