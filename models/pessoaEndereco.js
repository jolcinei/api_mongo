const mongoose = require('mongoose')

const PessoaEndereco = mongoose.model('PessoaEndereco', {
  pessoa: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Pessoa',
    require: true
  },
  rua: String,
  numero: String,
  municipio: String,
  uf: String,
  cep: Number,
  createdAt: Date,
  updatedAt: Date,
})

module.exports = PessoaEndereco