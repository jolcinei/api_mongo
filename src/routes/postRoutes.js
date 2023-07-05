const router = require('express').Router()

const Post = require("../models/Post")

router.get('/', async (req, resp) => {
    try {
        const post = await Post.find()

        resp.status(200).json(post)
    } catch (error) {
        resp.status(500).json({ erro: error })
    }
})

router.get('/:id', async (req, resp) => {

    try {
        const id = req.params.id
        const locals = {
            titulo: "Post Edition",
            descricao: "Editar post"
        }

        const post = await Post.findOne({_id: id})
        if (!post) {
            resp.status(422).json({ message: 'Post não localizado.' })
            return
        }
        //resp.status(200).json(post)
        resp.render('post', { locals, post })
    } catch (error) {
        resp.status(500).json({ erro: error })
    }
})

router.patch('/:id', async (req, resp) => {
    const id = req.params.id
    const { title, body } = req.body
    const dados = {
        title,
        body
    }
    try {

        const editaPost = await Post.updateOne({ _id: id }, dados)
        if (editaPost.matchedCount === 0) {
            resp.status(422).json({ message: 'Post não localizado.' })
            return
        }
        resp.status(200).json(dados)
    } catch (error) {
        resp.status(500).json({ erro: error })
    }
})

router.delete('/:id', async (req, resp) => {
    const id = req.params.id
    const post = await Post.findOne({ _id: id })
    if (!post) {
        resp.status(422).json({ message: 'Post não localizado.' })
        return
    }
    try {
        await Post.deleteOne({_id: id})

        resp.status(200).json({message: 'O post foi removido com sucesso!'})
    } catch (error) {
        resp.status(500).json({ erro: error })
    }
})

router.post('/', async (req, resp) => {

    const { title, body } = req.body

    const dados = {
        title,
        body
    }

    if (!title) {
        resp.status(422).json({ message: 'Campo title é obrigatório' })
        return
    }
    try {
        const post = await Post.create(dados)

        resp.status(201).json({ message: 'Post inserido no sistema com sucesso!', data: post })
    } catch (error) {
        resp.status(500).json({ erro: error })
    }
})

router.post('/search', async (req, resp) => {

    try {

        const locals = {
            titulo: "Buscar",
            descricao: "Buscar posts"
        }
        let searchTerm = req.body.searchTerm
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")
        const posts = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i')}},
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i')}},
            ]
        })

        resp.render('search', {
            locals,
            posts
        })
    } catch (error) {
        resp.status(500).json({ erro: error })
    }
})

module.exports = router