const mongoose = require('mongoose')
const validator = require('validator')

const Pessoa = mongoose.model('Pessoa', {
  nome: {
    type: String,
    required: true,
  },
  cpf_cnpj: {
    type: String,
    required: true,
  },
  ativo: Boolean,
  data_nascimento: Date,
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
      cep: String,
      rua: String,
      numero: String,
      municipio: String,
      uf: String,
      padrao: Boolean,
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
  social: [
    {
      rede_social: String,
      user: String,
      page_url: String
    }
  ],
  opcionais: JSON,
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