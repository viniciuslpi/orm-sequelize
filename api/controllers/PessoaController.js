const database = require('../models');
const Sequelize = require('sequelize');

class PessoaController {

    static async pegaPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await database.Pessoas.findAll();
            return res.status(200).json(pessoasAtivas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaTodasAsPessoas(req, res) {

        try {
            const todasAsPessoas = await database.Pessoas.scope("todos").findAll();
            return res.status(200).json(todasAsPessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaPessoa(req, res) {
        const { id } = req.params;
        try {
            const pessoa = await database.Pessoas.findOne({ where: { id: Number(id) } });
            return res.status(200).json(pessoa)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criarPessoa(req, res) {
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
            await database.Pessoas.update(dadosPessoa, { where: { id: Number(id) } });
            const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: Number(id) } });
            return res.status(200).json(pessoaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagaPessoa(req, res) {
        const { id } = req.params;
        try {
            await database.Pessoas.destroy({ where: { id: Number(id) } });
            return res.status(200).json({ message: `O id ${id} foi apagado com sucesso.` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params;
        try {
            await database.Pessoas.restore({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `id ${id} resturado.` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.restore({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json({ mensagem: `id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            const matricula = await database.Matricula.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })

            if (matricula == null) {
                return res.status(500).json({ message: `${error.messa} - Não foi possível encontrar as matrículas.` });
            } else {
                return res.status(200).json(matricula)
            }

        } catch (error) {
            return res.status(500).json({ message: `${error.messa} - Não foi possível encontrar as matrículas.` });
        }
    }

    static async criarMatricula(req, res) {
        const { estudanteId } = req.params;
        const dadosMatricula = { ...req.body, estudante_id: Number(estudanteId) };

        try {
            const matricula = await database.Matricula.create(dadosMatricula);
            return res.status(200).json(matricula);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizarMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        const dadosMatricula = req.body;

        try {
            await database.Matricula.update(dadosMatricula,
                {
                    where: {
                        id: Number(matriculaId),
                        estudante_id: Number(estudanteId)
                    }
                });
            const matriculaAtualizada = await database.Matricula.findOne({ where: { id: Number(matriculaId) } });
            return res.status(200).json(matriculaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            await database.Matricula.destroy({ where: { id: Number(matriculaId) } });
            return res.status(200).json({ message: `O id ${matriculaId} foi apagado com sucesso.` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaMatriculas(req, res) {
        const { estudanteId } = req.params;
        try {
            const pessoa = await database.Pessoas
                .findOne(
                    { where: {id: Number(estudanteId)}}
                );
            const matriculas = await pessoa.getAulasMatriculadas()

            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaMatriculasPorTurma(req, res) {
        const { turmaId } = req.params;
        try {
            const todasAsMatriculas = await database.Matricula
            .findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
                limit: 20,
                order: [[ 'estudante_id', 'ASC']]

            })
            return res.status(200).json(todasAsMatriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaTurmasLotadas(req, res) {
        const lotacaoTurma = 2;
        try {
            const turmasLotadas = await database.Matricula
                .findAndCountAll({ 
                    where: {
                        status: 'confirmado'
                    },
                    attributes: ['turma_id'], // atributo do modelo
                    group: ['turma_id'],       // atributo agrupado
                    having: Sequelize.literal(`COUNT(TURMA_ID) >= ${lotacaoTurma}`)
                })
            return res.status(200).json(turmasLotadas.count);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


}

module.exports = PessoaController;