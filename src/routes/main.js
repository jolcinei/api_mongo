const router = require('express').Router()
const Post = require('../models/Post')

router.get('/', async (req, resp) => {

    try {
        const locals = {
            titulo: "Documentação",
            descricao: "Página de documentação do projeto"
        }
        let docsPorPagina = 10;
        let page = req.query.page || 1;

        const dados = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(docsPorPagina * page - docsPorPagina)
            .limit(docsPorPagina)
            .exec();
        const total = await Post.count();
        const proximaPagina = parseInt(page) + 1;
        const temProximaPagina = proximaPagina <= Math.ceil(total / docsPorPagina);

        resp.render('index', {
            locals,
            dados,
            current: page,
            proximaPagina: temProximaPagina ? proximaPagina : null
        })
    } catch (error) {
        console.log(error)
    }

})
router.get('/about', (req, resp) => {
    resp.render('about')
})


module.exports = router