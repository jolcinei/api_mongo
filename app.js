require('dotenv').config();
const database = require("./src/database")
const express = require("express")
const expressLayout = require("express-ejs-layouts")

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))

//Templates
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

//A configuração abaixo faz com que o app consiga interpretar o JSON tanto no recebimento quanto no retorno dos dados
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Routes
app.use('', require('./src/routes/main'))
app.use('/admin', require('./src/routes/admin'))

//Pessoa
app.use('/pessoa', require('./src/routes/pessoaRoutes'))
//Post
app.use('/post', require('./src/routes/postRoutes'))

if (database) {
    app.listen(PORT)
}
