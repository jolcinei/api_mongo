const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')
const adminLayout = '../views/layouts/admin'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

/**
 *
 * Check Loged
 */

const authMiddleware = (req, resp, next) => {

    const token = req.cookies.token

    if (!token) {
        return resp.status(401).json({ message: 'Unauthorized.' })
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)

        req.userId = decoded.userId

        next()
    } catch (error) {
        return resp.status(401).json({ message: 'Unauthorized.' })
    }
}

/**
 * GET
 * Admin - Login page
 */
router.get('/admin', async (req, resp) => {

    try {
        const locals = {
            titulo: "Admin",
            descricao: "Página administrativa"
        }

        resp.render('admin/index', {
            locals,
            layout: adminLayout
        })
    } catch (error) {
        console.log(error)
    }

})

/**
 * GET
 * Admin - Login page
 */
router.post('/login', async (req, resp) => {

    try {

        const { username, password } = req.body

        const user = await User.findOne({
            username
        })

        if (!user) {
            return resp.status(401).json({ message: 'Credentials not found.' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return resp.status(401).json({ message: 'Credentials not valid.' })
        }

        const token = jwt.sign({ userId: user._id }, jwtSecret)

        resp.cookie('token', token, { httpOnly: true })

        resp.redirect('dashboard')
    } catch (error) {
        console.log(error)
    }

})

/**
 * GET
 * Admin - Register
 */
router.post('/register', async (req, resp) => {

    try {

        const { username, password } = req.body

        const hashPassword = await bcrypt.hash(password, 10)

        try {
            const user = await User.create({ username, password: hashPassword })
            resp.status(201).json({ message: 'User created', user })
        } catch (error) {
            if (error.code === 11000) {
                resp.status(409).json({ message: 'User already in use.' })
            }
            resp.status(500).json({ message: 'Internal server error' })
        }
    } catch (error) {
        console.log(error)
    }

})


/**
 * GET
 * Admin - Dashboard
 * Using a middleware to protect this page
 */
router.get('/dashboard', authMiddleware, async (req, resp) => {

    try {

        const locals = {
            titulo: "Dashboard",
            descricao: "Edit posts"
        }

        const posts = await Post.find()

        resp.render('admin/dashboard', {
            locals,
            posts,
            layout: adminLayout
        })
    } catch (error) {
        console.log(error)
    }

})


/**
 * GET
 * Admin - Add Post
 * Using a middleware to protect this page
 */
router.get('/add-post', authMiddleware, async (req, resp) => {

    try {

        const locals = {
            titulo: "Add Post",
            descricao: "Edit posts"
        }
        resp.render('admin/add-post', {
            locals,
            layout: adminLayout
        })
    } catch (error) {
        console.log(error)
    }

})

/**
 * GET
 * Admin - Create Post
 * Using a middleware to protect this page
 */
router.post('/add-post', authMiddleware, async (req, resp) => {

    try {
        const { title, body } = req.body

        const dados = {
            title,
            body
        }

        if (!title) {
            resp.status(422).json({ message: 'Campo title é obrigatório' })
            return
        }

        const post = await Post.create(dados)

        resp.status(201).json({ message: 'Post inserido no sistema com sucesso!', data: post })
    } catch (error) {
        console.log(error)
    }

})


/**
 * GET
 * Admin - Edit Post
 * Using a middleware to protect this page
 */
router.get('/edit-post/:id', authMiddleware, async (req, resp) => {

    try {

        const locals = {
            titulo: "Edit Post",
            descricao: "Edit posts"
        }
        const post = await Post.findOne({ _id: req.params.id })
        resp.render('admin/edit-post', {
            locals,
            layout: adminLayout,
            post
        })
    } catch (error) {
        console.log(error)
    }

})

/**
 * PUT
 * Admin - Edit Post
 * Using a middleware to protect this page
 */
router.put('/edit-post/:id', authMiddleware, async (req, resp) => {

    try {
        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body
        })

        resp.redirect(`/edit-post/${req.params.id}`)
    } catch (error) {
        console.log(error)
    }

})

/**
 * DELETE
 * Admin - Delete Post
 * Using a middleware to protect this page
 */

router.delete('/delete-post/:id', authMiddleware, async (req, resp) => {
    const id = req.params.id
    const post = await Post.findOne({ _id: id })
    if (!post) {
        resp.status(422).json({ message: 'Post não localizado.' })
        return
    }
    try {
        await Post.deleteOne({ _id: id })

        //resp.status(200).json({ message: 'O post foi removido com sucesso!' })
        resp.redirect('/dashboard')
    } catch (error) {
        resp.status(500).json({ erro: error })
    }
})

/**
 * GET
 * Admin - logout
 * Using a middleware to protect this page
 */
router.get('/logout', (req, resp) => {
    resp.clearCookie('token')
    resp.redirect('/')
})

module.exports = router