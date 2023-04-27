const Sequelize = require("sequelize");

class Pet extends Sequelize.Model {
  static initiate(sequelize) {
    Pet.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        type: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        kind: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        etc: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Pet",
        tableName: "pets",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Pet.belongsTo(db.User);
  }
}

module.exports = Pet;
