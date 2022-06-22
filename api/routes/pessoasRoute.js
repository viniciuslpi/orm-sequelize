const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router
    .get('/pessoas',                PessoaController.pegaTodasAsPessoas)
    .get('/pessoas/:id',            PessoaController.pegaUmaPessoa)
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