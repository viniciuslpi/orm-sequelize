const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router
    .get('/pessoas',        PessoaController.pegaTodasAsPessoas)
    .get('/pessoas/:id',    PessoaController.pegaUmaPessoa)
    .post('/pessoas',       PessoaController.criarPessoa)
    .put('/pessoas/:id',    PessoaController.atualizarPessoa)
    .delete('/pessoas/:id', PessoaController.apagaPessoa)
    
module.exports = router;