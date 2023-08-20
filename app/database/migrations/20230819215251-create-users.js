'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      fullName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        field: "full_name",
      },
      username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: "guest",
      },
      type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: "inactive",
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        field: 'updated_at'
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};