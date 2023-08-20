/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sessions', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      userId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        field: 'user_id'
      },
      osName: {
        type: Sequelize.DataTypes.STRING,
        field: 'os_name',
      },
      osVersion: {
        type: Sequelize.DataTypes.STRING,
        field: 'os_version',
      },
      device: {
        type: Sequelize.DataTypes.STRING,
        field: 'device',
      },
      browser: {
        type: Sequelize.DataTypes.STRING,
        field: 'browser',
      },
      browserVersion: {
        type: Sequelize.DataTypes.STRING,
        field: 'browser_version',
      },
      browserEngine: {
        type: Sequelize.DataTypes.STRING,
        field: 'browser_engine',
      },
      browserEngineVersion: {
        type: Sequelize.DataTypes.STRING,
        field: 'browser_engine_version',
      },
      sessionStartTime: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        field: 'session_start_time',
        defaultValue: new Date(),
      },
      sessionEndTime: {
        type: Sequelize.DataTypes.DATE,
        field: 'session_end_time',
      },
      lastActivityTime: {
        type: Sequelize.DataTypes.DATE,
        field: 'last_activity_time',
      },
      sessionType: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        field: "session_type",
      },
      sessionStatus: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        field: "session_status",
      },
      refreshToken: {
        type: Sequelize.DataTypes.TEXT,
        field: "refresh_token",
      },
      ipAddress: {
        type: Sequelize.DataTypes.STRING,
        field: "ip_address",
      },
      sessionData: {
        type: Sequelize.DataTypes.TEXT,
        field: "session_data",
      },
      botInfo: {
        type: Sequelize.DataTypes.TEXT,
        field: "bot_info",
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
    await queryInterface.dropTable('sessions');
  }
};