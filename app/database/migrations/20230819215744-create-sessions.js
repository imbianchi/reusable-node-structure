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
      sessionStartTime: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        field: 'session_start_time',
        defaultValue: Sequelize.DataTypes.NOW,
      },
      sessionEndTime: {
        type: Sequelize.DataTypes.DATE,
        field: 'session_end_time',
        defaultValue: Sequelize.DataTypes.NOW,
      },
      lastActivityTime: {
        type: Sequelize.DataTypes.DATE,
        field: 'last_activity_time',
      },
      sessionType: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        field: "session_type",
        validate: {
          isIn: [['bot', 'person']],
          msg: "Session type must be 'bot' or 'person'.",
        },
      },
      sessionStatus: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        field: "session_status",
        validate: {
          isIn: [['active', 'inactive', 'deactivated']],
          msg: "Session status must be 'active', 'inactive' or 'deactivated'.",
        },
      },
      ipAddress: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        field: "ip_address",
        validate: {
          isIP: {
            msg: "IP must be valid.",
          },
        }
      },
      userAgent: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        field: "user_agent",
      },
      sessionData: {
        type: Sequelize.DataTypes.TEXT,
        field: "session_data",
        validate: {
          isValidJson: (value) => {
            try {
              JSON.parse(value);
            } catch (e) {
              return false;
            }
            return true;
          },
        }
      },
      botInfo: {
        type: Sequelize.DataTypes.TEXT,
        field: "bot_info",
        validate: {
          isValidJson: (value) => {
            try {
              JSON.parse(value);
            } catch (e) {
              return false;
            }
            return true;
          },
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.DataTypes.NOW,
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