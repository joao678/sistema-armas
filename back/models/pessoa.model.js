module.exports = (sequelize, Sequelize) => {
  const Pessoa = sequelize.define("pessoa", {
    nome: { type: Sequelize.STRING },
    cpf: { type: Sequelize.STRING },
    rg: { type: Sequelize.STRING },
    cidade: { type: Sequelize.STRING },
    estado: { type: Sequelize.INTEGER },
    endereco: { type: Sequelize.STRING },
    telefone: { type: Sequelize.STRING },
    celular: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    dt_nasc: { type: Sequelize.DATE },
    sexo: { type: Sequelize.STRING },
    obs: { type: Sequelize.STRING }
  });

  return Pessoa;
};