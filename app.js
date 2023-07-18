require('dotenv').config();
const database = require("./src/database")
const express = require("express")
const expressLayout = require("express-ejs-layouts")
const cookieParser = require("cookie-parser")
const session = require('express-session');
const MongoStore = require("connect-mongo");
const methodOverride = require('method-override')

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
app.use(methodOverride('_method'))

//Usando cookies de sessao
app.use(cookieParser())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_CLOUND_URL
    }),
    //cookie: { maxAge: new Date( Date.now() + (3600000))}
}))

//Routes
app.use('', require('./src/routes/main'))
app.use('/', require('./src/routes/admin'))

//Pessoa
app.use('/pessoa', require('./src/routes/pessoaRoutes'))
//Post
app.use('/post', require('./src/routes/postRoutes'))

if (database) {
    app.listen(PORT)
}
