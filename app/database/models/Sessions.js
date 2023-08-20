const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Sessions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Users.hasMany(models.Sessions, { as: 'userId' })
        }
    }

    Sessions.init({
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        userId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            field: 'user_id'
        },
        sessionStartTime: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'session_start_time',
            defaultValue: DataTypes.NOW,
        },
        sessionEndTime: {
            type: DataTypes.DATE,
            field: 'session_end_time'
        },
        lastActicityTime: {
            type: DataTypes.DATE,
            field: 'last_activity_time'
        },
        sessionType: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'session_type',
            validate: {
                isIn: [['bot', 'person']],
                msg: "Session type must be 'bot' or 'person'.",
            },
        },
        sessionStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'session_status',
            validate: {
                isIn: [['active', 'inactive', 'deactivated']],
                msg: "Session status must be 'active', 'inactive' or 'deactivated'.",
            },
        },
        ipAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'ip_address',
            validate: {
                isIP: {
                    msg: "IP must be valid.",
                },
            }
        },
        userAgent: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'user_agent'
        },
        sessionData: {
            type: DataTypes.TEXT,
            field: 'session_data',
            isValidJson: (value) => {
                try {
                    JSON.parse(value);
                } catch (e) {
                    return false;
                }
                return true;
            },
        },
        botInfo: {
            type: DataTypes.TEXT,
            field: 'bot_info',
            isValidJson: (value) => {
                try {
                    JSON.parse(value);
                } catch (e) {
                    return false;
                }
                return true;
            },
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            field: 'created_at',
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        },
    }, {
        sequelize,
        modelName: 'Sessions',
        deletedAt: true,
    });

    return Sessions;
};
