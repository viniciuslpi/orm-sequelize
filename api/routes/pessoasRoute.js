const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router
    .get('/pessoas',                PessoaController.pegaPessoasAtivas)
    .get('/pessoas/todos',          PessoaController.pegaTodasAsPessoas)
    .get('/pessoas/:id',            PessoaController.pegaUmaPessoa)
    .get('/pessoas/:estudanteId/matricula', PessoaController.pegaMatriculas)
    .get('/pessoas/matricula/:turmaId/confirmados', PessoaController.pegaMatriculasPorTurma)
    .post('/pessoas',               PessoaController.criarPessoa)
    .post('/pessoas/:id/restaura',  PessoaController.restauraPessoa)
    .post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', PessoaController.restauraMatricula)
    .put('/pessoas/:id',            PessoaController.atualizarPessoa)
    .delete('/pessoas/:id',         PessoaController.apagaPessoa)
    .get('/pessoas/:estudanteId/matricula/:matriculaId',    PessoaController.pegaUmaMatricula)
    .post('/pessoas/:estudanteId/matricula/',               PessoaController.criarMatricula)
    .put('/pessoas/:estudanteId/matricula/:matriculaId',    PessoaController.atualizarMatricula)
    .delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula)
    
module.exports = router;