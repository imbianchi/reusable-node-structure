const config = require('config');
const { v4 } = require('uuid');
const SecurityManager = require('../../managers/securityManager');

const encryptedPassword = new SecurityManager().encryptPassword(config.get('api.masterPswd'));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [{
      id: v4(),
      full_name: config.get('api.masterName'),
      username: config.get('api.masterUsername'),
      role: "god-mode",
      status: "active",
      email: config.get('api.masterEmail'),
      password: encryptedPassword,
      type: 'person',
      created_at: new Date(),
    }])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Users', null, {});
  }
};
