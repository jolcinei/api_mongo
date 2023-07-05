const router = require('express').Router()
const Post = require('../models/Post')

router.get('/', async (req, resp) => {

    try {
        const locals = {
            titulo: "Admin",
            descricao: "Página administrativa"
        }

        resp.render('admin/index', {
            locals,
        })
    } catch (error) {
        console.log(error)
    }

})

module.exports = router