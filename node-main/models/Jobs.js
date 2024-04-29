const Sequelize = require('sequelize')
const bancoDeDados = require('./../bancoDeDados/conexao')

const Jobs = bancoDeDados.define('jobs', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING
    },
    salario: {
        type: Sequelize.STRING
    },
    empresa: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    novo_trabalho: {
        type: Sequelize.INTEGER
    }
})

module.exports = Jobs
