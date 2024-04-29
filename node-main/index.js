const express = require('express')
const bancoDeDados = require('./bancoDeDados/conexao')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const Jobs = require('./models/Jobs')
const Op = Sequelize.Op

bancoDeDados.authenticate()
    .then(() => {
        console.log('Conectou ao Banco de Dados')
    })
    .catch((erro) => {
        console.log(
            'Erro ao conectar' +
            'no Banco de Dados' + erro
        )
    })

const PORT = 3001

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))


  

app.get('/', (req, res) => {
//app.get('/', (req, res) => { *e* linha 8

    let search = req.query.job
    let query = '%'+search+'%'
    
    if(!search){
        Jobs.findAll({
            order: [
                ['createdAT', 'DESC']
            ]
        }).then((vagas) =>{ 
            
            res.render('index', {
                jobs: vagas
            })
        })
        .catch((err) => console.log(err))
    }else{
        Jobs.findAll({
            where: {titulo: { [Op.like]: query }},
            order: [
                ['createdAT', 'DESC']
            ]
        }).then((vagas) =>{ 
            
            res.render('index', {
                jobs: vagas,
                search: search
            })
        })
        .catch((err) => console.log(err))
    }


})



app.use('/jobs', require('./routes/jobs'))
app.use('/lanches', require('./routes/lanches'))
app.use('/pessoas', require('./routes/pessoas'))

app.listen(PORT, () => {
    console.log(
        'Express esta rodando na porta: ' +
        PORT
    )
})