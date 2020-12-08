module.exports = (sequelize, Sequelize) => {
  const Produto = sequelize.define("produto", {
    nome: { type: Sequelize.STRING },
    id_grupo_produto: { type: Sequelize.INTEGER },
    nr_serie: { type: Sequelize.STRING },
    ds_produto: { type: Sequelize.STRING },
    inf_adicionais: { type: Sequelize.STRING },
    id_fornecedor: { type: Sequelize.INTEGER },
    valor_unitario: { type: Sequelize.DECIMAL },
    id_situacao: { type: Sequelize.INTEGER },
  });

  return Produto;
};