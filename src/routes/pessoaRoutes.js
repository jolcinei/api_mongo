const router = require('express').Router()
const Pessoa = require('../models/Pessoa')

router.get('/', async (req, resp) => {
    try {
        const pessoa = await Pessoa.find()

        resp.status(200).json(pessoa)
    } catch (error) {
        resp.status(500).json({ erro: error })
    }
})

router.get('/:id', async (req, resp) => {
    const id = req.params.id
    try {

        const pessoa = await Pessoa.findOne({_id: id})
        if (!pessoa) {
            resp.status(422).json({ message: 'Pessoa não localizada.' })
            return
        }
        resp.status(200).json(pessoa)
    } catch (error) {
        resp.status(500).json({ erro: error })
    }
})

router.patch('/:id', async (req, resp) => {
    const id = req.params.id
    const { nome, cpf, negativado, salario, limite_cartao, valor_aluguel, endereco, email } = req.body
    const dados = {
        nome,
        cpf,
        negativado,
        salario,
        limite_cartao,
        valor_aluguel,
        endereco,
        email
    }
    try {

        const editaPessoa = await Pessoa.updateOne({ _id: id }, dados)
        if (editaPessoa.matchedCount === 0) {
            resp.status(422).json({ message: 'Pessoa não localizada.' })
            return
        }
        resp.status(200).json(dados)
    } catch (error) {
        resp.status(500).json({ erro: error })
    }
})

router.delete('/:id', async (req, resp) => {
    const id = req.params.id
    const pessoa = await Pessoa.findOne({ _id: id })
    if (!pessoa) {
        resp.status(422).json({ message: 'Pessoa não localizada.' })
        return
    }
    try {
        await Pessoa.deleteOne({_id: id})

        resp.status(200).json({message: 'A pessoa foi removida com sucesso!'})
    } catch (error) {
        resp.status(500).json({ erro: error })
    }
})

router.post('/', async (req, resp) => {

    const { nome, cpf, negativado, salario, limite_cartao, valor_aluguel, endereco, email } = req.body

    const dados = {
        nome,
        cpf,
        negativado,
        salario,
        limite_cartao,
        valor_aluguel,
        endereco,
        email
    }

    if (!nome) {
        resp.status(422).json({ message: 'Campo nome é obrigatório' })
        return
    }
    try {
        const pessoa = await Pessoa.create(dados)

        resp.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!', data: pessoa })
    } catch (error) {
        resp.status(500).json({ erro: error })
    }
})

module.exports = router