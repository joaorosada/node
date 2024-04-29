const Sequelize = require('sequelize')
const bancoDeDados = require('./../bancoDeDados/conexao')

const Lanches = bancoDeDados.define('lanche', {
    nome: {
        type: Sequelize.STRING
    }
})

module.exports = Lanches