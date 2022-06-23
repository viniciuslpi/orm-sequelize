const bodyParser = require('body-parser');
const pessoas = require('./pessoasRoute');
const niveis = require('./niveisRoute');
const turmas = require('./turmasRoute');

module.exports = app => {

    app.route('/').get((req, res) => {
        res.status(200).send({
            titulo: 'Curso de ORM com Sequelize e MySQL',
            rotas: [
                '/pessoas',
                '/niveis',
                '/turmas'
            ]

        })
    })

    app.use(
        bodyParser.json(), 
        pessoas, 
        niveis, 
        turmas
    );
}