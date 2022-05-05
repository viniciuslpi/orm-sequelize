const database = require('../models');

class PessoaController {

    static async pegaTodasAsPessoas(req, res) {
        try { 
            const todasAsPessoas = await database.Pessoas.findAll();
            return res.status(200).json(todasAsPessoas);
        } catch (error) { 
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaPessoa(req, res) {
        const { id } = req.params;
        try {
            const pessoa = await database.Pessoas.findOne( { where: { id: Number(id) }});
            return res.status(200).json(pessoa)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criarPessoa(req, res){
        const dadosPessoa = req.body;
        try {
            const pessoa = await database.Pessoas.create(dadosPessoa);
            return res.status(200).json(pessoa); 
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizarPessoa(req, res) {
        const dadosPessoa = req.body;
        const { id } = req.params;
        try {
            await database.Pessoas.update(dadosPessoa, { where: { id: Number(id) }});
            const pessoaAtualizada = await database.Pessoas.findOne( { where: { id: Number(id) }});
            return res.status(200).json(pessoaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagaPessoa(req, res) {
        const { id } = req.params;
        try {
            await database.Pessoas.destroy({ where: { id: Number(id) }});
            return res.status(200).json({ message: `O id ${id} foi apagado com sucesso.`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = PessoaController;