require('dotenv').config()
const { DATABASE_CLOUND_URL } = process.env
const mongoose = require("mongoose")
const express = require("express")
const Pessoa = require("./models/pessoa")
const app = express()

app.use(
    express.urlencoded(
        {
            extended: true
        }
    ),
)

app.use(express.json())

//Routes
app.get('/', (req, resp) => {
    resp.json({message: "Ola mundo"})
})

app.get('/pessoa', async (req, resp) => {
    try {
        const pessoa = await Pessoa.find()
    
        resp.status(200).json(pessoa)
      } catch (error) {
        resp.status(500).json({ erro: error })
      }
})

app.post('/pessoa', async (req, resp) => {
    
    const { nome, cpf, negativado, salario, limite_cartao, valor_aluguel } = req.body

    const dados = {
        nome,
        cpf,
        negativado,
        salario,
        limite_cartao, 
        valor_aluguel
    }

    try {
        const pessoa = await Pessoa.create(dados)

        resp.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!', data: pessoa })
    } catch (error) {
        resp.status(500).json({ erro: error })
    }
})

//BANCO
mongoose.connect(
    
    DATABASE_CLOUND_URL,

)
.then(() =>{
    console.log("Conectado ao mongoDB")
    app.listen(3000)
})
.catch((error) =>{
    console.log("Erro de conexão: ", error)
})

