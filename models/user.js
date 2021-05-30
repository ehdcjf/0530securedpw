const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userid: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      userpw: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    }, {
      sequelize,
      underscored: false,
      timestamps: false,
      paranoid: false,
      modelName: "User",
      tableName: "users",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    })
  }
}