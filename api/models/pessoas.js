'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Pessoas.hasMany(models.Turma, {
        foreignKey: 'docente_id'
      });
      Pessoas.hasMany(models.Matricula, {
        foreignKey: 'estudante_id'
      });
    }
  }

  Pessoas.init({
    nome: {
      type:
        DataTypes.STRING,
        validate: {
          funcaoValidadora: (dado) => {
            if(dado.length < 3) throw new Error('O campo nome deve ter mais de três caracteres.')
          }
        } 
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Dados do tipo email inválidos.'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true,
    defaultScope: { where: { ativo: true } },
    scopes: { todos: { where: {} } }
  });

  return Pessoas;

};