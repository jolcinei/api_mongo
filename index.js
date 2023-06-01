require('dotenv').config()
const { DATABASE_CLOUND_URL } = process.env
const mongoose = require("mongoose")
const express = require("express")

const app = express()

//A configuração abaixo faz com que o app consiga enterpretar o JSON tanto no recebimento quanto no retorno dos dados
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
    resp.json({message: "Página Inicial"})
})

//Pessoa
const pessoaRoutes = require('./routes/pessoaRoutes')
app.use('/pessoa', pessoaRoutes)
//BANCO
mongoose.set("strictQuery", false);
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

