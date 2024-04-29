const express = require('express')
const Pessoas = require('./../models/Pessoas')

const router = express.Router()

router.get('/add', (req, res) =>{
    res.render('add')
}) 

router.post('/', (req, res) => {
    let novaP = req.body

    Pessoas.create(novaP)
        .then(() => {
            res.send('nova pessa criada')
        })
        .catch((erro) => {
            console.log('erro')
            console.log(erro)
            res.send('Deu ERRO')
        })
})

router.get('/', (req, resposta) => {

    Pessoas.findAll({

    })
        .then((dados) => {
            console.log(dados)
            resposta.send(dados)
        })
        .catch((erro) => {
            console.log(erro)
            resposta.send('Deu Erro!')
        })

})

router.put('/', (req, resposta) => {
    let novaP = req.body

    
    Pessoas.update(novaP, {
        where: {
            id: req.body.id
        }
    })
        .then((res) => {
            resposta.send('Pessoa Atualizada Com Sucesso')
        })
        .catch((erro) => {
            console.log(erro)
            resposta.send('Deu Erro!')
        })
})

router.delete('/', (req, resposta) => {

    
    Pessoas.destroy({
        where: {
            id: req.body.id
        }
    })
        .then((data) => {
            resposta.send('Pessoa Deletada Com Sucesso') 
        })
        .catch((erro) => {
            console.log(erro)
            resposta.send('Deu Erro!')
        })
})

module.exports = router

