const mongoose = require('mongoose')
const validator = require('validator')

const Pessoa = mongoose.model('Pessoa', {
  nome: String,
  cpf: String,
  negativado: Boolean,
  salario: Number,
  limite_cartao: Number,
  valor_aluguel: Number,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value)
    }
  },
  endereco: [
    {
      rua: String,
      numero: String,
      municipio: String,
      uf: String,
      cep: String,
      createdAt: Date,
      updatedAt: Date,
    }
  ],
  telefone: [
    {
      tipo: String,
      numero: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = Pessoa