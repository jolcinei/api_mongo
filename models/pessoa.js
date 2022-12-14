const mongoose = require('mongoose')

const Pessoa = mongoose.model('Pessoa', {
  nome: String,
  cpf: String,
  negativado: Boolean,
  salario: Number,
  limite_cartao: Number,
  valor_aluguel: Number,
  createdAt: Date,
  updatedAt: Date,
})

module.exports = Pessoa