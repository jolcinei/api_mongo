//BANCO
require('dotenv').config()
const { DATABASE_CLOUND_URL } = process.env
const mongoose = require("mongoose")

class DataBase {
    constructor() {
        this._conect()
    }

    _conect() {
        mongoose.set("strictQuery", false);
        mongoose.connect(

            DATABASE_CLOUND_URL,

        )
            .then(() => {
                console.log("Conectado ao mongoDB")
            })
            .catch((error) => {
                console.log("Erro de conexão: ", error)
            })

    }
}

module.exports = new DataBase()