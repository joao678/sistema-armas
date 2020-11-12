module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    titulo: {
      type: Sequelize.STRING
    },
    descricao: {
      type: Sequelize.STRING
    }
  });

  return Tutorial;
};